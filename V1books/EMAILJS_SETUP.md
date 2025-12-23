# EmailJS Setup Guide for V1Books Registration

## Overview
This guide will help you configure EmailJS to send OTP emails from your official Gmail account: **Support@V1books.com**

## Step-by-Step Setup

### 1. Create EmailJS Account
- Visit [https://www.emailjs.com](https://www.emailjs.com)
- Sign up for a free account
- Verify your email

### 2. Add Gmail Service
1. Go to **Email Services** in your EmailJS dashboard
2. Click **Add New Service**
3. Select **Gmail** as the service provider
4. Name it: `service_v1books`
5. Connect your Gmail account: **Support@V1books.com**
6. Follow Gmail's authorization process
7. Save the service

### 3. Create Email Template
1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Template name: `template_v1books_otp`
4. Configure the template:

**Subject:**
```
V1Books - Your OTP Verification Code
```

**Content:**
```html
<h2>V1Books Registration - OTP Verification</h2>

<p>Hello,</p>

<p>Your V1Books verification code is:</p>

<h3 style="color: #e10600; text-align: center; font-size: 32px; letter-spacing: 5px;">
  {{otp_code}}
</h3>

<p><strong>This code will expire in 10 minutes.</strong></p>

<p>Please do not share this code with anyone.</p>

<p>If you didn't request this, please ignore this email.</p>

<hr>

<p style="color: #999; font-size: 12px;">
  For support, contact: {{support_email}}<br>
  V1Books - Your Trusted Audit Service
</p>
```

4. Template variables used:
   - `{{otp_code}}` - 6-digit OTP
   - `{{to_email}}` - Recipient email
   - `{{from_email}}` - Sender email (Support@V1books.com)
   - `{{support_email}}` - Support contact email

### 4. Get Your Public Key
1. Go to **Account** section in EmailJS dashboard
2. Find your **Public Key**
3. Copy it

### 5. Update register.html
Replace the placeholder in `register.html` (line ~10):

```javascript
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY_HERE'; // Paste your key here
```

With your actual public key:

```javascript
// Example: Public key provided for this project
const EMAILJS_PUBLIC_KEY = '7fXzwDYmS1myGon8w'; // Your EmailJS public key (inserted)
```

### 6. Enable Less Secure Apps (Optional)
If using regular Gmail instead of App Password:
1. Go to [myaccount.google.com/security](https://myaccount.google.com/security)
2. Enable "Less secure app access" for Support@V1books.com
3. (Recommended: Use Gmail App Password instead)

### 7. Generate Gmail App Password (Recommended)
1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Select "Mail" and "Windows Computer"
3. Generate an app-specific password
4. Use this password in EmailJS Gmail service setup

## Configuration Summary

Your registration system will:
- ✅ Send OTPs from: **Support@V1books.com**
- ✅ Generate OTP codes (6 digits)
- ✅ Auto-generate Unique IDs:
  - Auditors: `AD-V1-001`, `AD-V1-002`, etc.
  - Clients: `CL-V1-001`, `CL-V1-002`, etc.
- ✅ Save data to GitHub (with authentication)
- ✅ Hash passwords securely

## Testing

1. Open the registration page
2. Fill in all fields
3. Click "Submit"
4. Check your email for OTP
5. Enter OTP to complete registration
6. Receive unique ID

## Troubleshooting

**Issue:** "Failed to send email"
- Solution: Check if EmailJS Public Key is correctly set
- Solution: Verify Gmail service is properly configured
- Solution: Check browser console for detailed error

**Issue:** OTP not received
- Solution: Check spam/promotions folder
- Solution: Verify recipient email address
- Solution: Check EmailJS dashboard for sending logs

**Issue:** "Service not found"
- Solution: Ensure `service_v1books` is created in EmailJS
- Solution: Verify service is active

## Security Notes

1. Keep your EmailJS Public Key in the code (it's public-facing)
2. Keep your Private Key secret - never share it
3. Use Gmail App Passwords for better security
4. Monitor EmailJS dashboard for unusual activity
5. Implement rate limiting for OTP requests

## Support

For EmailJS support: [docs.emailjs.com](https://docs.emailjs.com)
For Gmail support: [support.google.com](https://support.google.com)
For V1Books support: **Support@V1books.com**
