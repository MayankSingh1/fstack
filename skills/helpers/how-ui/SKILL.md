---
name: how-ui
description: "Helper skill to trace how a screen or component works. Explains architecture, data flow, rendering, and interactions without making changes."
---

# /how-ui

Traces how a screen or component works. Explains the architecture, data flow, rendering logic, and user interactions. Read-only investigation — no changes made.

## When to Use

- Understanding unfamiliar code before modifying
- Tracing where data comes from
- Understanding component composition
- Debugging by understanding the system

## How to Invoke

```
/how-ui how does the user settings page work?
/how-ui trace the data flow for the product card
/how-ui explain how the modal system works
```

## Investigation Process

### 1. Find the Entry Point

For a screen/page:
- Route definition
- Page component
- Layout wrapper

For a component:
- Component file
- Where it's imported/used
- Props interface

### 2. Trace the Component Tree

```
Page Component
├── Layout
│   ├── Header
│   └── Sidebar
├── Content Area
│   ├── DataFetcher (data source)
│   ├── ConditionalRender (loading/error/data)
│   └── MainComponent
│       ├── ChildComponent A
│       └── ChildComponent B
└── Footer
```

### 3. Identify Data Flow

```
Data Sources:
- API endpoint: GET /api/users
- Query hook: useUser()
- Context: UserContext
- URL params: :userId

Data Transformations:
- Raw API → normalized in hook
- Formatted for display in component

Data Consumers:
- UserProfile component (user object)
- UserStats component (user.stats)
```

### 4. Document Interactions

```
User Interaction Map:
- Click "Edit" → opens modal
- Submit form → API call → refetch data
- Click "Delete" → confirmation → API call → redirect
```

### 5. Note State Management

```
State:
- Local: useState for form fields
- Query: React Query for server data
- Context: UserContext for auth
- URL: Router for navigation state
```

## Output Format

```markdown
## How [Component/Screen] Works

### Overview
[One paragraph summary of what this does]

### Entry Point
[File path and how it's reached]

### Component Tree
[Visual tree of component hierarchy]

### Data Flow
1. **Source**: Where data comes from
2. **Transform**: How data is processed
3. **Render**: How data becomes UI

### User Interactions
| Action | Handler | Result |
|--------|---------|--------|
| Click X | handleX | Does Y |

### State Management
- [List of state sources and their purposes]

### Key Files
- `path/to/main.tsx` - Main component
- `path/to/hook.ts` - Data fetching
- `path/to/types.ts` - Type definitions

### Relevant Context
- Uses design system Button, Card
- Follows existing modal pattern
- Connected to UserContext
```

## Investigation Commands

Useful for tracing:

```bash
# Find component usage
rg "ComponentName" --type tsx

# Find data hooks
rg "useQuery|useFetch" --type tsx

# Find route definitions
rg "path.*component" --type tsx

# Find context usage
rg "useContext|createContext" --type tsx

# Find state management
rg "useState|useReducer" --type tsx
```

## Common Patterns to Look For

### Data Fetching
- React Query / SWR hooks
- useEffect + fetch
- Server components (Next.js)
- GraphQL queries

### State Management
- React Context
- Redux/Zustand stores
- URL state (query params)
- Form libraries (React Hook Form)

### Rendering Patterns
- Conditional rendering
- Loading/error boundaries
- Suspense boundaries
- Portal rendering (modals)

### Event Handling
- Form submission handlers
- Click/change handlers
- Keyboard event handlers
- Custom event systems

## What NOT to Do

- Don't make changes (this is investigation only)
- Don't assume — trace the actual code
- Don't skip layers — understand the full path
- Don't just read types — follow the runtime flow

## Example Output

```markdown
## How the Product Card Works

### Overview
ProductCard displays a product summary in grid/list views. It fetches 
product data from the catalog API and handles add-to-cart interactions.

### Entry Point
`src/components/catalog/ProductCard.tsx`
Used in ProductGrid → CatalogPage → /catalog route

### Component Tree
ProductCard
├── ProductImage (lazy loaded)
├── ProductInfo
│   ├── ProductTitle
│   ├── ProductPrice
│   └── ProductRating
└── ProductActions
    ├── AddToCartButton
    └── WishlistButton

### Data Flow
1. **Source**: ProductCard receives `product: Product` prop
2. **Transform**: Price formatted with `formatCurrency()` 
3. **Render**: Conditional render based on product.inStock

### User Interactions
| Action | Handler | Result |
|--------|---------|--------|
| Click card | navigateToProduct | Route to /product/:id |
| Click "Add to Cart" | addToCart | Cart API + toast |
| Click wishlist | toggleWishlist | Wishlist API + icon change |

### State Management
- Props: product data from parent
- Context: CartContext for add-to-cart
- Local: isHovered for hover state
- Query: useProductStock for real-time stock

### Key Files
- `src/components/catalog/ProductCard.tsx`
- `src/hooks/useCart.ts`
- `src/api/products.ts`
```

## Integration with Flash-Mode

This skill is called by playbooks when understanding existing code is needed:
- Before **Figma to Code** (understand what exists)
- During **Bug Fix** (trace the issue)
- During **Component Refactor** (understand before changing)
- During **Problem Framing** (understand current experience)
