#!/bin/bash

# fstack validation script
# Checks that all skills have valid frontmatter and cross-references match

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0
WARNINGS=0

echo "============================================"
echo "fstack Validation Script"
echo "============================================"
echo ""

# Function to check if a SKILL.md has valid frontmatter
check_frontmatter() {
    local file=$1
    local content=$(head -50 "$file")
    
    # Check for frontmatter delimiters
    if ! echo "$content" | head -1 | grep -q "^---$"; then
        echo -e "${RED}ERROR${NC}: $file missing frontmatter (no opening ---)"
        ((ERRORS++))
        return 1
    fi
    
    # Check for name field
    if ! echo "$content" | grep -q "^name:"; then
        echo -e "${RED}ERROR${NC}: $file missing 'name' in frontmatter"
        ((ERRORS++))
        return 1
    fi
    
    # Check for description field
    if ! echo "$content" | grep -q "^description:"; then
        echo -e "${RED}ERROR${NC}: $file missing 'description' in frontmatter"
        ((ERRORS++))
        return 1
    fi
    
    return 0
}

# Find all SKILL.md files
echo "Checking SKILL.md frontmatter..."
echo "--------------------------------"

skill_files=$(find skills -name "SKILL.md" 2>/dev/null | sort)

if [[ -z "$skill_files" ]]; then
    echo -e "${RED}ERROR${NC}: No SKILL.md files found in skills/"
    exit 1
fi

skill_count=0
for file in $skill_files; do
    if check_frontmatter "$file"; then
        echo -e "${GREEN}✓${NC} $file"
    fi
    ((skill_count++))
done

echo ""
echo "Found $skill_count SKILL.md files"
echo ""

# Check that router playbooks exist
echo "Checking playbook references..."
echo "--------------------------------"

# List of expected playbooks
design_playbooks=(
    "skills/playbooks/design/problem-framing/SKILL.md"
    "skills/playbooks/design/user-flows-ia/SKILL.md"
    "skills/playbooks/design/wireframe-to-hifi/SKILL.md"
    "skills/playbooks/design/design-critique/SKILL.md"
    "skills/playbooks/design/design-system/SKILL.md"
    "skills/playbooks/design/ux-copy/SKILL.md"
)

frontend_playbooks=(
    "skills/playbooks/frontend/figma-to-code/SKILL.md"
    "skills/playbooks/frontend/visual-parity/SKILL.md"
    "skills/playbooks/frontend/accessibility-audit/SKILL.md"
    "skills/playbooks/frontend/responsive-cross-browser/SKILL.md"
    "skills/playbooks/frontend/component-refactor/SKILL.md"
    "skills/playbooks/frontend/bug-fix/SKILL.md"
)

shipping_playbooks=(
    "skills/playbooks/shipping/open-pr/SKILL.md"
    "skills/playbooks/shipping/babysit-pr/SKILL.md"
    "skills/playbooks/shipping/handoff-note/SKILL.md"
)

# Check design playbooks
echo "Design playbooks:"
for playbook in "${design_playbooks[@]}"; do
    if [[ -f "$playbook" ]]; then
        echo -e "  ${GREEN}✓${NC} $playbook"
    else
        echo -e "  ${RED}✗${NC} $playbook (MISSING)"
        ((ERRORS++))
    fi
done

echo ""
echo "Frontend playbooks:"
for playbook in "${frontend_playbooks[@]}"; do
    if [[ -f "$playbook" ]]; then
        echo -e "  ${GREEN}✓${NC} $playbook"
    else
        echo -e "  ${RED}✗${NC} $playbook (MISSING)"
        ((ERRORS++))
    fi
done

echo ""
echo "Shipping playbooks:"
for playbook in "${shipping_playbooks[@]}"; do
    if [[ -f "$playbook" ]]; then
        echo -e "  ${GREEN}✓${NC} $playbook"
    else
        echo -e "  ${RED}✗${NC} $playbook (MISSING)"
        ((ERRORS++))
    fi
done

echo ""

# Check helper skills
echo "Checking helper skills..."
echo "--------------------------------"

helpers=(
    "skills/helpers/how-ui/SKILL.md"
    "skills/helpers/why-this-design/SKILL.md"
    "skills/helpers/critique/SKILL.md"
    "skills/helpers/a11y/SKILL.md"
    "skills/helpers/unslop/SKILL.md"
    "skills/helpers/setup-fstack/SKILL.md"
)

for helper in "${helpers[@]}"; do
    if [[ -f "$helper" ]]; then
        echo -e "${GREEN}✓${NC} $helper"
    else
        echo -e "${RED}✗${NC} $helper (MISSING)"
        ((ERRORS++))
    fi
done

echo ""

# Check principle skills
echo "Checking principle skills..."
echo "--------------------------------"

principles=(
    "skills/principles/start-from-user-task/SKILL.md"
    "skills/principles/prove-on-real-screen/SKILL.md"
    "skills/principles/tokens-over-hardcoded/SKILL.md"
    "skills/principles/accessible-by-default/SKILL.md"
    "skills/principles/smallest-change/SKILL.md"
    "skills/principles/states-are-design/SKILL.md"
    "skills/principles/design-system-consistency/SKILL.md"
)

for principle in "${principles[@]}"; do
    if [[ -f "$principle" ]]; then
        echo -e "${GREEN}✓${NC} $principle"
    else
        echo -e "${RED}✗${NC} $principle (MISSING)"
        ((ERRORS++))
    fi
done

echo ""

# Check router skill
echo "Checking router skill..."
echo "--------------------------------"

if [[ -f "skills/flash-mode/SKILL.md" ]]; then
    echo -e "${GREEN}✓${NC} skills/flash-mode/SKILL.md"
else
    echo -e "${RED}✗${NC} skills/flash-mode/SKILL.md (MISSING)"
    ((ERRORS++))
fi

if [[ -f "skills/flash-mode/principles-index.md" ]]; then
    echo -e "${GREEN}✓${NC} skills/flash-mode/principles-index.md"
else
    echo -e "${RED}✗${NC} skills/flash-mode/principles-index.md (MISSING)"
    ((ERRORS++))
fi

echo ""

# Check skill.json
echo "Checking skill.json..."
echo "--------------------------------"

if [[ -f "skill.json" ]]; then
    echo -e "${GREEN}✓${NC} skill.json exists"
    
    # Check if it's valid JSON
    if python3 -c "import json; json.load(open('skill.json'))" 2>/dev/null; then
        echo -e "${GREEN}✓${NC} skill.json is valid JSON"
    else
        echo -e "${RED}✗${NC} skill.json is not valid JSON"
        ((ERRORS++))
    fi
else
    echo -e "${RED}✗${NC} skill.json (MISSING)"
    ((ERRORS++))
fi

echo ""

# Check README
echo "Checking README..."
echo "--------------------------------"

if [[ -f "README.md" ]]; then
    echo -e "${GREEN}✓${NC} README.md exists"
    
    # Check for required sections
    if grep -q "## Quick Start" README.md; then
        echo -e "${GREEN}✓${NC} README has Quick Start section"
    else
        echo -e "${YELLOW}WARNING${NC}: README missing Quick Start section"
        ((WARNINGS++))
    fi
    
    if grep -q "## Skill Catalogue" README.md; then
        echo -e "${GREEN}✓${NC} README has Skill Catalogue section"
    else
        echo -e "${YELLOW}WARNING${NC}: README missing Skill Catalogue section"
        ((WARNINGS++))
    fi
else
    echo -e "${RED}✗${NC} README.md (MISSING)"
    ((ERRORS++))
fi

echo ""

# Summary
echo "============================================"
echo "Validation Summary"
echo "============================================"

total_playbooks=$((${#design_playbooks[@]} + ${#frontend_playbooks[@]} + ${#shipping_playbooks[@]}))
echo "Playbooks: $total_playbooks"
echo "Helpers: ${#helpers[@]}"
echo "Principles: ${#principles[@]}"
echo "Total SKILL.md files: $skill_count"
echo ""

if [[ $ERRORS -eq 0 ]]; then
    echo -e "${GREEN}✓ All checks passed!${NC}"
    if [[ $WARNINGS -gt 0 ]]; then
        echo -e "${YELLOW}$WARNINGS warning(s)${NC}"
    fi
    exit 0
else
    echo -e "${RED}✗ $ERRORS error(s) found${NC}"
    if [[ $WARNINGS -gt 0 ]]; then
        echo -e "${YELLOW}$WARNINGS warning(s)${NC}"
    fi
    exit 1
fi
