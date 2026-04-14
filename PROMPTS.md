# 🤖 AI Prompt Library for Sales & Outreach System

Complete prompt templates for automating sales workflows using Claude or GPT.

---

## 1. EMAIL OUTREACH PROMPTS

### 1.1 Personalized Cold Email Generation

**Use Case:** Generate highly personalized outreach emails for targets

```
Task: Generate a personalized cold outreach email

Company Information:
- Company Name: {company_name}
- Industry: {industry}
- Company Size: {company_size}
- Website: {website_url}
- Recent News/Events: {recent_news}

Contact Information:
- Name: {contact_name}
- Title: {contact_title}
- Department: {department}
- LinkedIn Profile: {linkedin_url}

Your Company Value Prop:
- What you offer: {your_product}
- Key benefit for {industry}: {benefit}
- Unique differentiator: {differentiator}

Instructions:
1. Write a 3-sentence email (maximum)
2. Reference something specific about their company (news, achievement, or industry trend)
3. Lead with VALUE, not ask
4. Include one specific call-to-action (15-min call)
5. Tone: Professional, conversational, non-salesy
6. DO NOT use generic openings ("I hope this email finds you well")
7. DO NOT make it about your features, make it about their need

Format:
Subject: [Subject line - max 8 words]
Body: [Email copy]

Output the email ready to send.
```

### 1.2 Multi-Touch Sequence Generation

**Use Case:** Create a 3-email follow-up sequence

```
Task: Generate a 3-email follow-up sequence

Context:
- Initial email sent to: {contact_name} at {company_name}
- Position/Title: {title}
- Industry: {industry}
- Your offer: {value_prop}

Instructions for Email 1 (Day 1 - HOOK):
- Personalized opener referencing their company
- Single compelling reason to engage
- Soft CTA: "Worth a conversation?"

Instructions for Email 2 (Day 5 - VALUE):
- Acknowledge silence (not pushy)
- Share specific success story from similar company
- Demonstrate understanding of their challenge
- CTA: "Let me know if you'd like to explore"

Instructions for Email 3 (Day 10 - SCARCITY/CLOSING):
- Acknowledge this might not be right time
- Share new insight or data point
- Mention you're focusing on other opportunities
- CTA: "Final chance to connect?"

Format Output:
EMAIL 1: [Subject + Body]
EMAIL 2: [Subject + Body]
EMAIL 3: [Subject + Body]
```

### 1.3 Objection Handling Email

**Use Case:** Respond to common objections with targeted emails

```
Task: Generate response email to sales objection

Objection: "{objection_text}"

Context:
- Prospect: {contact_name}
- Company: {company_name}
- What they said: {prospect_email}

Common Objections Guide:
- "Too expensive" → Lead with ROI and flexible options
- "We already have a solution" → Differentiate, don't compete
- "Not the right time" → Plant a seed, request future connection
- "Need to discuss with team" → Support their process, provide materials
- "Send me information" → Qualify their interest first

Instructions:
1. Acknowledge their concern (validation)
2. Provide counter-narrative (brief, factual)
3. Share relevant case study or stat
4. Move to next step (not hard close)
5. Keep email to 2 paragraphs max

Output format:
Subject: [Responsive subject]
Body: [Email copy]
```

---

## 2. LEAD RESEARCH & QUALIFICATION

### 2.1 Company Deep Dive Research

**Use Case:** Gather intelligence on a prospect company

```
Task: Create a company research summary

Company: {company_name}
Industry: {industry}
Website: {website}

Research Requirements:
1. Business Model - What do they sell/do?
2. Recent Developments - Funding, partnerships, product launches (last 6 months)
3. Pain Points - What challenges does this industry face?
4. Your Fit - How does your solution address their needs?
5. Decision Makers - Titles of people likely to approve this decision
6. Buying Signals - What would indicate they're ready to buy?

Output Format:
## Company Research Summary: {company_name}

### Business Overview
[2-3 sentences about what they do]

### Recent Developments
- [Bullet point 1]
- [Bullet point 2]
- [Bullet point 3]

### Industry Pain Points
- [Relevant challenge 1]
- [Relevant challenge 2]

### Our Value Fit
[Specific reason they should care about your solution]

### Key Decision Makers
- [Title 1] - [Responsibility]
- [Title 2] - [Responsibility]

### Buying Signals
- [Signal 1]: [What it means]
- [Signal 2]: [What it means]

### Recommended Approach
[1-2 sentence recommendation for outreach]
```

### 2.2 Lead Qualification Scoring

**Use Case:** Score and rank leads by quality

```
Task: Score this lead and recommend action

Lead Information:
- Name: {contact_name}
- Title: {title}
- Company: {company_name}
- Industry: {industry}
- Company Size: {company_size}
- Budget Indicator: {budget_info}
- Current Solution: {current_solution}
- Expressed Interest: {interest_level}

Scoring Criteria:
1. Budget Available (0-25 points)
   - Explicit budget: 25
   - Likely budget: 15
   - No indication: 5

2. Decision Authority (0-25 points)
   - Direct decision maker: 25
   - Influences decision: 15
   - Not involved: 5

3. Timing (0-25 points)
   - Ready to buy now: 25
   - Looking in next 3 months: 15
   - No specific timeline: 5

4. Pain/Need (0-25 points)
   - Explicitly stated pain: 25
   - Likely has pain: 15
   - No indication: 5

Output:
**Lead Score: [Total]/100**

**Breakdown:**
- Budget Authority: [Score] - [Notes]
- Decision Authority: [Score] - [Notes]
- Timeline: [Score] - [Notes]
- Pain/Need: [Score] - [Notes]

**Recommended Action:**
[High priority: immediate outreach]
[Medium priority: add to nurture sequence]
[Low priority: save for later]

**Best Next Steps:**
1. [Action 1]
2. [Action 2]
3. [Action 3]
```

---

## 3. CONVERSATION & MEETING PROMPTS

### 3.1 Sales Call Strategy

**Use Case:** Prepare talking points for a sales call

```
Task: Generate talking points for discovery call

Meeting:
- Prospect: {contact_name}
- Company: {company_name}
- Title: {title}
- Meeting Duration: {duration} minutes

Your Solution: {brief_solution}
Key Differentiator: {differentiator}

Call Objectives:
1. [Primary objective - e.g., "Understand their current challenge"]
2. [Secondary objective - e.g., "Identify budget authority"]
3. [Closing objective - e.g., "Schedule next meeting"]

Output Format:

## Call Strategy for {contact_name}

### Opening (First 2 minutes)
- [Build rapport: mention something about their company]
- [State purpose: "I wanted to learn about..."]
- [Check time: "Do we still have 25 minutes?"]

### Discovery Questions (10-15 minutes)
These questions uncover their needs:
1. "Can you walk me through how you currently...?"
2. "What challenges have you faced with...?"
3. "If you could improve one thing about... what would it be?"
4. "Who else is involved in this decision?"
5. "When would you want to have this solved by?"

### Value Narrative (5-10 minutes)
IF they mention challenge X, lead with:
"Many companies in your space face [challenge]. Here's how we helped [similar company] solve it by [result]."

### Handling Objections
- If they say "We already have solution": "What works well about it? What could be better?"
- If they say "Too expensive": "What would the impact be if this problem went unsolved?"
- If they say "Not the right time": "Would next quarter make sense? Let me put it on our radar."

### Closing (Last 3 minutes)
- Summarize: "So you need to solve [challenge] by [date], correct?"
- Propose next: "I'd like to show you how [other company] solved this..."
- Confirm: "Does [specific time] next week work for you?"

### After Call Notes
- [ ] Objections mentioned: ___
- [ ] Pain points identified: ___
- [ ] Budget available: ___
- [ ] Timeline: ___
- [ ] Decision makers: ___
- [ ] Next step: ___
- [ ] Follow-up email: ___
```

### 3.2 Meeting Notes & Action Items

**Use Case:** Extract action items from meeting notes

```
Task: Analyze meeting notes and generate action items

Meeting Notes:
{raw_meeting_notes}

Meeting Info:
- Date: {date}
- Attendees: {attendees}
- Company: {company_name}
- Contact: {contact_name}

Instructions:
1. Extract all stated objectives/problems
2. Identify all next steps mentioned
3. Assign ownership and deadlines
4. Extract any objections
5. Determine deal probability

Output Format:

## Meeting Summary: {company_name}

### Key Takeaways
- [Main point 1]
- [Main point 2]
- [Main point 3]

### Their Current Situation
- Challenge: [What they're struggling with]
- Timeline: [When they want to solve it]
- Budget: [If mentioned]

### Our Solution Relevance
- [How our solution addresses challenge 1]
- [How our solution addresses challenge 2]

### Objections / Concerns
- [Objection 1]: [Their concern]
- [Objection 2]: [Their concern]

### Agreed Next Steps
| Action | Owner | Due Date | Priority |
|--------|-------|----------|----------|
| [Action 1] | [Who] | [Date] | [High/Med] |
| [Action 2] | [Who] | [Date] | [High/Med] |

### Deal Probability
- Current: [10%/30%/50%/70%/90%]
- Timeline to close: [Estimate]
- Key driver to next stage: [What needs to happen]

### Follow-Up Email
[Generate personalized follow-up referencing key points discussed]
```

---

## 4. CAMPAIGN & ANALYTICS PROMPTS

### 4.1 Campaign Performance Analysis

**Use Case:** Analyze campaign metrics and recommend improvements

```
Task: Analyze campaign performance and recommend optimization

Campaign Data:
- Campaign Name: {campaign_name}
- Vertical: {vertical}
- Email List Size: {list_size}
- Emails Sent: {sent_count}
- Open Rate: {open_rate}%
- Click Rate: {click_rate}%
- Reply Rate: {reply_rate}%
- Demo Booked: {demo_count}

Industry Benchmarks:
- Average Open Rate: 20-30%
- Average Click Rate: 2-5%
- Average Reply Rate: 1-3%
- Average Demo Rate: 0.5-1%

Analysis Instructions:
1. Compare against benchmarks
2. Identify what's working
3. Identify underperforming areas
4. Generate 3-5 specific improvements
5. Estimate impact

Output:

## Campaign Analysis: {campaign_name}

### Performance vs Benchmarks
| Metric | Your Rate | Benchmark | Performance |
|--------|-----------|-----------|-------------|
| Open Rate | {open_rate}% | 25% | [Above/Below] |
| Click Rate | {click_rate}% | 3% | [Above/Below] |
| Reply Rate | {reply_rate}% | 2% | [Above/Below] |

### What's Working
- [Strength 1]: [Evidence]
- [Strength 2]: [Evidence]

### What Needs Improvement
- [Gap 1]: [Current performance vs potential]
- [Gap 2]: [Current performance vs potential]

### 5 Optimization Recommendations
1. [Specific change] → Potential impact: [+X%]
2. [Specific change] → Potential impact: [+X%]
3. [Specific change] → Potential impact: [+X%]
4. [Specific change] → Potential impact: [+X%]
5. [Specific change] → Potential impact: [+X%]

### Revised Email Subject Lines to Test
- [Subject line A]
- [Subject line B]
- [Subject line C]

### Next Campaign Recommendations
[Specific improvements for next campaign based on learnings]
```

### 4.2 Pipeline Health Report

**Use Case:** Assess pipeline health and identify risks

```
Task: Generate pipeline health assessment

Pipeline Data:
- Total Active Deals: {deal_count}
- Total Pipeline Value: {pipeline_value}
- Deals by Stage: {stage_breakdown}
- Sales Cycle Length: {avg_sales_cycle} days
- Win Rate: {win_rate}%
- Average Deal Size: {avg_deal_size}

Top Deals:
{deal_list}

Analysis:

## Pipeline Health Report

### Pipeline Overview
- Total Value: ${pipeline_value}
- Deal Count: {deal_count}
- Average Deal Size: ${avg_deal_size}
- Forecast Accuracy: [High/Medium/Low]

### Stage Distribution
[Chart: deals by stage with values]

### At-Risk Deals
| Company | Value | Stage | Risk | Reason |
|---------|-------|-------|------|--------|
| [Co 1] | [Val] | [Stage] | [High] | [Reason] |
| [Co 2] | [Val] | [Stage] | [Medium] | [Reason] |

### Opportunities to Advance
- [Deal 1]: Ready for [next stage] because...
- [Deal 2]: Ready for [next stage] because...
- [Deal 3]: Needs [specific action] to advance

### Forecast
- Confident Close (Next 30 days): ${confident_value}
- Likely Close (30-60 days): ${likely_value}
- Possible Close (60+ days): ${possible_value}
- **Total Realistic Forecast**: ${realistic_total}

### Recommendations
1. [Priority action 1]
2. [Priority action 2]
3. [Priority action 3]
```

---

## 5. PERSONALIZATION PROMPTS

### 5.1 LinkedIn Message Generation

**Use Case:** Write personalized LinkedIn connection messages

```
Task: Write a personalized LinkedIn connection message

Prospect Info:
- Name: {name}
- Title: {title}
- Company: {company}
- Location: {location}
- LinkedIn Summary: [Paste their headline]

Recent Activity: {recent_posts_or_activity}

Your Offer: {value_prop}

Instructions:
1. Keep it short (3 sentences max)
2. Reference something from their profile or activity
3. Show genuine interest, not salesy
4. Ask a question or suggest value
5. Do NOT ask to connect and then pitch

Output:

Subject/Message:
[Write the connection message here]
```

### 5.2 Account-Based Marketing (ABM) Strategy

**Use Case:** Create personalized strategy for high-value accounts

```
Task: Create ABM strategy for key account

Target Account:
- Company: {company_name}
- Industry: {industry}
- Size: {company_size}
- Revenue: {annual_revenue}
- Website: {website}

Key Stakeholders to Target:
- {Title 1}: {Name, if available}
- {Title 2}: {Name, if available}
- {Title 3}: {Name, if available}

Company Pain Points: {pain_points}
Strategic Priority: {why this account matters}

Output:

## ABM Strategy for {company_name}

### Account Overview
- [2-3 sentence description]
- Estimated deal size: ${deal_size}
- Timeline: {timeline}

### Stakeholders & Approach
| Title | Likely Concerns | Best Approach |
|-------|---|---|
| {Title 1} | [Concern] | [Approach] |
| {Title 2} | [Concern] | [Approach] |
| {Title 3} | [Concern] | [Approach] |

### Personalized Outreach Plan
**Week 1:** [Initial contact strategy]
**Week 2:** [Value demonstration]
**Week 3:** [Engagement milestone]
**Week 4:** [Advance to meeting]

### Differentiated Messaging
- For {Title 1}: "[Message focused on their concern]"
- For {Title 2}: "[Message focused on their concern]"
- For {Title 3}: "[Message focused on their concern]"

### Success Metrics
- [ ] Met with [Title]
- [ ] [Company] acknowledged specific pain point
- [ ] [Company] agrees to [next step]
- [ ] [Outcome metric]
```

---

## 6. CONTENT & THOUGHT LEADERSHIP

### 6.1 LinkedIn Post Generation

**Use Case:** Write thought leadership content for your audience

```
Task: Generate LinkedIn post for thought leadership

Topic: {topic}
Target Audience: {audience}
Tone: {professional/casual/provocative}
Goal: {engagement/lead generation/brand building}

Key Message: {main_point}

Instructions:
1. Hook (first line): Something unexpected or relatable
2. Story or insight: 2-3 lines
3. Key takeaway: 1 line (the "so what?")
4. Call to action: "What's your take?" or "Have you seen this?"

Format:
- Keep total length to 150-200 words
- Use line breaks for readability
- Include emoji for visual interest
- Ask a question to drive engagement

Output:

[LinkedIn post copy]

---
What's your take? [Question to engage]
```

### 6.2 Case Study Template

**Use Case:** Turn a successful deal into marketing asset

```
Task: Generate case study from deal details

Deal Information:
- Client: {company_name}
- Industry: {industry}
- Company Size: {size}
- Engagement Duration: {duration}

Challenge They Faced:
- [Challenge 1]
- [Challenge 2]
- [Challenge 3]

Solution We Provided:
- [Solution component 1]
- [Solution component 2]

Results:
- [Metric 1]: [Improvement]
- [Metric 2]: [Improvement]
- [Metric 3]: [Improvement]

Output:

# Case Study: How {Company} Achieved {Main Result}

## The Challenge
[2-3 paragraphs describing their situation before your solution]

## Our Approach
[2-3 paragraphs describing what you did and why]

## The Results
[Specific metrics and outcomes]

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| [Metric 1] | [Val] | [Val] | [+%] |
| [Metric 2] | [Val] | [Val] | [+%] |
| [Metric 3] | [Val] | [Val] | [+%] |

## Key Learnings
- [Learning 1]
- [Learning 2]
- [Learning 3]

## Impact Statement
"{Direct quote from client about transformation}"

---
*Interested in similar results? [CTA]*
```

---

## How to Use This Prompt Library

### Quick Start
1. Copy the relevant prompt
2. Fill in the {} placeholders with your specific data
3. Paste into Claude or GPT
4. Get instant output
5. Edit as needed

### Best Practices
- Be specific with context
- Provide actual data when possible (vs. placeholders)
- Review and edit outputs before sending
- A/B test different prompts
- Track what works best

### Integration
Add prompts to:
- Your CRM (HubSpot workflow)
- Sales playbook documents
- AI assistant (Claude, ChatGPT)
- Email templates
- Team wikis

---

## Advanced Techniques

### Prompt Chaining
```
First prompt: Generate list of questions
Second prompt: [Take previous output] + "Now write emails addressing each..."
Third prompt: [Take output] + "Now create a nurture sequence using these..."
```

### Variable Substitution
```
Setup: Create {variable_name} templates with [BRACKETS]
Use: Replace [BRACKETS] with actual data before sending
Benefit: Reusable, trackable, A/B testable
```

### Refinement Loop
```
1. Generate initial version
2. Ask: "Make this more [specific direction]"
3. Ask: "Reduce word count by 20%"
4. Ask: "Add urgency without being pushy"
5. Use refined version
```

---

**Last Updated:** April 2024
**Version:** 1.0
**Maintained By:** Sales & Outreach Team

For questions or to suggest new prompts, reach out to your team lead.
