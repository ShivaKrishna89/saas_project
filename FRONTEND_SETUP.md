# Frontend Setup Instructions

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Angular CLI installed globally

## Step 1: Install Angular CLI (if not already installed)

```bash
npm install -g @angular/cli
```

## Step 2: Install Frontend Dependencies

```bash
cd frontend

# Install all dependencies
npm install
```

## Step 3: Configure Environment

The environment files are already configured:
- `src/environments/environment.ts` - Development settings
- `src/environments/environment.prod.ts` - Production settings

Make sure the backend is running on `http://localhost:8000` or update the URLs in the environment files.

## Step 4: Run Angular Development Server

```bash
# Make sure you're in the frontend directory
cd frontend

# Start the development server
ng serve --open
```

The `--open` flag will automatically open your browser to `http://localhost:4200`

## Step 5: Verify Frontend is Running

- Open browser: http://localhost:4200
- You should see the Slack-like application interface
- Check browser console for any errors

## Development Commands

```bash
# Start development server
ng serve

# Start with specific port
ng serve --port 4201

# Start with host binding (for mobile testing)
ng serve --host 0.0.0.0

# Build for production
ng build --prod

# Run tests
ng test

# Run linting
ng lint
```

## Troubleshooting

### Common Issues:

1. **Port Already in Use**:
   ```bash
   # Kill process on port 4200
   npx kill-port 4200
   # Or use different port
   ng serve --port 4201
   ```

2. **Node Modules Issues**:
   ```bash
   # Clear npm cache
   npm cache clean --force
   # Delete node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Angular CLI Issues**:
   ```bash
   # Update Angular CLI
   npm update -g @angular/cli
   # Or reinstall
   npm uninstall -g @angular/cli
   npm install -g @angular/cli
   ```

4. **Build Errors**:
   ```bash
   # Clear Angular cache
   ng cache clean
   # Rebuild
   ng build --prod
   ```

### Useful Commands:

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check Angular CLI version
ng version

# View package.json dependencies
npm list --depth=0
```
