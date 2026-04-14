# 🔌 API Reference & Integration Guide

Complete API documentation with examples for the Sales & Outreach System.

---

## API Overview

**Base URL:** `http://localhost:3000/api`

**Response Format:** JSON

**Authentication:** None (add JWT for production)

**Rate Limiting:** None (add for production)

**CORS:** Enabled for all origins

---

## Response Format

### Success Response (200)
```json
{
  "id": 123,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response (4xx/5xx)
```json
{
  "error": "Description of error"
}
```

---

## COMPANIES ENDPOINTS

### List All Companies

**Endpoint:** `GET /api/companies`

**Query Parameters:**
- `limit` (optional): Max results (default: 100)
- `offset` (optional): Pagination offset

**Example:**
```bash
curl http://localhost:3000/api/companies
curl "http://localhost:3000/api/companies?limit=10&offset=0"
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Acme Corp",
    "industry": "Technology",
    "vertical": "Healthcare",
    "website": "https://acme.com",
    "size": "51-200",
    "location": "San Francisco, CA",
    "strategic_fit_score": 8.5,
    "source": "apollo",
    "created_at": "2024-04-01T10:00:00Z"
  }
]
```

---

### Get Company Details

**Endpoint:** `GET /api/companies/:id`

**URL Parameters:**
- `id` (required): Company ID

**Example:**
```bash
curl http://localhost:3000/api/companies/1
```

**Response:**
```json
{
  "id": 1,
  "name": "Acme Corp",
  "industry": "Technology",
  "vertical": "Healthcare",
  "website": "https://acme.com",
  "size": "51-200",
  "location": "San Francisco, CA",
  "strategic_fit_score": 8.5,
  "source": "apollo",
  "contacts": [
    {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "email": "john@acme.com",
      "title": "VP Sales"
    }
  ],
  "deals": [
    {
      "id": 1,
      "title": "Q2 Deal",
      "stage": "demo",
      "deal_size": 50000
    }
  ]
}
```

---

### Create Company

**Endpoint:** `POST /api/companies`

**Body Parameters:**
```json
{
  "name": "Acme Corp",
  "industry": "Technology",
  "vertical": "Healthcare",
  "website": "https://acme.com",
  "size": "51-200",
  "location": "San Francisco, CA",
  "strategic_fit_score": 8.5,
  "source": "apollo"
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/api/companies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "TechCorp Inc",
    "industry": "Software",
    "vertical": "Healthcare",
    "website": "https://techcorp.com",
    "size": "201-1000",
    "strategic_fit_score": 7.5,
    "source": "apollo"
  }'
```

**Response:**
```json
{
  "id": 2,
  "message": "Company created"
}
```

---

### Update Company

**Endpoint:** `PUT /api/companies/:id`

**URL Parameters:**
- `id` (required): Company ID

**Body Parameters:**
```json
{
  "name": "Updated Name",
  "strategic_fit_score": 9.0,
  "industry": "Healthcare IT"
}
```

**Example:**
```bash
curl -X PUT http://localhost:3000/api/companies/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Acme Health Tech",
    "strategic_fit_score": 9.0
  }'
```

**Response:**
```json
{
  "message": "Company updated"
}
```

---

## CONTACTS ENDPOINTS

### List All Contacts

**Endpoint:** `GET /api/contacts`

**Example:**
```bash
curl http://localhost:3000/api/contacts
```

**Response:**
```json
[
  {
    "id": 1,
    "company_id": 1,
    "company_name": "Acme Corp",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@acme.com",
    "phone": "+1-555-0123",
    "title": "VP Sales",
    "department": "Sales",
    "linkedin_url": "https://linkedin.com/in/johndoe",
    "status": "lead"
  }
]
```

---

### Create Contact

**Endpoint:** `POST /api/contacts`

**Body Parameters:**
```json
{
  "company_id": 1,
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@acme.com",
  "phone": "+1-555-0123",
  "title": "VP Sales",
  "department": "Sales",
  "linkedin_url": "https://linkedin.com/in/johndoe",
  "status": "prospect"
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "company_id": 1,
    "first_name": "Jane",
    "last_name": "Smith",
    "email": "jane@acme.com",
    "title": "CMO",
    "status": "lead"
  }'
```

**Response:**
```json
{
  "id": 2,
  "message": "Contact created"
}
```

---

## DEALS ENDPOINTS

### List All Deals

**Endpoint:** `GET /api/deals`

**Query Parameters:**
- `pipeline` (optional): Filter by pipeline
- `stage` (optional): Filter by stage

**Examples:**
```bash
# All deals
curl http://localhost:3000/api/deals

# Direct sales only
curl "http://localhost:3000/api/deals?pipeline=Direct%20Enterprise%20Sales"

# Deals in demo stage
curl "http://localhost:3000/api/deals?stage=demo"

# Combine filters
curl "http://localhost:3000/api/deals?pipeline=Direct%20Enterprise%20Sales&stage=proposal"
```

**Response:**
```json
[
  {
    "id": 1,
    "company_id": 1,
    "company_name": "Acme Corp",
    "contact_id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "title": "Q2 Enterprise Deal",
    "pipeline": "Direct Enterprise Sales",
    "stage": "demo",
    "deal_size": 50000,
    "deal_source": "outreach",
    "probability": 60,
    "expected_close_date": "2024-06-30"
  }
]
```

---

### Create Deal

**Endpoint:** `POST /api/deals`

**Body Parameters:**
```json
{
  "company_id": 1,
  "contact_id": 1,
  "title": "Q2 Enterprise Deal",
  "pipeline": "Direct Enterprise Sales",
  "stage": "lead",
  "deal_size": 50000,
  "deal_source": "outreach",
  "probability": 10,
  "expected_close_date": "2024-06-30"
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/api/deals \
  -H "Content-Type: application/json" \
  -d '{
    "company_id": 1,
    "contact_id": 1,
    "title": "Q2 2024 Enterprise",
    "pipeline": "Direct Enterprise Sales",
    "stage": "lead",
    "deal_size": 75000,
    "probability": 20,
    "expected_close_date": "2024-06-30"
  }'
```

**Response:**
```json
{
  "id": 2,
  "message": "Deal created"
}
```

---

### Update Deal

**Endpoint:** `PUT /api/deals/:id`

**URL Parameters:**
- `id` (required): Deal ID

**Body Parameters:**
```json
{
  "title": "Updated Title",
  "stage": "proposal",
  "probability": 70,
  "next_action_date": "2024-04-15"
}
```

**Example:**
```bash
curl -X PUT http://localhost:3000/api/deals/1 \
  -H "Content-Type: application/json" \
  -d '{
    "stage": "demo",
    "probability": 50,
    "deal_size": 60000
  }'
```

---

## CAMPAIGNS ENDPOINTS

### List All Campaigns

**Endpoint:** `GET /api/campaigns`

**Example:**
```bash
curl http://localhost:3000/api/campaigns
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Wellness Vertical Q2",
    "type": "email",
    "vertical": "Wellness",
    "status": "active",
    "total_sent": 500,
    "total_opened": 125,
    "total_clicked": 45,
    "total_replied": 15
  }
]
```

---

### Create Campaign

**Endpoint:** `POST /api/campaigns`

**Body Parameters:**
```json
{
  "name": "Healthcare Outreach Q2",
  "type": "email",
  "vertical": "Healthcare",
  "email_sequence": "Email 1: ...\nEmail 2: ..."
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/api/campaigns \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Wellness Spa Campaign",
    "type": "email",
    "vertical": "Wellness",
    "email_sequence": "Hi {name},\nWe help spas...\n\nFirst Follow-up:\nDid you see..."
  }'
```

**Response:**
```json
{
  "id": 2,
  "message": "Campaign created"
}
```

---

## ACTIVITIES ENDPOINTS

### Log Activity

**Endpoint:** `POST /api/activities`

**Body Parameters:**
```json
{
  "deal_id": 1,
  "contact_id": 1,
  "type": "email_sent",
  "subject": "Initial Outreach",
  "description": "Sent personalized outreach email",
  "outcome": "pending",
  "campaign": "Healthcare Q2"
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/api/activities \
  -H "Content-Type: application/json" \
  -d '{
    "deal_id": 1,
    "contact_id": 1,
    "type": "email_opened",
    "subject": "Email Opened",
    "outcome": "positive",
    "campaign": "Wellness Campaign"
  }'
```

---

### Get Deal Activities

**Endpoint:** `GET /api/activities/:dealId`

**URL Parameters:**
- `dealId` (required): Deal ID

**Example:**
```bash
curl http://localhost:3000/api/activities/1
```

**Response:**
```json
[
  {
    "id": 1,
    "deal_id": 1,
    "contact_id": 1,
    "type": "email_sent",
    "subject": "Initial Outreach",
    "outcome": "pending",
    "created_at": "2024-04-01T10:00:00Z"
  }
]
```

---

## MEETINGS ENDPOINTS

### Schedule Meeting

**Endpoint:** `POST /api/meetings`

**Body Parameters:**
```json
{
  "deal_id": 1,
  "contact_id": 1,
  "title": "Product Demo",
  "scheduled_date": "2024-04-15T14:00:00Z",
  "meeting_type": "demo",
  "duration_minutes": 30,
  "notes": "Discuss pricing and integration"
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/api/meetings \
  -H "Content-Type: application/json" \
  -d '{
    "deal_id": 1,
    "contact_id": 1,
    "title": "Discovery Call",
    "scheduled_date": "2024-04-15T14:00:00Z",
    "meeting_type": "call_30",
    "duration_minutes": 30,
    "notes": "Initial discovery call"
  }'
```

---

### Get Deal Meetings

**Endpoint:** `GET /api/meetings/:dealId`

**Example:**
```bash
curl http://localhost:3000/api/meetings/1
```

---

## KPI & ANALYTICS ENDPOINTS

### Get Dashboard KPIs

**Endpoint:** `GET /api/kpi/dashboard`

**Example:**
```bash
curl http://localhost:3000/api/kpi/dashboard
```

**Response:**
```json
{
  "today": {
    "date": "2024-04-10",
    "emails_sent": 45,
    "emails_opened": 12,
    "emails_clicked": 5,
    "emails_replied": 2,
    "new_leads": 8,
    "calls_booked": 2
  },
  "week": [
    { "date": "2024-04-10", "emails_sent": 45, ... },
    { "date": "2024-04-09", "emails_sent": 38, ... }
  ],
  "summary": {
    "active_deals": 25,
    "active_pipeline": 1250000,
    "closed_deals": 3,
    "closed_revenue": 150000,
    "total_contacts": 342,
    "total_companies": 89
  }
}
```

---

### Update KPI Metrics

**Endpoint:** `POST /api/kpi/update`

**Body Parameters:**
```json
{
  "emails_sent": 45,
  "emails_opened": 15,
  "emails_clicked": 8,
  "emails_replied": 3,
  "new_leads": 12,
  "new_deals": 2,
  "calls_booked": 2,
  "deals_closed": 1,
  "revenue_closed": 50000,
  "pipeline_total": 1250000
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/api/kpi/update \
  -H "Content-Type: application/json" \
  -d '{
    "emails_sent": 50,
    "emails_opened": 15,
    "emails_clicked": 8,
    "emails_replied": 3,
    "new_leads": 10,
    "new_deals": 1,
    "calls_booked": 2,
    "deals_closed": 1,
    "revenue_closed": 50000,
    "pipeline_total": 1300000
  }'
```

---

### Get Pipeline Analysis

**Endpoint:** `GET /api/analytics/pipeline`

**Example:**
```bash
curl http://localhost:3000/api/analytics/pipeline
```

**Response:**
```json
[
  {
    "stage": "lead",
    "deal_count": 10,
    "stage_value": 500000,
    "avg_probability": 15
  },
  {
    "stage": "demo",
    "deal_count": 5,
    "stage_value": 375000,
    "avg_probability": 50
  }
]
```

---

### Get Campaign Performance

**Endpoint:** `GET /api/analytics/campaigns`

**Example:**
```bash
curl http://localhost:3000/api/analytics/campaigns
```

**Response:**
```json
[
  {
    "name": "Wellness Q2",
    "type": "email",
    "vertical": "Wellness",
    "total_sent": 500,
    "total_opened": 125,
    "total_clicked": 45,
    "total_replied": 15,
    "open_rate": 25.0,
    "click_rate": 9.0,
    "reply_rate": 3.0
  }
]
```

---

### Get Vertical Analysis

**Endpoint:** `GET /api/analytics/verticals`

**Example:**
```bash
curl http://localhost:3000/api/analytics/verticals
```

**Response:**
```json
[
  {
    "vertical": "Healthcare",
    "company_count": 25,
    "contact_count": 145,
    "total_pipeline": 750000,
    "avg_deal_probability": 45
  }
]
```

---

## IMPORT/EXPORT ENDPOINTS

### Import Leads

**Endpoint:** `POST /api/import/leads`

**Body Parameters:**
```json
{
  "leads": [
    {
      "first_name": "Jane",
      "last_name": "Smith",
      "email": "jane@company.com",
      "company_name": "Tech Corp",
      "title": "VP Sales",
      "industry": "Technology",
      "vertical": "Healthcare",
      "website": "https://techcorp.com",
      "company_size": "201-1000"
    }
  ]
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/api/import/leads \
  -H "Content-Type: application/json" \
  -d '{
    "leads": [
      {
        "first_name": "John",
        "last_name": "Doe",
        "email": "john@acme.com",
        "company_name": "Acme Health",
        "title": "Director of Sales",
        "industry": "Healthcare",
        "vertical": "Healthcare"
      }
    ]
  }'
```

**Response:**
```json
{
  "message": "1 leads imported successfully"
}
```

---

### Export Contacts as CSV

**Endpoint:** `GET /api/export/contacts-csv`

**Example:**
```bash
curl http://localhost:3000/api/export/contacts-csv > contacts.csv
```

**CSV Format:**
```
First Name,Last Name,Email,Phone,Title,Company,Vertical,Industry
John,Doe,john@acme.com,+1-555-0123,VP Sales,Acme Corp,Healthcare,Technology
Jane,Smith,jane@techcorp.com,,Director Sales,Tech Corp,Wellness,Software
```

---

## Python Integration Examples

### Import Leads from Apollo
```python
import requests
import json

# Read Apollo CSV
apollo_leads = [
    {
        "first_name": "John",
        "last_name": "Doe",
        "email": "john@acme.com",
        "company_name": "Acme Inc",
        "title": "VP Sales",
        "industry": "Technology",
        "vertical": "Healthcare"
    }
]

# Import to system
response = requests.post(
    'http://localhost:3000/api/import/leads',
    json={'leads': apollo_leads},
    headers={'Content-Type': 'application/json'}
)

print(response.json())
```

### Update KPIs Daily
```python
import requests
from datetime import datetime

daily_metrics = {
    "emails_sent": 50,
    "emails_opened": 15,
    "emails_clicked": 8,
    "emails_replied": 3,
    "new_leads": 12,
    "new_deals": 2,
    "calls_booked": 2,
    "deals_closed": 1,
    "revenue_closed": 50000,
    "pipeline_total": 1250000
}

response = requests.post(
    'http://localhost:3000/api/kpi/update',
    json=daily_metrics
)

print(response.json())
```

### Create Deal from Lead
```python
import requests

lead = {
    "company_name": "Acme Corp",
    "contact_name": "John Doe",
    "deal_size": 50000
}

# Create deal
deal_response = requests.post(
    'http://localhost:3000/api/deals',
    json={
        "company_id": 1,  # Get from companies lookup
        "contact_id": 1,  # Get from contacts lookup
        "title": f"{lead['company_name']} - {lead['contact_name']}",
        "deal_size": lead['deal_size'],
        "stage": "lead"
    }
)

print(deal_response.json())
```

---

## JavaScript/Node.js Integration

### Fetch Company Data
```javascript
async function getCompany(id) {
  const response = await fetch(`http://localhost:3000/api/companies/${id}`);
  const data = await response.json();
  return data;
}

// Usage
getCompany(1).then(company => {
  console.log(company.name);
  console.log(company.contacts);
  console.log(company.deals);
});
```

### Log Activity
```javascript
async function logActivity(dealId, contactId, type, subject) {
  const response = await fetch('http://localhost:3000/api/activities', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      deal_id: dealId,
      contact_id: contactId,
      type: type,
      subject: subject,
      outcome: 'pending'
    })
  });
  return response.json();
}

// Usage
logActivity(1, 1, 'email_sent', 'Initial Outreach');
```

---

## Error Handling

### Common Errors

**400 Bad Request**
```json
{
  "error": "Missing required field: email"
}
```

**404 Not Found**
```json
{
  "error": "Company not found"
}
```

**409 Conflict**
```json
{
  "error": "Company with name 'Acme Corp' already exists"
}
```

**500 Server Error**
```json
{
  "error": "Database connection failed"
}
```

### Error Handling Pattern
```javascript
async function safeApiCall(url, options = {}) {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Unknown error');
    }
    
    return await response.json();
  } catch (err) {
    console.error('API Error:', err.message);
    return null;
  }
}
```

---

**API Version:** 1.0
**Last Updated:** April 2024
