# V1 Services - GitHub-Based Finance Management System

A professional Accounts & Finance service web application that connects Clients, Auditors, and Admin using GitHub as the database.

## Features

✅ **Complete Authentication System** - Email + SHA-256 Password hashing
✅ **Three User Roles** - Client, Auditor, Admin with specific permissions
✅ **Request Management** - Submit, track, and manage finance requests
✅ **Real-time Status Updates** - Track requests from submission to completion
✅ **Unique Tracking IDs** - Auto-generated identifiers for each request
✅ **Auditor Assignment** - Admin can assign and reassign auditors
✅ **Multiple Services** - GST, Income Tax, TDS, Registrations, Compliance
✅ **Professional UI** - Black background, red accent, fully responsive
✅ **No Dependencies** - Pure HTML, CSS, Vanilla JavaScript
✅ **GitHub Integration** - All data stored in GitHub JSON files

## Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** GitHub Repository (JSON files)
- **Authentication:** SHA-256 Password Hashing
- **Session:** localStorage
- **Hosting:** Netlify / GitHub Pages compatible
- **API:** GitHub REST API

## Project Structure

```
V1books/
├── index.html                 # Landing page
├── register.html              # User registration
├── login.html                 # User login
├── pages/
│   ├── client-dashboard.html  # Client dashboard
│   ├── client-request.html    # Submit new request
│   ├── client-track.html      # Track requests
│   ├── client-help.html       # Help & FAQ
│   ├── auditor-dashboard.html # Auditor dashboard
│   ├── auditor-requests.html  # Manage assigned requests
│   ├── admin-dashboard.html   # Admin overview
│   └── admin-requests.html    # Manage all requests
├── css/
│   └── style.css              # Global styles
├── js/
│   ├── api.js                 # GitHub API integration
│   ├── utils.js               # Utility functions
└── .env.example               # Environment template
```

## GitHub Backend Setup

### 1. Create a Private Repository

Create a new private GitHub repository named `v1books-backend`.

### 2. Initialize Database Structure

Create the following files in your repository:

**`database/users.json`**
```json
[
  {
    "email": "prasanth@v1books.com",
    "passwordHash": "your_sha256_hash_here",
    "role": "admin",
    "createdAt": "2025-01-01"
  }
]
```

**`database/requests.json`**
```json
[]
```

**`database/logs.json`**
```json
[]
```

### 3. Generate GitHub Personal Access Token

1. Go to [GitHub Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Select scope: `repo` (full control of private repositories)
4. Copy the token and save it securely

## Deployment Guide

### Option 1: Netlify (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/your-username/V1books.git
   git branch -M main
   git push -u origin main
   ```

2. **Connect to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Build settings: Leave default (no build command needed)
   - Deploy

3. **Set Environment Variables (in Netlify):**
   - Go to Site settings → Environment
   - Add `GITHUB_USERNAME` and `GITHUB_TOKEN`

### Option 2: GitHub Pages

1. Go to repository Settings → Pages
2. Select `main` branch as source
3. Site will be deployed at `https://your-username.github.io/V1books/`

## First Time Setup

### 1. Admin Registration

Since Prasanth (prasanth@v1books.com) is the fixed admin:

1. Open the registration page
2. Enter: `prasanth@v1books.com` and create a password
3. Select "Admin" role
4. Provide your GitHub token when prompted
5. Account is created in `database/users.json`

### 2. Create Test Data

**To manually create initial users:**

Add to `database/users.json`:
```json
{
  "email": "client@email.com",
  "passwordHash": "hash_of_password",
  "role": "client",
  "createdAt": "2025-01-01"
},
{
  "email": "auditor@email.com",
  "passwordHash": "hash_of_password",
  "role": "auditor",
  "createdAt": "2025-01-01"
}
```

## Usage

### For Clients
1. Register as a Client
2. Login and go to Dashboard
3. Click "New Request" to submit a request
4. Select service (GST, Income Tax, etc.)
5. Provide details and submit
6. Track status in "Track Requests" page
7. View assigned auditor

### For Auditors
1. Register as an Auditor
2. Login and view assigned requests
3. Review client submissions
4. Update status (Assigned → In Progress → Completed)
5. Add notes for clients
6. Mark as Completed

### For Admin
1. Login as prasanth@v1books.com
2. View dashboard with system statistics
3. Go to "All Requests" page
4. Assign/reassign auditors to requests
5. Monitor all requests in real-time
6. Filter by status, service, or auditor

## API Endpoints Used

All requests go through GitHub REST API:

- **Get File:** `GET /repos/{owner}/{repo}/contents/{path}`
- **Update File:** `PUT /repos/{owner}/{repo}/contents/{path}`

## Security Features

✅ SHA-256 password hashing (no plaintext passwords)
✅ GitHub private repository for data
✅ Personal access token authentication
✅ Role-based access control (RBAC)
✅ Session management with localStorage
✅ HTTPS-only deployment (Netlify/GitHub Pages)

## Environment Variables

Create a `.env` file in your project root (not tracked in git):

```
GITHUB_USERNAME=your_github_username
GITHUB_TOKEN=your_personal_access_token
GITHUB_REPO=v1books-backend
```

For Netlify, set these in Site settings → Environment variables.

## Support

- **WhatsApp:** 9360522383
- **Email:** support@v1books.com
- **Account Manager:** prasanth@v1books.com

## Features Coming Soon

- Google Drive file storage for documents
- Email notifications
- Advanced reporting and analytics
- Bulk operations for admin
- Digital signatures
- Payment integration

## Performance Tips

1. **Minimize GitHub API calls** - Cache data in localStorage
2. **Batch operations** - Update multiple records in one file
3. **Archive old requests** - Move completed requests to archive
4. **Use CDN** - All static assets served by CDN (Netlify)

## Troubleshooting

### "GitHub API error: 401"
- Check your token is valid
- Verify token has `repo` scope
- Token may have expired

### "Failed to create account"
- Ensure email is not already registered
- Check GitHub repository permissions
- Verify token has write access

### "File not found"
- Ensure `database/` folder exists in GitHub repo
- Check file paths match exactly
- Verify repository name is `v1books-backend`

## FAQ

**Q: Can I use this on a custom domain?**
A: Yes! On Netlify, add your custom domain in Site settings.

**Q: What's the request limit?**
A: GitHub API has rate limit of 60 requests/hour (unauthenticated) or 5000/hour (authenticated).

**Q: Can I backup the database?**
A: Yes! Clone the v1books-backend repository regularly.

**Q: How do I reset a user's password?**
A: Manually edit `users.json` and update the passwordHash.

**Q: Can multiple admins be created?**
A: Currently, only prasanth@v1books.com is admin. Modify registration logic to add more.

## License

Proprietary - V1Books 2025

## Version

**V1.0.0** - Production Ready

---

**Last Updated:** December 2025
**Status:** ✅ Stable & Production-Ready
