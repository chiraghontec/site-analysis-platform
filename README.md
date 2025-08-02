# Site Analysis Platform

A comprehensive web application for environmental site analysis providing vegetation, terrain, and climate data visualization.

## Project Structure

```
site-analysis-project/
├── frontend/                 # Next.js React frontend
├── backend/                  # Django REST API backend
├── .github/                  # GitHub Actions workflows
├── docs/                     # Documentation
└── README.md                 # This file
```

## Quick Start

### Prerequisites
- Node.js 18+ 
- Python 3.9+
- PostgreSQL with PostGIS extension

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

## Features

- 🗺️ **Interactive Map Integration** - Site location visualization
- 🌱 **Vegetation Analysis** - Automated vegetation and terrain data retrieval
- 🌤️ **Climate Conditions** - Temperature, humidity, and weather data
- 📊 **Data Visualization** - Interactive charts and reports
- 📱 **Responsive Design** - Mobile-first approach
- 🔐 **Secure API** - Django REST Framework with authentication

## Tech Stack

### Frontend
- **Framework:** Next.js 15.4.2
- **UI Library:** React 19.1.0
- **Styling:** Tailwind CSS 4.1.11
- **State Management:** React Hooks
- **Build Tool:** Webpack (via Next.js)

### Backend
- **Framework:** Django 5.2.3
- **API:** Django REST Framework
- **Database:** PostgreSQL with PostGIS
- **Geospatial:** GeoDjango
- **Environment:** Python 3.9+

## API Endpoints

- `GET /api/site-analysis/` - Retrieve site analysis data
- `POST /api/climate-data/` - Get climate information
- `POST /api/vegetation-analysis/` - Analyze vegetation data
- `GET /api/health/` - Health check endpoint

## Development

### Running Tests
```bash
# Frontend
cd frontend && npm test

# Backend
cd backend && python manage.py test
```

### Code Quality
```bash
# Frontend linting
cd frontend && npm run lint

# Backend formatting
cd backend && black . && isort .
```

## Deployment

See individual README files in `frontend/` and `backend/` directories for deployment instructions.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions and support, please open an issue on GitHub.
