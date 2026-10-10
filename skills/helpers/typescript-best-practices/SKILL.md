---
name: typescript-best-practices
description: "TypeScript best practices for React/TSX and frontend code. Apply when reading or editing any .ts or .tsx file."
paths: ["**/*.ts", "**/*.tsx"]
disable-model-invocation: true
---

# TypeScript Best Practices

Apply these rules when working with TypeScript in React and frontend codebases.

## Core Rules

| Rule | Summary |
|------|---------|
| Discriminated unions | Model variants with a `kind` or `status` literal so impossible states can't be represented |
| Constructive modeling | Build the shape so illegal values can't be constructed |
| `unknown` over `any` | External data is `unknown`. Parse at boundaries. |
| No `as` casts | Every `as` is a runtime crash waiting. Validate first. |
| `satisfies` over `as` | Validates without widening literal types |
| Exhaustiveness checks | `const _exhaustive: never = x;` in default arms |

## React Component Patterns

### Props modeling

```tsx
// Bad: optional fields that are actually required together
interface ButtonProps {
  label?: string;
  icon?: IconType;
  onClick?: () => void;
}

// Good: discriminated union for variants
type ButtonProps = 
  | { variant: 'primary'; label: string; onClick: () => void }
  | { variant: 'icon'; icon: IconType; 'aria-label': string; onClick: () => void }
  | { variant: 'link'; label: string; href: string };

// Good: compound props that must appear together
interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  loading?: { 
    isLoading: boolean; 
    loadingText: string; 
  };
}
```

### State modeling

```tsx
// Bad: multiple booleans that can conflict
const [isLoading, setIsLoading] = useState(false);
const [hasError, setHasError] = useState(false);
const [data, setData] = useState<Data | null>(null);

// Good: discriminated union state
type FetchState<T> = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; error: Error }
  | { status: 'success'; data: T };

const [state, setState] = useState<FetchState<Data>>({ status: 'idle' });

// Exhaustive handling
switch (state.status) {
  case 'idle': return <Placeholder />;
  case 'loading': return <Spinner />;
  case 'error': return <ErrorMessage error={state.error} />;
  case 'success': return <DataView data={state.data} />;
  default: {
    const _exhaustive: never = state;
    return _exhaustive;
  }
}
```

### Event handlers

```tsx
// Bad: any event type
const handleClick = (e: any) => { ... }

// Good: specific event type
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => { ... }

// Good: inferred from handler prop
const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
  setValue(e.target.value);
};
```

### Ref typing

```tsx
// Bad: generic ref
const ref = useRef(null);

// Good: typed ref
const inputRef = useRef<HTMLInputElement>(null);
const canvasRef = useRef<HTMLCanvasElement>(null);

// Good: callback ref with type
const callbackRef = useCallback((node: HTMLDivElement | null) => {
  if (node) measureNode(node);
}, []);
```

## Utility Types

Use derived types before declaring new interfaces:

```tsx
// Derive from existing types
type ButtonSize = ComponentProps<typeof Button>['size'];
type FormValues = z.infer<typeof formSchema>;
type ApiResponse = Awaited<ReturnType<typeof fetchUser>>;

// Pick/Omit for variations
type CardHeaderProps = Pick<CardProps, 'title' | 'subtitle'>;
type EditableUser = Omit<User, 'id' | 'createdAt'>;

// Partial for optional updates
type UserUpdate = Partial<Pick<User, 'name' | 'email' | 'avatar'>>;
```

## Boundary Validation

Parse external data at boundaries:

```tsx
// API response parsing
const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(['admin', 'user', 'guest']),
});

type User = z.infer<typeof userSchema>;

async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  const data: unknown = await response.json();
  return userSchema.parse(data); // Throws if invalid
}
```

## Generic Components

```tsx
// Generic list component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T) => string;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={keyExtractor(item)}>{renderItem(item, index)}</li>
      ))}
    </ul>
  );
}

// Usage with inference
<List
  items={users}
  renderItem={(user) => <UserCard user={user} />}
  keyExtractor={(user) => user.id}
/>
```

## Testing Types

```tsx
// Test that types work as expected
import { expectTypeOf } from 'vitest';

test('Button props are correctly typed', () => {
  expectTypeOf<ButtonProps>().toMatchTypeOf<{
    variant: 'primary' | 'secondary';
    children: ReactNode;
  }>();
});

// Type-level tests
type Assert<T extends true> = T;
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false;

type _TestUserHasId = Assert<Equal<User['id'], string>>;
```

## Common Mistakes

### Don't
```tsx
// Don't use any
const data: any = response.json();

// Don't use non-null assertion without check
const element = document.getElementById('root')!;

// Don't use type assertion for narrowing
const user = data as User;

// Don't use object/Object/{}
const config: object = {};
```

### Do
```tsx
// Parse unknown data
const data: unknown = await response.json();
const user = userSchema.parse(data);

// Check before asserting
const element = document.getElementById('root');
if (!element) throw new Error('Root element not found');

// Use type guards
function isUser(data: unknown): data is User {
  return userSchema.safeParse(data).success;
}

// Use specific types
const config: Record<string, unknown> = {};
```

## Integration with Design Systems

```tsx
// Token types
type ColorToken = keyof typeof tokens.colors;
type SpacingToken = keyof typeof tokens.spacing;

// Constrained props
interface BoxProps {
  padding: SpacingToken;
  backgroundColor: ColorToken;
}

// Theme-aware components
interface ThemeProps {
  theme: 'light' | 'dark';
}

const ThemedComponent = ({ theme }: ThemeProps) => {
  const colors = theme === 'light' ? lightColors : darkColors;
  // TypeScript knows colors shape
};
```
