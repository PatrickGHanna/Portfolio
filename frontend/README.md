# Portfolio Frontend

React application for the portfolio website.

## Features

- React 18 with React Router
- Mobile-responsive design
- Vite for fast development
- API integration with Axios
- Modern CSS with animations

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Configuration

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
```

For production, this is automatically configured by Azure Static Web Apps.

## Project Structure

```
src/
├── components/        # Reusable components
│   ├── Layout.jsx
│   └── Layout.css
├── pages/             # Page components
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Resume.jsx
│   └── Projects.jsx
├── services/          # API service layer
│   └── api.js
├── App.jsx            # Main app component
├── main.jsx           # Entry point
└── index.css          # Global styles
```

## Routing

Routes are defined in `App.jsx`:
- `/` - Homepage
- `/about` - About page
- `/resume` - Resume page
- `/projects` - Projects page

## API Integration

API calls are made through the `services/api.js` module using Axios. Each page component fetches its data from the corresponding backend endpoint.

## Styling

- Global styles: `index.css`
- Component styles: Co-located with components
- Mobile-first responsive design
- CSS animations and transitions

## Mobile Responsive

The application is fully responsive with:
- Mobile navigation menu
- Responsive grid layouts
- Touch-friendly buttons and links
- Optimized typography for all screen sizes

## Deployment

See the main [README.md](../README.md) for Azure deployment instructions.

The frontend is deployed as an Azure Static Web App, which automatically builds and deploys from the `dist/` folder.
