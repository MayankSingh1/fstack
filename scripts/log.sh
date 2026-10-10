#!/bin/bash
# Decision log helper for /show-me-your-work
# Usage: ./scripts/log.sh "<phase>" "<decision>" "<why>" "<evidence>" "<result>"

LOG_FILE="${LOG_FILE:-decisions.tsv}"

# Create header if file doesn't exist
if [ ! -f "$LOG_FILE" ]; then
    echo -e "ts\tphase\tdecision\twhy\tevidence\tresult" > "$LOG_FILE"
fi

# Get arguments
PHASE="$1"
DECISION="$2"
WHY="$3"
EVIDENCE="$4"
RESULT="$5"

# Escape tabs and newlines in each field
escape_field() {
    local field="$1"
    # Replace tabs with spaces, newlines with spaces
    field="${field//$'\t'/ }"
    field="${field//$'\n'/ }"
    # Prefix cells starting with =, +, -, @ with single quote (spreadsheet safety)
    if [[ "$field" =~ ^[=+\-@] ]]; then
        field="'$field"
    fi
    echo "$field"
}

# Generate timestamp
TS=$(date -u +%Y-%m-%dT%H:%M:%SZ)

# Escape all fields
PHASE=$(escape_field "$PHASE")
DECISION=$(escape_field "$DECISION")
WHY=$(escape_field "$WHY")
EVIDENCE=$(escape_field "$EVIDENCE")
RESULT=$(escape_field "$RESULT")

# Append row
echo -e "${TS}\t${PHASE}\t${DECISION}\t${WHY}\t${EVIDENCE}\t${RESULT}" >> "$LOG_FILE"

echo "Logged to $LOG_FILE"
