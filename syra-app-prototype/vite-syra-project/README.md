# SYRA - Smartly Reflect, Live Better

A modern, beautiful React mobile app for AI-powered journaling and personal reflection.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

The app will open at `http://localhost:5173`

### 3. Build for Production
```bash
npm run build
```

## Features

- **Splash Screen** - Beautiful animated loading screen
- **Onboarding** - 3-step guided introduction
- **Authentication** - Login and registration
- **Journal Writing** - Write daily reflections with mood tracking
- **AI Insights** - Get personalized insights powered by AI
- **User Profile** - View stats and manage account
- **Responsive Design** - Perfect on mobile, tablet, and desktop

## Tech Stack

- **React 18** - UI library
- **Tailwind CSS 4** - Styling
- **Lucide React** - Icons
- **Vite** - Build tool

## Project Structure

```
vite-syra-project/
├── src/
│   ├── App.jsx           # Main app component
│   ├── index.css         # Tailwind & custom styles
│   └── main.jsx          # React entry point
├── index.html            # HTML template
├── package.json          # Dependencies
├── tailwind.config.js    # Tailwind configuration
└── vite.config.js        # Vite configuration
```

## Color Scheme

- **Primary**: Soft Purple (#6C63FF)
- **Secondary**: Light Indigo
- **Accent**: Violet
- **Background**: Soft white/off-white
- **Text**: Dark purple/gray

## Customization

Edit colors in `src/index.css` in the `:root` section:

```css
:root {
  --background: 278 20% 97%;
  --primary: 270 76% 56%;
  /* ... other colors */
}
```

## License

MIT
