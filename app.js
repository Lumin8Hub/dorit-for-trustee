const ELECTION_DAY = new Date("2026-10-26T20:00:00-04:00");
const STORAGE_KEY = "dorit-dashboard-preview-state";

const sections = [
  { id: "command", label: "Command Center", kicker: "Live", roles: ["candidate", "manager"] },
  { id: "today", label: "Today Brief", kicker: "Go", roles: ["candidate"] },
  { id: "events", label: "Events Calendar", kicker: "Plan", roles: ["candidate", "manager"] },
  { id: "relationships", label: "Relationships", kicker: "Call", roles: ["candidate"] },
  { id: "crm", label: "Stakeholder CRM", kicker: "Build", roles: ["manager"] },
  { id: "map", label: "Map Intelligence", kicker: "Field", roles: ["candidate", "manager"] },
  { id: "goals", label: "Campaign Goals", kicker: "Track", roles: ["manager"] },
  { id: "field", label: "Field Ops", kicker: "Move", roles: ["manager"] },
  { id: "forms", label: "Update Forms", kicker: "Input", roles: ["manager"] },
  { id: "accounts", label: "Accounts", kicker: "Approve", roles: ["candidate", "manager"] },
  { id: "field-notes", label: "Field Notes", kicker: "Log", roles: ["candidate"] },
  { id: "my-shift", label: "My Shift", kicker: "Start", roles: ["volunteer"] },
  { id: "my-zone", label: "My Zone", kicker: "Map", roles: ["volunteer"] },
  { id: "training", label: "Volunteer Briefing", kicker: "Train", roles: ["volunteer"] },
  { id: "submit-report", label: "Submit Report", kicker: "Log", roles: ["volunteer"] },
  { id: "availability", label: "Availability", kicker: "Plan", roles: ["volunteer"] },
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
  localProfile: {
    id: "local-manager",
    display_name: "Local Campaign Manager",
    email: "local.manager@example.com",
    role: "manager",
    approval_status: "approved",
  },
  accounts: [
    {
      id: "acct-pending-1",
      display_name: "Maya Volunteer",
      email: "maya.volunteer@example.com",
      phone: "Optional",
      role: "volunteer",
      approval_status: "pending",
      community_preference: "Nobleton",
      zone_preference: "zone-nobleton",
      availability_note: "Weekends after 10 AM",
      volunteer_interests: ["Canvassing", "Events"],
      created_at: "2026-04-25",
    },
    {
      id: "acct-volunteer-1",
      display_name: "Alex Field Volunteer",
      email: "alex.volunteer@example.com",
      phone: "Optional",
      role: "volunteer",
      approval_status: "approved",
      community_preference: "New Kleinburg",
      zone_preference: "zone-new-kleinburg",
      availability_note: "Tuesday evenings and Saturdays",
      volunteer_interests: ["Door knocking", "Literature drops"],
      created_at: "2026-04-18",
    },
  ],
  approvalLog: [
    {
      id: "approval-1",
      profile_id: "acct-volunteer-1",
      actor_name: "Local Campaign Manager",
      action: "approve",
      note: "Seed approval for preview mode.",
      created_at: "2026-04-19",
    },
  ],
  assignments: [
    {
      id: "assign-1",
      volunteer_profile_id: "acct-volunteer-1",
      title: "Saturday New Kleinburg canvass",
      type: "Canvass",
      date: "2026-05-09",
      start_time: "10:00",
      end_time: "13:00",
      location: "Garnet Williams Way staging point",
      zone_id: "zone-new-kleinburg",
      instructions: "Meet the shift captain, pick up literature, and log doors plus issue notes after the shift.",
      status: "assigned",
    },
    {
      id: "assign-2",
      volunteer_profile_id: "acct-volunteer-1",
      title: "Nobleton Victoria Day prep call",
      type: "Event",
      date: "2026-05-12",
      start_time: "19:00",
      end_time: "19:45",
      location: "Phone bank",
      zone_id: "zone-nobleton",
      instructions: "Confirm parade volunteers and flag unanswered questions for the campaign manager.",
      status: "assigned",
    },
  ],
  availability: [
    {
      id: "availability-1",
      volunteer_profile_id: "acct-volunteer-1",
      weekdays: "Tuesday evenings",
      weekends: "Saturday mornings",
      communities: "New Kleinburg, Nobleton",
      interests: "Canvassing, literature drops",
      notes: "Can drive two other volunteers.",
    },
  ],
  volunteerReports: [],
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
const canManageAccounts = () => ["candidate", "manager"].includes(actualRole());
const isApprovedProfile = (profile = effectiveProfile()) => (profile.approval_status || "approved") === "approved";

let viewAsRole = null;

function actualRole() {
  if (currentProfile?.role) return currentProfile.role;
  return (state.localProfile && state.localProfile.role) || state.activeRole || "manager";
}

function canPreviewRoles() {
  return actualRole() === "manager";
}

function effectiveProfile() {
  const base = currentProfile
    ? normalizeProfile(currentProfile)
    : normalizeProfile(state.localProfile || { role: state.activeRole || "manager", approval_status: "approved" });
  if (viewAsRole && canPreviewRoles() && viewAsRole !== base.role) {
    return {
      ...base,
      role: viewAsRole,
      approval_status: "approved",
      _previewing: true,
    };
  }
  return base;
}

function setViewAsRole(role) {
  if (!canPreviewRoles()) return;
  viewAsRole = role && role !== actualRole() ? role : null;
  rerenderAll();
}

function normalizeProfile(profile) {
  const role = profile.role || "volunteer";
  return {
    ...profile,
    display_name: profile.display_name || profile.displayName || profile.email || "Campaign user",
    email: profile.email || "",
    role,
    approval_status: profile.approval_status || (role === "volunteer" ? "pending" : "approved"),
  };
}

function roleSections() {
  const profile = effectiveProfile();
  if (!isApprovedProfile(profile)) return [];
  return sections.filter((section) => section.roles.includes(profile.role));
}

function sectionById(sectionId) {
  return sections.find((item) => item.id === sectionId);
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function renderNav() {
  const visible = roleSections();
  $("#navList").innerHTML = visible
    .map(
      (section) => `
        <button class="nav-button ${section.id === activeSection ? "active" : ""}" data-section="${section.id}" type="button">
          <span>${section.label}</span>
          <span class="nav-kicker">${section.kicker}</span>
        </button>
      `,
    )
    .join("");
  renderBottomNav(visible);
  renderProfileBlock();
}

function switchSection(sectionId) {
  const visible = roleSections();
  const target = visible.some((section) => section.id === sectionId) ? sectionId : visible[0]?.id || "command";
  if (!document.getElementById(target)) return;
  activeSection = target;
  document.querySelectorAll(".view").forEach((view) => view.classList.remove("active-view"));
  document.getElementById(target).classList.add("active-view");
  const section = sectionById(target);
  $("#sectionTitle").textContent = section.label;
  renderNav();
  document.querySelectorAll(".bottom-nav .bn-item, .bottom-nav .bn-fab").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.section === target);
  });
  closeMoreSheet();
  if (target === "map" || target === "my-zone") setTimeout(renderMap, 0);
}

function renderProfileBlock() {
  const profile = effectiveProfile();
  const name = $("#profileName");
  const role = $("#profileRole");
  const status = $("#profileStatus");
  if (!name || !role || !status) return;
  const previewing = profile._previewing === true;
  name.textContent = profile.display_name;
  const roleLabel = previewing
    ? `${prettyRole(actualRole())} - viewing as ${prettyRole(profile.role)}`
    : `${prettyRole(profile.role)}${profile.email ? ` - ${profile.email}` : ""}`;
  role.textContent = roleLabel;
  status.textContent = previewing ? "preview mode" : profile.approval_status;
  status.className = `status-pill ${previewing ? "warn" : profile.approval_status === "approved" ? "open" : "warn"}`;
  renderViewAsToggle();
}

function renderViewAsToggle() {
  const block = document.querySelector(".role-block");
  if (!block) return;
  let toggle = document.getElementById("viewAsToggle");
  if (!canPreviewRoles()) {
    if (toggle) toggle.remove();
    return;
  }
  if (!toggle) {
    toggle = document.createElement("div");
    toggle.id = "viewAsToggle";
    toggle.className = "view-as-toggle";
    block.appendChild(toggle);
    toggle.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-view-as]");
      if (!button) return;
      const choice = button.dataset.viewAs;
      setViewAsRole(choice === "manager" ? null : choice);
    });
  }
  const current = viewAsRole || "manager";
  toggle.innerHTML = `
    <p class="eyebrow">View as</p>
    <div class="view-as-buttons" role="group" aria-label="Preview the dashboard as another role">
      <button type="button" data-view-as="manager" class="${current === "manager" ? "active" : ""}" aria-pressed="${current === "manager"}">Manager</button>
      <button type="button" data-view-as="candidate" class="${current === "candidate" ? "active" : ""}" aria-pressed="${current === "candidate"}">Candidate</button>
      <button type="button" data-view-as="volunteer" class="${current === "volunteer" ? "active" : ""}" aria-pressed="${current === "volunteer"}">Volunteer</button>
    </div>
    ${viewAsRole ? `<p class="view-as-hint">Previewing the ${prettyRole(viewAsRole)} navigation and content. Switch back to Manager when you are done.</p>` : ""}
  `;
}

function prettyRole(role) {
  return role === "manager" ? "Campaign Manager" : role.charAt(0).toUpperCase() + role.slice(1);
}

function renderBottomNav(visible = roleSections()) {
  const bottom = document.getElementById("bottomNav");
  if (!bottom) return;
  const primary = visible.slice(0, 3);
  const addTarget = visible.find((section) => ["forms", "field-notes", "submit-report"].includes(section.id)) || primary[0];
  bottom.innerHTML = `
    ${primary.map((section) => bottomNavButton(section)).join("")}
    ${addTarget ? `<button class="bn-fab" data-section="${addTarget.id}" type="button" aria-label="${addTarget.label}">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6z"/></svg>
    </button>` : ""}
    <button class="bn-item" id="bottomMoreBtn" type="button" aria-haspopup="true">
      <svg class="bn-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="12" r="2" fill="currentColor"/><circle cx="12" cy="12" r="2" fill="currentColor"/><circle cx="18" cy="12" r="2" fill="currentColor"/></svg>
      <span>More</span>
    </button>
  `;
}

function bottomNavButton(section) {
  return `
    <button class="bn-item ${section.id === activeSection ? "active" : ""}" data-section="${section.id}" type="button">
      <svg class="bn-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 5h16v2H4zM4 11h16v2H4zM4 17h10v2H4z"/></svg>
      <span>${section.label.split(" ")[0]}</span>
    </button>
  `;
}

function openMoreSheet() {
  const sheet = document.getElementById("moreSheet");
  const list = document.getElementById("moreSheetList");
  if (!sheet || !list) return;
  list.innerHTML = roleSections()
    .map(
      (section) => `
        <button type="button" data-section="${section.id}">
          <span>${section.label}</span>
          <span class="nav-kicker">${section.kicker}</span>
        </button>
      `,
    )
    .join("");
  sheet.hidden = false;
}

function closeMoreSheet() {
  const sheet = document.getElementById("moreSheet");
  if (sheet) sheet.hidden = true;
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
  return brief[effectiveProfile().role] || brief.manager;
}

function renderCommand() {
  const nextEvents = [...state.events]
    .filter((event) => new Date(event.date) >= new Date("2026-04-25"))
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 4);
  const hardIds = state.metrics.find((metric) => metric.key === "hardIds") || { actual: 0, target: 4000 };
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
            ${deadlineCard("Open follow-ups", (state.outreach || []).filter((item) => item.status !== "Closed").length, "CRM attention needed")}
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
          <span class="role-pill half-pill">${effectiveProfile().role}</span>
        </div>
        <p>${brief.text}</p>
        <div class="timeline-list">
          ${brief.actions.map((action, i) => `
            <article class="timeline-item action-card">
              <div class="action-icon">${actionIcon(i)}</div>
              <strong>${action}</strong>
              <p>Owner and due date can be assigned from the update forms once Supabase is connected.</p>
              <a class="action-link" href="#" data-jump="forms">Open task <span aria-hidden="true">→</span></a>
            </article>
          `).join("")}
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

function renderToday() {
  const candidateEvents = [...state.events]
    .filter((event) => event.tier === 1)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);
  const p1Stakeholders = state.stakeholders.filter((item) => item.priority === "P1").slice(0, 4);
  $("#today").innerHTML = `
    <div class="layout-stack">
      <section class="role-brief">
        <div class="card-topline">
          <div>
            <p class="eyebrow">Candidate cockpit</p>
            <h4>Dorit's next best moves</h4>
          </div>
          <span class="role-pill half-pill">Candidate</span>
        </div>
        <div class="timeline-list">
          <article class="timeline-item"><strong>Show up</strong><p>Prioritize the next Tier 1 event where Dorit personally needs to be visible.</p></article>
          <article class="timeline-item"><strong>Follow up</strong><p>Call two P1 relationship contacts and log a consent-safe note.</p></article>
          <article class="timeline-item"><strong>Prepare remarks</strong><p>Use school capacity, visibility, mental health, and accountability as the local frame.</p></article>
          <article class="timeline-item"><strong>Capture proof</strong><p>After every appearance, add one field note and one follow-up action.</p></article>
        </div>
      </section>
      <section>
        <div class="section-heading"><div><p class="eyebrow">Upcoming Tier 1 appearances</p><h3>Where Dorit should be seen</h3></div></div>
        <div class="event-list">${candidateEvents.map(eventRow).join("")}</div>
      </section>
      <section>
        <div class="section-heading"><div><p class="eyebrow">Relationship priorities</p><h3>Candidate follow-ups</h3></div></div>
        <div class="stakeholder-grid">${p1Stakeholders.map(relationshipCard).join("")}</div>
      </section>
    </div>
  `;
}

function renderRelationships() {
  const records = state.stakeholders.filter((item) => item.priority === "P1");
  $("#relationships").innerHTML = `
    <div class="layout-stack">
      <section class="data-panel">
        <p class="eyebrow">Candidate relationship map</p>
        <h4>High-trust relationships Dorit should personally own</h4>
        <p>This view keeps the candidate focused on strategic conversations, not CRM administration. It highlights priority schools, faith communities, local organizations, media, and endorsement paths.</p>
      </section>
      <div class="stakeholder-grid">${records.map(relationshipCard).join("")}</div>
    </div>
  `;
}

function relationshipCard(item) {
  return `
    <article class="card">
      <div class="card-topline">
        <h4>${item.name}</h4>
        <span class="tier-pill">${item.priority}</span>
      </div>
      <p><strong>${item.category}</strong> - ${item.type} - ${item.half}</p>
      <p>${item.why}</p>
      <p><strong>Candidate ask:</strong> ${item.approach}</p>
    </article>
  `;
}

function renderFieldNotes() {
  $("#field-notes").innerHTML = `
    <div class="layout-stack">
      <section class="data-panel">
        <p class="eyebrow">Candidate field notes</p>
        <h4>Log what Dorit heard and promised</h4>
        <p>Keep notes consent-safe: organization, context, issue, and follow-up. Do not record sensitive traits about individual voters.</p>
      </section>
      <div class="form-grid">
        <section class="form-panel">
          <h4>Log appearance or stakeholder note</h4>
          <form id="candidateNoteForm">
            <label>Context<input name="stakeholder" required placeholder="Event, school, organization, or contact role" /></label>
            <label>Method<select name="method"><option>Event</option><option>Meeting</option><option>Phone</option><option>Email</option></select></label>
            <label>Note<textarea name="outcome" required placeholder="What was heard, promised, or needs follow-up?"></textarea></label>
            <label>Follow-up date<input name="followUp" type="date" /></label>
            <button class="primary-action" type="submit">Save field note</button>
          </form>
        </section>
        <section class="data-panel">
          <h4>Recent notes</h4>
          <div class="event-list">${state.outreach.slice(0, 6).map((item) => `<article class="crm-record"><strong>${item.stakeholder}</strong><p>${item.outcome}</p><p>Follow-up: ${item.followUp}</p></article>`).join("")}</div>
        </section>
      </div>
    </div>
  `;
  $("#candidateNoteForm").addEventListener("submit", handleOutreachSubmit);
}

function renderAccounts() {
  if (!canManageAccounts()) {
    $("#accounts").innerHTML = `<div class="empty-state">Account administration is only available to Candidate and Campaign Manager accounts.</div>`;
    return;
  }
  const pending = state.accounts.filter((account) => account.approval_status === "pending");
  const active = state.accounts.filter((account) => account.approval_status !== "pending");
  $("#accounts").innerHTML = `
    <div class="layout-stack">
      <section class="data-panel">
        <div class="card-topline">
          <div>
            <p class="eyebrow">Volunteer account approvals</p>
            <h4>Review new volunteer signups before dashboard access</h4>
          </div>
          <span class="status-pill warn">${pending.length} pending</span>
        </div>
        <p>Candidate and Campaign Manager accounts can approve, reject, suspend, and reactivate volunteers. Pending, rejected, and suspended users cannot read campaign data.</p>
      </section>
      <section>
        <div class="section-heading"><div><p class="eyebrow">Pending</p><h3>New volunteer requests</h3></div></div>
        <div class="event-list">${pending.length ? pending.map(accountCard).join("") : `<div class="empty-state">No pending volunteer accounts.</div>`}</div>
      </section>
      <section>
        <div class="section-heading"><div><p class="eyebrow">Account roster</p><h3>Approved, rejected, and suspended users</h3></div></div>
        <div class="event-list">${active.map(accountCard).join("")}</div>
      </section>
      <section class="data-panel">
        <div class="section-heading"><div><p class="eyebrow">Audit trail</p><h3>Approval history</h3></div></div>
        <div class="event-list">${state.approvalLog.map((log) => `<article class="crm-record"><strong>${log.action}</strong><p>${log.actor_name || "Approver"} updated ${accountName(log.profile_id)} on ${log.created_at?.slice?.(0, 10) || log.created_at}.</p><p>${log.note || ""}</p></article>`).join("")}</div>
      </section>
    </div>
  `;
  document.querySelectorAll("[data-account-action]").forEach((button) => {
    button.addEventListener("click", () => approveAccount(button.dataset.profileId, button.dataset.accountAction));
  });
}

function accountCard(account) {
  const actions = account.approval_status === "pending"
    ? ["approve", "reject"]
    : account.approval_status === "suspended"
      ? ["reactivate"]
      : ["suspend"];
  return `
    <article class="event-row">
      <div>
        <span class="status-pill ${account.approval_status === "approved" ? "open" : "warn"}">${account.approval_status}</span>
      </div>
      <div>
        <h4>${account.display_name}</h4>
        <p>${account.email} - ${prettyRole(account.role)}</p>
        <div class="event-meta">
          <span>Community: ${account.community_preference || "Not provided"}</span>
          <span>Zone: ${zoneName(account.zone_preference)}</span>
          <span>Interests: ${(account.volunteer_interests || []).join(", ") || "Not provided"}</span>
        </div>
        <p>${account.availability_note || ""}</p>
      </div>
      <div class="account-actions">
        ${actions.map((action) => `<button class="table-action" type="button" data-profile-id="${account.id}" data-account-action="${action}">${action}</button>`).join("")}
      </div>
    </article>
  `;
}

function accountName(profileId) {
  return state.accounts.find((account) => account.id === profileId)?.display_name || "an account";
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
        ${donutSVG(progress, metric.color)}
      </div>
      <div class="metric-value">${formatNumber(metric.actual)}${metric.unit}</div>
      ${sparklineSVG(metric)}
      <div class="progress-track" aria-label="${progress}% complete">
        <div class="progress-fill" style="--progress:${progress}%;--fill:${metric.color}"></div>
      </div>
      <p>Target: ${formatNumber(metric.target)}${metric.unit}</p>
    </article>
  `;
}

function makeSpark(metric) {
  const target = metric.target || 1;
  const actual = metric.actual || 0;
  const seed = [...metric.key].reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return Array.from({ length: 12 }, (_, i) => {
    const t = i / 11;
    const base = actual * (0.18 + 0.82 * t);
    const wobble = Math.sin(seed * 0.7 + i * 1.3) * (target * 0.025);
    return Math.max(0, base + wobble);
  });
}

function sparklineSVG(metric) {
  const points = makeSpark(metric);
  const max = Math.max(...points, 1);
  const min = Math.min(...points, 0);
  const range = max - min || 1;
  const w = 100;
  const h = 30;
  const coords = points.map((v, i) => {
    const x = (i / (points.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 2) - 1;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const path = `M${coords.join(" L")}`;
  const fillPath = `${path} L${w},${h} L0,${h} Z`;
  const safeColor = metric.color || "var(--teal)";
  return `<svg class="spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true">
    <path d="${fillPath}" fill="${safeColor}" opacity="0.12"/>
    <path d="${path}" fill="none" stroke="${safeColor}" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/>
  </svg>`;
}

function donutSVG(percent, color) {
  const r = 16;
  const c = 2 * Math.PI * r;
  const filled = Math.max(0, Math.min(100, percent)) / 100 * c;
  const fill = color || "var(--teal)";
  return `<svg class="donut" viewBox="0 0 40 40" aria-hidden="true">
    <circle cx="20" cy="20" r="${r}" fill="none" stroke="#ebe5d8" stroke-width="4"/>
    <circle cx="20" cy="20" r="${r}" fill="none" stroke="${fill}" stroke-width="4" stroke-linecap="round"
      stroke-dasharray="${filled.toFixed(1)} ${c.toFixed(1)}" transform="rotate(-90 20 20)"/>
    <text x="20" y="22.5" text-anchor="middle" font-size="10" font-weight="800" fill="#18211f" font-family="Inter, sans-serif">${percent}%</text>
  </svg>`;
}

const ACTION_ICONS = [
  '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg>',
  '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M3 10v4l9 5V5zM16 7v10c1.66-1 3-2.83 3-5s-1.34-4-3-5z"/></svg>',
  '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>',
  '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>',
];

function actionIcon(i) {
  return ACTION_ICONS[i % ACTION_ICONS.length];
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

let mapResizeObserver = null;

function renderMap() {
  const targetId = activeSection === "my-zone" ? "volunteerMap" : "campaignMap";
  const target = document.getElementById(targetId);
  if (!target) return;
  if (!window.L) {
    target.innerHTML = schematicMap();
    return;
  }
  // Wait until the container actually has dimensions. Without this, Leaflet
  // initializes against a 0x0 box and tiles end up stacked in a vertical strip.
  if (target.clientWidth === 0 || target.clientHeight === 0) {
    requestAnimationFrame(renderMap);
    return;
  }
  if (mapInstance) {
    mapInstance.remove();
    mapInstance = null;
  }
  if (mapResizeObserver) {
    mapResizeObserver.disconnect();
    mapResizeObserver = null;
  }
  mapInstance = L.map(targetId, { scrollWheelZoom: false }).setView([43.91, -79.58], 11);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(mapInstance);
  const assignedHalves = new Set(
    volunteerAssignments()
      .map((assignment) => state.zones.find((zone) => zone.id === assignment.zone_id)?.half)
      .filter(Boolean),
  );
  const locations = activeSection === "my-zone"
    ? state.locations.filter((loc) => assignedHalves.has(loc.half) || loc.half === "Both")
    : state.locations;
  locations.filter((loc) => Number.isFinite(loc.lat) && Number.isFinite(loc.lng)).forEach((loc) => {
    const marker = L.circleMarker([loc.lat, loc.lng], {
      radius: loc.tier === 1 ? 9 : 7,
      color: "#ffffff",
      weight: 2,
      fillColor: loc.type.includes("Faith") ? "#d85f4a" : loc.type.includes("Community") ? "#285f9c" : loc.type.includes("Commuter") ? "#d6a83f" : "#075f63",
      fillOpacity: 0.95,
    }).addTo(mapInstance);
    marker.bindPopup(`<strong>${loc.name}</strong><br>${loc.type} - ${loc.half}<br>${loc.note}`);
  });
  // Belt-and-suspenders: force Leaflet to recompute tile layout once the
  // browser has finished laying out the now-visible container, and again
  // whenever the container resizes (sidebar collapse, window resize, etc.).
  const refreshSize = () => {
    if (!mapInstance) return;
    mapInstance.invalidateSize(false);
  };
  requestAnimationFrame(() => requestAnimationFrame(refreshSize));
  setTimeout(refreshSize, 250);
  if (typeof ResizeObserver !== "undefined") {
    mapResizeObserver = new ResizeObserver(refreshSize);
    mapResizeObserver.observe(target);
  }
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

function renderMyShift() {
  const assignments = volunteerAssignments();
  $("#my-shift").innerHTML = `
    <div class="layout-stack">
      <section class="role-brief">
        <div class="card-topline">
          <div>
            <p class="eyebrow">Volunteer shift view</p>
            <h4>Your next campaign assignments</h4>
          </div>
          <span class="role-pill half-pill">Volunteer</span>
        </div>
        <p>Start here before a shift. Review the location, instructions, and privacy-safe reporting expectations.</p>
      </section>
      <div class="event-list">${assignments.length ? assignments.map(assignmentCard).join("") : `<div class="empty-state">No assignments yet. Submit your availability so the campaign manager can place you.</div>`}</div>
    </div>
  `;
}

function renderMyZone() {
  const assignments = volunteerAssignments();
  const zoneIds = [...new Set(assignments.map((assignment) => assignment.zone_id).filter(Boolean))];
  const zones = state.zones.filter((zone) => zoneIds.includes(zone.id));
  const locations = state.locations.filter((loc) => zones.some((zone) => zone.half === loc.half)).slice(0, 6);
  $("#my-zone").innerHTML = `
    <div class="layout-stack">
      <section class="data-panel">
        <p class="eyebrow">Volunteer map</p>
        <h4>Your assigned area</h4>
        <p>This volunteer view shows assigned zones and practical staging locations. Full CRM and strategic notes are hidden.</p>
      </section>
      <div class="zone-grid">${zones.length ? zones.map(zoneCard).join("") : `<div class="empty-state">No assigned zone yet.</div>`}</div>
      <section class="map-layout">
        <div id="volunteerMap" aria-label="Volunteer campaign map"></div>
        <aside class="map-side-panel">
          <h4>Useful locations</h4>
          ${locations.map((loc) => `<article class="card"><strong>${loc.name}</strong><p>${loc.type} - ${loc.note}</p></article>`).join("")}
        </aside>
      </section>
    </div>
  `;
}

function renderSubmitReport() {
  const assignments = volunteerAssignments();
  $("#submit-report").innerHTML = `
    <div class="layout-stack">
      <section class="data-panel">
        <p class="eyebrow">Volunteer report</p>
        <h4>Submit shift notes and totals</h4>
        <p>Report doors, hard IDs, and campaign issues. Do not record sensitive traits or assign persona labels to individual people.</p>
      </section>
      <section class="form-panel">
        <form id="volunteerReportForm">
          <label>Assignment<select name="assignment_id">${assignments.map((assignment) => `<option value="${assignment.id}">${assignment.title}</option>`).join("")}<option value="">General volunteer note</option></select></label>
          <label>Report type<select name="report_type"><option>Canvass</option><option>Event</option><option>Phone bank</option><option>General note</option></select></label>
          <label>Doors knocked<input name="doors_knocked" type="number" min="0" value="0" /></label>
          <label>Hard IDs<input name="hard_ids" type="number" min="0" value="0" /></label>
          <label>Issue note<textarea name="issue_note" placeholder="What did voters or attendees raise?"></textarea></label>
          <label>Shift note<textarea name="shift_note" required placeholder="What happened and what should the campaign know?"></textarea></label>
          <button class="primary-action" type="submit">Submit report</button>
        </form>
      </section>
    </div>
  `;
  $("#volunteerReportForm").addEventListener("submit", handleVolunteerReportSubmit);
}

function renderAvailability() {
  const availability = volunteerAvailability();
  $("#availability").innerHTML = `
    <div class="layout-stack">
      <section class="form-panel">
        <h4>Update availability</h4>
        <form id="availabilityForm">
          <label>Weekday availability<input name="weekdays" value="${availability?.weekdays || ""}" placeholder="Example: Tuesday evenings" /></label>
          <label>Weekend availability<input name="weekends" value="${availability?.weekends || ""}" placeholder="Example: Saturday mornings" /></label>
          <label>Preferred communities<input name="communities" value="${availability?.communities || ""}" placeholder="New Kleinburg, Nobleton" /></label>
          <label>Volunteer interests<input name="interests" value="${availability?.interests || ""}" placeholder="Canvassing, events, calls" /></label>
          <label>Notes<textarea name="notes" placeholder="Anything the campaign manager should know?">${availability?.notes || ""}</textarea></label>
          <button class="primary-action" type="submit">Save availability</button>
        </form>
      </section>
    </div>
  `;
  $("#availabilityForm").addEventListener("submit", handleAvailabilitySubmit);
}

function assignmentCard(assignment) {
  return `
    <article class="event-row">
      <div>
        <div class="event-date">${assignment.date}</div>
        <span class="tier-pill">${assignment.type}</span>
      </div>
      <div>
        <h4>${assignment.title}</h4>
        <p>${assignment.start_time || ""}${assignment.end_time ? `-${assignment.end_time}` : ""} at ${assignment.location}</p>
        <p>${assignment.instructions}</p>
        <div class="event-meta"><span>Zone: ${zoneName(assignment.zone_id)}</span><span>Status: ${assignment.status}</span></div>
      </div>
      <button class="table-action" type="button" data-jump="submit-report">Report</button>
    </article>
  `;
}

function volunteerAssignments() {
  const profile = effectiveProfile();
  const id = profile.id || "acct-volunteer-1";
  const assignments = state.assignments.filter((assignment) => assignment.volunteer_profile_id === id);
  return assignments.length ? assignments : state.assignments.filter((assignment) => assignment.volunteer_profile_id === "acct-volunteer-1");
}

function volunteerAvailability() {
  const profile = effectiveProfile();
  return state.availability.find((item) => item.volunteer_profile_id === profile.id) || state.availability[0];
}

function zoneName(zoneId) {
  return state.zones.find((zone) => zone.id === zoneId)?.name || "Not assigned";
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

async function handleOutreachSubmit(event) {
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
}

async function handleVolunteerReportSubmit(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target));
  const report = {
    id: `report-${Date.now()}`,
    volunteer_profile_id: effectiveProfile().id || "local-volunteer",
    created_at: new Date().toISOString(),
    assignment_id: data.assignment_id || null,
    report_type: data.report_type,
    doors_knocked: Number(data.doors_knocked || 0),
    hard_ids: Number(data.hard_ids || 0),
    issue_note: data.issue_note || "",
    shift_note: data.shift_note,
  };
  state.volunteerReports.unshift(report);
  await persistRecord("volunteer_reports", report);
  saveState();
  rerenderAll();
  toast("Volunteer report submitted.");
}

async function handleAvailabilitySubmit(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target));
  const profile = effectiveProfile();
  const existing = state.availability.find((item) => item.volunteer_profile_id === profile.id);
  const next = {
    id: existing?.id || `availability-${Date.now()}`,
    volunteer_profile_id: profile.id || "local-volunteer",
    weekdays: data.weekdays,
    weekends: data.weekends,
    communities: data.communities,
    interests: data.interests,
    notes: data.notes,
  };
  if (existing) Object.assign(existing, next);
  else state.availability.unshift(next);
  await persistRecord("volunteer_availability", next);
  saveState();
  rerenderAll();
  toast("Availability saved.");
}

async function approveAccount(profileId, action) {
  const note = window.prompt(`Optional note for ${action}:`) || "";
  const account = state.accounts.find((item) => item.id === profileId);
  const nextStatus = action === "approve" || action === "reactivate" ? "approved" : action === "suspend" ? "suspended" : "rejected";
  if (account) {
    account.approval_status = nextStatus;
    account.decision_note = note;
  }
  const log = {
    id: `approval-${Date.now()}`,
    profile_id: profileId,
    actor_name: effectiveProfile().display_name,
    action,
    note,
    created_at: new Date().toISOString(),
  };
  state.approvalLog.unshift(log);
  await callApproveAccount(profileId, action, note);
  saveState();
  rerenderAll();
  toast(`Account ${action} action saved.`);
}

async function callApproveAccount(profileId, action, note) {
  const config = window.CAMPAIGN_CONFIG || {};
  if (!config.supabaseUrl || !config.supabaseAnonKey || !currentSession) return { mode: "local" };
  try {
    const response = await fetch(`${config.supabaseUrl}/functions/v1/approve-account`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify({ profileId, action, note }),
    });
    return response.ok ? response.json() : { mode: "local", error: await response.text() };
  } catch (error) {
    return { mode: "local", error: error.message };
  }
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

  $("#outreachForm").addEventListener("submit", handleOutreachSubmit);

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
    .select("id, display_name, email, phone, role, approval_status, community_preference, zone_preference, availability_note, volunteer_interests")
    .eq("id", currentSession.user.id)
    .single();
  currentProfile = data ? normalizeProfile(data) : null;
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
        .login-card { background: var(--panel); padding: 28px 32px; border-radius: var(--radius); width: clamp(320px, 38vw, 520px); max-width: calc(100vw - 32px); display: flex; flex-direction: column; gap: 14px; box-shadow: var(--shadow); font-family: inherit; border: 1px solid var(--line); color: var(--ink); max-height: 92vh; overflow: auto; }
        .login-card h2 { margin: 0; font-size: 1.4rem; }
        .login-card label { display: flex; flex-direction: column; gap: 4px; font-size: 0.84rem; font-weight: 800; color: var(--ink); }
        .login-card input, .login-card textarea { padding: 9px 10px; min-height: 40px; border: 1px solid var(--line); border-radius: 6px; font-size: 0.95rem; background: #fff; color: var(--ink); }
        .login-card button { padding: 0 14px; min-height: 40px; border: 1px solid var(--teal); border-radius: 6px; background: var(--teal); color: #fff; font-weight: 800; cursor: pointer; }
        .auth-tabs { display: grid; grid-template-columns: 1fr; gap: 8px; }
        .auth-tabs button { background: #fff; color: var(--ink); border-color: var(--line); }
        .auth-tabs button.active { background: var(--teal); color: #fff; border-color: var(--teal); }
        .auth-form { display: grid; gap: 12px; }
        .auth-form[hidden] { display: none; }
        .login-card button:disabled { opacity: 0.6; cursor: progress; }
        .login-error { color: var(--coral); font-size: 0.85rem; margin: 0; font-weight: 800; }
        .login-help { color: var(--muted); line-height: 1.45; margin: 0; }
        @media (max-width: 430px) { .auth-tabs { grid-template-columns: 1fr; } .login-card { padding: 24px 20px; } }
      `;
      document.head.appendChild(style);
    }
    const overlay = document.createElement("div");
    overlay.className = "login-overlay";
    overlay.innerHTML = `
      <div class="login-card">
        <p class="eyebrow">Sign in</p>
        <h2>Dorit Campaign Dashboard</h2>
        <div class="auth-tabs">
          <button type="button" class="active" data-auth-tab="signin">Sign in</button>
          <button type="button" data-auth-tab="signup">Create account</button>
        </div>
        <p class="login-error" hidden></p>
        <form class="auth-form" id="signInForm">
          <label>Email<input type="email" name="email" required autocomplete="username" /></label>
          <label>Password<input type="password" name="password" required autocomplete="current-password" /></label>
          <button type="submit">Sign in</button>
        </form>
        <form class="auth-form" id="signUpForm" hidden>
          <p class="login-help">Volunteer accounts require approval by Dorit or a Campaign Manager before dashboard access.</p>
          <label>Full name<input name="display_name" required autocomplete="name" /></label>
          <label>Email<input type="email" name="email" required autocomplete="email" /></label>
          <label>Password<input type="password" name="password" required autocomplete="new-password" minlength="8" /></label>
          <label>Phone optional<input name="phone" autocomplete="tel" /></label>
          <label>Community preference<input name="community_preference" placeholder="New Kleinburg, Nobleton, King City..." /></label>
          <label>Zone preference<input name="zone_preference" placeholder="Optional" /></label>
          <label>Availability note<textarea name="availability_note" placeholder="Weekends, evenings, events, phone bank..."></textarea></label>
          <label>Volunteer interests<input name="volunteer_interests" placeholder="Canvassing, events, calls" /></label>
          <button type="submit">Create volunteer account</button>
        </form>
      </div>
    `;
    document.body.appendChild(overlay);
    const signInForm = overlay.querySelector("#signInForm");
    const signUpForm = overlay.querySelector("#signUpForm");
    const errorEl = overlay.querySelector(".login-error");
    overlay.querySelectorAll("[data-auth-tab]").forEach((tab) => {
      tab.addEventListener("click", () => {
        overlay.querySelectorAll("[data-auth-tab]").forEach((button) => button.classList.toggle("active", button === tab));
        signInForm.hidden = tab.dataset.authTab !== "signin";
        signUpForm.hidden = tab.dataset.authTab !== "signup";
        errorEl.hidden = true;
      });
    });
    signInForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      errorEl.hidden = true;
      const submitBtn = signInForm.querySelector("button[type=submit]");
      submitBtn.disabled = true;
      const fd = new FormData(signInForm);
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
    signUpForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      errorEl.hidden = true;
      const submitBtn = signUpForm.querySelector("button[type=submit]");
      submitBtn.disabled = true;
      const fd = new FormData(signUpForm);
      const client = getSupabaseClient();
      const interests = String(fd.get("volunteer_interests") || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
      const { data, error } = await client.auth.signUp({
        email: fd.get("email"),
        password: fd.get("password"),
        options: {
          data: {
            display_name: fd.get("display_name"),
            phone: fd.get("phone"),
            community_preference: fd.get("community_preference"),
            zone_preference: fd.get("zone_preference"),
            availability_note: fd.get("availability_note"),
            volunteer_interests: interests,
          },
        },
      });
      submitBtn.disabled = false;
      if (error) {
        errorEl.textContent = error.message;
        errorEl.hidden = false;
        return;
      }
      if (data.session) {
        currentSession = data.session;
        await loadProfile();
        overlay.remove();
        resolve(currentSession);
        return;
      }
      errorEl.textContent = "Account created. Check your email if confirmation is enabled, then sign in. Your volunteer access will remain pending until approved.";
      errorEl.hidden = false;
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
  safeRender("command", renderCommand);
  safeRender("today", renderToday);
  safeRender("events", renderEvents);
  safeRender("relationships", renderRelationships);
  safeRender("crm", renderCrm);
  safeRender("map", renderMapView);
  safeRender("goals", renderGoals);
  safeRender("field", renderField);
  safeRender("training", renderTraining);
  safeRender("forms", renderForms);
  safeRender("accounts", renderAccounts);
  safeRender("field-notes", renderFieldNotes);
  safeRender("my-shift", renderMyShift);
  safeRender("my-zone", renderMyZone);
  safeRender("submit-report", renderSubmitReport);
  safeRender("availability", renderAvailability);
  switchSection(activeSection);
}

function safeRender(sectionId, renderer) {
  try {
    renderer();
  } catch (error) {
    console.error(`Failed to render ${sectionId}`, error);
    const target = document.getElementById(sectionId);
    if (target) {
      target.innerHTML = `<div class="empty-state"><strong>Could not render this panel.</strong><p>${error.message}</p></div>`;
    }
  }
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
    if (remote.profile) {
      currentProfile = normalizeProfile(remote.profile);
      state.activeRole = currentProfile.role;
    }
    if (remote.accounts?.length) state.accounts = remote.accounts.map(mapRemoteAccount);
    if (remote.approvalLog?.length) state.approvalLog = remote.approvalLog.map(mapRemoteApprovalLog);
    if (remote.assignments?.length) state.assignments = remote.assignments.map(mapRemoteAssignment);
    if (remote.availability?.length) state.availability = remote.availability;
    if (remote.volunteerReports?.length) state.volunteerReports = remote.volunteerReports;
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
    lat: loc.latitude == null ? null : Number(loc.latitude),
    lng: loc.longitude == null ? null : Number(loc.longitude),
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

function mapRemoteAccount(account) {
  return normalizeProfile({
    ...account,
    volunteer_interests: Array.isArray(account.volunteer_interests) ? account.volunteer_interests : [],
  });
}

function mapRemoteApprovalLog(log) {
  return {
    id: log.id,
    profile_id: log.profile_id,
    actor_name: log.actor_profile?.display_name || log.actor_name || "Approver",
    action: log.action,
    note: log.note || "",
    created_at: log.created_at,
  };
}

function mapRemoteAssignment(assignment) {
  return {
    id: assignment.id,
    volunteer_profile_id: assignment.volunteer_profile_id,
    title: assignment.title,
    type: assignment.assignment_type || assignment.type || "Shift",
    date: assignment.assignment_date || assignment.date,
    start_time: assignment.start_time || "",
    end_time: assignment.end_time || "",
    location: assignment.location || "",
    zone_id: assignment.zone_id || "",
    instructions: assignment.instructions || "",
    status: assignment.status || "assigned",
  };
}

function showAccountStatusScreen() {
  const profile = effectiveProfile();
  const copy = {
    pending: ["Volunteer account pending", "Thanks for signing up. Dorit or a Campaign Manager needs to approve this volunteer account before campaign data is available."],
    rejected: ["Volunteer account not approved", "This volunteer account was not approved. Contact the campaign manager if you think this is a mistake."],
    suspended: ["Account suspended", "This account is currently suspended and cannot access the campaign dashboard."],
  }[profile.approval_status] || ["Account unavailable", "This account cannot access the dashboard right now."];
  document.body.innerHTML = `
    <main class="login-overlay account-state-page">
      <section class="login-card">
        <p class="eyebrow">Dorit Campaign Dashboard</p>
        <h2>${copy[0]}</h2>
        <p class="login-help">${copy[1]}</p>
        <p class="login-help"><strong>${profile.display_name}</strong>${profile.email ? ` - ${profile.email}` : ""}</p>
        <button class="primary-action" id="pendingSignOut" type="button">Sign out</button>
      </section>
    </main>
  `;
  document.getElementById("pendingSignOut").addEventListener("click", signOut);
}

async function init() {
  await requireAuth();
  if (currentSession && !isApprovedProfile()) {
    showAccountStatusScreen();
    return;
  }
  await hydrateFromSupabase();
  if (currentSession && !isApprovedProfile()) {
    showAccountStatusScreen();
    return;
  }
  injectSignOutButton();
  document.body.addEventListener("click", (event) => {
    const moreBtn = event.target.closest("#bottomMoreBtn");
    if (moreBtn) {
      const sheet = document.getElementById("moreSheet");
      if (sheet && sheet.hidden) openMoreSheet();
      else closeMoreSheet();
      return;
    }
    const closeBtn = event.target.closest("#moreSheetClose");
    if (closeBtn) {
      closeMoreSheet();
      return;
    }
    if (event.target.id === "moreSheet") {
      closeMoreSheet();
      return;
    }
    const sectionBtn = event.target.closest("[data-section]");
    if (sectionBtn) {
      switchSection(sectionBtn.dataset.section);
      return;
    }
    const jump = event.target.closest("[data-jump]");
    if (jump) {
      event.preventDefault();
      switchSection(jump.dataset.jump);
    }
  });
  $("#briefButton").addEventListener("click", showBrief);
  $("#syncButton").addEventListener("click", () => toast("Local preview data is current. Supabase sync activates when credentials are configured."));
  rerenderAll();
}

init();
