/**
 * V1 Services - GitHub API Handler
 * Manages all GitHub database operations for users and requests
 */

class GitHubAPI {
  constructor() {
    this.owner = 'YOUR_GITHUB_USERNAME';
    this.repo = 'v1books-backend';
    this.token = localStorage.getItem('github_token') || '';
    this.baseUrl = 'https://api.github.com';
  }

  /**
   * Set GitHub token (called during login/setup)
   */
  setToken(token) {
    this.token = token;
    localStorage.setItem('github_token', token);
  }

  /**
   * Read JSON file from GitHub
   */
  async readFile(path) {
    try {
      const url = `${this.baseUrl}/repos/${this.owner}/${this.repo}/contents/${path}`;
      const response = await fetch(url, {
        headers: {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3.raw'
        }
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const content = await response.text();
      return JSON.parse(content);
    } catch (error) {
      console.error('Error reading file from GitHub:', error);
      return null;
    }
  }

  /**
   * Write JSON file to GitHub
   */
  async writeFile(path, content, message) {
    try {
      // First, get the current file to obtain SHA
      const url = `${this.baseUrl}/repos/${this.owner}/${this.repo}/contents/${path}`;
      const getResponse = await fetch(url, {
        headers: {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      let sha = null;
      if (getResponse.ok) {
        const data = await getResponse.json();
        sha = data.sha;
      }

      // Update or create file
      const contentBase64 = btoa(JSON.stringify(content, null, 2));
      const payload = {
        message: message,
        content: contentBase64,
        ...(sha && { sha })
      };

      const updateResponse = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!updateResponse.ok) {
        throw new Error(`GitHub API error: ${updateResponse.status}`);
      }

      return true;
    } catch (error) {
      console.error('Error writing file to GitHub:', error);
      return false;
    }
  }

  /**
   * Get all users from users.json
   */
  async getUsers() {
    return await this.readFile('database/users.json');
  }

  /**
   * Get all requests from requests.json
   */
  async getRequests() {
    return await this.readFile('database/requests.json');
  }

  /**
   * Add new user (registration)
   */
  async registerUser(email, passwordHash, role) {
    const users = await this.getUsers();
    if (!users) return false;

    // Check if user already exists
    if (users.some(u => u.email === email)) {
      throw new Error('Email already registered');
    }

    users.push({
      email,
      passwordHash,
      role,
      createdAt: new Date().toISOString().split('T')[0]
    });

    return await this.writeFile('database/users.json', users, `Register user: ${email}`);
  }

  /**
   * Authenticate user
   */
  async authenticateUser(email, password) {
    const users = await this.getUsers();
    if (!users) return null;

    const user = users.find(u => u.email === email);
    if (!user) return null;

    // Hash provided password and compare
    const hash = await hashPassword(password);
    if (hash === user.passwordHash) {
      return user;
    }

    return null;
  }

  /**
   * Add new request (client submission)
   */
  async addRequest(clientEmail, service, period, description) {
    const requests = await this.getRequests();
    if (!requests) return null;

    const trackingId = generateTrackingId();
    const newRequest = {
      trackingId,
      clientEmail,
      service,
      period,
      description,
      status: 'Submitted',
      assignedAuditor: null,
      createdAt: new Date().toISOString().split('T')[0]
    };

    requests.push(newRequest);
    const success = await this.writeFile('database/requests.json', requests, `New request: ${trackingId}`);

    return success ? newRequest : null;
  }

  /**
   * Update request status (auditor or admin)
   */
  async updateRequestStatus(trackingId, newStatus, notes = '') {
    const requests = await this.getRequests();
    if (!requests) return false;

    const request = requests.find(r => r.trackingId === trackingId);
    if (!request) return false;

    request.status = newStatus;
    if (notes) {
      request.lastNotes = notes;
      request.lastUpdated = new Date().toISOString().split('T')[0];
    }

    return await this.writeFile('database/requests.json', requests, `Update request: ${trackingId} to ${newStatus}`);
  }

  /**
   * Assign auditor to request (admin only)
   */
  async assignAuditor(trackingId, auditorEmail) {
    const requests = await this.getRequests();
    if (!requests) return false;

    const request = requests.find(r => r.trackingId === trackingId);
    if (!request) return false;

    request.assignedAuditor = auditorEmail;
    request.status = 'Assigned';

    return await this.writeFile('database/requests.json', requests, `Assign auditor: ${auditorEmail} to ${trackingId}`);
  }

  /**
   * Get requests for specific client
   */
  async getClientRequests(clientEmail) {
    const requests = await this.getRequests();
    if (!requests) return [];
    return requests.filter(r => r.clientEmail === clientEmail);
  }

  /**
   * Get requests assigned to specific auditor
   */
  async getAuditorRequests(auditorEmail) {
    const requests = await this.getRequests();
    if (!requests) return [];
    return requests.filter(r => r.assignedAuditor === auditorEmail);
  }
}

// Initialize global API instance
const github = new GitHubAPI();
