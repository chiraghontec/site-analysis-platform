#!/bin/bash
# Setup script for Site Analysis Platform

echo "🚀 Setting up Site Analysis Platform..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_requirements() {
    print_status "Checking requirements..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+"
        exit 1
    fi
    
    # Check Python
    if ! command -v python3 &> /dev/null; then
        print_error "Python 3 is not installed. Please install Python 3.9+"
        exit 1
    fi
    
    # Check pip
    if ! command -v pip3 &> /dev/null; then
        print_error "pip3 is not installed. Please install pip3"
        exit 1
    fi
    
    # Check PostgreSQL
    if ! command -v psql &> /dev/null; then
        print_warning "PostgreSQL is not found. Please ensure PostgreSQL with PostGIS is installed"
    fi
    
    print_status "All requirements check passed!"
}

# Setup frontend
setup_frontend() {
    print_status "Setting up frontend..."
    cd frontend
    
    if [ ! -f ".env.local" ]; then
        cp .env.example .env.local
        print_status "Created .env.local from example"
    fi
    
    npm install
    if [ $? -eq 0 ]; then
        print_status "Frontend dependencies installed successfully"
    else
        print_error "Failed to install frontend dependencies"
        exit 1
    fi
    
    cd ..
}

# Setup backend
setup_backend() {
    print_status "Setting up backend..."
    cd backend
    
    # Create virtual environment if it doesn't exist
    if [ ! -d "venv" ]; then
        print_status "Creating Python virtual environment..."
        python3 -m venv venv
    fi
    
    # Activate virtual environment
    source venv/bin/activate
    
    # Install dependencies
    pip install -r requirements.txt
    if [ $? -eq 0 ]; then
        print_status "Backend dependencies installed successfully"
    else
        print_error "Failed to install backend dependencies"
        exit 1
    fi
    
    # Create .env file if it doesn't exist
    if [ ! -f ".env" ]; then
        cp .env.example .env
        print_status "Created .env from example"
        print_warning "Please update the .env file with your database configuration"
    fi
    
    # Run migrations
    print_status "Running database migrations..."
    python manage.py migrate
    
    cd ..
}

# Setup root level dependencies
setup_root() {
    print_status "Setting up root level dependencies..."
    npm install
}

# Main setup process
main() {
    echo "🏗️  Site Analysis Platform Setup"
    echo "=================================="
    
    check_requirements
    setup_root
    setup_frontend
    setup_backend
    
    echo ""
    echo "✅ Setup completed successfully!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Configure your database in backend/.env"
    echo "2. Update frontend/.env.local with your API URL"
    echo "3. Run 'npm run dev' to start both servers"
    echo ""
    echo "🚀 Quick start commands:"
    echo "  npm run dev          # Start both frontend and backend"
    echo "  npm run dev:frontend # Start only frontend"
    echo "  npm run dev:backend  # Start only backend"
    echo ""
}

# Run main function
main
