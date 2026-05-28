#!/usr/bin/env bash

# List of remaining projects relative to the FrontEnd base directory
projects=(
  "8-Less-Sass/B - Less-Sass avançado/05-Automated-Theme-Generator"
  "8-Less-Sass/B - Less-Sass avançado/06-Less-Advanced-Theme"
  "8-Less-Sass/B - Less-Sass avançado/03-Tailwind-Plugin-Library"
  "8-Less-Sass/B - Less-Sass avançado/04-E-Commerce-Storefront"
  "8-Less-Sass/B - Less-Sass avançado/05-Performance-Optimized-Tailwind"
  "11-Nextjs/01-Static-Blog"
  "11-Nextjs/02-Dynamic-Product-Detail"
  "11-Nextjs/03-Local-Search-Directory"
  "11-Nextjs/04-Form-Server-Action"
  "11-Nextjs/05-Image-Gallery-Optimization"
  "12-Zustand/01-Simple-Counter"
  "12-Zustand/02-Todo-Store"
  "12-Zustand/03-User-Auth-State"
  "12-Zustand/04-Theme-Toggle"
  "12-Zustand/05-Notification-Toast-System"
  "12-Zustand/01-Multi-Step-Checkout-Store"
  "12-Zustand/02-Realtime-Data-Sync"
  "12-Zustand/03-Undo-Redo-History"
  "12-Zustand/04-Zustand-Middleware-Pro"
  "12-Zustand/05-Sub-State-Slices-Architecture"
  "13-Svelte/01-Reactive-Form"
  "13-Svelte/02-Dynamic-List"
  "13-Svelte/03-Simple-Calculator"
  "13-Svelte/04-Custom-Event-Dispatcher"
  "13-Svelte/05-Store-Subscriber"
  "13-Svelte/01-SvelteKit-Portal"
  "13-Svelte/02-Complex-Transition-Library"
  "13-Svelte/03-Svelte-State-Machine"
  "13-Svelte/04-Svelte-Canvas-Game"
  "13-Svelte/05-SvelteKit-API-Endpoints"
)

base="c:/Users/origi/Downloads/web code/Web-FullStack-Study/1-FrontEnd"

for proj in "${projects[@]}"; do
  dir="$base/$proj"
  mkdir -p "$dir/src/scss" "$dir/src/css"
  # package.json
  cat > "$dir/package.json" <<EOF
{
  "name": "$(basename "$proj" | tr ' ' '-')",
  "version": "1.0.0",
  "description": "Auto-generated scaffold for $proj",
  "scripts": {
    "build:sass": "sass src/scss/main.scss src/css/style.css",
    "watch:sass": "sass --watch src/scss/main.scss:src/css/style.css"
  },
  "dependencies": { "sass": "^1.77.2" }
}
EOF
  # src/scss/main.scss placeholder
  cat > "$dir/src/scss/main.scss" <<EOF
/* Placeholder SCSS for $proj */
@use "sass:color";
EOF
  # src/index.html placeholder
  cat > "$dir/index.html" <<EOF
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>$(basename "$proj")</title>
  <link rel="stylesheet" href="src/css/style.css" />
</head>
<body>
  <h1>$(basename "$proj")</h1>
  <p>Auto-generated project scaffold.</p>
</body>
</html>
EOF
done

echo "Scaffolding generation completed."
