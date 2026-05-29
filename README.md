# 😺 meow-cli-scaffold

A lightweight CLI for scaffolding vanilla HTML/CSS/JS projects with architecture.

## Installation

```bash
npm install -g meow-cli-scaffold
```

## Usage

### Create a new project
```bash
meow new <project-name>
```

### Generate a page or component
```bash
meow generate page <name>
meow generate component <name>

# shorthand
meow g page <name>
meow g component <name>
```

### List all pages or components
```bash
meow list page
meow list component

# shorthand
meow ls page
meow ls component
```

### Delete a page or component
```bash
meow delete page <name>
meow delete component <name>

# shorthand
meow d page <name>
meow d component <name>
```

### Start dev server
```bash
meow serve

# open browser automatically
meow serve -o
```

### Build for production
```bash
meow build
```

## Project Structure

```
my-app/
├── src/
│   ├── app/
│   │   ├── pages/
│   │   │   └── home/
│   │   │       ├── home.html
│   │   │       ├── home.css
│   │   │       └── home.js
│   │   ├── components/
│   │   │   └── navbar/
│   │   │       ├── navbar.html
│   │   │       ├── navbar.css
│   │   │       └── navbar.js
│   │   └── core/
│   │       └── router.js
│   ├── styles/
│   │   ├── reset.css
│   │   ├── variables.css
│   │   └── global.css
│   └── assets/
│       ├── fonts/
│       ├── icons/
│       └── images/
├── index.html
├── package.json
└── bodaro.config.json
```
## License

MIT © [Bodaro](https://github.com/pizzaisgood0011)
