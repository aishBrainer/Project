# 💼 AI-Driven Sales & Outreach System

**Complete, production-ready CRM + lead generation + campaign management system** built with Node.js, Express, React, and SQLite.

Transform your sales operations with an integrated platform for prospecting, outreach, pipeline management, and KPI tracking.

---

## 🎯 Features

### 📊 Dashboard & Analytics
- Real-time KPI metrics (emails, opens, clicks, replies)
- Pipeline value and deal tracking
- Performance analytics by vertical and campaign
- Weekly KPI summaries

### 🏢 Company & Lead Management
- Prospect database with vertical classification
- Contact management with decision maker tracking
- Strategic fit scoring
- Lead source tracking (Apollo, referral, inbound)

### 🎯 Pipeline & Deal Management
- Multi-stage sales pipeline (Lead → Closed)
- Deal sizing and probability tracking
- Expected close date forecasting
- Pipeline analytics and forecasting

### 📧 Campaign Management
- Email sequence builder
- Multi-vertical targeting
- Campaign performance tracking (opens, clicks, replies)
- Email warmup settings
- Campaign status tracking

### 👥 Outreach Tracking
- Activity logging (emails, calls, meetings)
- Open/click/reply tracking
- Meeting scheduling and notes
- Engagement timeline per deal

### 📈 Integrations Ready
- Apollo lead import
- CSV export for contacts
- HubSpot sync capability
- Google Sheets integration
- Webhook support for external tools

### 🔒 Data Management
- SQLite database (local, no setup needed)
- Automatic backup capability
- Data export functionality
- Clean API for external systems

---

## 🚀 Quick Start (30 seconds)

### Windows
```bash
# 1. Double-click start.bat
# 2. Open http://localhost:3000 in browser
# Done!
```

### macOS/Linux
```bash
# 1. Open terminal in project directory
# 2. Run: bash start.sh
# 3. Open http://localhost:3000 in browser
```

### Manual Start
```bash
npm install
npm start
# Visit http://localhost:3000
```

---

## 📋 Requirements

- **Node.js**: v16.0.0 or higher
- **npm**: v8.0.0 or higher
- **RAM**: Minimum 2GB
- **Storage**: 500MB for installation

### Check Your Setup
```bash
node --version    # Should be v16+
npm --version     # Should be v8+
```

---

## 📁 Project Structure

```
sales-system/
├── src/
│   └── server.js                 # Backend API server
├── public/
│   └── index.html                # React frontend dashboard
├── docs/
│   ├── SETUP_GUIDE.md            # Installation & configuration
│   ├── ARCHITECTURE.md           # Database schema & design
│   ├── API.md                    # API reference with examples
│   ├── PROMPTS.md                # AI prompt library
│   └── INTEGRATIONS.md           # Third-party integrations
├── data/
│   └── sales.db                  # SQLite database (auto-created)
├── start.sh                      # Startup script (macOS/Linux)
├── start.bat                     # Startup script (Windows)
├── package.json                  # Dependencies
└── README.md                     # This file
```

---

## 🎨 What You Get

### Dashboard Interface
- **Dark theme UI** with modern design
- Real-time metrics and KPIs
- Quick navigation tabs
- Modal forms for data entry

### Database
- **7 core tables**: Companies, Contacts, Deals, Campaigns, Activities, Meetings, KPI Metrics
- Automatic schema creation
- Optimized indexes for performance
- Support for 1000s of records

### Backend API
- **20+ REST endpoints** for all operations
- JSON responses
- Error handling
- Ready for external integrations

### Documentation
- Complete setup guide
- Database architecture diagrams
- Full API reference with curl examples
- AI prompt library for automation
- Integration guides for Apollo, HubSpot, Google Sheets

---

## 🔧 Configuration

### Environment Variables (Optional)
Create `.env` file:
```env
PORT=3000
NODE_ENV=development
DATABASE_PATH=./data/sales.db
```

### Default Settings
- **Port**: 3000
- **Database**: SQLite at `./data/sales.db`
- **CORS**: Enabled for all origins
- **Authentication**: None (add JWT for production)

---

## 💡 Common Tasks

### Import Leads from Apollo
```bash
curl -X POST http://localhost:3000/api/import/leads \
  -H "Content-Type: application/json" \
  -d '{
    "leads": [
      {
        "first_name": "John",
        "last_name": "Doe",
        "email": "john@company.com",
        "company_name": "Company Inc",
        "title": "VP Sales",
        "vertical": "Healthcare"
      }
    ]
  }'
```

### Create a Deal
```bash
curl -X POST http://localhost:3000/api/deals \
  -H "Content-Type: application/json" \
  -d '{
    "company_id": 1,
    "contact_id": 1,
    "title": "Q2 Enterprise Deal",
    "deal_size": 50000,
    "stage": "lead",
    "probability": 20
  }'
```

### Update Daily KPIs
```bash
curl -X POST http://localhost:3000/api/kpi/update \
  -H "Content-Type: application/json" \
  -d '{
    "emails_sent": 50,
    "emails_opened": 15,
    "emails_clicked": 8,
    "emails_replied": 3,
    "new_leads": 12,
    "calls_booked": 2,
    "deals_closed": 1,
    "revenue_closed": 50000
  }'
```

### Export Contacts to CSV
```bash
curl http://localhost:3000/api/export/contacts-csv > contacts.csv
```

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| **SETUP_GUIDE.md** | Step-by-step installation, configuration, running the system |
| **ARCHITECTURE.md** | Database schema, data relationships, query examples |
| **API.md** | Complete API reference, curl examples, integration code |
| **PROMPTS.md** | AI prompt library for email, meetings, campaigns |
| **INTEGRATIONS.md** | Setup guides for Apollo, Instantly, HubSpot, Google Sheets |

**Quick Links:**
- Need to install? → Read `SETUP_GUIDE.md`
- Want to understand the database? → Read `ARCHITECTURE.md`
- Need API docs? → Read `API.md`
- Want to automate workflows? → Read `PROMPTS.md`

---

## 🔌 API Endpoints (Quick Reference)

### Companies
```
GET  /api/companies              # List all
GET  /api/companies/:id          # Get one
POST /api/companies              # Create
PUT  /api/companies/:id          # Update
```

### Contacts
```
GET  /api/contacts               # List all
POST /api/contacts               # Create
```

### Deals
```
GET  /api/deals                  # List (filter by pipeline, stage)
POST /api/deals                  # Create
PUT  /api/deals/:id              # Update
```

### Campaigns
```
GET  /api/campaigns              # List all
POST /api/campaigns              # Create
```

### Analytics
```
GET  /api/kpi/dashboard          # KPI metrics
POST /api/kpi/update             # Update daily KPI
GET  /api/analytics/pipeline     # Pipeline by stage
GET  /api/analytics/campaigns    # Campaign performance
GET  /api/analytics/verticals    # Performance by vertical
```

### Import/Export
```
POST /api/import/leads           # Import leads from Apollo
GET  /api/export/contacts-csv    # Export contacts as CSV
```

---

## 🛠️ Troubleshooting

### Port 3000 Already in Use
```bash
# Use different port
PORT=3001 npm start

# Or kill process (macOS/Linux)
lsof -ti:3000 | xargs kill -9
```

### Database Error
```bash
# Delete corrupted database
rm data/sales.db

# Restart server (recreates database)
npm start
```

### Cannot Connect to API
1. Verify server is running: `npm start`
2. Check port is open: `http://localhost:3000`
3. Check firewall allows port 3000
4. Try API endpoint: `curl http://localhost:3000/api/health`

### Slow Performance
- Index frequently queried columns
- Limit results with LIMIT clause
- Archive old data periodically
- Run VACUUM to optimize database

---

## 🚀 Production Deployment

### Option 1: VPS/Server
```bash
# Install Node.js on server
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and run
git clone <repo> sales-system
cd sales-system
npm install
npm start
```

### Option 2: Cloud (Heroku, Railway, Render)
1. Create account on platform
2. Connect GitHub repo
3. Set environment variables
4. Deploy automatically

### Security Checklist
- [ ] Add JWT authentication
- [ ] Enable HTTPS
- [ ] Add rate limiting
- [ ] Validate all inputs
- [ ] Use environment variables for secrets
- [ ] Regular database backups
- [ ] Add audit logging

---

## 📊 Sample Data

The system comes with an empty database. To get started:

1. **Add a Company**
   - Name: "Acme Health Tech"
   - Industry: "Healthcare"
   - Vertical: "Healthcare"
   - Strategic Fit Score: 8.5

2. **Add a Contact**
   - Name: "John Doe"
   - Email: "john@acme.com"
   - Title: "VP Sales"
   - Company: "Acme Health Tech"

3. **Create a Deal**
   - Title: "Q2 Enterprise Deal"
   - Deal Size: $50,000
   - Stage: "lead"
   - Probability: 20%

4. **Track Activity**
   - Log email sent
   - Track opens/clicks
   - Schedule meeting
   - Update deal stage

---

## 🤖 AI Integration

The system includes a prompt library for automating sales workflows:

- **Email personalization** - Generate targeted outreach
- **Objection handling** - Respond to common objections
- **Meeting summaries** - Extract action items from notes
- **Lead research** - Deep dive on prospect companies
- **Campaign analysis** - Optimize performance
- **LinkedIn posts** - Thought leadership content

See `PROMPTS.md` for complete library and usage.

---

## 📞 Support

### Getting Help
1. Check the relevant documentation (see above)
2. Review `SETUP_GUIDE.md` for common issues
3. Check API examples in `API.md`
4. Look at prompt examples in `PROMPTS.md`

### Common Searches
- "How do I install?" → `SETUP_GUIDE.md`
- "What's the API?" → `API.md`
- "What tables exist?" → `ARCHITECTURE.md`
- "How do I automate emails?" → `PROMPTS.md`

---

## 📈 Roadmap

### Future Enhancements (Optional)
- [ ] Authentication & multi-user support
- [ ] Email account integration (Gmail, Outlook)
- [ ] LinkedIn API integration
- [ ] Real-time email tracking pixels
- [ ] Advanced AI for lead scoring
- [ ] Mobile app
- [ ] Advanced reporting & dashboards
- [ ] Team collaboration features

---

## 📄 License

Open source. Use, modify, extend as needed.

---

## 🎉 Getting Started Now

```bash
# 1. Install dependencies
npm install

# 2. Start server
npm start

# 3. Open browser
http://localhost:3000

# 4. Start using!
# - Create companies
# - Add contacts
# - Build deals
# - Launch campaigns
# - Track KPIs
```

---

## 🙋 Questions?

- **Installation?** → See `SETUP_GUIDE.md`
- **API docs?** → See `API.md`
- **Database?** → See `ARCHITECTURE.md`
- **Automation?** → See `PROMPTS.md`
- **Integrations?** → See `INTEGRATIONS.md`

---

**Built for modern sales teams. Fully functional. Ready to use. Easy to extend.**

Good luck building your outreach system! 🚀
