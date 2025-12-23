# V1Books - V1 Services Project

## Quick Start

### Prerequisites
- GitHub account with private repository access
- Modern web browser
- Text editor (VS Code recommended)

### Step 1: Create GitHub Backend Repository

1. Go to [GitHub New Repository](https://github.com/new)
2. Repository name: `v1books-backend`
3. Select "Private"
4. Create repository
5. Add three JSON files to `database/` folder:
   - `users.json` (start with empty array `[]`)
   - `requests.json` (empty array)
   - `logs.json` (empty array)

### Step 2: Generate GitHub Token

1. Go to [GitHub Settings → Tokens](https://github.com/settings/tokens)
2. Generate new token (classic)
3. Select "repo" scope
4. Copy token

### Step 3: Deploy Frontend

**Using Netlify (Easy):**
1. Push V1books folder to your GitHub
2. Go to [Netlify](https://netlify.com)
3. Connect repository
4. Set environment variables:
   - `GITHUB_USERNAME`: your GitHub username
   - `GITHUB_TOKEN`: your token from Step 2
5. Deploy

**Using GitHub Pages:**
1. Push V1books folder to GitHub
2. Go to Settings → Pages
3. Select `main` branch
4. Access at `https://username.github.io/V1books`

### Step 4: First Login

1. Open `register.html`
2. Register as `prasanth@v1books.com` (admin)
3. When prompted, paste your GitHub token
4. Login and start using the system

---

## File Structure Explanation

### HTML Files
- `index.html` - Beautiful landing page with features, pricing, support
- `register.html` - User registration with role selection
- `login.html` - Login with admin/user tabs
- `pages/client-*.html` - Client dashboard, submit request, track, help
- `pages/auditor-*.html` - Auditor dashboard and request management
- `pages/admin-*.html` - Admin dashboard and full request control

### JavaScript Files
- `js/api.js` - GitHub API wrapper for all database operations
- `js/utils.js` - Helper functions (hashing, validation, session)

### CSS Files
- `css/style.css` - Complete styling (14KB, highly optimized)

### Documentation
- `README.md` - Full project documentation
- `.env.example` - Environment variables template

---

## Key Features Explained

### 1. **GitHub as Database**
All data stored in GitHub JSON files via REST API. No backend server needed.

### 2. **SHA-256 Hashing**
Passwords hashed using browser's crypto API. Secure and irreversible.

### 3. **Unique Tracking IDs**
Auto-generated format: `V1-XXXXXX` (e.g., V1-102938)

### 4. **Role-Based Access**
- **Client**: Submit requests, track progress, view auditor
- **Auditor**: View assigned requests, update status, add notes
- **Admin**: Full system control, assign auditors, view all

### 5. **Real-time Updates**
All changes immediately synced to GitHub. No delays.

### 6. **Multiple Services**
- GST Returns
- Income Tax
- TDS Compliance
- Business Registrations
- Compliance Audit
- Other Services

---

## Usage Guide

### Client Workflow
```
1. Register → Select "Client" role
2. Login
3. Dashboard → View statistics
4. New Request → Submit finance document
5. Get unique Tracking ID
6. Track Requests → Monitor status
7. View Auditor details
8. Logout
```

### Auditor Workflow
```
1. Register → Select "Auditor" role
2. Login
3. Dashboard → View assigned requests count
4. My Requests → View assigned work
5. Update Status → Assigned → In Progress → Completed
6. Add Notes → Communicate with admin/client
7. Logout
```

### Admin Workflow
```
1. Login as prasanth@v1books.com
2. Dashboard → See system overview
3. All Requests → View all submissions
4. Filter by Status/Service/Auditor
5. Assign Auditor → Select from dropdown
6. Track Progress → Monitor completion
7. Manage Users → (future feature)
```

---

## Customization Guide

### Change Admin Email
Edit in `register.html` and `login.html`:
```javascript
if (email === 'your_email@company.com') {
  // Admin login
}
```

### Add New Service Type
Edit in `client-request.html`:
```html
<option value="New Service">New Service</option>
```

### Change Colors
Edit `css/style.css`:
```css
:root {
  --accent-color: #your_color;
}
```

### Change Support Contact
Edit in `index.html`, `client-help.html`:
```html
WhatsApp: your_number
Email: your_email@company.com
```

---

## Troubleshooting

### "GitHub token is required"
- Make sure you generate a token with "repo" scope
- Token should not be expired

### "Email already registered"
- Use a different email
- Or edit `database/users.json` to delete the user

### "Failed to load requests"
- Check GitHub token is valid
- Verify repository name is `v1books-backend`
- Check internet connection

### "Passwords don't match"
- Ensure both password fields have exact same value

---

## Performance & Optimization

✅ **Lightweight**: 14KB CSS, no frameworks
✅ **Fast**: Cached GitHub data in localStorage
✅ **Responsive**: Works on all devices
✅ **Secure**: HTTPS only, hashed passwords
✅ **Scalable**: GitHub API rate limit is 5000/hour

---

## Roadmap (Future Releases)

- [ ] Google Drive file storage
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Payment integration
- [ ] Digital signatures
- [ ] Advanced reporting dashboard
- [ ] Bulk operations
- [ ] Archive system
- [ ] Multi-language support
- [ ] Dark/Light theme toggle

---

## Support & Contact

- **WhatsApp Support**: 9360522383
- **Email**: support@v1books.com
- **Account Manager**: prasanth@v1books.com
- **GitHub Issues**: Report bugs in your fork

---

## License & Copyright

© 2025 V1Books. All rights reserved.
Proprietary software - Unauthorized copying or distribution is prohibited.

---

## Version History

### v1.0.0 - December 2025
✅ Initial release
✅ All 3 modules (Client, Auditor, Admin)
✅ GitHub backend integration
✅ Complete authentication
✅ Request tracking system
✅ Responsive UI
✅ Production ready

---

**Happy using V1 Services! 🚀**
