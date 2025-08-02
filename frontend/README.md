# Frontend - Site Analysis Platform

Next.js React application for the Site Analysis Platform frontend.

## Overview

This is a responsive web application built with Next.js that provides an intuitive interface for environmental site analysis. Users can input coordinates, upload KML files, and visualize vegetation, terrain, and climate data.

## Tech Stack

- **Next.js 15.4.2** - React framework with App Router
- **React 19.1.0** - UI library
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **ESLint** - Code linting

## Features

- 🎯 **Responsive Design** - Mobile-first approach with breakpoints
- 🗺️ **Interactive Map** - Site location visualization
- 📍 **Coordinate Input** - Latitude/longitude input with validation
- 📁 **File Upload** - KML file upload functionality
- 📊 **Data Visualization** - Charts and analysis displays
- 🎨 **Modern UI** - Clean, accessible interface design

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   NEXT_PUBLIC_APP_ENV=development
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── globals.css          # Global styles
│   ├── layout.js            # Root layout
│   └── page.js              # Home page (Landing page)
├── components/              # Reusable React components
├── utils/                   # Utility functions
│   ├── api.js              # API integration
│   └── hooks.js            # Custom React hooks
└── styles/                 # Additional styles
```

## Styling

The application uses Tailwind CSS with custom configuration:

- **Responsive breakpoints:** xs, sm, md, lg, xl, 2xl, 3xl
- **Custom fonts:** Geist, Poppins, Actor
- **Color palette:** Custom brand colors and CSS variables
- **Components:** Utility-first approach with component composition

## API Integration

The frontend communicates with the Django backend through:

- **Site Analysis API** - Retrieve environmental data
- **Climate Data API** - Weather and climate information
- **File Upload API** - KML file processing
- **Geospatial API** - Coordinate and mapping data

## Responsive Design

The application is optimized for all device sizes:

- **Mobile (320px+):** Single column, touch-optimized
- **Tablet (768px+):** Two-column layouts where appropriate
- **Desktop (1024px+):** Full multi-column experience

## Performance

- **Code splitting** - Automatic with Next.js
- **Image optimization** - Built-in Next.js optimization
- **CSS optimization** - Tailwind CSS purging
- **Bundle analysis** - Use `npm run analyze`

## Deployment

### Production Build
```bash
npm run build
npm run start
```

### Environment Variables (Production)
```
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
NEXT_PUBLIC_APP_ENV=production
```

### Deployment Platforms
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Docker** containers

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Follow the existing code style
2. Use TypeScript for new components (optional)
3. Write responsive, accessible components
4. Test on multiple screen sizes
5. Run linting before committing

## Troubleshooting

### Common Issues

**Port already in use:**
```bash
lsof -ti:3000 | xargs kill
npm run dev
```

**Node modules issues:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Build errors:**
Check that all environment variables are set correctly and the backend API is accessible.
