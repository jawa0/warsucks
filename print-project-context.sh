#!/bin/bash

# Function to print a line of dashes
print_dashes() {
    printf '%*s\n' 40 | tr ' ' -
}

# First, print the tree structure
echo "Project Structure:"
tree -I 'node_modules|dist|build|coverage|.git|*.log' \
    -P '*.ts|*.tsx|*.js|*.jsx|*.json|*.yml|*.yaml|Dockerfile|.dockerignore|.gitignore|.env*' \
    --prune

echo -e "\nFile Contents:\n"

# Then, find and print the contents of each file
find . -type f \
    -not -path '*/node_modules/*' \
    -not -path '*/dist/*' \
    -not -path '*/build/*' \
    -not -path '*/coverage/*' \
    -not -path '*/.git/*' \
    -not -name '*.log' \
    \( -name '*.ts' -o -name '*.tsx' -o -name '*.js' -o -name '*.jsx' -o -name '*.json' -o -name '*.yml' -o -name '*.yaml' -o -name 'Dockerfile' -o -name '.dockerignore' -o -name '.gitignore' -o -name '.env*' \) \
    | while read -r file; do
        print_dashes
        echo "${file:2}:"
        print_dashes
        cat "$file"
        echo -e "\n"
    done
