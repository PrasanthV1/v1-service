# GitHub Backend Setup Guide

## Complete Instructions for Setting Up v1books-backend Repository

### Step 1: Create the Repository

1. **Go to GitHub:**
   - Navigate to [github.com/new](https://github.com/new)
   - OR click "+" icon → New repository

2. **Fill Repository Details:**
   - Repository name: `v1books-backend`
   - Description: "Backend database for V1 Services - Accounts & Finance"
   - Select: **Private** (important for security)
   - Do NOT initialize with README

3. **Click "Create repository"**

---

### Step 2: Create Database Files

After repository is created, add the three essential JSON files:

#### Method A: Via GitHub Web Interface (Easy)

1. **For users.json:**
   - Click "Add file" → "Create new file"
   - Name: `database/users.json`
   - Paste this content:
   ```json
   [
     {
       "email": "prasanth@v1books.com",
       "passwordHash": "will_be_generated_on_first_login",
       "role": "admin",
       "createdAt": "2025-01-01"
     }
   ]
   ```
   - Commit with message: "Initialize users database"

2. **For requests.json:**
   - Click "Add file" → "Create new file"
   - Name: `database/requests.json`
   - Content: `[]`
   - Commit

3. **For logs.json:**
   - Click "Add file" → "Create new file"
   - Name: `database/logs.json`
   - Content: `[]`
   - Commit

#### Method B: Via Git Command Line

```bash
# Clone your empty repository
git clone https://github.com/YOUR_USERNAME/v1books-backend.git
cd v1books-backend

# Create folder
mkdir database

# Create files
echo '[]' > database/users.json
echo '[]' > database/requests.json
echo '[]' > database/logs.json

# Add to git
git add .
git commit -m "Initialize database structure"
git push origin main
```

---

### Step 3: Generate GitHub Personal Access Token

This token allows the app to read/write to your repository.

1. **Go to Token Settings:**
   - GitHub → Settings (profile icon → Settings)
   - Developer settings → Personal access tokens → Tokens (classic)
   - Click "Generate new token" → "Generate new token (classic)"

2. **Token Configuration:**
   - Note: `V1Services-Backend`
   - Expiration: 90 days (or No expiration - your choice)
   - Scopes: Select only **repo** (full control of private repositories)
   - DO NOT select other scopes

3. **Generate & Save:**
   - Click "Generate token"
   - Copy the token immediately (you won't see it again!)
   - **Store it securely** (password manager, encrypted file, etc.)

⚠️ **NEVER commit this token to git or share it publicly!**

---

### Step 4: Update Repository Settings

1. **Go to Repository:**
   - Your v1books-backend repository
   - Click "Settings" tab

2. **General:**
   - Make sure "Private" is selected
   - Uncheck "Discussions" (not needed)
   - Uncheck "Sponsorships" (not needed)

3. **Branches:**
   - Default branch: `main`
   - Optional: Add branch protection rules if needed

4. **Security → Secret and variables → Repository secrets:**
   - This is optional for this setup (token is passed by user)
   - But you can add for your own reference

---

### Step 5: Verify Repository Structure

Your repository should look like:

```
v1books-backend/
├── database/
│   ├── users.json
│   ├── requests.json
│   └── logs.json
└── .gitignore (optional)
```

Click on each file to verify content loads correctly.

---

### Step 6: First Application Login

Now that backend is ready:

1. **Open V1 Services App** (where you deployed it)
2. **Go to Register page**
3. **Register as Admin:**
   - Email: `prasanth@v1books.com`
   - Password: Choose a strong password
   - Role: Admin (if available) or Client (then promote to admin in JSON)
   - GitHub Token: Paste the token you generated in Step 3

4. **On successful registration:**
   - Check your GitHub v1books-backend repository
   - `database/users.json` will now contain your hashed password
   - You can now login with this account

---

## JSON File Schemas

### users.json Structure

```json
[
  {
    "email": "user@email.com",
    "passwordHash": "sha256hash_of_password",
    "role": "client|auditor|admin",
    "createdAt": "YYYY-MM-DD"
  }
]
```

**Fields:**
- `email`: Unique user email
- `passwordHash`: SHA-256 hash (never plaintext!)
- `role`: One of `client`, `auditor`, `admin`
- `createdAt`: Account creation date (YYYY-MM-DD)

### requests.json Structure

```json
[
  {
    "trackingId": "V1-XXXXXX",
    "clientEmail": "client@email.com",
    "service": "GST|Income Tax|TDS|Registrations|Compliance|Other",
    "period": "Jan-2025",
    "description": "Details of the request",
    "status": "Submitted|Assigned|In Progress|Completed|Rejected",
    "assignedAuditor": "auditor@email.com|null",
    "createdAt": "YYYY-MM-DD",
    "lastUpdated": "YYYY-MM-DD",
    "lastNotes": "Latest status update notes"
  }
]
```

**Fields:**
- `trackingId`: Auto-generated unique ID
- `clientEmail`: Client who submitted
- `service`: Type of financial service
- `period`: Which month/quarter (e.g., "Apr-2025")
- `description`: Client's request details
- `status`: Current request status
- `assignedAuditor`: Email of assigned auditor (null if unassigned)
- `createdAt`: Request submission date
- `lastUpdated`: Last status update date
- `lastNotes`: Notes from auditor/admin

### logs.json Structure

```json
[
  {
    "timestamp": "2025-01-15T10:30:00Z",
    "action": "user_registered|user_logged_in|request_submitted|auditor_assigned|status_updated",
    "user": "user@email.com",
    "details": "Action description"
  }
]
```

---

## Security Best Practices

### 1. **Token Security**
```
✅ DO:
- Store token in secure password manager
- Rotate token every 90 days
- Use different tokens for dev/prod
- Keep .env file in .gitignore

❌ DON'T:
- Commit token to git
- Share token via email
- Use same token for multiple apps
- Put token in frontend code
```

### 2. **Repository Security**
```
✅ DO:
- Keep repository PRIVATE
- Review access logs regularly
- Limit collaborators
- Archive old requests

❌ DON'T:
- Make repository PUBLIC
- Share credentials
- Use admin account for testing
- Store other sensitive data
```

### 3. **Password Security**
```
✅ DO:
- Use SHA-256 hashing (already done by app)
- Enforce strong passwords (8+ chars)
- Use unique email per account
- Update password regularly

❌ DON'T:
- Store plaintext passwords
- Share passwords
- Reuse passwords
```

---

## Troubleshooting

### "Repository not found" error
- Verify repository name is exactly `v1books-backend`
- Check repository is set to Private
- Confirm token has `repo` scope

### "Invalid token" error
- Token may be expired (check in GitHub settings)
- Token may have been revoked
- Generate a new token
- Verify it has `repo` scope

### "Files not found" error
- Check file path is exactly `database/users.json`
- Verify you're in the correct repository
- Files must exist before app can read them

### "Permission denied" error
- Token needs `repo` scope selected
- You may not have write access
- Check repository ownership

### "Failed to create account"
- Check if email already exists in users.json
- Verify database/users.json is valid JSON
- Check internet connection

---

## Monitoring & Maintenance

### Weekly
- Check recent activity in repository
- Verify file sizes aren't too large
- Review if any requests need attention

### Monthly
- Archive completed requests (optional)
- Rotate access tokens
- Review inactive accounts
- Backup repository (clone it)

### Quarterly
- Review and update user permissions
- Check GitHub storage usage
- Audit access logs
- Plan for new features

### Backup Strategy
```bash
# Backup your repository regularly
git clone --mirror https://github.com/USERNAME/v1books-backend.git backup-date.git

# Or use GitHub's built-in backup features
```

---

## Performance Optimization

### File Size Management
- **Current limit:** GitHub allows files up to 100MB
- **Recommended:** Keep total repo under 10MB
- **Action:** Archive completed requests quarterly

### API Rate Limits
- **Limit:** 5000 requests/hour per token
- **Current usage:** ~1 request per user action
- **Safe for:** Up to 50+ concurrent users

### Caching
The app automatically caches data in localStorage to reduce API calls.

---

## Future Enhancements

### Potential Additions to Repository
- `analytics/monthly-stats.json` - Aggregated metrics
- `templates/email-templates.json` - Email content
- `settings/system-config.json` - Application settings
- `audit-log.json` - Complete audit trail

### Migration Path (If Needed)
If you later want to move to a real database:
1. Export data from GitHub repository
2. Import into database of choice (Firebase, Postgres, etc.)
3. Update api.js to use new backend
4. Minimal changes to rest of application

---

## Support

If you encounter issues:

1. **Check repository setup:**
   - Files exist in `database/` folder
   - Files are valid JSON
   - Repository is Private

2. **Verify token:**
   - Token is active (not expired)
   - Token has `repo` scope
   - Token is correctly pasted in app

3. **Test connection:**
   - Open browser console (F12)
   - Check for error messages
   - Review GitHub API documentation

4. **Contact support:**
   - Email: support@v1books.com
   - WhatsApp: 9360522383

---

## Quick Checklist

Before going live, ensure:

- [ ] GitHub repository created and set to Private
- [ ] `database/users.json` file exists
- [ ] `database/requests.json` file exists
- [ ] `database/logs.json` file exists
- [ ] Personal Access Token generated with `repo` scope
- [ ] Token stored securely (not in code)
- [ ] App deployed (Netlify or GitHub Pages)
- [ ] Admin account registered successfully
- [ ] Can login as admin
- [ ] Can submit a test request
- [ ] Request appears in GitHub repository

✅ All checked? You're ready to go!

---

**Version:** 1.0  
**Last Updated:** December 2025  
**Status:** Ready for Production
