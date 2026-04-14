# 🚀 AI-Driven Sales & Outreach System - Complete Setup Guide

## 📋 Table of Contents
1. [Quick Start](#quick-start)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Running the System](#running-the-system)
6. [Features Overview](#features-overview)
7. [API Documentation](#api-documentation)
8. [Integration Guides](#integration-guides)
9. [Troubleshooting](#troubleshooting)

---

## Quick Start

### For the Impatient:
```bash
# 1. Clone/Download the project
cd sales-system

# 2. Install dependencies
npm install

# 3. Start the server
npm start

# 4. Open browser
# http://localhost:3000
```

**That's it!** You now have a fully functional sales system running.

---

## Prerequisites

### System Requirements
- **Node.js**: v16.0.0 or higher
- **npm**: v8.0.0 or higher
- **OS**: Windows, macOS, or Linux
- **RAM**: Minimum 2GB
- **Storage**: 500MB for installation + database

### Check Your Setup
```bash
node --version   # Should be v16+
npm --version    # Should be v8+
```

---

## Installation

### Step 1: Clone/Download the Project
```bash
# Option A: If you have git
git clone <your-repo-url> sales-system
cd sales-system

# Option B: Manual download
# Download as ZIP, extract, and navigate to folder
cd sales-system
```

### Step 2: Install Node.js Dependencies
```bash
npm install
```

This will install:
- **Express.js** - Web server framework
- **SQLite3** - Lightweight database
- **CORS** - Cross-origin requests
- **Body-Parser** - JSON parsing

**Expected output:**
```
added X packages in Y seconds
```

### Step 3: Create Data Directory
```bash
mkdir -p data
```

The system automatically creates `data/sales.db` on first run.

---

## Configuration

### Environment Variables (Optional)
Create a `.env` file in the root directory:

```env
# .env
PORT=3000
NODE_ENV=development
DATABASE_PATH=./data/sales.db
```

### Default Configuration
- **Port**: 3000
- **Database**: SQLite (./data/sales.db)
- **CORS**: Enabled for all origins

---

## Running the System

### Option 1: Simple Start
```bash
npm start
```

**Output:**
```
🚀 Sales System Server running on http://localhost:3000
📊 Dashboard: http://localhost:3000
🔌 API: http://localhost:3000/api
```

### Option 2: Development Mode (with auto-reload)
```bash
npm run dev
```

Requires `nodemon` to be installed:
```bash
npm install --save-dev nodemon
```

### Verify It's Working
Open your browser and visit:
```
http://localhost:3000
```

You should see the **Sales Dashboard** with dark theme UI.

---

## Features Overview

### 1. 📊 Dashboard (Overview)
- Real-time KPI metrics
- Active pipeline value
- Closed deals tracking
- Contact & company counts
- Today's activity summary

### 2. 🎯 Deal Management (Pipeline)
- Create and track deals
- Multi-stage pipeline (lead → closed)
- Deal sizing and probability tracking
- Expected close date forecasting
- Pipeline analytics

### 3. 🏢 Company Management
- Prospect database
- Industry & vertical classification
- Strategic fit scoring
- Website & contact info
- Company size categorization

### 4. 👥 Contact Management
- Decision maker database
- Title & department tracking
- Email & phone information
- LinkedIn profile links
- Contact status tracking

### 5. 📧 Campaign Management
- Email campaign creation
- Multi-vertical targeting
- Open/click/reply tracking
- Campaign performance metrics
- Email sequence management

### 6. 📈 Analytics & Reporting
- Pipeline analysis by stage
- Campaign performance by vertical
- KPI tracking (daily/weekly)
- Revenue forecasting
- Activity logging

### 7. 🔄 Integrations Ready
- Apollo (lead import)
- CSV export functionality
- HubSpot API compatibility
- Webhook support for external tools

---

## API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication
Currently no authentication required. For production, implement JWT tokens.

### Core Endpoints

#### Companies
```bash
# Get all companies
GET /api/companies

# Get single company
GET /api/companies/:id

# Create company
POST /api/companies
Body: {
  "name": "Acme Inc",
  "industry": "Technology",
  "vertical": "Wellness",
  "website": "https://acme.com",
  "size": "51-200"
}

# Update company
PUT /api/companies/:id
```

#### Contacts
```bash
# Get all contacts
GET /api/contacts

# Create contact
POST /api/contacts
Body: {
  "company_id": 1,
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@acme.com",
  "title": "CMO",
  "phone": "+1-555-0123"
}
```

#### Deals
```bash
# Get all deals (with filters)
GET /api/deals?pipeline=Direct%20Enterprise%20Sales&stage=proposal

# Create deal
POST /api/deals
Body: {
  "company_id": 1,
  "contact_id": 1,
  "title": "Q2 Enterprise Deal",
  "pipeline": "Direct Enterprise Sales",
  "stage": "demo",
  "deal_size": 50000,
  "probability": 60,
  "expected_close_date": "2024-06-30"
}

# Update deal
PUT /api/deals/:id
```

#### Campaigns
```bash
# Get all campaigns
GET /api/campaigns

# Create campaign
POST /api/campaigns
Body: {
  "name": "Wellness Vertical - Q2",
  "type": "email",
  "vertical": "Wellness",
  "email_sequence": "Email 1: Intro...\nEmail 2: Value prop..."
}
```

#### KPI & Analytics
```bash
# Get dashboard metrics
GET /api/kpi/dashboard

# Update daily KPI
POST /api/kpi/update
Body: {
  "emails_sent": 45,
  "emails_opened": 15,
  "emails_clicked": 8,
  "emails_replied": 3,
  "new_leads": 12,
  "calls_booked": 2,
  "deals_closed": 1,
  "revenue_closed": 50000
}

# Pipeline analysis
GET /api/analytics/pipeline

# Campaign performance
GET /api/analytics/campaigns

# Vertical analysis
GET /api/analytics/verticals
```

#### Import & Export
```bash
# Import leads from Apollo
POST /api/import/leads
Body: {
  "leads": [
    {
      "first_name": "Jane",
      "last_name": "Smith",
      "email": "jane@company.com",
      "company_name": "Tech Corp",
      "title": "VP Sales",
      "industry": "Technology",
      "vertical": "Healthcare"
    }
  ]
}

# Export contacts as CSV
GET /api/export/contacts-csv
```

---

## Integration Guides

### 1. Integrate with Apollo (Lead Generation)

**Step 1:** Export leads from Apollo as CSV

**Step 2:** Transform to JSON
```javascript
const csvToJson = (csvData) => {
  // Parse your Apollo CSV export
  return leads.map(lead => ({
    first_name: lead.first_name,
    last_name: lead.last_name,
    email: lead.email,
    company_name: lead.company,
    title: lead.title,
    industry: lead.industry,
    vertical: classifyVertical(lead.industry)
  }));
};
```

**Step 3:** Import via API
```bash
curl -X POST http://localhost:3000/api/import/leads \
  -H "Content-Type: application/json" \
  -d '{
    "leads": [... your leads ...]
  }'
```

### 2. Integrate with Instantly (Email Campaigns)

**Manual Integration:**
1. Create campaign in system
2. Copy email sequence from Notion/docs
3. Paste into Instantly
4. Track metrics manually (or via webhook)

**Automated Integration:**
```javascript
// Add to your integration script
const sendInstantlyWebhook = async (campaignData) => {
  // POST to your Instantly webhook URL
  // Update campaign metrics in database
};
```

### 3. HubSpot Sync

**Manual Sync (Recommended for start):**
1. Export deals/contacts from system via CSV
2. Import into HubSpot
3. Update system via API when HubSpot changes

**API Sync (Advanced):**
```bash
# Example: Sync HubSpot deals to system
POST /api/deals
Body: {
  "hubspot_id": "12345",
  "company_id": 1,
  "title": "[HubSpot] Enterprise Deal",
  ...
}
```

### 4. Google Sheets Integration

**Export Dashboard Data:**
```bash
curl http://localhost:3000/api/kpi/dashboard > kpi.json
# Copy to Google Sheets via IMPORTDATA
```

---

## Prompts & AI Workflows

### Email Personalization Prompt
```
Task: Personalize outreach email for lead

Context:
- Company: {company_name}
- Contact: {contact_name}, {title}
- Industry: {industry}
- Vertical: {vertical}
- Recent News: {recent_news}

Instruction: Write a personalized 3-sentence outreach email that:
1. References their company/role specifically
2. States ONE clear value prop
3. Asks for a 15-minute call

Tone: Professional, concise, non-salesy
```

### Reply Handling Prompt
```
Task: Analyze email reply and suggest next action

Reply: {email_reply}
Context: {conversation_history}

Classify reply as:
- Interested: Schedule demo
- Not interested: Move to nurture
- Needs more info: Answer specific questions
- Wrong person: Find right contact

Next action: {suggested_action}
```

### Meeting Summary Prompt
```
Task: Summarize sales meeting notes

Meeting Notes: {notes}
Attendees: {attendees}
Company: {company}

Output:
- 3-5 key takeaways
- Objections mentioned
- Next steps agreed
- Follow-up deadline
- Strategic fit (1-10)
```

---

## Troubleshooting

### Issue: Port 3000 Already in Use
**Solution:**
```bash
# Option 1: Use different port
PORT=3001 npm start

# Option 2: Kill process using port 3000 (macOS/Linux)
lsof -ti:3000 | xargs kill -9
```

### Issue: Database Error
**Solution:**
```bash
# Delete corrupted database
rm -f data/sales.db

# Restart server (recreates database)
npm start
```

### Issue: CORS Errors
**Solution:**
Check that API calls include correct headers:
```javascript
fetch('http://localhost:3000/api/...', {
  headers: {
    'Content-Type': 'application/json'
  }
})
```

### Issue: Cannot Connect to API
**Solution:**
1. Verify server is running: `npm start`
2. Check port: `lsof -i :3000` or `netstat -ano | findstr :3000`
3. Check firewall allows port 3000
4. Verify API URL is correct: `http://localhost:3000/api`

### Issue: Slow Performance
**Solution:**
```bash
# Index frequently queried columns
# Edit src/server.js and add:
db.run('CREATE INDEX IF NOT EXISTS idx_company_id ON deals(company_id)');
db.run('CREATE INDEX IF NOT EXISTS idx_stage ON deals(stage)');
db.run('CREATE INDEX IF NOT EXISTS idx_email ON contacts(email)');
```

---

## Production Deployment

### For Small Teams (VPS/Server):
```bash
# 1. Install Node.js on server
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. Upload project
scp -r sales-system user@server:/home/user/

# 3. Install PM2 for process management
npm install -g pm2

# 4. Start with PM2
pm2 start src/server.js --name "sales-system"
pm2 startup
pm2 save

# 5. Setup Nginx reverse proxy
sudo apt-get install nginx
# Configure proxy to localhost:3000
```

### For Cloud (Heroku, Railway, Render):
```bash
# 1. Create account on Heroku/Railway
# 2. Connect your GitHub repo
# 3. Set environment variables
# 4. Deploy automatically
```

### Security Checklist:
- [ ] Add authentication/JWT
- [ ] Enable HTTPS
- [ ] Add rate limiting
- [ ] Validate all inputs
- [ ] Use environment variables for secrets
- [ ] Regular database backups
- [ ] Add audit logging

---

## Next Steps

1. **Start Using**: Create some companies and deals
2. **Integrate Apollo**: Import your first lead list
3. **Setup Campaigns**: Create email sequences
4. **Track KPIs**: Log daily metrics
5. **Analyze**: Review pipeline and performance
6. **Scale**: Add more team members and workflows

---

## Support & Resources

### Documentation Files
- `ARCHITECTURE.md` - System design & database schema
- `API.md` - Detailed API reference
- `PROMPTS.md` - AI prompt library
- `INTEGRATIONS.md` - Third-party tool setup

### Common Tasks
- Add new fields: Edit schema in `src/server.js`
- Change UI: Modify `public/index.html`
- Add API endpoint: Add route in `src/server.js`
- Backup database: Copy `data/sales.db`

### Useful Commands
```bash
# View database
sqlite3 data/sales.db

# Check table schema
.tables
.schema companies

# Count records
SELECT COUNT(*) FROM deals;

# Export to CSV
.mode csv
.headers on
.output contacts.csv
SELECT * FROM contacts;
```

---

## License & Credits

This system is built for scalable sales operations. Feel free to extend and customize for your specific needs.

**Built with:**
- Express.js - Fast web framework
- SQLite3 - Reliable local database
- React - Modern frontend
- Tailwind CSS - Responsive design

Good luck building your outreach system! 🚀
