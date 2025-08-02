# Development Guide

## Quick Start for New Developers

### 1. Clone and Setup
```bash
git clone <repository-url>
cd site-analysis-platform
./setup.sh
```

### 2. Environment Configuration

**Backend (.env):**
```bash
cd backend
cp .env.example .env
# Edit .env with your database settings
```

**Frontend (.env.local):**
```bash
cd frontend
cp .env.example .env.local
# Edit .env.local with API URL
```

### 3. Start Development
```bash
npm run dev  # Starts both frontend and backend
```

## Development Workflow

### Branch Strategy
- `main` - Production ready code
- `develop` - Integration branch
- `feature/feature-name` - Feature development
- `fix/bug-description` - Bug fixes
- `hotfix/critical-fix` - Production hotfixes

### Commit Convention
```
type(scope): description

feat(auth): add user authentication
fix(api): resolve CORS issue
docs(readme): update setup instructions
style(frontend): improve responsive design
refactor(backend): optimize database queries
test(api): add integration tests
```

### Code Review Process
1. Create feature branch from `develop`
2. Implement feature with tests
3. Create pull request to `develop`
4. Code review and approval
5. Merge to `develop`
6. Deploy to staging for testing
7. Merge to `main` for production

## Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js       │    │   Django        │    │  PostgreSQL     │
│   Frontend      │◄──►│   Backend       │◄──►│  + PostGIS      │
│   (Port 3000)   │    │   (Port 8000)   │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
    ┌────▼────┐             ┌────▼────┐             ┌────▼────┐
    │ React   │             │ DRF API │             │ PostGIS │
    │ Tailwind│             │ GeoDjango│             │ Spatial │
    │ Hooks   │             │ CORS    │             │ Data    │
    └─────────┘             └─────────┘             └─────────┘
```

## Testing Strategy

### Frontend Testing
```bash
cd frontend
npm test                 # Run all tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report
```

### Backend Testing
```bash
cd backend
python manage.py test                    # All tests
python manage.py test environmental_analysis  # Specific app
python manage.py test --debug-mode      # Debug mode
```

### Integration Testing
```bash
npm run test  # Runs both frontend and backend tests
```

## Debugging

### Frontend Debugging
- Use React DevTools
- Browser DevTools for network/console
- Next.js built-in error overlay
- `console.log()` and breakpoints

### Backend Debugging
- Django Debug Toolbar (development)
- `pdb` for breakpoints
- Django shell for query testing
- PostgreSQL logs for database issues

### API Debugging
```bash
# Test API endpoints
curl -X GET http://localhost:8000/api/health/
curl -X POST http://localhost:8000/api/site-analysis/ \
  -H "Content-Type: application/json" \
  -d '{"latitude": 40.7128, "longitude": -74.0060}'
```

## Performance Monitoring

### Frontend Performance
- Lighthouse audits
- Next.js bundle analyzer
- Core Web Vitals monitoring
- Performance profiling in DevTools

### Backend Performance
- Django debug toolbar
- Database query optimization
- API response time monitoring
- Memory usage profiling

## Security Considerations

### Frontend Security
- Environment variable management
- XSS prevention
- HTTPS enforcement
- Secure API communication

### Backend Security
- CORS configuration
- SQL injection prevention
- Authentication/authorization
- Input validation and sanitization

## Deployment Pipeline

### Staging Deployment
1. Push to `develop` branch
2. Automated tests run
3. Deploy to staging environment
4. Manual testing and QA
5. Approval for production

### Production Deployment
1. Merge to `main` branch
2. Tag release version
3. Deploy to production
4. Monitor health checks
5. Rollback if issues detected

## Common Issues and Solutions

### Port Conflicts
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill

# Kill process on port 8000
lsof -ti:8000 | xargs kill
```

### Database Issues
```bash
# Reset database (development only)
cd backend
python manage.py flush
python manage.py migrate
python manage.py loaddata initial_data.json
```

### Node Modules Issues
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Python Environment Issues
```bash
cd backend
deactivate
rm -rf venv
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## Resources

- [Django Documentation](https://docs.djangoproject.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [PostGIS Documentation](https://postgis.net/documentation/)
