const ELECTION_DAY = new Date("2026-10-26T20:00:00-04:00");
const STORAGE_KEY = "dorit-dashboard-preview-state";

const sections = [
  { id: "command", label: "Command Center", kicker: "Live" },
  { id: "events", label: "Events Calendar", kicker: "Plan" },
  { id: "crm", label: "Stakeholder CRM", kicker: "Build" },
  { id: "map", label: "Map Intelligence", kicker: "Field" },
  { id: "goals", label: "Campaign Goals", kicker: "Track" },
  { id: "field", label: "Field Ops", kicker: "Move" },
  { id: "training", label: "Volunteer Briefing", kicker: "Train" },
  { id: "forms", label: "Update Forms", kicker: "Input" },
];

const seedState = {
  activeRole: "manager",
  metrics: [
    { key: "hardIds", label: "Hard voter IDs", actual: 840, target: 4000, unit: "", color: "#075f63", category: "votes" },
    { key: "appearances", label: "In-person appearances", actual: 38, target: 200, unit: "", color: "#d85f4a", category: "visibility" },
    { key: "doors", label: "Doors knocked", actual: 3150, target: 22000, unit: "", color: "#285f9c", category: "field" },
    { key: "events", label: "Events attended", actual: 17, target: 120, unit: "", color: "#44724c", category: "visibility" },
    { key: "stakeholderMeetings", label: "Stakeholder meetings", actual: 28, target: 180, unit: "", color: "#d6a83f", category: "relationships" },
    { key: "endorsements", label: "Endorsements", actual: 4, target: 35, unit: "", color: "#0d7a78", category: "relationships" },
    { key: "volunteers", label: "Active volunteers", actual: 31, target: 90, unit: "", color: "#d85f4a", category: "team" },
    { key: "signs", label: "Signs placed", actual: 0, target: 650, unit: "", color: "#285f9c", category: "visibility" },
  ],
  events: [
    {
      id: "evt-nomination",
      month: "May",
      date: "2026-05-01",
      dateLabel: "May 1, 2026",
      name: "Nomination filing opens",
      location: "Township of King Clerk",
      address: "King Township",
      half: "King",
      tier: 1,
      attendance: "Administrative milestone",
      parentHeavy: "No",
      action: "File cleanly, photograph the moment, and launch official campaign status.",
      leadTime: "Ready now",
      cost: "Low",
      status: "Ready",
      owner: "Candidate",
    },
    {
      id: "evt-victoria",
      month: "May",
      date: "2026-05-18",
      dateLabel: "May 18, 2026",
      name: "Nobleton Victoria Day Fair and Parade",
      location: "Nobleton",
      address: "King Rd and Hwy 27",
      half: "King",
      tier: 1,
      attendance: "5,000-10,000",
      parentHeavy: "Yes",
      action: "Enter parade, assign volunteer captain, prepare family-facing literature.",
      leadTime: "3 months",
      cost: "Medium",
      status: "Urgent",
      owner: "Campaign Manager",
    },
    {
      id: "evt-schomberg",
      month: "June",
      date: "2026-06-13",
      dateLabel: "June 2026",
      name: "Schomberg Main Street Fair",
      location: "Schomberg",
      address: "Main Street, Schomberg",
      half: "King",
      tier: 1,
      attendance: "High local turnout",
      parentHeavy: "Mixed",
      action: "Book vendor space, meet heritage voters, collect volunteer leads.",
      leadTime: "2 months",
      cost: "Low",
      status: "Planning",
      owner: "King Lead",
    },
    {
      id: "evt-canada-day",
      month: "July",
      date: "2026-07-01",
      dateLabel: "July 1, 2026",
      name: "Vaughan Canada Day at NMRP",
      location: "North Maple Regional Park",
      address: "Kirby Rd and Keele St area",
      half: "V1",
      tier: 1,
      attendance: "10,000+",
      parentHeavy: "Yes",
      action: "Visible candidate presence, volunteer shifts, photo/video capture.",
      leadTime: "2 months",
      cost: "Medium",
      status: "Planning",
      owner: "V1 Lead",
    },
    {
      id: "evt-soccer",
      month: "Summer",
      date: "2026-07-18",
      dateLabel: "Summer 2026",
      name: "Vaughan Soccer Club tournaments",
      location: "NMRP and soccer facilities",
      address: "Vaughan",
      half: "V1",
      tier: 1,
      attendance: "Thousands of parents",
      parentHeavy: "Yes",
      action: "Sponsor or volunteer, build sports-family parent network.",
      leadTime: "1-2 months",
      cost: "Medium",
      status: "Planning",
      owner: "Volunteer Captain",
    },
    {
      id: "evt-school-week",
      month: "September",
      date: "2026-09-01",
      dateLabel: "Sept 1-5, 2026",
      name: "First week of school visibility",
      location: "All priority schools",
      address: "Riding-wide",
      half: "Both",
      tier: 1,
      attendance: "Every parent touchpoint",
      parentHeavy: "Yes",
      action: "School-gate schedule, literature, shift captains, principal outreach.",
      leadTime: "1 month",
      cost: "Low",
      status: "Not Started",
      owner: "Campaign Manager",
    },
    {
      id: "evt-binder",
      month: "September",
      date: "2026-09-12",
      dateLabel: "Mid-Sept 2026",
      name: "Kleinburg Binder Twine Festival",
      location: "Kleinburg Village",
      address: "Islington Ave corridor",
      half: "V1",
      tier: 1,
      attendance: "25,000",
      parentHeavy: "Mixed",
      action: "Vendor booth, meet BIA/KARA, recruit volunteers, capture supporter IDs.",
      leadTime: "3 months",
      cost: "Medium",
      status: "Planning",
      owner: "Candidate",
    },
    {
      id: "evt-parent-council",
      month: "September",
      date: "2026-09-15",
      dateLabel: "Sept-Oct 2026",
      name: "Parent Council first meetings",
      location: "Every YRDSB school in riding",
      address: "Riding-wide",
      half: "Both",
      tier: 1,
      attendance: "10-30 engaged parents per school",
      parentHeavy: "Yes",
      action: "Request 5-minute intros, track questions, follow up within 48 hours.",
      leadTime: "Email principals in August",
      cost: "None",
      status: "Not Started",
      owner: "Candidate",
    },
    {
      id: "evt-advance",
      month: "October",
      date: "2026-10-12",
      dateLabel: "Oct 12-22, 2026",
      name: "Estimated advance voting period",
      location: "Verify with Township of King",
      address: "Riding-wide",
      half: "Both",
      tier: 1,
      attendance: "GOTV universe",
      parentHeavy: "Yes",
      action: "Turn IDs into votes, daily chase list, volunteer phone/text shifts.",
      leadTime: "Confirm dates",
      cost: "Low",
      status: "Verify",
      owner: "Campaign Manager",
    },
  ],
  stakeholders: [
    {
      id: "school-new-kleinburg",
      category: "Schools",
      priority: "P1",
      name: "New Kleinburg/Nashville ES",
      type: "Elementary",
      half: "V1",
      address: "Kleinburg/Nashville",
      reach: "Highest priority new-family school",
      why: "Brand new school; parents have no incumbent loyalty.",
      approach: "Email principal in August; attend every school event.",
      talkingPoints: "New school identity, capacity, programming, mental health.",
      status: "Open",
    },
    {
      id: "school-king-city",
      category: "Schools",
      priority: "P1",
      name: "King City PS",
      type: "Elementary",
      half: "King",
      address: "King City",
      reach: "Anchor King elementary",
      why: "Central King parent network and rural busing conversations.",
      approach: "Parent council intro and Saturday library visibility.",
      talkingPoints: "Rural busing, French Immersion, capacity.",
      status: "Open",
    },
    {
      id: "faith-padre-pio",
      category: "Faith Communities",
      priority: "P1",
      name: "St. Padre Pio Church",
      type: "Roman Catholic",
      half: "V1",
      address: "5500 Major Mackenzie Dr W",
      reach: "1,500-3,000 weekly",
      why: "Largest Italian-Catholic parish in V1.",
      approach: "Attend community events, build relationship respectfully.",
      talkingPoints: "Family values, education excellence, community service.",
      status: "Open",
    },
    {
      id: "faith-sacred-heart",
      category: "Faith Communities",
      priority: "P1",
      name: "Sacred Heart Church",
      type: "Roman Catholic",
      half: "King",
      address: "King City",
      reach: "200-500 weekly",
      why: "Italian-Catholic core in King City.",
      approach: "Build authentic relationship through events and volunteerism.",
      talkingPoints: "Family, tradition, character education.",
      status: "Open",
    },
    {
      id: "org-vaughan-soccer",
      category: "Community Orgs",
      priority: "P1",
      name: "Vaughan Soccer Club",
      type: "Youth Sports",
      half: "V1",
      address: "Vaughan",
      reach: "Thousands of parents",
      why: "Largest youth sports network in V1.",
      approach: "Sponsor tournament, attend games, volunteer.",
      talkingPoints: "Youth athletics, school-sport balance, mental health through sport.",
      status: "In Progress",
    },
    {
      id: "org-kleinburg-bia",
      category: "Community Orgs",
      priority: "P1",
      name: "Kleinburg BIA",
      type: "Business",
      half: "V1",
      address: "Kleinburg Village",
      reach: "Village civic network",
      why: "Civic backbone for engaged Kleinburg voters.",
      approach: "Attend meetings and support events.",
      talkingPoints: "Village identity, local business, walkable Kleinburg.",
      status: "Open",
    },
    {
      id: "media-king-sentinel",
      category: "Media",
      priority: "P1",
      name: "King Weekly Sentinel",
      type: "Print/Digital",
      half: "King",
      address: "King Township",
      reach: "Primary King news source",
      why: "Important earned media path for King voters.",
      approach: "Pitch profile, op-eds, community presence.",
      talkingPoints: "Local schools, community visibility, trustee accountability.",
      status: "Open",
    },
    {
      id: "endorse-parent-council",
      category: "Endorsement Targets",
      priority: "P1",
      name: "Parent council chairs",
      type: "Peer validators",
      half: "Both",
      address: "Every school",
      reach: "Most credible voices to parents",
      why: "Peer voices carry weight in low-turnout trustee race.",
      approach: "Build relationships through school visits and testimonials.",
      talkingPoints: "Visibility, responsiveness, school-specific follow-up.",
      status: "Open",
    },
  ],
  outreach: [
    { id: "out-1", date: "2026-04-20", stakeholder: "Kleinburg BIA", method: "Event", outcome: "Intro made, requested follow-up meeting", followUp: "2026-05-03", status: "Open" },
    { id: "out-2", date: "2026-04-22", stakeholder: "Vaughan Soccer Club", method: "Email", outcome: "Asked about summer tournament sponsorship options", followUp: "2026-05-08", status: "Waiting" },
  ],
  zones: [
    {
      id: "zone-new-kleinburg",
      name: "New Kleinburg / Nashville",
      half: "V1",
      tier: 1,
      cadence: "Weekly in peak, bi-weekly Jan-Aug",
      targetDoors: 5200,
      knocked: 640,
      hardIds: 180,
      why: "Highest vote density and highest persuadability among new families.",
      tactics: "Weekend canvasses, school-gate visibility, new-neighbour packet.",
    },
    {
      id: "zone-sonoma",
      name: "Sonoma Heights / West Maple",
      half: "V1",
      tier: 1,
      cadence: "Bi-weekly peak, monthly off-peak",
      targetDoors: 6800,
      knocked: 720,
      hardIds: 210,
      why: "Cluster of YRDSB schools and family-heavy neighbourhoods.",
      tactics: "School-catchment routes, lit-drop every house, door-knock family indicators.",
    },
    {
      id: "zone-king-city-east",
      name: "King City east of Keele",
      half: "King",
      tier: 1,
      cadence: "Weekend door-knock plus library tabling",
      targetDoors: 3200,
      knocked: 410,
      hardIds: 115,
      why: "Most populous King segment with schools and civic institutions.",
      tactics: "King Road visibility, Saturday library, Sacred Heart and United Church relationships.",
    },
    {
      id: "zone-nobleton",
      name: "Nobleton",
      half: "King",
      tier: 1,
      cadence: "Methodical new-subdivision canvass",
      targetDoors: 3000,
      knocked: 380,
      hardIds: 120,
      why: "Tight community, new growth, high Victoria Day leverage.",
      tactics: "Parade, Zancor Centre, Nobleton Library, Tim Hortons commuter mainstreeting.",
    },
    {
      id: "zone-schomberg",
      name: "Schomberg",
      half: "King",
      tier: 2,
      cadence: "Every 2-3 weeks",
      targetDoors: 1500,
      knocked: 150,
      hardIds: 48,
      why: "Smaller but high civic identity and local event attendance.",
      tactics: "Main Street Fair, Trisan Centre, library events, heritage-focused conversations.",
    },
  ],
  locations: [
    { id: "loc-nmrp", name: "North Maple Regional Park", type: "Event hub", half: "V1", tier: 1, lat: 43.8938, lng: -79.5275, note: "Canada Day, soccer tournaments, family recreation area." },
    { id: "loc-kleinburg-library", name: "Kleinburg Library", type: "Community center", half: "V1", tier: 2, lat: 43.8435, lng: -79.6262, note: "Village improvements open houses and civic engagement." },
    { id: "loc-mcmichael", name: "McMichael Canadian Art Collection", type: "Mainstreeting", half: "V1", tier: 2, lat: 43.8434, lng: -79.6156, note: "Weekend family foot traffic." },
    { id: "loc-padre-pio", name: "St. Padre Pio Church", type: "Faith community", half: "V1", tier: 1, lat: 43.8587, lng: -79.5788, note: "Italian-Canadian outreach." },
    { id: "loc-king-library", name: "King City Library", type: "Community center", half: "King", tier: 1, lat: 43.9296, lng: -79.5269, note: "Saturday tabling and family programming." },
    { id: "loc-nobleton", name: "Nobleton Library / Zancor Centre", type: "Community center", half: "King", tier: 1, lat: 43.9026, lng: -79.6536, note: "Sports families and Victoria Day organizing." },
    { id: "loc-schomberg", name: "Trisan Centre", type: "Community center", half: "King", tier: 2, lat: 44.0003, lng: -79.6814, note: "Schomberg anchor." },
    { id: "loc-king-go", name: "King City GO Station", type: "Commuter visibility", half: "King", tier: 2, lat: 43.9199, lng: -79.5264, note: "Weekday rush-hour visibility." },
  ],
  personas: [
    {
      id: "persona-new-family",
      name: "New Kleinburg Parent",
      share: "20-25%",
      where: "New Kleinburg, Impressions, Nashville Heights",
      care: "Capacity, busing, mental health, French Immersion.",
      avoid: "Do not lead with abstract board process or heritage debates.",
      script: "I am running because new schools here are filling faster than they are being built, and parents deserve a trustee who is visible and responsive.",
    },
    {
      id: "persona-nonna",
      name: "Established Maple Italian Grandparent",
      share: "10-15%",
      where: "Older Maple, Sonoma Heights",
      care: "Grandchildren, respect, discipline, heritage, family values.",
      avoid: "Do not rush or dismiss discipline concerns.",
      script: "I want our schools to give every child a strong education with care, respect, and accountability.",
    },
    {
      id: "persona-empty-nester",
      name: "King City Empty-Nester",
      share: "8-10%",
      where: "King City and rural concessions",
      care: "Rural character, fiscal responsibility, trustee accountability.",
      avoid: "Do not promise spending without explaining value.",
      script: "King deserves a trustee who shows up here, listens carefully, and treats the board budget with seriousness.",
    },
    {
      id: "persona-sports",
      name: "Nobleton Sports Family",
      share: "10-12%",
      where: "Nobleton growth zones",
      care: "School-sport balance, capacity, busing, practical governance.",
      avoid: "Do not treat sports as secondary to community life.",
      script: "Nobleton is growing fast, and school routes, programs, and family schedules need a trustee who is paying attention.",
    },
    {
      id: "persona-newcomer",
      name: "Newcomer V1 Family",
      share: "8-12%",
      where: "Western Maple, North Kleinburg",
      care: "Academic excellence, fair treatment, multilingual support, mental health.",
      avoid: "Do not make assumptions about values or system knowledge.",
      script: "I take academic excellence and fair treatment for every student seriously, and I want parents like you to be heard.",
    },
    {
      id: "persona-schomberg",
      name: "Schomberg Heritage Voter",
      share: "5-7%",
      where: "Schomberg, Kettleby, rural King",
      care: "Community heritage, local schools, rural busing, local voice.",
      avoid: "Do not make Schomberg sound like an afterthought.",
      script: "Schomberg families deserve a trustee who shows up here, not just at election time.",
    },
  ],
};

const saved = localStorage.getItem(STORAGE_KEY);
const state = saved ? { ...seedState, ...JSON.parse(saved) } : structuredClone(seedState);

let activeSection = "command";
let activeCrmTab = "Schools";
let mapInstance = null;

const $ = (selector) => document.querySelector(selector);
const formatNumber = (value) => new Intl.NumberFormat("en-CA").format(value);
const daysToElection = () => Math.max(0, Math.ceil((ELECTION_DAY - new Date()) / 86400000));
const pct = (actual, target) => Math.min(100, Math.round((actual / target) * 100));

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function renderNav() {
  $("#navList").innerHTML = sections
    .map(
      (section) => `
        <button class="nav-button ${section.id === activeSection ? "active" : ""}" data-section="${section.id}" type="button">
          <span>${section.label}</span>
          <span class="nav-kicker">${section.kicker}</span>
        </button>
      `,
    )
    .join("");
}

function switchSection(sectionId) {
  activeSection = sectionId;
  document.querySelectorAll(".view").forEach((view) => view.classList.remove("active-view"));
  document.getElementById(sectionId).classList.add("active-view");
  const section = sections.find((item) => item.id === sectionId);
  $("#sectionTitle").textContent = section.label;
  renderNav();
  if (sectionId === "map") setTimeout(renderMap, 0);
}

function roleBrief() {
  const brief = {
    candidate: {
      title: "Candidate view",
      text: "Prioritizes where Dorit needs to show up, who needs a personal follow-up, and what to say in the room.",
      actions: ["Review next 10 days of Tier 1 events.", "Call two open P1 stakeholders.", "Record a brief field note after every appearance."],
    },
    manager: {
      title: "Campaign manager view",
      text: "Prioritizes execution, assignments, data quality, and progress against the campaign math.",
      actions: ["Resolve overdue follow-ups.", "Assign owners for each Tier 1 event.", "Audit goals weekly against the 4,000 hard-ID path."],
    },
    volunteer: {
      title: "Volunteer view",
      text: "Prioritizes shift clarity, canvass zones, quick scripts, and privacy-safe conversation guidance.",
      actions: ["Read the zone card before canvassing.", "Use the persona guide as conversation context only.", "Log outcomes without sensitive personal traits."],
    },
  };
  return brief[state.activeRole] || brief.manager;
}

function renderCommand() {
  const nextEvents = [...state.events]
    .filter((event) => new Date(event.date) >= new Date("2026-04-25"))
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 4);
  const hardIds = state.metrics.find((metric) => metric.key === "hardIds");
  const brief = roleBrief();

  $("#command").innerHTML = `
    <div class="layout-stack">
      <section class="hero-band">
        <div class="hero-copy">
          <div>
            <p class="eyebrow">Dorit for Vaughan King School Board Trustee</p>
            <h2>Know the field. Move the vote.</h2>
          </div>
          <p>A role-aware internal dashboard for turning community presence into measurable campaign progress across King, Vaughan Ward 1, schools, events, stakeholders, and field operations.</p>
          <div class="deadline-row">
            ${deadlineCard("Days to election", daysToElection(), "October 26, 2026")}
            ${deadlineCard("Hard-ID path", `${pct(hardIds.actual, hardIds.target)}%`, `${formatNumber(hardIds.actual)} of ${formatNumber(hardIds.target)}`)}
            ${deadlineCard("Tier 1 events", state.events.filter((event) => event.tier === 1).length, "Must-attend touchpoints")}
            ${deadlineCard("Open follow-ups", state.outreach.filter((item) => item.status !== "Closed").length, "CRM attention needed")}
          </div>
        </div>
        <div class="hero-image" role="img" aria-label="Campaign operations dashboard placeholder visual"></div>
      </section>

      <section class="role-brief">
        <div class="card-topline">
          <div>
            <p class="eyebrow">Current workspace</p>
            <h4>${brief.title}</h4>
          </div>
          <span class="role-pill half-pill">${state.activeRole}</span>
        </div>
        <p>${brief.text}</p>
        <div class="timeline-list">
          ${brief.actions.map((action) => `<div class="timeline-item"><strong>${action}</strong><p>Owner and due date can be assigned from the update forms once Supabase is connected.</p></div>`).join("")}
        </div>
      </section>

      <section>
        <div class="section-heading">
          <div>
            <p class="eyebrow">Infographic metrics</p>
            <h3>Campaign health</h3>
          </div>
        </div>
        <div class="metric-grid">
          ${state.metrics.map(metricCard).join("")}
        </div>
      </section>

      <section>
        <div class="section-heading">
          <div>
            <p class="eyebrow">Next critical moves</p>
            <h3>Upcoming campaign touchpoints</h3>
          </div>
          <button class="table-action" type="button" data-jump="events">Open calendar</button>
        </div>
        <div class="event-list">${nextEvents.map(eventRow).join("")}</div>
      </section>
    </div>
  `;
}

function deadlineCard(label, value, detail) {
  return `<div class="card"><p class="eyebrow">${label}</p><div class="metric-value">${value}</div><p>${detail}</p></div>`;
}

function metricCard(metric) {
  const progress = pct(metric.actual, metric.target);
  return `
    <article class="metric-card">
      <div class="metric-topline">
        <span class="metric-label">${metric.label}</span>
        <span class="status-pill">${progress}%</span>
      </div>
      <div class="metric-value">${formatNumber(metric.actual)}${metric.unit}</div>
      <div class="progress-track" aria-label="${progress}% complete">
        <div class="progress-fill" style="--progress:${progress}%;--fill:${metric.color}"></div>
      </div>
      <p>Target: ${formatNumber(metric.target)}${metric.unit}</p>
    </article>
  `;
}

function eventRow(event) {
  const statusClass = event.status === "Urgent" || event.status === "Verify" ? "warn" : "open";
  return `
    <article class="event-row">
      <div>
        <div class="event-date">${event.dateLabel}</div>
        <span class="tier-pill">Tier ${event.tier}</span>
      </div>
      <div>
        <h4>${event.name}</h4>
        <p>${event.location} - ${event.action}</p>
        <div class="event-meta">
          <span class="half-pill">${event.half}</span>
          <span>${event.parentHeavy} parent-heavy</span>
          <span>Lead time: ${event.leadTime}</span>
          <span>Owner: ${event.owner}</span>
        </div>
      </div>
      <span class="status-pill ${statusClass}">${event.status}</span>
    </article>
  `;
}

function renderEvents() {
  $("#events").innerHTML = `
    <div class="layout-stack">
      <div class="filters">
        <label>Search<input id="eventSearch" type="search" placeholder="Event, location, action" /></label>
        <label>Half<select id="eventHalf"><option value="">All</option><option>King</option><option>V1</option><option>Both</option></select></label>
        <label>Tier<select id="eventTier"><option value="">All</option><option value="1">Tier 1</option><option value="2">Tier 2</option><option value="3">Tier 3</option></select></label>
        <label>Status<select id="eventStatus"><option value="">All</option><option>Ready</option><option>Urgent</option><option>Planning</option><option>Not Started</option><option>Verify</option></select></label>
      </div>
      <div id="eventResults" class="event-list"></div>
    </div>
  `;
  ["eventSearch", "eventHalf", "eventTier", "eventStatus"].forEach((id) => {
    document.getElementById(id).addEventListener("input", updateEventResults);
  });
  updateEventResults();
}

function updateEventResults() {
  const search = $("#eventSearch").value.toLowerCase();
  const half = $("#eventHalf").value;
  const tier = $("#eventTier").value;
  const status = $("#eventStatus").value;
  const events = state.events.filter((event) => {
    const haystack = `${event.name} ${event.location} ${event.action} ${event.owner}`.toLowerCase();
    return (!search || haystack.includes(search)) && (!half || event.half === half) && (!tier || String(event.tier) === tier) && (!status || event.status === status);
  });
  $("#eventResults").innerHTML = events.length ? events.map(eventRow).join("") : `<div class="empty-state">No events match those filters.</div>`;
}

function renderCrm() {
  const categories = ["Schools", "Faith Communities", "Community Orgs", "Media", "Endorsement Targets"];
  $("#crm").innerHTML = `
    <div class="layout-stack">
      <div class="crm-tabs">
        ${categories.map((category) => `<button type="button" class="${category === activeCrmTab ? "active" : ""}" data-crm-tab="${category}">${category}</button>`).join("")}
      </div>
      <div class="filters">
        <label>Search<input id="crmSearch" type="search" placeholder="Name, talking point, approach" /></label>
        <label>Priority<select id="crmPriority"><option value="">All</option><option>P1</option><option>P2</option><option>P3</option></select></label>
        <label>Half<select id="crmHalf"><option value="">All</option><option>King</option><option>V1</option><option>Both</option></select></label>
        <label>Status<select id="crmStatus"><option value="">All</option><option>Open</option><option>In Progress</option><option>Closed</option></select></label>
      </div>
      <div id="crmResults" class="crm-list"></div>
      <section class="data-panel">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Recent relationship logs</p>
            <h3>Follow-up queue</h3>
          </div>
        </div>
        <div class="event-list">
          ${state.outreach.map((item) => `
            <article class="crm-record">
              <div class="crm-meta">
                <h4>${item.stakeholder}</h4>
                <span class="status-pill open">${item.status}</span>
              </div>
              <p>${item.date} via ${item.method}. ${item.outcome}</p>
              <p><strong>Follow-up:</strong> ${item.followUp}</p>
            </article>
          `).join("")}
        </div>
      </section>
    </div>
  `;
  document.querySelectorAll("[data-crm-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      activeCrmTab = button.dataset.crmTab;
      renderCrm();
    });
  });
  ["crmSearch", "crmPriority", "crmHalf", "crmStatus"].forEach((id) => document.getElementById(id).addEventListener("input", updateCrmResults));
  updateCrmResults();
}

function updateCrmResults() {
  const search = $("#crmSearch").value.toLowerCase();
  const priority = $("#crmPriority").value;
  const half = $("#crmHalf").value;
  const status = $("#crmStatus").value;
  const records = state.stakeholders.filter((item) => {
    const haystack = `${item.name} ${item.type} ${item.why} ${item.approach} ${item.talkingPoints}`.toLowerCase();
    return item.category === activeCrmTab && (!search || haystack.includes(search)) && (!priority || item.priority === priority) && (!half || item.half === half) && (!status || item.status === status);
  });
  $("#crmResults").innerHTML = records.length ? records.map(crmRecord).join("") : `<div class="empty-state">No stakeholders match those filters.</div>`;
}

function crmRecord(item) {
  return `
    <article class="crm-record">
      <div class="crm-meta">
        <div>
          <h4>${item.name}</h4>
          <p>${item.type} - ${item.address}</p>
        </div>
        <div>
          <span class="tier-pill">${item.priority}</span>
          <span class="half-pill">${item.half}</span>
        </div>
      </div>
      <p><strong>Why it matters:</strong> ${item.why}</p>
      <p><strong>Approach:</strong> ${item.approach}</p>
      <p><strong>Talking points:</strong> ${item.talkingPoints}</p>
    </article>
  `;
}

function renderMapView() {
  $("#map").innerHTML = `
    <div class="map-layout">
      <div id="campaignMap" aria-label="Campaign map"></div>
      <aside class="map-side-panel">
        <div>
          <p class="eyebrow">Location intelligence</p>
          <h4>Real map when available</h4>
          <p>Leaflet loads real map tiles from OpenStreetMap when internet access is available. If the map library or tiles are unavailable, the app falls back to an offline schematic.</p>
        </div>
        <div class="legend">
          <span><i class="legend-dot" style="background:#075f63"></i> Event hub</span>
          <span><i class="legend-dot" style="background:#d85f4a"></i> Faith or stakeholder site</span>
          <span><i class="legend-dot" style="background:#285f9c"></i> Community center</span>
          <span><i class="legend-dot" style="background:#d6a83f"></i> Commuter/mainstreeting</span>
        </div>
        <div class="event-list">
          ${state.locations.map((loc) => `<article class="card"><strong>${loc.name}</strong><p>${loc.type} - ${loc.half} - Tier ${loc.tier}</p><p>${loc.note}</p></article>`).join("")}
        </div>
      </aside>
    </div>
  `;
}

function renderMap() {
  const target = $("#campaignMap");
  if (!target) return;
  if (!window.L) {
    target.innerHTML = schematicMap();
    return;
  }
  if (mapInstance) {
    mapInstance.remove();
    mapInstance = null;
  }
  mapInstance = L.map("campaignMap", { scrollWheelZoom: false }).setView([43.91, -79.58], 11);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(mapInstance);
  state.locations.forEach((loc) => {
    const marker = L.circleMarker([loc.lat, loc.lng], {
      radius: loc.tier === 1 ? 9 : 7,
      color: "#ffffff",
      weight: 2,
      fillColor: loc.type.includes("Faith") ? "#d85f4a" : loc.type.includes("Community") ? "#285f9c" : loc.type.includes("Commuter") ? "#d6a83f" : "#075f63",
      fillOpacity: 0.95,
    }).addTo(mapInstance);
    marker.bindPopup(`<strong>${loc.name}</strong><br>${loc.type} - ${loc.half}<br>${loc.note}`);
  });
}

function schematicMap() {
  return `
    <div class="schematic-map">
      <div class="map-region">
        <strong>King Township</strong>
        <p>King City, Nobleton, Schomberg, Kettleby, rural concessions</p>
        <i class="map-pin" style="left:38%;top:34%"></i>
        <i class="map-pin" style="left:54%;top:52%;background:#285f9c"></i>
        <i class="map-pin" style="left:22%;top:62%;background:#d6a83f"></i>
      </div>
      <div class="map-region">
        <strong>Vaughan Ward 1</strong>
        <p>Kleinburg, Nashville, western Maple, NMRP, school clusters</p>
        <i class="map-pin" style="left:28%;top:36%"></i>
        <i class="map-pin" style="left:47%;top:42%;background:#d85f4a"></i>
        <i class="map-pin" style="left:62%;top:61%;background:#285f9c"></i>
      </div>
    </div>
  `;
}

function renderGoals() {
  $("#goals").innerHTML = `
    <div class="layout-stack">
      <section>
        <div class="section-heading">
          <div>
            <p class="eyebrow">Vote math</p>
            <h3>Progress against campaign targets</h3>
          </div>
        </div>
        <div class="goal-grid">${state.metrics.map(goalCard).join("")}</div>
      </section>
      <section class="data-panel">
        <p class="eyebrow">Operating principle</p>
        <h4>Measure what the campaign can ethically act on</h4>
        <p>Track campaign actions, consent-safe contact preferences, public organizations, and aggregate field progress. Do not store inferred ethnicity, religion, disability, family status, medical information, or political opinions on individual voters.</p>
      </section>
    </div>
  `;
}

function goalCard(metric) {
  const progress = pct(metric.actual, metric.target);
  return `
    <article class="goal-card">
      <div class="goal-topline">
        <h4>${metric.label}</h4>
        <span class="status-pill">${progress}%</span>
      </div>
      <div class="metric-value">${formatNumber(metric.actual)}</div>
      <div class="progress-track"><div class="progress-fill" style="--progress:${progress}%;--fill:${metric.color}"></div></div>
      <p>${formatNumber(metric.target - metric.actual)} remaining to target ${formatNumber(metric.target)}.</p>
    </article>
  `;
}

function renderField() {
  $("#field").innerHTML = `
    <div class="layout-stack">
      <section>
        <div class="section-heading">
          <div>
            <p class="eyebrow">Canvass command</p>
            <h3>Priority zones</h3>
          </div>
        </div>
        <div class="zone-grid">${state.zones.map(zoneCard).join("")}</div>
      </section>
      <section>
        <div class="section-heading">
          <div>
            <p class="eyebrow">Peak schedule</p>
            <h3>Sept 1 to Oct 26 operating rhythm</h3>
          </div>
        </div>
        <div class="timeline-list">
          ${[
            ["Monday", "Phone bank", "All", "200 calls"],
            ["Tuesday", "School-gate AM and lit drop PM", "V1", "1 school plus 50 doors"],
            ["Wednesday", "School-gate and parent council", "Rotating", "1 school plus 1 council"],
            ["Thursday", "Senior centre or library tabling", "King and V1", "2 venues"],
            ["Saturday", "Door-knock and community event", "Tier 1", "200 doors plus 1 event"],
            ["Sunday", "Place-of-worship relationships and PM canvass", "Rotating", "150 doors"],
          ].map(([day, activity, zone, goal]) => `<article class="timeline-item"><strong>${day}</strong><p>${activity}</p><p>${zone} - ${goal}</p></article>`).join("")}
        </div>
      </section>
    </div>
  `;
}

function zoneCard(zone) {
  const progress = pct(zone.knocked, zone.targetDoors);
  return `
    <article class="zone-card">
      <div class="card-topline">
        <h4>${zone.name}</h4>
        <span class="tier-pill">Tier ${zone.tier}</span>
      </div>
      <p><strong>${zone.half}</strong> - ${zone.cadence}</p>
      <p>${zone.why}</p>
      <p><strong>Tactics:</strong> ${zone.tactics}</p>
      <div class="progress-track"><div class="progress-fill" style="--progress:${progress}%;--fill:#285f9c"></div></div>
      <p>${formatNumber(zone.knocked)} of ${formatNumber(zone.targetDoors)} target doors. ${formatNumber(zone.hardIds)} hard IDs.</p>
    </article>
  `;
}

function renderTraining() {
  $("#training").innerHTML = `
    <div class="layout-stack">
      <section class="data-panel">
        <p class="eyebrow">Volunteer guidance</p>
        <h4>Use personas as conversation context, not voter labels</h4>
        <p>The persona guide helps volunteers listen better and prepare scripts. It should not be stored as a label on an individual voter record.</p>
      </section>
      <section>
        <div class="section-heading">
          <div>
            <p class="eyebrow">Persona and script cards</p>
            <h3>Door conversation guide</h3>
          </div>
        </div>
        <div class="persona-grid">${state.personas.map(personaCard).join("")}</div>
      </section>
      <section class="data-panel">
        <p class="eyebrow">Universal canvassing principles</p>
        <h4>The 60-second rule</h4>
        <p>Every voter starts with patience for a short pitch. Earn the next minute by listening. Ask what is on their mind about schools, write down issues, and follow up within 48 hours when you promise to do so.</p>
      </section>
    </div>
  `;
}

function personaCard(persona) {
  return `
    <article class="persona-card">
      <div class="card-topline">
        <h4>${persona.name}</h4>
        <span class="half-pill">${persona.share}</span>
      </div>
      <p><strong>Where:</strong> ${persona.where}</p>
      <p><strong>Cares about:</strong> ${persona.care}</p>
      <p><strong>Avoid:</strong> ${persona.avoid}</p>
      <p><strong>Sample message:</strong> ${persona.script}</p>
    </article>
  `;
}

function renderForms() {
  $("#forms").innerHTML = `
    <div class="layout-stack">
      <section class="data-panel">
        <p class="eyebrow">Data source plan</p>
        <h4>Local preview now, Supabase source of truth next</h4>
        <p>These forms update local preview state today. With Supabase credentials configured, the same payloads can be sent to the included Edge Function contract for validation, RLS, audit logging, and database updates.</p>
      </section>
      <div class="form-grid">
        <section class="form-panel">
          <h4>Add or update event</h4>
          <form id="eventForm">
            <label>Event name<input name="name" required placeholder="Community event" /></label>
            <label>Date<input name="date" type="date" required /></label>
            <label>Half<select name="half"><option>King</option><option>V1</option><option>Both</option></select></label>
            <label>Tier<select name="tier"><option value="1">Tier 1</option><option value="2">Tier 2</option><option value="3">Tier 3</option><option value="4">Tier 4</option></select></label>
            <label>Action required<textarea name="action" required placeholder="What should the campaign do?"></textarea></label>
            <button class="primary-action" type="submit">Save event</button>
          </form>
        </section>
        <section class="form-panel">
          <h4>Log stakeholder outreach</h4>
          <form id="outreachForm">
            <label>Stakeholder<input name="stakeholder" required placeholder="Organization or contact role" /></label>
            <label>Method<select name="method"><option>Email</option><option>Phone</option><option>Event</option><option>Meeting</option><option>Door</option></select></label>
            <label>Outcome<textarea name="outcome" required placeholder="Consent-safe summary"></textarea></label>
            <label>Follow-up date<input name="followUp" type="date" /></label>
            <button class="primary-action" type="submit">Log outreach</button>
          </form>
        </section>
        <section class="form-panel">
          <h4>Update goal metric</h4>
          <form id="metricForm">
            <label>Metric<select name="metric">${state.metrics.map((metric) => `<option value="${metric.key}">${metric.label}</option>`).join("")}</select></label>
            <label>New actual value<input name="actual" type="number" min="0" required /></label>
            <button class="primary-action" type="submit">Update metric</button>
          </form>
        </section>
        <section class="form-panel">
          <h4>Field zone update</h4>
          <form id="zoneForm">
            <label>Zone<select name="zone">${state.zones.map((zone) => `<option value="${zone.id}">${zone.name}</option>`).join("")}</select></label>
            <label>Doors knocked total<input name="knocked" type="number" min="0" required /></label>
            <label>Hard IDs total<input name="hardIds" type="number" min="0" required /></label>
            <button class="primary-action" type="submit">Update zone</button>
          </form>
        </section>
      </div>
    </div>
  `;
  bindForms();
}

function bindForms() {
  $("#eventForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    state.events.push({
      id: `evt-${Date.now()}`,
      month: new Date(`${data.date}T00:00:00`).toLocaleString("en-CA", { month: "long" }),
      date: data.date,
      dateLabel: new Date(`${data.date}T00:00:00`).toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric" }),
      name: data.name,
      location: "To assign",
      address: "To assign",
      half: data.half,
      tier: Number(data.tier),
      attendance: "To estimate",
      parentHeavy: "To assess",
      action: data.action,
      leadTime: "To assign",
      cost: "To assign",
      status: "Planning",
      owner: state.activeRole === "candidate" ? "Candidate" : "Campaign Manager",
    });
    await persistRecord("events", data);
    saveState();
    rerenderAll();
    toast("Event saved to local preview state.");
  });

  $("#outreachForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    state.outreach.unshift({
      id: `out-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      stakeholder: data.stakeholder,
      method: data.method,
      outcome: data.outcome,
      followUp: data.followUp || "Not set",
      status: "Open",
    });
    await persistRecord("outreach_logs", data);
    saveState();
    rerenderAll();
    toast("Outreach logged. Sensitive traits were not requested or stored.");
  });

  $("#metricForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    const metric = state.metrics.find((item) => item.key === data.metric);
    metric.actual = Number(data.actual);
    await persistRecord("campaign_metrics", data);
    saveState();
    rerenderAll();
    toast("Metric updated.");
  });

  $("#zoneForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    const zone = state.zones.find((item) => item.id === data.zone);
    zone.knocked = Number(data.knocked);
    zone.hardIds = Number(data.hardIds);
    await persistRecord("canvass_zones", data);
    saveState();
    rerenderAll();
    toast("Field zone updated.");
  });
}

let supabaseClient = null;
let currentSession = null;
let currentProfile = null;

function getSupabaseClient() {
  if (supabaseClient) return supabaseClient;
  const config = window.CAMPAIGN_CONFIG || {};
  if (!config.supabaseUrl || !config.supabaseAnonKey) return null;
  if (!window.supabase || !window.supabase.createClient) return null;
  supabaseClient = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey, {
    auth: { persistSession: true, autoRefreshToken: true, storageKey: "dorit-auth" },
  });
  return supabaseClient;
}

function authHeaders() {
  const config = window.CAMPAIGN_CONFIG || {};
  const token = currentSession?.access_token || config.supabaseAnonKey;
  return {
    apikey: config.supabaseAnonKey,
    Authorization: `Bearer ${token}`,
  };
}

async function loadProfile() {
  if (!currentSession) return;
  const client = getSupabaseClient();
  if (!client) return;
  const { data } = await client
    .from("profiles")
    .select("display_name, role")
    .eq("id", currentSession.user.id)
    .single();
  currentProfile = data || null;
  if (data?.role) {
    state.activeRole = data.role;
    saveState();
  }
}

function showLoginOverlay() {
  return new Promise((resolve) => {
    if (!document.getElementById("loginOverlayStyles")) {
      const style = document.createElement("style");
      style.id = "loginOverlayStyles";
      style.textContent = `
        .login-overlay { position: fixed; inset: 0; background: rgba(16, 37, 35, 0.55); display: grid; place-items: center; z-index: 9999; }
        .login-card { background: var(--panel); padding: 28px 32px; border-radius: var(--radius); width: min(380px, 90vw); display: flex; flex-direction: column; gap: 14px; box-shadow: var(--shadow); font-family: inherit; border: 1px solid var(--line); color: var(--ink); }
        .login-card h2 { margin: 0; font-size: 1.4rem; }
        .login-card label { display: flex; flex-direction: column; gap: 4px; font-size: 0.84rem; font-weight: 800; color: var(--ink); }
        .login-card input { padding: 9px 10px; min-height: 40px; border: 1px solid var(--line); border-radius: 6px; font-size: 0.95rem; background: #fff; color: var(--ink); }
        .login-card button { padding: 0 14px; min-height: 40px; border: 1px solid var(--teal); border-radius: 6px; background: var(--teal); color: #fff; font-weight: 800; cursor: pointer; }
        .login-card button:disabled { opacity: 0.6; cursor: progress; }
        .login-error { color: var(--coral); font-size: 0.85rem; margin: 0; font-weight: 800; }
      `;
      document.head.appendChild(style);
    }
    const overlay = document.createElement("div");
    overlay.className = "login-overlay";
    overlay.innerHTML = `
      <form class="login-card">
        <p class="eyebrow">Sign in</p>
        <h2>Dorit Campaign Dashboard</h2>
        <label>Email<input type="email" name="email" required autocomplete="username" /></label>
        <label>Password<input type="password" name="password" required autocomplete="current-password" /></label>
        <p class="login-error" hidden></p>
        <button type="submit">Sign in</button>
      </form>
    `;
    document.body.appendChild(overlay);
    const form = overlay.querySelector("form");
    const errorEl = overlay.querySelector(".login-error");
    const submitBtn = overlay.querySelector("button[type=submit]");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      errorEl.hidden = true;
      submitBtn.disabled = true;
      const fd = new FormData(form);
      const client = getSupabaseClient();
      const { data, error } = await client.auth.signInWithPassword({
        email: fd.get("email"),
        password: fd.get("password"),
      });
      submitBtn.disabled = false;
      if (error) {
        errorEl.textContent = error.message;
        errorEl.hidden = false;
        return;
      }
      currentSession = data.session;
      await loadProfile();
      overlay.remove();
      resolve(currentSession);
    });
  });
}

async function requireAuth() {
  const client = getSupabaseClient();
  if (!client) return null;
  const { data } = await client.auth.getSession();
  if (data?.session) {
    currentSession = data.session;
    await loadProfile();
    return currentSession;
  }
  await showLoginOverlay();
  return currentSession;
}

function injectSignOutButton() {
  if (!currentSession) return;
  if (document.getElementById("signOutButton")) return;
  const actions = document.querySelector(".topbar-actions");
  if (!actions) return;
  const btn = document.createElement("button");
  btn.id = "signOutButton";
  btn.type = "button";
  btn.className = "icon-button";
  btn.title = currentProfile?.display_name ? `Sign out (${currentProfile.display_name})` : "Sign out";
  btn.innerHTML = "<span aria-hidden=\"true\">Sign out</span>";
  btn.addEventListener("click", signOut);
  actions.insertBefore(btn, actions.firstChild);
}

async function signOut() {
  const client = getSupabaseClient();
  if (client) await client.auth.signOut();
  currentSession = null;
  currentProfile = null;
  location.reload();
}

async function persistRecord(table, payload) {
  const config = window.CAMPAIGN_CONFIG || {};
  if (!config.supabaseUrl || !config.supabaseAnonKey || !currentSession) return { mode: "local" };
  const url = `${config.supabaseUrl}/functions/v1/upsert-dashboard-record`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(),
      },
      body: JSON.stringify({ table, payload }),
    });
    return response.ok ? response.json() : { mode: "local", error: await response.text() };
  } catch (error) {
    return { mode: "local", error: error.message };
  }
}

function showBrief() {
  const next = state.events.sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 3);
  const open = state.outreach.filter((item) => item.status !== "Closed").slice(0, 3);
  const brief = roleBrief();
  $("#briefContent").innerHTML = `
    <p>${brief.text}</p>
    <h4>Priority actions</h4>
    <ul>${brief.actions.map((item) => `<li>${item}</li>`).join("")}</ul>
    <h4>Next events</h4>
    <ul>${next.map((event) => `<li><strong>${event.dateLabel}:</strong> ${event.name} - ${event.action}</li>`).join("")}</ul>
    <h4>Follow-up queue</h4>
    <ul>${open.map((item) => `<li><strong>${item.stakeholder}:</strong> ${item.outcome} Follow-up ${item.followUp}.</li>`).join("")}</ul>
  `;
  $("#briefDialog").showModal();
}

function toast(message) {
  const existing = $(".toast");
  if (existing) existing.remove();
  const node = document.createElement("div");
  node.className = "toast";
  node.textContent = message;
  document.body.appendChild(node);
  setTimeout(() => node.remove(), 3400);
}

function rerenderAll() {
  renderCommand();
  renderEvents();
  renderCrm();
  renderMapView();
  renderGoals();
  renderField();
  renderTraining();
  renderForms();
  switchSection(activeSection);
}

async function hydrateFromSupabase() {
  const config = window.CAMPAIGN_CONFIG || {};
  if (!config.supabaseUrl || !config.supabaseAnonKey || !currentSession) return;
  try {
    const response = await fetch(`${config.supabaseUrl}/functions/v1/dashboard-read-model`, {
      headers: authHeaders(),
    });
    if (!response.ok) return;
    const remote = await response.json();
    if (remote.metrics?.length) state.metrics = remote.metrics;
    if (remote.events?.length) state.events = remote.events.map(mapRemoteEvent);
    if (remote.stakeholders?.length) state.stakeholders = remote.stakeholders.map(mapRemoteStakeholder);
    if (remote.outreach?.length) state.outreach = remote.outreach.map(mapRemoteOutreach);
    if (remote.zones?.length) state.zones = remote.zones.map(mapRemoteZone);
    if (remote.locations?.length) state.locations = remote.locations.map(mapRemoteLocation);
    if (remote.training?.length) state.personas = remote.training.map(mapRemoteTraining);
  } catch (error) {
    console.warn("Supabase hydration failed; using local preview state.", error);
  }
}

function mapRemoteEvent(event) {
  return {
    id: event.id,
    month: event.month || "",
    date: event.date,
    dateLabel: event.date_label || event.date,
    name: event.name,
    location: event.location || "To assign",
    address: event.address || "To assign",
    half: event.half,
    tier: event.tier,
    attendance: event.attendance_estimate || "To estimate",
    parentHeavy: event.parent_heavy || "To assess",
    action: event.action_required || "",
    leadTime: event.lead_time || "",
    cost: event.cost || "",
    status: event.status,
    owner: event.owner_profile_id ? "Assigned" : "Unassigned",
  };
}

function mapRemoteStakeholder(item) {
  return {
    id: item.id,
    category: item.category,
    priority: item.priority,
    name: item.name,
    type: item.type || "",
    half: item.half,
    address: item.address || "",
    reach: item.community_reach || "",
    why: item.why_it_matters || "",
    approach: item.outreach_approach || "",
    talkingPoints: item.talking_points || "",
    status: item.status,
  };
}

function mapRemoteOutreach(item) {
  return {
    id: item.id,
    date: item.created_at?.slice(0, 10) || "",
    stakeholder: item.stakeholder_name || item.contact_role || "Stakeholder",
    method: item.method,
    outcome: item.outcome,
    followUp: item.follow_up_date || "Not set",
    status: item.status,
  };
}

function mapRemoteZone(zone) {
  return {
    id: zone.id,
    name: zone.name,
    half: zone.half,
    tier: zone.tier,
    cadence: zone.cadence || "",
    targetDoors: zone.target_doors || 0,
    knocked: zone.doors_knocked || 0,
    hardIds: zone.hard_ids || 0,
    why: zone.priority_reason || "",
    tactics: zone.tactics || "",
  };
}

function mapRemoteLocation(loc) {
  return {
    id: loc.id,
    name: loc.name,
    type: loc.type,
    half: loc.half,
    tier: loc.tier || 2,
    lat: Number(loc.latitude),
    lng: Number(loc.longitude),
    note: loc.notes || "",
  };
}

function mapRemoteTraining(card) {
  return {
    id: card.id,
    name: card.title,
    share: card.category,
    where: card.where_to_find || "",
    care: card.cares_about || "",
    avoid: card.avoid || "",
    script: card.sample_message || "",
  };
}

async function init() {
  await requireAuth();
  await hydrateFromSupabase();
  injectSignOutButton();
  $("#roleSelect").value = state.activeRole;
  $("#roleSelect").addEventListener("change", (event) => {
    state.activeRole = event.target.value;
    saveState();
    rerenderAll();
  });
  $("#navList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-section]");
    if (button) switchSection(button.dataset.section);
  });
  document.body.addEventListener("click", (event) => {
    const jump = event.target.closest("[data-jump]");
    if (jump) switchSection(jump.dataset.jump);
  });
  $("#briefButton").addEventListener("click", showBrief);
  $("#syncButton").addEventListener("click", () => toast("Local preview data is current. Supabase sync activates when credentials are configured."));
  rerenderAll();
}

init();
