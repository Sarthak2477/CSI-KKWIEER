# CSI KKWIEER Project Setup Guidelines

## Frontend-Backend Integration

The frontend is now integrated with the backend API. Here's how to run both:

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your MongoDB connection string and other configurations.

4. Seed the database (optional):
   ```bash
   npm run seed
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

### Frontend Setup
1. In the root directory, install dependencies:
   ```bash
   npm install
   ```
2. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

### API Integration Features
- **Events**: Fetches events from backend API with filtering and pagination
- **Committee Members**: Loads committee members dynamically from database
- **Gallery**: Displays gallery images from backend with category filtering
- **Error Handling**: Graceful fallbacks when backend is unavailable
- **Loading States**: User-friendly loading indicators
- **Environment Configuration**: Configurable API endpoints via environment variables

## Prerequisites

Before you start, make sure you have the following installed on your computer:

### 1. Node.js and npm
### 2. Git


## Project Setup Instructions

### Step 1: Clone the Repository

1. **Open terminal/command prompt** and navigate to where you want to store the project:
   ```bash
   cd Desktop  # or wherever you want to store the project
   ```
2. **Clone the repository**:
   ```bash
   git clone https://github.com/Sarthak2477/CSI-KKWIEER.git
   ```

### Step 2: Install Dependencies

Install all required packages:
```bash
npm install
```

### Step 3: Start the Development Server

Run the project locally:
```bash
npm run dev
```

The project will start and you should see output like:
```
Local:   http://localhost:5173/
Network: http://192.168.x.x:5173/
```



## Git Workflow for Team Collaboration

### Understanding Branches

- **main/master branch**: The primary branch with stable code
- **feature branches**: Separate branches for developing new features 
- Always work on feature branches, never directly on main

### Daily Workflow

#### 1. Before Starting Work (Every Day)

```bash
# Make sure you're on the main branch
git checkout main

# Get the latest changes from the remote repository
git pull origin main
```

#### 2. Create a New Feature Branch

For each new task/feature, create a new branch:
```bash
git checkout -b feature/your-feature-name
```

**Branch naming convention:**
- `feature/navbar-improvements`
- `feature/events-page`
- `fix/mobile-responsive-issues`
- `update/committee-section`

#### 3. Make Your Changes

- Edit files using VS Code
- Test your changes by running `npm run dev`
- Make sure everything works properly

#### 4. Save Your Changes (Commit)

```bash
# Check what files you've changed
git status

# Add specific files to staging
git add src/components/ui/navbar.tsx
# OR add all changed files
git add .

# Commit your changes with a descriptive message
git commit -m "Add responsive navigation for mobile devices"
```

**Good commit message examples:**
- `"Add mobile responsive design to navbar"`
- `"Fix button styling in committee section"`
- `"Update events carousel with new data"`
- `"Remove unused imports from Home component"`

#### 5. Push Your Branch to GitHub

```bash
git push origin feature/your-feature-name
```

#### 6. Create a Pull Request

1. Go to the GitHub repository in your browser
2. You'll see a yellow banner suggesting to create a Pull Request
3. Click "Compare & pull request"
4. Fill in the details:
   - **Title**: Brief description of what you changed
   - **Description**: Detailed explanation of changes made
5. Click "Create pull request"
6. Wait for code review and approval

#### 7. After Pull Request is Merged

```bash
# Switch back to main branch
git checkout main

# Get the latest changes (including your merged changes)
git pull origin main

# Delete your local feature branch (optional cleanup)
git branch -d feature/your-feature-name
```

## Project Structure Overview

```
src/
├── components/
│   └── ui/                    # Reusable UI components
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── navbar.tsx
│       └── ...
├── screens/                   # Main pages/screens
│   ├── Home/
│   │   ├── Home.tsx
│   │   └── sections/          # Home page sections
│   ├── Committee/
│   └── Events/
├── lib/
│   └── utils.ts              # Utility functions
└── index.tsx                 # App entry point
```

## Development Guidelines

### Code Style
- Use TypeScript (`.tsx` files)
- Follow existing naming conventions
- Use Tailwind CSS for styling
- Keep components small and focused
- Add comments for complex logic

### Testing Your Changes
1. Always test on different screen sizes (mobile, tablet, desktop)
2. Check all navigation links work
3. Verify responsive design
4. Test on different browsers if possible

### File Organization
- Put reusable components in `src/components/ui/`
- Page-specific components go in respective screen folders
- Images should be in `public/images/`

## Common Git Commands Reference

| Command | Purpose |
|---------|---------|
| `git status` | Check current status of your files |
| `git log --oneline` | See commit history |
| `git checkout main` | Switch to main branch |
| `git checkout -b new-branch` | Create and switch to new branch |
| `git add .` | Stage all changes |
| `git commit -m "message"` | Commit changes |
| `git push origin branch-name` | Push branch to GitHub |
| `git pull origin main` | Get latest changes from main |

## Troubleshooting

### Common Issues and Solutions

#### 1. Port Already in Use Error
```bash
# If port 5173 is busy, try:
npm run dev -- --port 3000
```

#### 2. Node Modules Issues
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 3. Git Conflicts
If you get merge conflicts:
1. Open the conflicted files in VS Code
2. Look for conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`)
3. Choose which changes to keep
4. Remove conflict markers
5. Save the file
6. Run `git add .` and `git commit -m "Resolve merge conflicts"`

#### 4. Forgot to Create Feature Branch
If you made changes on main branch:
```bash
# Create new branch with your current changes
git checkout -b feature/your-feature-name
git push origin feature/your-feature-name

# Switch back to main and reset it
git checkout main
git reset --hard origin/main
```

## Communication Guidelines

### Before Starting Work
- Check group chat for assigned tasks
- Inform team members which feature/section you're working on
- Ask questions if requirements are unclear

### While Working
- Make frequent small commits rather than one large commit
- Push your branch regularly (at least daily)
- Update team on progress
- Message in the group chat after pushing changes. Do not merge the branch before the review.

## Emergency Contacts

If you're stuck:
1. Check this guide first
2. Ask team members in the group chat

## Quick Start Checklist

- [ ] Install Node.js and npm
- [ ] Install Git
- [ ] Install VS Code
- [ ] Configure Git with your name and email
- [ ] Clone the repository
- [ ] Run `npm install`
- [ ] Run `npm run dev` to start development server
- [ ] Create your first feature branch
- [ ] Make a small test change
- [ ] Commit and push your branch
- [ ] Create your first Pull Request

## Best Practices

1. **Always work on feature branches** - Never commit directly to main
2. **Pull before you push** - Always get latest changes before pushing
3. **Write descriptive commit messages** - Help others understand your changes
4. **Test before committing** - Make sure your changes work
5. **Keep commits small and focused** - One feature/fix per commit
6. **Ask for help early** - Don't struggle alone for hours
