# Environment Variables Setup

## Required Environment Variables

Add these to your GitHub repository secrets:

1. Go to your GitHub repository
2. Click on "Settings" tab
3. Click on "Secrets and variables" → "Actions"
4. Add the following secrets:

### Required Secrets:
- `REACT_APP_SUPABASE_URL`: Your Supabase project URL
- `REACT_APP_SUPABASE_ANON_KEY`: Your Supabase anonymous key

### How to get these values:
1. Go to your Supabase dashboard
2. Select your project
3. Go to Settings → API
4. Copy the "Project URL" and "anon public" key

## Local Development
Create a `.env.local` file in your project root:
```
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

