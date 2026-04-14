# 🗄️ System Architecture & Database Schema

Complete technical documentation for the Sales & Outreach System.

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Web Browser / Frontend                    │
│              (React Dashboard - public/index.html)           │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/JSON
                         │
┌────────────────────────▼────────────────────────────────────┐
│              Express.js Server (src/server.js)              │
│   ┌──────────────────────────────────────────────────────┐  │
│   │            REST API Endpoints                         │  │
│   │ /api/companies    /api/deals      /api/campaigns     │  │
│   │ /api/contacts     /api/activities /api/kpi           │  │
│   │ /api/meetings     /api/analytics  /api/import        │  │
│   └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │ SQL Queries
                         │
┌────────────────────────▼────────────────────────────────────┐
│           SQLite3 Database (data/sales.db)                  │
│   ┌──────────────────────────────────────────────────────┐  │
│   │ Tables:                                              │  │
│   │ • companies        • contacts      • deals           │  │
│   │ • campaigns        • activities    • meetings        │  │
│   │ • kpi_metrics                                        │  │
│   └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘

External Integrations (Optional):
├─ Apollo (Lead Import) → POST /api/import/leads
├─ Instantly (Email Webhook) → Activities logging
├─ HubSpot (Sync) → Export deals/contacts
├─ Google Sheets (Export) → KPI dashboard
└─ Calendly (Webhook) → Meeting sync
```

---

## Database Schema

### 1. COMPANIES Table

**Purpose:** Store prospect/customer companies

```sql
CREATE TABLE companies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  industry TEXT,
  vertical TEXT,
  website TEXT,
  size TEXT,
  location TEXT,
  description TEXT,
  source TEXT,
  strategic_fit_score REAL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**Fields:**
| Field | Type | Purpose |
|-------|------|---------|
| id | INT | Unique identifier |
| name | TEXT | Company name (unique) |
| industry | TEXT | Industry classification (e.g., "Technology") |
| vertical | TEXT | Target vertical (Wellness, Healthcare, Hospitality, etc.) |
| website | TEXT | Company website URL |
| size | TEXT | Company size (1-50, 51-200, 201-1000, 1000+) |
| location | TEXT | Geographic location/HQ |
| description | TEXT | Notes about company |
| source | TEXT | How we found them (Apollo, Referral, Inbound, etc.) |
| strategic_fit_score | REAL | 0-100 score for fit with solution |
| created_at | DATETIME | Record creation timestamp |
| updated_at | DATETIME | Last modification timestamp |

**Indexes:**
```sql
CREATE INDEX idx_companies_vertical ON companies(vertical);
CREATE INDEX idx_companies_source ON companies(source);
CREATE INDEX idx_companies_name ON companies(name);
```

**Example Row:**
```json
{
  "id": 1,
  "name": "Acme Health Tech",
  "industry": "Healthcare Technology",
  "vertical": "Healthcare",
  "website": "https://acmehealth.com",
  "size": "51-200",
  "location": "San Francisco, CA",
  "strategic_fit_score": 8.5,
  "source": "apollo"
}
```

---

### 2. CONTACTS Table

**Purpose:** Store decision makers and contacts at companies

```sql
CREATE TABLE contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  company_id INTEGER NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone TEXT,
  title TEXT,
  department TEXT,
  linkedin_url TEXT,
  status TEXT DEFAULT 'prospect',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(company_id) REFERENCES companies(id)
);
```

**Fields:**
| Field | Type | Purpose |
|-------|------|---------|
| id | INT | Unique identifier |
| company_id | INT FK | Reference to companies table |
| first_name | TEXT | Contact first name |
| last_name | TEXT | Contact last name |
| email | TEXT | Email address (unique) |
| phone | TEXT | Phone number |
| title | TEXT | Job title (e.g., "VP Sales") |
| department | TEXT | Department (Sales, Marketing, etc.) |
| linkedin_url | TEXT | LinkedIn profile URL |
| status | TEXT | Status (prospect, lead, customer, excluded) |
| created_at | DATETIME | Record creation timestamp |
| updated_at | DATETIME | Last modification timestamp |

**Contact Status Values:**
- `prospect` - Initial outreach not made
- `lead` - Contacted, initial interest
- `qualified` - Has a need and budget
- `customer` - Active customer
- `excluded` - Not interested or invalid

**Indexes:**
```sql
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_company_id ON contacts(company_id);
CREATE INDEX idx_contacts_status ON contacts(status);
```

---

### 3. DEALS Table

**Purpose:** Track sales opportunities and pipeline stage

```sql
CREATE TABLE deals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  company_id INTEGER NOT NULL,
  contact_id INTEGER,
  title TEXT NOT NULL,
  pipeline TEXT DEFAULT 'Direct Enterprise Sales',
  stage TEXT DEFAULT 'lead',
  deal_size REAL,
  deal_source TEXT,
  probability INTEGER DEFAULT 0,
  next_action_date DATE,
  expected_close_date DATE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(company_id) REFERENCES companies(id),
  FOREIGN KEY(contact_id) REFERENCES contacts(id)
);
```

**Pipeline Types:**
- `Direct Enterprise Sales` - Direct customer sales
- `Partner / Channel Pipeline` - Partner/reseller deals

**Deal Stages (Funnel):**
| Stage | Description | Win Probability |
|-------|-------------|-----------------|
| lead | Initial prospect | 10% |
| contact | First contact made | 20% |
| discovery | Discovery call completed | 30% |
| demo | Product demo scheduled | 50% |
| proposal | Proposal sent | 70% |
| negotiation | Terms being discussed | 80% |
| closed | Deal won | 100% |

**Fields:**
| Field | Type | Purpose |
|-------|------|---------|
| id | INT | Unique identifier |
| company_id | INT FK | Reference to companies |
| contact_id | INT FK | Primary contact (can be null) |
| title | TEXT | Deal title (e.g., "Q2 Enterprise") |
| pipeline | TEXT | Which pipeline (Direct or Partner) |
| stage | TEXT | Current stage in pipeline |
| deal_size | REAL | Deal value in $ |
| deal_source | TEXT | How deal originated |
| probability | INT | 0-100% win probability |
| next_action_date | DATE | Date of next planned action |
| expected_close_date | DATE | Forecasted close date |

**Indexes:**
```sql
CREATE INDEX idx_deals_stage ON deals(stage);
CREATE INDEX idx_deals_pipeline ON deals(pipeline);
CREATE INDEX idx_deals_company_id ON deals(company_id);
CREATE INDEX idx_deals_expected_close ON deals(expected_close_date);
```

---

### 4. CAMPAIGNS Table

**Purpose:** Track outreach campaigns and performance

```sql
CREATE TABLE campaigns (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  type TEXT,
  vertical TEXT,
  status TEXT DEFAULT 'draft',
  email_sequence TEXT,
  warmup_enabled BOOLEAN DEFAULT 1,
  total_sent INTEGER DEFAULT 0,
  total_opened INTEGER DEFAULT 0,
  total_clicked INTEGER DEFAULT 0,
  total_replied INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**Campaign Types:**
- `email` - Email outreach
- `linkedin` - LinkedIn messaging
- `mixed` - Combined email + LinkedIn

**Campaign Statuses:**
- `draft` - Not started
- `active` - Currently running
- `paused` - Temporarily stopped
- `completed` - Finished

**Performance Metrics:**
- `total_sent` - Total emails sent
- `total_opened` - Unique opens
- `total_clicked` - Unique clicks
- `total_replied` - Positive replies

**Calculated Rates (at read time):**
```sql
open_rate = (total_opened / total_sent) * 100
click_rate = (total_clicked / total_sent) * 100
reply_rate = (total_replied / total_sent) * 100
```

---

### 5. ACTIVITIES Table

**Purpose:** Log all interactions and touchpoints

```sql
CREATE TABLE activities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  deal_id INTEGER,
  contact_id INTEGER,
  type TEXT,
  subject TEXT,
  description TEXT,
  outcome TEXT,
  campaign TEXT,
  sent_at DATETIME,
  opened_at DATETIME,
  clicked_at DATETIME,
  replied_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(deal_id) REFERENCES deals(id),
  FOREIGN KEY(contact_id) REFERENCES contacts(id)
);
```

**Activity Types:**
- `email_sent` - Outreach email sent
- `email_opened` - Recipient opened email
- `email_clicked` - Recipient clicked link
- `email_replied` - Positive reply received
- `call` - Phone call
- `meeting` - In-person or video meeting
- `proposal` - Proposal sent
- `contract` - Contract sent

**Fields:**
| Field | Type | Purpose |
|-------|------|---------|
| type | TEXT | What type of activity |
| subject | TEXT | Activity subject/topic |
| description | TEXT | Detailed notes |
| outcome | TEXT | Result of activity |
| campaign | TEXT | Which campaign (if any) |
| sent_at | DATETIME | When sent/made |
| opened_at | DATETIME | When opened (email) |
| clicked_at | DATETIME | When link clicked |
| replied_at | DATETIME | When reply received |

**Indexes:**
```sql
CREATE INDEX idx_activities_deal_id ON activities(deal_id);
CREATE INDEX idx_activities_contact_id ON activities(contact_id);
CREATE INDEX idx_activities_type ON activities(type);
CREATE INDEX idx_activities_created_at ON activities(created_at);
```

---

### 6. MEETINGS Table

**Purpose:** Track scheduled meetings and outcomes

```sql
CREATE TABLE meetings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  deal_id INTEGER NOT NULL,
  contact_id INTEGER,
  title TEXT,
  scheduled_date DATETIME,
  meeting_type TEXT,
  duration_minutes INTEGER,
  notes TEXT,
  outcome TEXT,
  next_steps TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(deal_id) REFERENCES deals(id),
  FOREIGN KEY(contact_id) REFERENCES contacts(id)
);
```

**Meeting Types:**
- `call_15` - 15-minute intro call
- `call_30` - 30-minute discovery call
- `demo` - Product demonstration
- `executive` - Executive briefing
- `follow_up` - Follow-up meeting

**Meeting Outcomes:**
- `positive` - Next steps agreed
- `neutral` - Need more time to decide
- `negative` - Not interested
- `no_show` - Contact didn't attend

---

### 7. KPI_METRICS Table

**Purpose:** Track daily KPI metrics for dashboards

```sql
CREATE TABLE kpi_metrics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date DATE NOT NULL UNIQUE,
  emails_sent INTEGER DEFAULT 0,
  emails_opened INTEGER DEFAULT 0,
  emails_clicked INTEGER DEFAULT 0,
  emails_replied INTEGER DEFAULT 0,
  new_leads INTEGER DEFAULT 0,
  new_deals INTEGER DEFAULT 0,
  calls_booked INTEGER DEFAULT 0,
  deals_closed INTEGER DEFAULT 0,
  revenue_closed REAL DEFAULT 0,
  pipeline_total REAL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**Daily Metrics:**
| Metric | Type | Meaning |
|--------|------|---------|
| emails_sent | INT | Total emails sent that day |
| emails_opened | INT | Total opens that day |
| emails_clicked | INT | Total clicks that day |
| emails_replied | INT | Total positive replies |
| new_leads | INT | New qualified leads |
| new_deals | INT | New deals created |
| calls_booked | INT | Meetings scheduled |
| deals_closed | INT | Deals won that day |
| revenue_closed | REAL | Revenue from closed deals |
| pipeline_total | REAL | Total open pipeline value |

**Calculated Metrics (at read time):**
```sql
-- Daily engagement rates
open_rate = (emails_opened / emails_sent) * 100
click_rate = (emails_clicked / emails_sent) * 100
reply_rate = (emails_replied / emails_sent) * 100

-- Weekly/Monthly aggregations
SELECT 
  SUM(emails_sent) as weekly_sent,
  SUM(deals_closed) as weekly_closed,
  SUM(revenue_closed) as weekly_revenue
FROM kpi_metrics
WHERE date BETWEEN date('now', '-7 days') AND date('now');
```

---

## Data Relationships

```
companies (1) ──────────────┐
                            │
contacts (many)             ├─── deals (many)
    │                       │
    ├─── activities         │
    │    (interactions)     │
    │                       │
    └─── meetings ──────────┘


campaigns ──────────────> activities
(define)                (track outcomes)
```

---

## Common Queries

### Get Company with All Related Data
```sql
SELECT 
  c.*,
  COUNT(DISTINCT co.id) as contact_count,
  COUNT(DISTINCT d.id) as deal_count,
  SUM(d.deal_size) as pipeline_value
FROM companies c
LEFT JOIN contacts co ON c.id = co.company_id
LEFT JOIN deals d ON c.id = d.company_id
WHERE c.id = ?
GROUP BY c.id;
```

### Get Pipeline Summary by Stage
```sql
SELECT 
  stage,
  COUNT(*) as deal_count,
  SUM(deal_size) as stage_value,
  AVG(probability) as avg_probability
FROM deals
WHERE stage != 'closed'
GROUP BY stage
ORDER BY stage_value DESC;
```

### Get Campaign Performance
```sql
SELECT 
  name,
  total_sent,
  total_opened,
  ROUND(100.0 * total_opened / NULLIF(total_sent, 0), 2) as open_rate,
  ROUND(100.0 * total_clicked / NULLIF(total_sent, 0), 2) as click_rate,
  ROUND(100.0 * total_replied / NULLIF(total_sent, 0), 2) as reply_rate
FROM campaigns
ORDER BY total_sent DESC;
```

### Get Weekly KPI Summary
```sql
SELECT 
  strftime('%W', date) as week,
  SUM(emails_sent) as week_sent,
  SUM(emails_opened) as week_opened,
  SUM(deals_closed) as week_closed,
  SUM(revenue_closed) as week_revenue
FROM kpi_metrics
WHERE date >= date('now', '-30 days')
GROUP BY strftime('%W', date)
ORDER BY date DESC;
```

### Find Hot Leads (Recent Activity + Engagement)
```sql
SELECT 
  c.*,
  co.name as company_name,
  COUNT(DISTINCT a.id) as activity_count,
  MAX(a.created_at) as last_activity
FROM contacts c
JOIN companies co ON c.company_id = co.id
LEFT JOIN activities a ON c.id = a.contact_id
WHERE c.status IN ('prospect', 'lead')
  AND datetime(MAX(a.created_at)) > datetime('now', '-7 days')
GROUP BY c.id
ORDER BY activity_count DESC, last_activity DESC;
```

---

## Performance Optimization

### Recommended Indexes
```sql
-- Core relationships
CREATE INDEX idx_contacts_company_id ON contacts(company_id);
CREATE INDEX idx_deals_company_id ON deals(company_id);
CREATE INDEX idx_deals_contact_id ON deals(contact_id);

-- Status/Stage lookups
CREATE INDEX idx_deals_stage ON deals(stage);
CREATE INDEX idx_contacts_status ON contacts(status);
CREATE INDEX idx_campaigns_status ON campaigns(status);

-- Date range queries
CREATE INDEX idx_activities_created_at ON activities(created_at);
CREATE INDEX idx_kpi_metrics_date ON kpi_metrics(date);
CREATE INDEX idx_deals_expected_close ON deals(expected_close_date);

-- Search
CREATE INDEX idx_companies_name ON companies(name);
CREATE INDEX idx_contacts_email ON contacts(email);
```

### Query Performance Tips
1. **Use LIMIT for large tables:**
   ```sql
   SELECT * FROM contacts LIMIT 1000;
   ```

2. **Filter before joins:**
   ```sql
   SELECT * FROM deals 
   WHERE stage != 'closed'  -- Filter first
   LIMIT 100;
   ```

3. **Count distinct efficiently:**
   ```sql
   SELECT COUNT(DISTINCT company_id) FROM contacts;
   ```

4. **Batch updates:**
   ```sql
   UPDATE deals SET stage = 'demo' 
   WHERE id IN (SELECT id FROM deals WHERE stage = 'contact' LIMIT 100);
   ```

---

## Backup & Recovery

### Manual Backup
```bash
# Backup database
cp data/sales.db data/sales-backup-$(date +%Y%m%d).db

# Restore from backup
cp data/sales-backup-20240401.db data/sales.db
```

### Automated Backup (Cron Job)
```bash
# Add to crontab (runs daily at 2 AM)
0 2 * * * cp /path/to/sales.db /backups/sales-$(date +\%Y\%m\%d).db

# Keep only last 30 days
0 3 * * * find /backups -name "sales-*.db" -mtime +30 -delete
```

---

## SQLite Maintenance

### Check Database Integrity
```bash
sqlite3 data/sales.db "PRAGMA integrity_check;"
```

### Optimize Database (vacuum)
```bash
sqlite3 data/sales.db "VACUUM;"
```

### Check Database Size
```bash
du -h data/sales.db
sqlite3 data/sales.db "SELECT page_count * page_size as size FROM pragma_page_count(), pragma_page_size();"
```

---

**Documentation Version:** 1.0
**Last Updated:** April 2024
