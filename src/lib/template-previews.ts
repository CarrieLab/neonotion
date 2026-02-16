import type { Template } from '@/types/template';

type PreviewLayout =
  | 'kanban'
  | 'table'
  | 'calendar'
  | 'timeline'
  | 'finance'
  | 'travel'
  | 'content'
  | 'journal';

interface BoardColumn {
  title: string;
  dotColor: string;
  cards: string[];
}

interface TableRow {
  title: string;
  meta: string;
  status: string;
  statusTone: 'green' | 'blue' | 'amber' | 'purple';
}

interface Milestone {
  label: string;
  short: string;
  position: string;
}

export type PreviewSkeleton =
  | 'dashboard'
  | 'database-first'
  | 'wiki-hub'
  | 'workflow'
  | 'rhythm'
  | 'doc-report'
  | 'productivity-charts'
  | 'student-monthly-planner'
  | 'student-class-schedule'
  | 'student-semester-gpa'
  | 'startup-os'
  | 'note-taking-methods'
  | 'wedding-planning'
  | 'conference-agenda'
  | 'finance-os';

export interface TemplatePreviewConfig {
  layout: PreviewLayout;
  variant: number;
  shell: 'app' | 'doc' | 'dashboard' | 'minimal';
  skeleton?: PreviewSkeleton;
  category: string;
  badge: string;
  accentGradient: string;
  sidebarSections: string[];
  boardColumns?: BoardColumn[];
  tableHeaders?: string[];
  tableRows?: TableRow[];
  milestones?: Milestone[];
  kpis?: { label: string; value: string }[];
  calendarCells?: { day: number; label?: string; active?: boolean }[];
  notes?: string[];
  /** Chart data for productivity preview variety (non-featured only) */
  chartPie?: { label: string; value: number }[];
  chartLine?: { points: number[] };
  chartBar?: { label: string; value: number }[];
  chartBarMulti?: { labels: string[]; series: { name: string; values: number[] }[] };
  /** Theme for productivity previews: border/background tint */
  accentTheme?: 'emerald' | 'sky' | 'violet' | 'amber' | 'rose' | 'slate';
}

type PreviewKind =
  | 'productivity'
  | 'student'
  | 'business'
  | 'finance'
  | 'travel'
  | 'content'
  | 'wellness'
  | 'crm';

function normalizeTags(tags: string[] | null | undefined) {
  return (tags ?? []).map((t) => t.toLowerCase());
}

function seeded(template: Template) {
  const source = `${template.slug}|${template.title}|${template.tags.join('|')}`;
  let h = 0;
  for (let i = 0; i < source.length; i++) {
    h = (h << 5) - h + source.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function pick<T>(items: readonly T[], seed: number, offset = 0): T {
  return items[(seed + offset) % items.length];
}

function getPreviewKind(template: Template): PreviewKind {
  const tags = normalizeTags(template.tags);
  const title = template.title.toLowerCase();

  if (tags.some((t) => t.includes('crm')) || title.includes('pipeline')) return 'crm';
  if (tags.some((t) => t.includes('finance')) || title.includes('budget') || title.includes('expense')) return 'finance';
  if (tags.some((t) => t.includes('travel') || t.includes('wedding') || t.includes('event'))) return 'travel';
  if (tags.some((t) => t.includes('creator') || t.includes('content'))) return 'content';
  if (tags.some((t) => t.includes('health') || t.includes('fitness') || t.includes('habit') || t.includes('lifestyle'))) return 'wellness';
  if (tags.some((t) => t.includes('student')) || title.includes('semester') || title.includes('study')) return 'student';
  if (tags.some((t) => t.includes('business')) || title.includes('okr') || title.includes('roadmap')) return 'business';
  if (
    tags.some((t) => t.includes('task') || t.includes('todo') || t.includes('project')) ||
    title.includes('task') ||
    title.includes('kanban')
  ) {
    return 'productivity';
  }

  return 'productivity';
}

function tone(seed: number): TemplatePreviewConfig['tableRows'][number]['statusTone'] {
  return pick(['green', 'blue', 'amber', 'purple'], seed) as TemplatePreviewConfig['tableRows'][number]['statusTone'];
}

function fromWhatsInside(template: Template, fallback: string[]) {
  const items = (template.whats_inside ?? []).filter(Boolean);
  return items.length > 0 ? items : fallback;
}

const PRODUCTIVITY_THEMES: { gradient: string; theme: TemplatePreviewConfig['accentTheme'] }[] = [
  { gradient: 'linear-gradient(135deg,#059669,#10B981)', theme: 'emerald' },
  { gradient: 'linear-gradient(135deg,#0284C7,#0EA5E9)', theme: 'sky' },
  { gradient: 'linear-gradient(135deg,#7C3AED,#8B5CF6)', theme: 'violet' },
  { gradient: 'linear-gradient(135deg,#D97706,#F59E0B)', theme: 'amber' },
  { gradient: 'linear-gradient(135deg,#E11D48,#F43F5E)', theme: 'rose' },
  { gradient: 'linear-gradient(135deg,#475569,#64748B)', theme: 'slate' },
];

function buildProductivity(template: Template, seed: number): TemplatePreviewConfig {
  const styles = ['kanban', 'table', 'calendar', 'timeline', 'journal'] as const;
  const layout = pick(styles, seed);
  const tasks = fromWhatsInside(template, ['Deep work block', 'Weekly review', 'Priority inbox', 'Action queue']);
  const themeSet = PRODUCTIVITY_THEMES[seed % PRODUCTIVITY_THEMES.length];
  const chartType = seed % 6; // 0–2: one chart type, 3–5: combo

  const boardTitles = [
    ['Backlog', 'Doing', 'Done'],
    ['To Do', 'In Progress', 'Complete'],
    ['Planned', 'Active', 'Shipped'],
    ['Queue', 'Focus', 'Archive'],
    ['Ideas', 'This Week', 'Done'],
    ['Inbox', 'Next', 'Done'],
  ];
  const boardSet = pick(boardTitles, seed);
  const tableHeaderSets = [
    ['Task', 'Owner', 'Status', 'Due'],
    ['Item', 'Project', 'State', 'Date'],
    ['Action', 'Context', 'Priority', 'Deadline'],
    ['Todo', 'Area', 'Stage', 'Due'],
  ];
  const kpiSets = [
    [
      { label: 'Today', value: `${4 + (seed % 8)} tasks` },
      { label: 'Due', value: `${seed % 5} items` },
      { label: 'Focus', value: `${60 + (seed % 35)}%` },
    ],
    [
      { label: 'Active', value: `${2 + (seed % 6)}` },
      { label: 'Completed', value: `${10 + (seed % 20)}` },
      { label: 'Streak', value: `${seed % 14} days` },
    ],
    [
      { label: 'Inbox', value: `${seed % 12}` },
      { label: 'This week', value: `${3 + (seed % 10)}` },
      { label: 'Blocked', value: `${seed % 3}` },
    ],
  ];

  const config: TemplatePreviewConfig = {
    layout,
    variant: seed % 12,
    shell: pick(['app', 'doc', 'dashboard', 'minimal'], seed, 7),
    category: 'Productivity',
    badge: pick(['Deep Work', 'Weekly Planner', 'Execution OS', 'Focus Mode', 'GTD', 'Life OS'], seed, 1),
    accentGradient: themeSet.gradient,
    accentTheme: themeSet.theme,
    sidebarSections: pick(
      [
        ['Inbox', 'Today', 'This Week', 'Backlog', 'Archive'],
        ['Capture', 'Process', 'Schedule', 'Review', 'Done'],
        ['Tasks', 'Projects', 'Someday', 'Goals', 'Notes'],
      ],
      seed,
    ),
    boardColumns: [
      { title: boardSet[0], dotColor: '#38BDF8', cards: tasks.slice(0, 3) },
      { title: boardSet[1], dotColor: '#A78BFA', cards: tasks.slice(1, 4) },
      { title: boardSet[2], dotColor: '#22C55E', cards: tasks.slice(0, 2) },
    ],
    tableHeaders: pick(tableHeaderSets, seed),
    tableRows: tasks.slice(0, 4).map((item, i) => ({
      title: item,
      meta: pick(['You', 'Design', 'Ops', 'Team', 'Personal', 'Work'], seed, i),
      status: pick(['Planned', 'In Progress', 'Review', 'Done', 'Blocked', 'Deferred'], seed, i + 4),
      statusTone: tone(seed + i),
    })),
    calendarCells: Array.from({ length: 21 }).map((_, i) => ({
      day: i + 1,
      label: i % 6 === 0 ? pick(['Sprint', 'Review', 'Ship', 'Plan', 'Focus'], seed, i) : undefined,
      active: i % 5 === (seed % 5),
    })),
    notes: tasks,
    kpis: pick(kpiSets, seed),
  };

  // Add chart data for variety (used by productivity-charts skeleton)
  const pieData = [
    { label: 'Done', value: 35 + (seed % 25) },
    { label: 'In progress', value: 20 + (seed % 20) },
    { label: 'Planned', value: 25 + (seed % 20) },
    { label: 'Backlog', value: 10 + (seed % 15) },
  ];
  const linePoints = [30 + (seed % 20), 45 + (seed % 15), 40 + (seed % 20), 55 + (seed % 15), 60 + (seed % 20), 75 + (seed % 15)];
  const barData = [
    { label: 'Mon', value: 20 + (seed % 60) },
    { label: 'Tue', value: 35 + (seed % 50) },
    { label: 'Wed', value: 50 + (seed % 40) },
    { label: 'Thu', value: 45 + (seed % 45) },
    { label: 'Fri', value: 70 + (seed % 30) },
  ];
  const barMulti = {
    labels: ['W1', 'W2', 'W3', 'W4'],
    series: [
      { name: 'Tasks', values: [8 + (seed % 6), 12 + (seed % 5), 10 + (seed % 7), 14 + (seed % 4)] },
      { name: 'Done', values: [5 + (seed % 4), 9 + (seed % 5), 8 + (seed % 6), 11 + (seed % 5)] },
    ],
  };

  if (chartType === 0) {
    config.chartPie = pieData;
  } else if (chartType === 1) {
    config.chartLine = { points: linePoints };
  } else if (chartType === 2) {
    config.chartBar = barData;
  } else if (chartType === 3) {
    config.chartPie = pieData.slice(0, 3);
    config.chartBar = barData.slice(0, 3);
  } else if (chartType === 4) {
    config.chartLine = { points: linePoints };
    config.chartBar = barData.slice(0, 4);
  } else {
    config.chartBarMulti = barMulti;
  }

  return config;
}

function buildStudent(template: Template, seed: number): TemplatePreviewConfig {
  return {
    layout: pick(['calendar', 'table', 'timeline', 'kanban', 'journal'], seed),
    variant: seed % 12,
    shell: pick(['doc', 'app', 'minimal', 'dashboard'], seed, 8),
    category: 'Student Planner',
    badge: pick(['Semester Hub', 'Exam Prep', 'Study Board'], seed, 1),
    accentGradient: 'linear-gradient(135deg,#60A5FA,#A78BFA)',
    sidebarSections: ['Courses', 'Assignments', 'Exams', 'Study Plan', 'Resources'],
    tableHeaders: ['Course', 'Type', 'Status', 'Due'],
    tableRows: fromWhatsInside(template, ['Week 5 assignment', 'Lab report', 'Exam revision', 'Reading log']).slice(0, 4).map((item, i) => ({
      title: item,
      meta: pick(['Math 201', 'Economics', 'Biology', 'History'], seed, i),
      status: pick(['Not Started', 'In Progress', 'Submitted', 'Done'], seed, i + 5),
      statusTone: tone(seed + i + 2),
    })),
    calendarCells: Array.from({ length: 28 }).map((_, i) => ({
      day: i + 1,
      label: i % 7 === 2 ? pick(['Quiz', 'Exam', 'Lab'], seed, i) : undefined,
      active: i % 4 === (seed % 4),
    })),
    notes: fromWhatsInside(template, ['Lecture notes', 'Revision checklist', 'Office hours', 'Project milestone']),
  };
}

function buildBusiness(template: Template, seed: number): TemplatePreviewConfig {
  return {
    layout: pick(['timeline', 'table', 'kanban', 'finance', 'calendar'], seed),
    variant: seed % 12,
    shell: pick(['dashboard', 'app', 'doc', 'minimal'], seed, 5),
    category: 'Business Ops',
    badge: pick(['Quarterly Strategy', 'Executive View', 'Roadmap'], seed, 1),
    accentGradient: 'linear-gradient(135deg,#F59E0B,#3B82F6)',
    sidebarSections: ['Strategy', 'KPI', 'Initiatives', 'Meetings', 'Decisions'],
    milestones: [
      { label: 'Plan', short: 'P', position: '6%' },
      { label: 'Align', short: 'A', position: '30%' },
      { label: 'Execute', short: 'E', position: '56%' },
      { label: 'Review', short: 'R', position: '82%' },
    ],
    tableHeaders: ['Initiative', 'Lead', 'Status', 'Impact'],
    tableRows: fromWhatsInside(template, ['KPI review', 'Launch checklist', 'Hiring pipeline', 'Board update']).slice(0, 4).map((item, i) => ({
      title: item,
      meta: pick(['CEO', 'Ops', 'Marketing', 'Product'], seed, i),
      status: pick(['On Track', 'At Risk', 'Blocked', 'Done'], seed, i + 4),
      statusTone: tone(seed + i + 5),
    })),
    kpis: [
      { label: 'Revenue', value: `$${(42 + (seed % 40)).toFixed(1)}k` },
      { label: 'MRR Growth', value: `${7 + (seed % 12)}%` },
      { label: 'NPS', value: `${42 + (seed % 30)}` },
    ],
    notes: fromWhatsInside(template, ['Quarter priorities', 'Team goals', 'Weekly KPI check', 'Risks']),
  };
}

function buildFinance(template: Template, seed: number): TemplatePreviewConfig {
  return {
    layout: pick(['finance', 'table', 'calendar', 'journal'], seed),
    variant: seed % 12,
    shell: pick(['dashboard', 'minimal', 'app', 'doc'], seed, 4),
    category: 'Personal Finance',
    badge: pick(['Budget Planner', 'Expense Tracker', 'Money Review'], seed, 2),
    accentGradient: pick(['linear-gradient(135deg,#22C55E,#16A34A)', 'linear-gradient(135deg,#0EA5E9,#22C55E)'], seed),
    sidebarSections: ['Dashboard', 'Expenses', 'Budgets', 'Goals', 'Reports'],
    kpis: [
      { label: 'This Month', value: `$${1200 + (seed % 2600)}` },
      { label: 'Saved', value: `$${220 + (seed % 900)}` },
      { label: 'Budget Used', value: `${45 + (seed % 45)}%` },
    ],
    tableHeaders: ['Category', 'Amount', 'Status', 'Date'],
    tableRows: [
      { title: 'Groceries', meta: `$${90 + (seed % 80)}`, status: 'Logged', statusTone: 'green' },
      { title: 'Transport', meta: `$${40 + (seed % 40)}`, status: 'Logged', statusTone: 'blue' },
      { title: 'Subscriptions', meta: `$${20 + (seed % 30)}`, status: 'Review', statusTone: 'amber' },
      { title: 'Savings', meta: `$${100 + (seed % 120)}`, status: 'Transfer', statusTone: 'purple' },
    ],
    notes: fromWhatsInside(template, ['Monthly budget', 'Expense categories', 'Savings targets', 'Financial review']),
  };
}

function buildTravel(template: Template, seed: number): TemplatePreviewConfig {
  return {
    layout: pick(['travel', 'calendar', 'table', 'timeline', 'content'], seed),
    variant: seed % 12,
    shell: pick(['doc', 'minimal', 'app', 'dashboard'], seed, 3),
    category: 'Travel Planner',
    badge: pick(['Itinerary', 'Bucket List', 'Trip Pack'], seed),
    accentGradient: 'linear-gradient(135deg,#06B6D4,#22C55E)',
    sidebarSections: ['Trips', 'Itinerary', 'Packing', 'Bookings', 'Wishlist'],
    tableHeaders: ['Day', 'Plan', 'Status', 'Time'],
    tableRows: fromWhatsInside(template, ['Flight check-in', 'Hotel booking', 'City tour', 'Packing essentials']).slice(0, 4).map((item, i) => ({
      title: item,
      meta: pick(['Day 1', 'Day 2', 'Day 3', 'Day 4'], seed, i),
      status: pick(['Planned', 'Booked', 'Done'], seed, i + 3),
      statusTone: tone(seed + i),
    })),
    notes: fromWhatsInside(template, ['Flight + hotel', 'Places to visit', 'Budget notes', 'Packing list']),
    calendarCells: Array.from({ length: 14 }).map((_, i) => ({
      day: i + 1,
      label: i % 4 === 0 ? pick(['Fly', 'Tour', 'Move'], seed, i) : undefined,
      active: i % 3 === (seed % 3),
    })),
  };
}

function buildContent(template: Template, seed: number): TemplatePreviewConfig {
  return {
    layout: pick(['content', 'kanban', 'table', 'calendar', 'timeline'], seed),
    variant: seed % 12,
    shell: pick(['app', 'dashboard', 'minimal', 'doc'], seed, 2),
    category: 'Creator Studio',
    badge: pick(['Content Pipeline', 'Editorial Calendar', 'Creator OS'], seed),
    accentGradient: 'linear-gradient(135deg,#A855F7,#EC4899)',
    sidebarSections: ['Ideas', 'Drafts', 'Editing', 'Scheduled', 'Published'],
    boardColumns: [
      { title: 'Ideas', dotColor: '#A855F7', cards: ['Hook ideas', 'Tutorial concept', 'Case study'] },
      { title: 'In Production', dotColor: '#0EA5E9', cards: ['Script draft', 'Edit timeline', 'Thumbnail'] },
      { title: 'Scheduled', dotColor: '#22C55E', cards: ['Newsletter issue', 'YouTube upload'] },
    ],
    tableHeaders: ['Content', 'Channel', 'Status', 'Date'],
    tableRows: fromWhatsInside(template, ['Newsletter draft', 'Video script', 'Social batch', 'Campaign brief']).slice(0, 4).map((item, i) => ({
      title: item,
      meta: pick(['YouTube', 'Newsletter', 'X / LinkedIn', 'Blog'], seed, i),
      status: pick(['Draft', 'Edit', 'Scheduled', 'Published'], seed, i + 2),
      statusTone: tone(seed + i + 4),
    })),
    notes: fromWhatsInside(template, ['Content ideas', 'Production pipeline', 'Publishing calendar', 'Performance review']),
  };
}

function buildWellness(template: Template, seed: number): TemplatePreviewConfig {
  return {
    layout: pick(['journal', 'calendar', 'table', 'kanban'], seed),
    variant: seed % 12,
    shell: pick(['minimal', 'doc', 'dashboard', 'app'], seed, 9),
    category: 'Habit & Wellness',
    badge: pick(['Habit Tracker', 'Health Log', 'Fitness Plan'], seed),
    accentGradient: pick(['linear-gradient(135deg,#22C55E,#84CC16)', 'linear-gradient(135deg,#F59E0B,#22C55E)'], seed, 1),
    sidebarSections: ['Daily Log', 'Habits', 'Nutrition', 'Training', 'Review'],
    notes: fromWhatsInside(template, ['Daily check-in', 'Workout log', 'Sleep quality', 'Weekly reflection']),
    calendarCells: Array.from({ length: 28 }).map((_, i) => ({
      day: i + 1,
      label: i % 9 === 0 ? pick(['Run', 'Gym', 'Rest'], seed, i) : undefined,
      active: i % 2 === (seed % 2),
    })),
    tableHeaders: ['Habit', 'Target', 'Status', 'Streak'],
    tableRows: [
      { title: 'Sleep 8h', meta: 'Daily', status: 'On Track', statusTone: 'green' },
      { title: 'Workout', meta: '4x / week', status: 'In Progress', statusTone: 'blue' },
      { title: 'Hydration', meta: '2L / day', status: 'Review', statusTone: 'amber' },
      { title: 'Meditation', meta: '10 min', status: 'Done', statusTone: 'purple' },
    ],
  };
}

function buildCRM(template: Template, seed: number): TemplatePreviewConfig {
  return {
    layout: pick(['table', 'kanban', 'timeline', 'calendar', 'finance'], seed),
    variant: seed % 12,
    shell: pick(['dashboard', 'app', 'doc', 'minimal'], seed, 6),
    category: 'CRM Pipeline',
    badge: pick(['Deals Board', 'Sales Tracker', 'Pipeline'], seed),
    accentGradient: 'linear-gradient(135deg,#3B82F6,#A855F7)',
    sidebarSections: ['Leads', 'Deals', 'Accounts', 'Activities', 'Renewals'],
    boardColumns: [
      { title: 'Lead', dotColor: '#0EA5E9', cards: ['Inbound lead', 'Referral lead', 'Demo request'] },
      { title: 'Proposal', dotColor: '#A855F7', cards: ['Proposal sent', 'Negotiation'] },
      { title: 'Won', dotColor: '#22C55E', cards: ['Contract signed', 'Onboarding'] },
    ],
    tableHeaders: ['Account', 'Owner', 'Stage', 'Value'],
    tableRows: fromWhatsInside(template, ['Pipeline review', 'Follow-up queue', 'Renewal check', 'Demo prep']).slice(0, 4).map((item, i) => ({
      title: item,
      meta: pick(['A. Kim', 'J. Chen', 'S. Patel', 'M. Diaz'], seed, i),
      status: pick(['Lead', 'Proposal', 'Negotiation', 'Won'], seed, i + 1),
      statusTone: tone(seed + i),
    })),
    notes: fromWhatsInside(template, ['Deal stages', 'Follow-up reminders', 'Account notes', 'Revenue forecast']),
  };
}

function chooseSkeleton(kind: PreviewKind, seed: number): PreviewSkeleton {
  const all: readonly PreviewSkeleton[] = [
    'dashboard',
    'database-first',
    'wiki-hub',
    'workflow',
    'rhythm',
    'doc-report',
  ];

  const productivityWithCharts: readonly PreviewSkeleton[] = [
    'dashboard',
    'database-first',
    'wiki-hub',
    'workflow',
    'rhythm',
    'doc-report',
    'productivity-charts',
  ];

  const byKind: Record<PreviewKind, readonly PreviewSkeleton[]> = {
    productivity: productivityWithCharts,
    student: ['rhythm', 'dashboard', 'database-first', 'wiki-hub', 'doc-report', 'workflow'],
    business: ['database-first', 'workflow', 'dashboard', 'doc-report', 'wiki-hub', 'rhythm'],
    finance: ['dashboard', 'database-first', 'rhythm', 'doc-report', 'workflow', 'wiki-hub'],
    travel: ['dashboard', 'doc-report', 'workflow', 'rhythm', 'database-first', 'wiki-hub'],
    content: ['workflow', 'database-first', 'dashboard', 'doc-report', 'wiki-hub', 'rhythm'],
    wellness: ['rhythm', 'dashboard', 'doc-report', 'workflow', 'database-first', 'wiki-hub'],
    crm: ['database-first', 'workflow', 'dashboard', 'wiki-hub', 'doc-report', 'rhythm'],
  };

  const pool = byKind[kind];
  return pool[seed % pool.length];
}

export function getTemplatePreviewConfig(template: Template): TemplatePreviewConfig {
  const kind = getPreviewKind(template);
  const seed = seeded(template);
  const title = template.title.toLowerCase();

  // ── Tax Prep & Document Checklist FIRST (Finance OS skeleton); match by slug or title ──
  const slugForTaxPrep = template.slug ?? '';
  if (
    title.includes('tax prep') ||
    title.includes('document checklist') ||
    slugForTaxPrep.includes('tax-prep-document-checklist') ||
    (slugForTaxPrep.startsWith('tax-prep') && slugForTaxPrep.includes('checklist'))
  ) {
    return {
      layout: 'finance',
      variant: seed % 12,
      shell: 'dashboard',
      skeleton: 'finance-os' as PreviewSkeleton,
      category: 'Personal Finance',
      badge: 'Tax Prep',
      accentGradient: 'linear-gradient(135deg,#7C3AED,#A855F7)',
      sidebarSections: ['Dashboard', 'Documents', 'Income', 'Deductions', 'Deadlines'],
      kpis: [
        { label: 'Gathered', value: '8' },
        { label: 'Pending', value: '4' },
        { label: 'Due', value: 'Apr 15' },
        { label: 'Documents', value: '12' },
      ],
      chartLine: { points: [2, 4, 5, 6, 8, 9, 10, 11, 12] },
      tableHeaders: ['Document', 'Category', 'Status', 'Due'],
      tableRows: [
        { title: 'W-2', meta: 'Income', status: 'Done', statusTone: 'green' },
        { title: '1099-INT', meta: 'Income', status: 'Done', statusTone: 'green' },
        { title: 'Receipts (donations)', meta: 'Deductions', status: 'Pending', statusTone: 'amber' },
        { title: 'Mortgage statement', meta: 'Deductions', status: 'Pending', statusTone: 'blue' },
      ],
      notes: ['Document checklist', 'Income sources', 'Deductions', 'Deadline tracker'],
    };
  }

  // ── Reading List (big title + table, no sidebar, no category line) ──
  if (title.includes('reading list')) {
    return {
      layout: 'table',
      variant: seed % 12,
      shell: 'doc',
      skeleton: 'featured-reading-list' as PreviewSkeleton,
      category: 'Knowledge',
      badge: '📚 Reading List',
      accentGradient: 'linear-gradient(135deg,#0EA5E9,#6366F1)',
      sidebarSections: [],
      tableHeaders: ['Book', 'Author', 'Progress', 'Rating', 'Notes'],
      tableRows: [
        { title: 'Atomic Habits', meta: 'James Clear', status: '100%', statusTone: 'green' },
        { title: 'Deep Work', meta: 'Cal Newport', status: '60%', statusTone: 'blue' },
        { title: 'The Psychology of Money', meta: 'Morgan Housel', status: 'Want to read', statusTone: 'purple' },
        { title: 'Building a Second Brain', meta: 'Tiago Forte', status: '80%', statusTone: 'green' },
        { title: 'Stolen Focus', meta: 'Johann Hari', status: '20%', statusTone: 'amber' },
      ],
      notes: ['Book database', 'Progress & rating', 'Reading notes', 'Want to read / Read status'],
    };
  }

  // ── Student: Semester Planner & GPA Tracker (pie chart, rich colors) ──
  if (title.includes('semester planner') || title.includes('gpa tracker')) {
    const pieData = [
      { label: 'Courses', value: 28 },
      { label: 'Credits', value: 22 },
      { label: 'Grades', value: 18 },
      { label: 'Assignments', value: 16 },
      { label: 'Exams', value: 10 },
      { label: 'Other', value: 6 },
    ];
    return {
      layout: 'timeline',
      variant: seed % 12,
      shell: 'dashboard',
      skeleton: 'student-semester-gpa' as PreviewSkeleton,
      category: 'Student Planner',
      badge: 'Semester Hub',
      accentGradient: 'linear-gradient(135deg,#60A5FA,#A78BFA)',
      sidebarSections: ['Courses', 'Assignments', 'Exams', 'Study Plan', 'Resources'],
      chartPie: pieData,
      tableHeaders: ['Course', 'Type', 'Status', 'Due'],
      tableRows: [
        { title: 'Math 201', meta: 'Core', status: 'In progress', statusTone: 'blue' },
        { title: 'Econ 101', meta: 'Core', status: 'Done', statusTone: 'green' },
        { title: 'Lab report', meta: 'Assignment', status: 'Due Fri', statusTone: 'amber' },
      ],
      notes: ['Semester overview', 'Grade tracker', 'GPA calculator', 'Credit checklist'],
    };
  }

  // ── Student and Lesson Planner (bulletin-board / lesson planner style) ──
  if (title.includes('student and lesson planner')) {
    return {
      layout: 'table',
      variant: seed % 12,
      shell: 'doc',
      skeleton: 'featured-student-lesson' as PreviewSkeleton,
      category: 'Student',
      badge: 'Lesson Planner',
      accentGradient: 'linear-gradient(135deg,#22C55E,#0EA5E9)',
      sidebarSections: ['Dashboard', 'Lessons', 'Assignments', 'Schedule', 'Study Plan', 'Resources'],
      tableHeaders: ['Lesson / Task', 'Subject', 'Due', 'Status'],
      tableRows: [
        { title: 'Unit 3: Quadratic Equations', meta: 'Math', status: 'Fri', statusTone: 'blue' },
        { title: 'Essay draft — History', meta: 'History', status: 'Mon', statusTone: 'amber' },
        { title: 'Ch. 5–7 Reading', meta: 'English', status: 'Wed', statusTone: 'green' },
        { title: 'Lab report', meta: 'Science', status: 'Next week', statusTone: 'purple' },
      ],
      boardColumns: [
        { title: 'To Do', dotColor: '#F59E0B', cards: ['Problem set 4', 'Review notes'] },
        { title: 'In Progress', dotColor: '#0EA5E9', cards: ['Essay draft'] },
        { title: 'Done', dotColor: '#22C55E', cards: ['Ch. 1–4 quiz'] },
      ],
      notes: ['Lesson & unit planning', 'Assignment tracker', 'Class schedule', 'Study checklist', 'Bulletin-board layout'],
    };
  }

  // ── Student: Monthly Planner (top image + Minimal Planner title + month row) ──
  if (title.includes('monthly planner')) {
    return {
      layout: 'content',
      variant: seed % 12,
      shell: 'minimal',
      skeleton: 'student-monthly-planner' as PreviewSkeleton,
      category: 'Student',
      badge: 'Monthly',
      accentGradient: 'linear-gradient(135deg,#FDE047,#FCD34D)',
      sidebarSections: [],
    };
  }

  // ── Student: My Class Schedule (gradient "Use it for school" + weekly calendar + daily to-dos) ──
  if (title.includes('my class schedule')) {
    return {
      layout: 'calendar',
      variant: seed % 12,
      shell: 'minimal',
      skeleton: 'student-class-schedule' as PreviewSkeleton,
      category: 'Student',
      badge: 'Class Schedule',
      accentGradient: 'linear-gradient(135deg,#0EA5E9,#E0F2FE,#22C55E)',
      sidebarSections: [],
      calendarCells: Array.from({ length: 21 }).map((_, i) => ({
        day: i + 1,
        label: i % 5 === 2 ? 'Math' : i % 5 === 3 ? 'Read' : undefined,
        active: i % 7 < 5,
      })),
      notes: ['Review Ch.4', 'Problem set', 'Essay draft', 'Lab prep'],
    };
  }

  // ── Meeting Notes & Agendas (doc-report variant: light blue summary + numbered agenda) ──
  if (title.includes('meeting notes') && title.includes('agendas')) {
    const base = buildProductivity(template, seed);
    return { ...base, skeleton: 'doc-report' as PreviewSkeleton };
  }

  // ── Startup Operating System (date filter + green line chart + blue/green dual bar) ──
  if (title.includes('startup operating system') || title.includes('startup os')) {
    return {
      layout: 'timeline',
      variant: seed % 12,
      shell: 'dashboard',
      skeleton: 'startup-os' as PreviewSkeleton,
      category: 'Business',
      badge: 'Startup OS',
      accentGradient: 'linear-gradient(135deg,#3B82F6,#22C55E)',
      sidebarSections: ['Strategy', 'OKRs', 'Metrics', 'Meetings'],
      chartLine: { points: [32, 45, 38, 52, 58, 65, 70] },
      chartBarMulti: {
        labels: ['W1', 'W2', 'W3', 'W4'],
        series: [
          { name: 'A', values: [40, 55, 48, 62] },
          { name: 'B', values: [28, 42, 50, 58] },
        ],
      },
      notes: [],
    };
  }

  // ── Note-Taking Methods Library (filter + line chart) ──
  if (title.includes('note-taking methods')) {
    const seed = seeded(template);
    return {
      layout: 'content',
      variant: seed % 12,
      shell: 'doc',
      skeleton: 'note-taking-methods' as PreviewSkeleton,
      category: 'Student',
      badge: 'Note-Taking',
      accentGradient: 'linear-gradient(135deg,#60A5FA,#A78BFA)',
      sidebarSections: [],
      chartLine: { points: [20, 35, 28, 48, 52, 60, 55, 72] },
    };
  }

  // ── Wedding Planning Hub (wedding dress image + checklist, pink/gold) ──
  if (title.includes('wedding planning')) {
    return {
      layout: 'content',
      variant: seed % 12,
      shell: 'minimal',
      skeleton: 'wedding-planning' as PreviewSkeleton,
      category: 'Wedding',
      badge: 'Wedding',
      accentGradient: 'linear-gradient(135deg,#EC4899,#F59E0B)',
      sidebarSections: [],
      notes: ['Book venue', 'Choose caterer', 'Send invites', 'Finalize flowers', 'Hire photographer', 'Dress fitting'],
    };
  }

  // ── Conference & Trip Agenda (same skeleton as Wedding: image + title + checklist, conference/trip theme) ──
  if (title.includes('conference') && title.includes('trip agenda')) {
    return {
      layout: 'content',
      variant: seed % 12,
      shell: 'minimal',
      skeleton: 'conference-agenda' as PreviewSkeleton,
      category: 'Event Planning',
      badge: 'Conference & Trip',
      accentGradient: 'linear-gradient(135deg,#0F766E,#0D9488)',
      sidebarSections: [],
      notes: ['Keynote & sessions', 'Meetings & 1:1s', 'Contacts & follow-ups', 'Session notes', 'Travel & logistics', 'Action items'],
    };
  }

  // ── Year of Habits Vision (wellness skeleton, blue theme) ──
  if (title.includes('year of habits vision')) {
    return {
      ...buildWellness(template, seed),
      category: 'Habit Tracker',
      badge: 'Year of Habits',
      accentGradient: 'linear-gradient(135deg,#2563EB,#0EA5E9)',
    };
  }

  // ── Featured: Tarot Learning Vault ──
  if (title.includes('tarot learning vault')) {
    return {
      layout: 'table',
      variant: seed % 12,
      shell: 'doc',
      skeleton: 'featured-tarot' as PreviewSkeleton,
      category: 'Learning Database',
      badge: '🔮 Tarot Vault',
      accentGradient: 'linear-gradient(135deg,#7C3AED,#DB2777)',
      sidebarSections: ['Major Arcana', 'Wands', 'Cups', 'Swords', 'Pentacles', 'Spreads', 'Daily Draws'],
      tableHeaders: ['Card', 'Keywords', 'Element', 'Progress'],
      tableRows: [
        { title: '0 – The Fool', meta: 'New beginnings, innocence', status: 'Studied', statusTone: 'green' },
        { title: 'I – The Magician', meta: 'Willpower, manifestation', status: 'Studied', statusTone: 'green' },
        { title: 'II – High Priestess', meta: 'Intuition, subconscious', status: 'In Progress', statusTone: 'blue' },
        { title: 'III – The Empress', meta: 'Abundance, fertility', status: 'In Progress', statusTone: 'blue' },
        { title: 'Ace of Cups', meta: 'Love, new feelings', status: 'Planned', statusTone: 'amber' },
        { title: 'Knight of Swords', meta: 'Action, ambition', status: 'Queued', statusTone: 'purple' },
      ],
      boardColumns: [
        { title: 'Major Arcana', dotColor: '#7C3AED', cards: ['The Fool', 'The Magician', 'High Priestess', 'The Empress'] },
        { title: 'Cups', dotColor: '#3B82F6', cards: ['Ace of Cups', 'Two of Cups', 'Queen of Cups'] },
        { title: 'Wands', dotColor: '#F59E0B', cards: ['Ace of Wands', 'Three of Wands', 'King of Wands'] },
      ],
      kpis: [
        { label: 'Cards Studied', value: '34 / 78' },
        { label: 'Spreads Learned', value: '6 / 12' },
        { label: 'Daily Draws', value: '23 days' },
      ],
      calendarCells: Array.from({ length: 14 }).map((_, i) => ({
        day: i + 1,
        label: i % 3 === 0 ? pick(['The Star', 'Two of Cups', 'Strength', 'The Moon', 'Ace of Wands'], seed, i) : undefined,
        active: i % 2 === 0,
      })),
      notes: [
        '78 card meanings (upright & reversed)',
        'Spread encyclopedia with layouts',
        'Daily draw journal with prompts',
        'Interpretation practice log',
        'Suit & element cheat sheets',
      ],
    };
  }

  // ── AI Engineering Roadmap by Data With Baraa (article-style, no sidebar) ──
  if (title.includes('ai engineering roadmap by data with baraa')) {
    return {
      layout: 'content',
      variant: seed % 12,
      shell: 'doc',
      category: 'Skill Roadmap',
      badge: '🤖 AI/ML Path',
      accentGradient: 'linear-gradient(135deg,#2563EB,#06B6D4)',
      sidebarSections: [],
    };
  }

  // ── Featured: AI Engineering Skill Path (roadmap with sidebar) ──
  if (title.includes('ai engineering')) {
    return {
      layout: 'timeline',
      variant: seed % 12,
      shell: 'dashboard',
      skeleton: 'featured-ai-roadmap' as PreviewSkeleton,
      category: 'Skill Roadmap',
      badge: '🤖 AI/ML Path',
      accentGradient: 'linear-gradient(135deg,#2563EB,#06B6D4)',
      sidebarSections: ['Foundations', 'ML Core', 'Deep Learning', 'LLM Apps', 'MLOps', 'Capstone', 'Interview Prep'],
      milestones: [
        { label: 'Foundations', short: 'P1', position: '4%' },
        { label: 'ML Core', short: 'P2', position: '20%' },
        { label: 'Deep Learning', short: 'P3', position: '36%' },
        { label: 'LLM Apps', short: 'P4', position: '52%' },
        { label: 'MLOps', short: 'P5', position: '68%' },
        { label: 'Capstone', short: 'P6', position: '84%' },
      ],
      tableHeaders: ['Topic', 'Phase', 'Status', 'Resources'],
      tableRows: [
        { title: 'Linear Algebra & Calculus', meta: 'Foundations', status: 'Done', statusTone: 'green' },
        { title: 'Python & NumPy', meta: 'Foundations', status: 'Done', statusTone: 'green' },
        { title: 'Scikit-learn & Feature Eng.', meta: 'ML Core', status: 'Done', statusTone: 'green' },
        { title: 'Transformers & Attention', meta: 'Deep Learning', status: 'In Progress', statusTone: 'blue' },
        { title: 'RAG & Vector Databases', meta: 'LLM Apps', status: 'Planned', statusTone: 'amber' },
        { title: 'Model Serving & CI/CD', meta: 'MLOps', status: 'Queued', statusTone: 'purple' },
      ],
      kpis: [
        { label: 'Current Phase', value: '3 / 6' },
        { label: 'Topics Done', value: '24 / 48' },
        { label: 'Sprint Streak', value: '7 weeks' },
      ],
      boardColumns: [
        { title: 'This Sprint', dotColor: '#3B82F6', cards: ['Read "Attention Is All You Need"', 'Build RAG prototype'] },
        { title: 'Up Next', dotColor: '#F59E0B', cards: ['Fine-tuning lab', 'LangChain agent'] },
        { title: 'Completed', dotColor: '#22C55E', cards: ['PyTorch basics', 'Feature eng. project'] },
      ],
      notes: [
        '6-phase roadmap from basics to production',
        'Curated resource tracker per phase',
        'Weekly skill sprints with time blocks',
        'Hands-on mini-project briefs',
        'Milestone retrospective templates',
        'Interview prep question bank',
      ],
    };
  }

  // ── Featured: Travel Bucket List & Wish List ──
  if (title.includes('travel bucket list')) {
    return {
      layout: 'travel',
      variant: seed % 12,
      shell: 'minimal',
      skeleton: 'featured-travel-bucket' as PreviewSkeleton,
      category: 'Travel',
      badge: '✈️ Bucket List',
      accentGradient: 'linear-gradient(135deg,#06B6D4,#10B981)',
      sidebarSections: ['All Destinations', 'Dreaming', 'Planning', 'Explored', 'By Continent', 'By Season'],
      tableHeaders: ['Destination', 'Country', 'Status', 'Season'],
      tableRows: [
        { title: 'Santorini', meta: 'Greece', status: 'Dreaming', statusTone: 'purple' },
        { title: 'Kyoto', meta: 'Japan', status: 'Planning', statusTone: 'blue' },
        { title: 'Banff', meta: 'Canada', status: 'Planning', statusTone: 'blue' },
        { title: 'Reykjavik', meta: 'Iceland', status: 'Dreaming', statusTone: 'amber' },
        { title: 'Bali', meta: 'Indonesia', status: 'Explored', statusTone: 'green' },
        { title: 'Patagonia', meta: 'Argentina', status: 'Dreaming', statusTone: 'purple' },
      ],
      boardColumns: [
        { title: 'Dreaming', dotColor: '#A855F7', cards: ['Santorini, Greece', 'Reykjavik, Iceland', 'Patagonia, Argentina'] },
        { title: 'Planning', dotColor: '#3B82F6', cards: ['Kyoto, Japan', 'Banff, Canada'] },
        { title: 'Explored', dotColor: '#22C55E', cards: ['Bali, Indonesia', 'Barcelona, Spain'] },
      ],
      kpis: [
        { label: 'Total Places', value: '24' },
        { label: 'Explored', value: '6' },
        { label: 'Next Trip', value: 'Kyoto' },
      ],
      notes: [
        'Gallery with cover photos',
        'Dreaming → Planning → Explored',
        'Filter by continent & season',
        'Budget per destination',
        'Packing checklists',
        'Booking links & notes',
      ],
    };
  }

  // ── Newsletter & Email Content (use Travel Bucket skeleton style) ──
  if (title.includes('newsletter') && title.includes('email content')) {
    return {
      layout: 'travel',
      variant: seed % 12,
      shell: 'minimal',
      skeleton: 'featured-travel-bucket' as PreviewSkeleton,
      category: 'Creator',
      badge: 'Email Planner',
      accentGradient: 'linear-gradient(135deg,#06B6D4,#10B981)',
      sidebarSections: ['All Campaigns', 'Ideas', 'Drafting', 'Scheduled', 'Sent', 'Performance'],
      tableHeaders: ['Campaign', 'Audience', 'Status', 'Send Date'],
      tableRows: [
        { title: 'Welcome Flow', meta: 'New Subscribers', status: 'Drafting', statusTone: 'purple' },
        { title: 'Weekly Roundup', meta: 'All Subscribers', status: 'Scheduled', statusTone: 'blue' },
        { title: 'Product Launch', meta: 'Interested Leads', status: 'Scheduled', statusTone: 'blue' },
        { title: 'Abandoned Cart', meta: 'Cart Visitors', status: 'Idea', statusTone: 'amber' },
        { title: 'Holiday Promo', meta: 'Segment A', status: 'Sent', statusTone: 'green' },
        { title: 'Re-engagement', meta: 'Inactive List', status: 'Drafting', statusTone: 'purple' },
      ],
      boardColumns: [
        { title: 'Ideas', dotColor: '#A855F7', cards: ['Black Friday teaser', 'Lead magnet follow-up', 'Monthly wins email'] },
        { title: 'Drafting', dotColor: '#3B82F6', cards: ['Welcome Flow #2', 'Weekly Roundup #18'] },
        { title: 'Sent', dotColor: '#22C55E', cards: ['Holiday Promo', 'Product Update #7'] },
      ],
      kpis: [
        { label: 'Campaigns', value: '24' },
        { label: 'Sent', value: '11' },
        { label: 'Next Send', value: 'Fri' },
      ],
      notes: [
        'Campaign planner with statuses',
        'Audience segmentation notes',
        'Draft-to-send workflow',
        'Weekly send cadence tracker',
        'Performance follow-up checklist',
        'Reusable campaign ideas bank',
      ],
    };
  }

  // ── Content Creator Kit (soft orange theme) ──
  const slug = (template.slug ?? '').toLowerCase();
  if (slug.includes('content-creator-kit') || title.includes('content creator kit')) {
    return {
      ...buildContent(template, seed),
      shell: 'dashboard',
      accentGradient: 'linear-gradient(135deg,#FDE68A,#FDBA74)',
      badge: 'Creator Kit',
      skeleton: chooseSkeleton('content', seed),
      boardColumns: [
        { title: 'Ideas', dotColor: '#FCD34D', cards: ['Hook ideas', 'Tutorial concept', 'Case study'] },
        { title: 'In Production', dotColor: '#FDBA74', cards: ['Script draft', 'Edit timeline', 'Thumbnail'] },
        { title: 'Scheduled', dotColor: '#FDE68A', cards: ['Newsletter issue', 'YouTube upload'] },
      ],
    };
  }

  // ── Featured: 12 Week Year Planner ──
  if (title.includes('12 week year planner')) {
    return {
      layout: 'timeline',
      variant: seed % 12,
      shell: 'app',
      skeleton: 'featured-12week' as PreviewSkeleton,
      category: 'Productivity',
      badge: '12-Week Execution',
      accentGradient: 'linear-gradient(135deg,#F59E0B,#EF4444)',
      sidebarSections: ['Dashboard', 'Goals', 'Weekly Plan', 'Scorecard', 'Review', 'Vision'],
      milestones: [
        { label: 'Wk 1–3', short: 'W1', position: '8%' },
        { label: 'Wk 4–6', short: 'W4', position: '30%' },
        { label: 'Wk 7–9', short: 'W7', position: '54%' },
        { label: 'Wk 10–12', short: 'W10', position: '78%' },
      ],
      tableHeaders: ['Goal', 'Tactic', 'Status', 'Score'],
      tableRows: [
        { title: 'Launch side project', meta: 'Ship MVP by week 8', status: '72%', statusTone: 'green' },
        { title: 'Read 6 books', meta: '1 book every 2 weeks', status: '50%', statusTone: 'blue' },
        { title: 'Run 100 miles', meta: '~8 miles per week', status: '85%', statusTone: 'green' },
        { title: 'Save $3,000', meta: '$250/wk auto-transfer', status: '40%', statusTone: 'amber' },
      ],
      kpis: [
        { label: 'Week', value: '7 / 12' },
        { label: 'Execution', value: '82%' },
        { label: 'Goals On Track', value: '3 / 4' },
      ],
      boardColumns: [
        { title: 'This Week', dotColor: '#F59E0B', cards: ['Ship feature A', 'Read ch. 5–8', 'Run 3×'] },
        { title: 'Done', dotColor: '#22C55E', cards: ['Write spec', 'Finish book #3'] },
        { title: 'Blocked', dotColor: '#EF4444', cards: ['Waiting on feedback'] },
      ],
      notes: [
        '12-week goal tracker with progress %',
        'Weekly scorecard (auto execution %)',
        'Mon–Fri tactic planner',
        'Friday review template',
        'Vision alignment page',
        'Cycle rollover checklist',
      ],
    };
  }

  // ── Replica: Travel Bucket Wish List (Lilian) ──
  if (title.includes('travel bucket wish list')) {
    return {
      layout: 'travel',
      variant: seed % 12,
      shell: 'minimal',
      skeleton: 'featured-travel-wish' as PreviewSkeleton,
      category: 'Travel',
      badge: '🌍 Wish List',
      accentGradient: 'linear-gradient(135deg,#06B6D4,#22C55E)',
      sidebarSections: ['All Places', 'Wish List', 'Planned', 'Visited', 'By Region'],
      tableHeaders: ['Destination', 'Country', 'Status', 'Season'],
      tableRows: [
        { title: 'Amalfi Coast', meta: 'Italy', status: 'Wish List', statusTone: 'purple' },
        { title: 'Tokyo', meta: 'Japan', status: 'Planned', statusTone: 'blue' },
        { title: 'Queenstown', meta: 'New Zealand', status: 'Wish List', statusTone: 'purple' },
        { title: 'Marrakech', meta: 'Morocco', status: 'Wish List', statusTone: 'amber' },
        { title: 'Swiss Alps', meta: 'Switzerland', status: 'Visited', statusTone: 'green' },
        { title: 'Havana', meta: 'Cuba', status: 'Wish List', statusTone: 'purple' },
      ],
      boardColumns: [
        { title: 'Wish List', dotColor: '#A855F7', cards: ['Amalfi Coast', 'Queenstown', 'Marrakech', 'Havana'] },
        { title: 'Planned', dotColor: '#3B82F6', cards: ['Tokyo', 'Cape Town'] },
        { title: 'Visited', dotColor: '#22C55E', cards: ['Swiss Alps', 'Paris'] },
      ],
      kpis: [
        { label: 'Wish List', value: '18' },
        { label: 'Planned', value: '3' },
        { label: 'Visited', value: '5' },
      ],
      notes: [
        'Gallery with cover photos',
        'Wish List → Planned → Visited',
        'Filter by region & season',
        'Budget & packing per trip',
      ],
    };
  }

  // ── Replica: The 2026 Social Media Content Planner (heyismail) ──
  if (title.includes('2026 social media')) {
    return {
      layout: 'content',
      variant: seed % 12,
      shell: 'dashboard',
      skeleton: 'featured-social-planner' as PreviewSkeleton,
      category: 'Event Planning',
      badge: '📱 Social Planner',
      accentGradient: 'linear-gradient(135deg,#8B5CF6,#EC4899)',
      sidebarSections: ['Dashboard', 'All Posts', 'Calendar', 'Hashtag Bank', 'Analytics', 'Repurpose'],
      tableHeaders: ['Content', 'Platform', 'Status', 'Date'],
      tableRows: [
        { title: 'Product launch reel', meta: 'Instagram', status: 'Scheduled', statusTone: 'green' },
        { title: 'Behind the scenes', meta: 'TikTok', status: 'Draft', statusTone: 'blue' },
        { title: 'Thread: 10 tips', meta: 'X / Twitter', status: 'Idea', statusTone: 'amber' },
        { title: 'Carousel: case study', meta: 'LinkedIn', status: 'Published', statusTone: 'green' },
        { title: 'Tutorial short', meta: 'YouTube Shorts', status: 'Draft', statusTone: 'blue' },
      ],
      boardColumns: [
        { title: 'Ideas', dotColor: '#F59E0B', cards: ['Trend reaction', 'Q&A post', 'Meme format'] },
        { title: 'In Production', dotColor: '#8B5CF6', cards: ['Tutorial reel', 'Carousel draft'] },
        { title: 'Scheduled', dotColor: '#22C55E', cards: ['Launch reel', 'Newsletter promo'] },
      ],
      kpis: [
        { label: 'This Week', value: '8 posts' },
        { label: 'Scheduled', value: '12' },
        { label: 'Published', value: '47' },
      ],
      calendarCells: Array.from({ length: 21 }).map((_, i) => ({
        day: i + 1,
        label: i % 3 === 0 ? pick(['Reel', 'Post', 'Story', 'Short', 'Thread'], seed, i) : undefined,
        active: i % 2 === 0,
      })),
      notes: [
        'Multi-platform content database',
        'Calendar & board views',
        'Hashtag bank & caption drafts',
        'Idea → Draft → Scheduled → Published',
        'Weekly analytics snapshot',
        'Repurpose tracker',
      ],
    };
  }

  // ── Replica: Investment & Portfolio Log ──
  if (title.includes('investment & portfolio log') || title.includes('investment portfolio log') || template.slug.includes('investment-portfolio-log')) {
    return {
      layout: 'content',
      variant: seed % 12,
      shell: 'app',
      skeleton: 'featured-tiktok-ig' as PreviewSkeleton,
      category: 'Personal Finance',
      badge: '📈 Portfolio Tracker',
      accentGradient: 'linear-gradient(135deg,#2563EB,#10B981)',
      sidebarSections: ['Market Pulse', 'Watchlist', 'Holdings', 'Trades', 'Dividends', 'Risk', 'Notes'],
      tableHeaders: ['Asset', 'Type', 'Status', 'Weight'],
      tableRows: [
        { title: 'AAPL', meta: 'Stock', status: 'Accumulating', statusTone: 'green' },
        { title: 'NVDA', meta: 'Stock', status: 'Watching', statusTone: 'blue' },
        { title: 'VOO', meta: 'ETF', status: 'Core Hold', statusTone: 'purple' },
        { title: 'TSLA', meta: 'Stock', status: 'Trimmed', statusTone: 'amber' },
        { title: 'MSFT', meta: 'Stock', status: 'Hold', statusTone: 'green' },
      ],
      boardColumns: [
        { title: 'Research', dotColor: '#3B82F6', cards: ['Earnings notes', 'Sector rotation'] },
        { title: 'Active', dotColor: '#10B981', cards: ['AAPL add-on', 'VOO DCA'] },
        { title: 'Review', dotColor: '#F59E0B', cards: ['Rebalance check', 'Stop-loss update'] },
        { title: 'Closed', dotColor: '#8B5CF6', cards: ['TSLA swing', 'Hedge unwind'] },
      ],
      kpis: [
        { label: 'Total Value', value: '$248.3K' },
        { label: '1D Change', value: '+1.7%' },
        { label: 'YTD', value: '+12.4%' },
      ],
      notes: [
        'Watchlist and holdings overview',
        'Trade journal with entry/exit notes',
        'Allocation and risk tracking',
        'Dividend calendar and payout log',
        'Weekly review and rebalance checklist',
        'Market thesis and catalyst notes',
      ],
    };
  }

  // ── Replica: Content Planner for TikTok & Instagram Influencers (Linda) ──
  if (title.includes('content planner for tiktok')) {
    return {
      layout: 'content',
      variant: seed % 12,
      shell: 'app',
      skeleton: 'featured-tiktok-ig' as PreviewSkeleton,
      category: 'Creator',
      badge: '🎬 TikTok & IG',
      accentGradient: 'linear-gradient(135deg,#EC4899,#F43F5E)',
      sidebarSections: ['This Week', 'Content Bank', 'Reels', 'TikToks', 'Stories', 'Hashtags', 'Trending Audio'],
      tableHeaders: ['Content', 'Type', 'Status', 'Platform'],
      tableRows: [
        { title: 'Morning routine reel', meta: 'Reel', status: 'Filmed', statusTone: 'green' },
        { title: 'Get ready with me', meta: 'TikTok', status: 'Editing', statusTone: 'blue' },
        { title: 'Weekly favorites', meta: 'Story', status: 'Captioned', statusTone: 'purple' },
        { title: 'Outfit transition', meta: 'Reel + TikTok', status: 'Idea', statusTone: 'amber' },
        { title: 'Day in my life', meta: 'TikTok', status: 'Scheduled', statusTone: 'green' },
      ],
      boardColumns: [
        { title: 'Film', dotColor: '#F43F5E', cards: ['Outfit transition', 'Haul unboxing'] },
        { title: 'Edit', dotColor: '#8B5CF6', cards: ['Get ready with me', 'Recipe clip'] },
        { title: 'Caption', dotColor: '#F59E0B', cards: ['Weekly favorites'] },
        { title: 'Schedule', dotColor: '#22C55E', cards: ['Morning routine', 'Day in my life'] },
      ],
      kpis: [
        { label: 'This Week', value: '6 posts' },
        { label: 'Filmed', value: '3' },
        { label: 'Scheduled', value: '4' },
      ],
      notes: [
        'Weekly calendar for TikTok & IG',
        'Content pillars & idea bank',
        'Reel, Story & TikTok trackers',
        'Hashtag sets & trending audio',
        'Performance notes per post',
        'Film → Edit → Caption → Schedule',
      ],
    };
  }

  const withSkeleton = (cfg: Omit<TemplatePreviewConfig, 'skeleton'>): TemplatePreviewConfig => ({
    ...cfg,
    skeleton: chooseSkeleton(kind, seed),
  });
  switch (kind) {
    case 'student':
      return withSkeleton(buildStudent(template, seed));
    case 'business':
      return withSkeleton(buildBusiness(template, seed));
    case 'finance':
      return withSkeleton(buildFinance(template, seed));
    case 'travel':
      return withSkeleton(buildTravel(template, seed));
    case 'content':
      return withSkeleton(buildContent(template, seed));
    case 'wellness':
      return withSkeleton(buildWellness(template, seed));
    case 'crm':
      return withSkeleton(buildCRM(template, seed));
    case 'productivity':
    default:
      return withSkeleton(buildProductivity(template, seed));
  }
}

