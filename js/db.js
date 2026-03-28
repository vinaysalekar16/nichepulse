// db.js — loads the database from localStorage (admin writes here) or falls back to default
// This makes the site fully static (no server needed) while still being editable via admin panel

const DEFAULT_DB = {
  "site": {
    "name": "NichePulse",
    "tagline": "Deep insights across every niche",
    "description": "Expert articles on Finance, Health, Technology, Legal and more.",
    "adsense_id": "ca-pub-XXXXXXXXXXXXXXXX",
    "logo": "◈",
    "email": "contact@nichepulse.com"
  },
  "niches": [
    {"id":"finance","name":"Finance & Money","icon":"💰","color":"#1a6b3c","description":"Investing, budgeting, loans, credit cards and wealth building strategies.","keywords":"personal finance, investing, budgeting, loans, credit score"},
    {"id":"health","name":"Health & Wellness","icon":"🏥","color":"#c0392b","description":"Medical advice, fitness tips, mental health and healthy living guides.","keywords":"health tips, fitness, wellness, medical, diet"},
    {"id":"legal","name":"Legal & Law","icon":"⚖️","color":"#2c3e7a","description":"Legal guides, rights, contracts, insurance claims and attorney advice.","keywords":"legal advice, law, attorney, insurance, rights"},
    {"id":"technology","name":"Technology & AI","icon":"💻","color":"#6c3483","description":"Latest in AI, software, gadgets, cybersecurity and digital tools.","keywords":"technology, AI, software, gadgets, cybersecurity"},
    {"id":"realestate","name":"Real Estate","icon":"🏠","color":"#935116","description":"Buying, selling, renting, mortgages and property investment guides.","keywords":"real estate, mortgage, property, buying home, renting"}
  ],
  "blogs": [
    {
      "id":"blog-001","niche":"finance","title":"How to Build an Emergency Fund in 6 Months","slug":"build-emergency-fund-6-months",
      "meta_description":"Learn exactly how to build a 3-6 month emergency fund fast, even on a tight budget.",
      "image":"https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80",
      "author":"Admin","date":"2026-03-20","read_time":"6 min","tags":["emergency fund","saving money","budgeting"],
      "content":"<h2>Why You Need an Emergency Fund</h2><p>An emergency fund is your financial safety net. Without one, any unexpected expense — a medical bill, car repair, or job loss — can send you into debt. Financial experts recommend saving 3–6 months of living expenses.</p><h2>Step 1: Calculate Your Monthly Expenses</h2><p>Add up rent/mortgage, utilities, groceries, transport, and minimum debt payments. This is your monthly baseline. Multiply by 3 for a starter fund, 6 for a full fund.</p><h2>Step 2: Open a Separate High-Yield Savings Account</h2><p>Never keep your emergency fund in your main checking account. Use a high-yield savings account (HYSA) — they offer 4–5% APY, much better than a standard savings account.</p><h2>Step 3: Automate Your Savings</h2><p>Set up an automatic transfer on payday. Even $50/week adds up to $2,600 in a year. Treat it like a bill — non-negotiable.</p><h2>Step 4: Cut One Expense and Redirect It</h2><p>Cancel one subscription, cook at home twice more per week, or switch to a cheaper phone plan. Redirect that savings directly to your emergency fund.</p><h2>Conclusion</h2><p>Building an emergency fund takes discipline but it's the single most important financial step you can take. Start today — even with $25 — and build the habit that protects your future.</p>"
    },
    {
      "id":"blog-002","niche":"health","title":"10 Science-Backed Ways to Improve Sleep Quality Tonight","slug":"improve-sleep-quality-science-backed",
      "meta_description":"Poor sleep is ruining your health. Here are 10 proven strategies to fall asleep faster and sleep deeper.",
      "image":"https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&q=80",
      "author":"Admin","date":"2026-03-22","read_time":"7 min","tags":["sleep","health tips","wellness"],
      "content":"<h2>Why Sleep Quality Matters</h2><p>Most people focus on getting 8 hours but ignore sleep quality. Deep, restorative sleep repairs your body, consolidates memory, and regulates hormones. Here are 10 evidence-based strategies.</p><h2>1. Keep a Consistent Sleep Schedule</h2><p>Your circadian rhythm thrives on routine. Go to bed and wake up at the same time every day — even weekends.</p><h2>2. Make Your Room Colder</h2><p>A room temperature of 65–68°F (18–20°C) signals to your brain that it's time to sleep.</p><h2>3. Cut Blue Light 90 Minutes Before Bed</h2><p>Blue light from phones suppresses melatonin. Use Night Shift or simply put your phone in another room before bed.</p><h2>4. No Caffeine After 2 PM</h2><p>Caffeine has a half-life of 5–6 hours. A 3 PM coffee still has half its caffeine in your system at 9 PM.</p><h2>5. Try the 4-7-8 Breathing Method</h2><p>Breathe in for 4 seconds, hold for 7, exhale for 8. This activates your parasympathetic nervous system.</p><h2>Conclusion</h2><p>Pick 2–3 of these strategies and implement them tonight. Within 2 weeks most people report dramatically better sleep.</p>"
    },
    {
      "id":"blog-003","niche":"legal","title":"What to Do Immediately After a Car Accident: Legal Guide","slug":"what-to-do-after-car-accident-legal-guide",
      "meta_description":"Don't make costly mistakes after a car accident. This legal guide tells you exactly what to do in the first 48 hours.",
      "image":"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      "author":"Admin","date":"2026-03-25","read_time":"8 min","tags":["car accident","legal advice","insurance claim"],
      "content":"<h2>The First 5 Minutes Are Critical</h2><p>What you do immediately after a car accident can make or break your insurance claim and any potential legal case.</p><h2>Step 1: Check for Injuries and Call 911</h2><p>Your first priority is safety. Even if injuries seem minor, call 911. A police report is one of the most important documents for your claim.</p><h2>Step 2: Document Everything at the Scene</h2><p>Use your phone to photograph all vehicles, license plates, road conditions, traffic signs, any visible injuries, and the overall scene.</p><h2>Step 3: Exchange Information</h2><p>Get: full name, driver's license number, insurance company and policy number, vehicle registration, and phone number. Do NOT discuss fault or apologize.</p><h2>Step 4: Seek Medical Attention Within 24 Hours</h2><p>Even if you feel fine, see a doctor within 24 hours. Whiplash and internal injuries often don't show symptoms immediately.</p><h2>Step 5: Do NOT Give Recorded Statements to the Other Driver's Insurance</h2><p>You are NOT legally required to give one. Politely decline and consult an attorney first.</p><h2>Conclusion</h2><p>Know your rights. Don't accept the first settlement offer — it's almost always lower than you deserve.</p>"
    }
  ]
};

// Load from localStorage (admin edits go here), fall back to default
const stored = localStorage.getItem('nichepulse_db');
const DB = stored ? JSON.parse(stored) : DEFAULT_DB;

// Save default to localStorage if nothing there yet
if (!stored) {
  localStorage.setItem('nichepulse_db', JSON.stringify(DEFAULT_DB));
}
