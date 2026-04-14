/**
 * AI-Driven Sales & Outreach System
 * Backend Server - Express.js
 * 
 * Supports: CRM, Outreach, Lead Generation, KPI Tracking, Pipeline Management
 */

const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const isVercel = !!process.env.VERCEL;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static(__dirname));

// Database Setup
const dataDir = isVercel ? path.join('/tmp', 'sales-outreach-system') : path.join(__dirname, 'data');
const DB_PATH = path.join(dataDir, 'sales.db');

// Create data directory if not exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

// Promisify database operations
const dbRun = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
};

const dbGet = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const dbAll = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// Initialize Database Schema
function initializeDatabase() {
  // Companies/Prospects Table
  db.run(`CREATE TABLE IF NOT EXISTS companies (
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
  )`);

  // Contacts Table
  db.run(`CREATE TABLE IF NOT EXISTS contacts (
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
  )`);

  // Deals Table
  db.run(`CREATE TABLE IF NOT EXISTS deals (
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
  )`);

  // Activities Table
  db.run(`CREATE TABLE IF NOT EXISTS activities (
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
  )`);

  // Campaigns Table
  db.run(`CREATE TABLE IF NOT EXISTS campaigns (
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
  )`);

  // Meeting Notes Table
  db.run(`CREATE TABLE IF NOT EXISTS meetings (
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
  )`);

  // KPI Metrics Table
  db.run(`CREATE TABLE IF NOT EXISTS kpi_metrics (
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
  )`);

  console.log('Database schema initialized');
}

// ============= API ROUTES =============

// COMPANIES/PROSPECTS MANAGEMENT
app.get('/api/companies', async (req, res) => {
  try {
    const companies = await dbAll('SELECT * FROM companies ORDER BY created_at DESC LIMIT 100');
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/companies/:id', async (req, res) => {
  try {
    const company = await dbGet('SELECT * FROM companies WHERE id = ?', [req.params.id]);
    const contacts = await dbAll('SELECT * FROM contacts WHERE company_id = ?', [req.params.id]);
    const deals = await dbAll('SELECT * FROM deals WHERE company_id = ?', [req.params.id]);
    res.json({ ...company, contacts, deals });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/companies', async (req, res) => {
  try {
    const { name, industry, vertical, website, size, location, strategic_fit_score, source } = req.body;
    const result = await dbRun(
      'INSERT INTO companies (name, industry, vertical, website, size, location, strategic_fit_score, source) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, industry, vertical, website, size, location, strategic_fit_score || 0, source]
    );
    res.json({ id: result.id, message: 'Company created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/companies/:id', async (req, res) => {
  try {
    const { name, industry, vertical, website, size, location, strategic_fit_score } = req.body;
    await dbRun(
      'UPDATE companies SET name = ?, industry = ?, vertical = ?, website = ?, size = ?, location = ?, strategic_fit_score = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [name, industry, vertical, website, size, location, strategic_fit_score, req.params.id]
    );
    res.json({ message: 'Company updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CONTACTS MANAGEMENT
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await dbAll(`
      SELECT c.*, co.name as company_name 
      FROM contacts c
      LEFT JOIN companies co ON c.company_id = co.id
      ORDER BY c.created_at DESC
      LIMIT 100
    `);
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/contacts', async (req, res) => {
  try {
    const { company_id, first_name, last_name, email, phone, title, department, linkedin_url, status } = req.body;
    const result = await dbRun(
      'INSERT INTO contacts (company_id, first_name, last_name, email, phone, title, department, linkedin_url, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [company_id, first_name, last_name, email, phone, title, department, linkedin_url, status || 'prospect']
    );
    res.json({ id: result.id, message: 'Contact created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DEALS MANAGEMENT
app.get('/api/deals', async (req, res) => {
  try {
    const { pipeline, stage } = req.query;
    let query = `
      SELECT d.*, c.name as company_name, con.first_name, con.last_name
      FROM deals d
      LEFT JOIN companies c ON d.company_id = c.id
      LEFT JOIN contacts con ON d.contact_id = con.id
    `;
    const params = [];

    if (pipeline) {
      query += ' WHERE d.pipeline = ?';
      params.push(pipeline);
    }
    if (stage) {
      query += params.length > 0 ? ' AND d.stage = ?' : ' WHERE d.stage = ?';
      params.push(stage);
    }

    query += ' ORDER BY d.created_at DESC LIMIT 200';
    const deals = await dbAll(query, params);
    res.json(deals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/deals', async (req, res) => {
  try {
    const { company_id, contact_id, title, pipeline, stage, deal_size, deal_source, probability, expected_close_date } = req.body;
    const result = await dbRun(
      'INSERT INTO deals (company_id, contact_id, title, pipeline, stage, deal_size, deal_source, probability, expected_close_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [company_id, contact_id, title, pipeline || 'Direct Enterprise Sales', stage || 'lead', deal_size, deal_source, probability || 0, expected_close_date]
    );
    res.json({ id: result.id, message: 'Deal created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/deals/:id', async (req, res) => {
  try {
    const { title, stage, deal_size, probability, next_action_date, expected_close_date } = req.body;
    await dbRun(
      'UPDATE deals SET title = ?, stage = ?, deal_size = ?, probability = ?, next_action_date = ?, expected_close_date = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [title, stage, deal_size, probability, next_action_date, expected_close_date, req.params.id]
    );
    res.json({ message: 'Deal updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CAMPAIGNS MANAGEMENT
app.get('/api/campaigns', async (req, res) => {
  try {
    const campaigns = await dbAll('SELECT * FROM campaigns ORDER BY created_at DESC');
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/campaigns', async (req, res) => {
  try {
    const { name, type, vertical, email_sequence } = req.body;
    const result = await dbRun(
      'INSERT INTO campaigns (name, type, vertical, email_sequence) VALUES (?, ?, ?, ?)',
      [name, type, vertical, email_sequence]
    );
    res.json({ id: result.id, message: 'Campaign created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ACTIVITIES & OUTREACH TRACKING
app.post('/api/activities', async (req, res) => {
  try {
    const { deal_id, contact_id, type, subject, description, outcome, campaign } = req.body;
    const result = await dbRun(
      'INSERT INTO activities (deal_id, contact_id, type, subject, description, outcome, campaign, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)',
      [deal_id, contact_id, type, subject, description, outcome, campaign]
    );
    res.json({ id: result.id, message: 'Activity logged' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/activities/:dealId', async (req, res) => {
  try {
    const activities = await dbAll('SELECT * FROM activities WHERE deal_id = ? ORDER BY created_at DESC', [req.params.dealId]);
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// MEETINGS MANAGEMENT
app.post('/api/meetings', async (req, res) => {
  try {
    const { deal_id, contact_id, title, scheduled_date, meeting_type, duration_minutes, notes } = req.body;
    const result = await dbRun(
      'INSERT INTO meetings (deal_id, contact_id, title, scheduled_date, meeting_type, duration_minutes, notes) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [deal_id, contact_id, title, scheduled_date, meeting_type, duration_minutes, notes]
    );
    res.json({ id: result.id, message: 'Meeting scheduled' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/meetings/:dealId', async (req, res) => {
  try {
    const meetings = await dbAll('SELECT * FROM meetings WHERE deal_id = ? ORDER BY scheduled_date DESC', [req.params.dealId]);
    res.json(meetings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// KPI DASHBOARD ENDPOINTS
app.get('/api/kpi/dashboard', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const last7Days = new Date(Date.now() - 7*24*60*60*1000).toISOString().split('T')[0];

    const todayMetrics = await dbGet('SELECT * FROM kpi_metrics WHERE date = ?', [today]);
    const weekMetrics = await dbAll('SELECT * FROM kpi_metrics WHERE date >= ? ORDER BY date DESC', [last7Days]);
    
    const totalDeals = await dbGet('SELECT COUNT(*) as count, SUM(deal_size) as total FROM deals WHERE stage != "closed"');
    const closedDeals = await dbGet('SELECT COUNT(*) as count, SUM(deal_size) as total FROM deals WHERE stage = "closed"');
    const totalContacts = await dbGet('SELECT COUNT(*) as count FROM contacts');
    const totalCompanies = await dbGet('SELECT COUNT(*) as count FROM companies');

    res.json({
      today: todayMetrics || {},
      week: weekMetrics,
      summary: {
        active_deals: totalDeals.count || 0,
        active_pipeline: totalDeals.total || 0,
        closed_deals: closedDeals.count || 0,
        closed_revenue: closedDeals.total || 0,
        total_contacts: totalContacts.count || 0,
        total_companies: totalCompanies.count || 0
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/kpi/update', async (req, res) => {
  try {
    const date = new Date().toISOString().split('T')[0];
    const metrics = req.body;

    const existing = await dbGet('SELECT id FROM kpi_metrics WHERE date = ?', [date]);

    if (existing) {
      await dbRun(
        'UPDATE kpi_metrics SET emails_sent = ?, emails_opened = ?, emails_clicked = ?, emails_replied = ?, new_leads = ?, new_deals = ?, calls_booked = ?, deals_closed = ?, revenue_closed = ?, pipeline_total = ? WHERE date = ?',
        [metrics.emails_sent, metrics.emails_opened, metrics.emails_clicked, metrics.emails_replied, metrics.new_leads, metrics.new_deals, metrics.calls_booked, metrics.deals_closed, metrics.revenue_closed, metrics.pipeline_total, date]
      );
    } else {
      await dbRun(
        'INSERT INTO kpi_metrics (date, emails_sent, emails_opened, emails_clicked, emails_replied, new_leads, new_deals, calls_booked, deals_closed, revenue_closed, pipeline_total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [date, metrics.emails_sent, metrics.emails_opened, metrics.emails_clicked, metrics.emails_replied, metrics.new_leads, metrics.new_deals, metrics.calls_booked, metrics.deals_closed, metrics.revenue_closed, metrics.pipeline_total]
      );
    }

    res.json({ message: 'KPI metrics updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ANALYTICS & REPORTING
app.get('/api/analytics/pipeline', async (req, res) => {
  try {
    const pipeline = await dbAll(`
      SELECT 
        stage,
        COUNT(*) as count,
        SUM(deal_size) as total_value,
        AVG(probability) as avg_probability
      FROM deals
      WHERE stage != 'closed'
      GROUP BY stage
      ORDER BY total_value DESC
    `);
    res.json(pipeline);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/analytics/campaigns', async (req, res) => {
  try {
    const campaigns = await dbAll(`
      SELECT 
        name,
        type,
        vertical,
        total_sent,
        total_opened,
        total_clicked,
        total_replied,
        ROUND(100.0 * total_opened / NULLIF(total_sent, 0), 2) as open_rate,
        ROUND(100.0 * total_clicked / NULLIF(total_sent, 0), 2) as click_rate,
        ROUND(100.0 * total_replied / NULLIF(total_sent, 0), 2) as reply_rate
      FROM campaigns
      ORDER BY total_sent DESC
    `);
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/analytics/verticals', async (req, res) => {
  try {
    const verticals = await dbAll(`
      SELECT 
        vertical,
        COUNT(DISTINCT c.id) as company_count,
        COUNT(DISTINCT co.id) as contact_count,
        SUM(d.deal_size) as total_pipeline,
        AVG(d.probability) as avg_deal_probability
      FROM companies c
      LEFT JOIN contacts co ON c.id = co.company_id
      LEFT JOIN deals d ON c.id = d.company_id
      WHERE vertical IS NOT NULL
      GROUP BY vertical
      ORDER BY total_pipeline DESC
    `);
    res.json(verticals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LEAD IMPORT (for Apollo integration)
app.post('/api/import/leads', async (req, res) => {
  try {
    const { leads } = req.body;
    let imported = 0;

    for (const lead of leads) {
      // Create or get company
      const company = await dbGet('SELECT id FROM companies WHERE name = ?', [lead.company_name]);
      let companyId;

      if (company) {
        companyId = company.id;
      } else {
        const result = await dbRun(
          'INSERT INTO companies (name, industry, vertical, website, size, source) VALUES (?, ?, ?, ?, ?, ?)',
          [lead.company_name, lead.industry, lead.vertical, lead.website, lead.company_size, 'apollo']
        );
        companyId = result.id;
      }

      // Create contact
      await dbRun(
        'INSERT INTO contacts (company_id, first_name, last_name, email, title, status) VALUES (?, ?, ?, ?, ?, ?)',
        [companyId, lead.first_name, lead.last_name, lead.email, lead.title, 'prospect']
      );

      imported++;
    }

    res.json({ message: `${imported} leads imported successfully` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// EXPORT FUNCTIONALITY
app.get('/api/export/contacts-csv', async (req, res) => {
  try {
    const contacts = await dbAll(`
      SELECT c.*, co.name as company_name 
      FROM contacts c
      LEFT JOIN companies co ON c.company_id = co.id
    `);

    let csv = 'First Name,Last Name,Email,Phone,Title,Company,Vertical,Industry\n';
    contacts.forEach(c => {
      csv += `"${c.first_name}","${c.last_name}","${c.email || ''}","${c.phone || ''}","${c.title || ''}","${c.company_name || ''}","${c.vertical || ''}","${c.industry || ''}"\n`;
    });

    res.header('Content-Type', 'text/csv');
    res.header('Content-Disposition', 'attachment; filename="contacts-export.csv"');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Serve the single-page frontend from the project root.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Sales System Server running on http://localhost:${PORT}`);
    console.log(`Dashboard: http://localhost:${PORT}`);
    console.log(`API: http://localhost:${PORT}/api`);
  });
}

module.exports = app;
