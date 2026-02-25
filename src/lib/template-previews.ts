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
  const slug = (template.slug ?? '').toLowerCase();

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

  // ── Study Habit Tracker (use Travel Bucket skeleton, study-themed content) ──
  if ((template.slug ?? '').includes('study-habit-tracker') || title.includes('study habit tracker')) {
    return {
      layout: 'travel',
      variant: seed % 12,
      shell: 'minimal',
      skeleton: 'featured-travel-bucket' as PreviewSkeleton,
      category: 'Student',
      badge: 'Study Habits',
      accentGradient: 'linear-gradient(135deg,#60A5FA,#A78BFA)',
      sidebarSections: ['All Habits', 'Planned', 'In Progress', 'Consistent', 'By Subject', 'By Time Block'],
      tableHeaders: ['Habit', 'Subject', 'Status', 'Frequency'],
      tableRows: [
        { title: 'Pomodoro 4 cycles', meta: 'Math', status: 'In Progress', statusTone: 'blue' },
        { title: 'Active recall quiz', meta: 'Biology', status: 'Consistent', statusTone: 'green' },
        { title: 'Cornell notes review', meta: 'History', status: 'Planned', statusTone: 'amber' },
        { title: 'Spaced repetition deck', meta: 'Chemistry', status: 'In Progress', statusTone: 'blue' },
        { title: 'Reading block (45m)', meta: 'English', status: 'Consistent', statusTone: 'green' },
        { title: 'Weekly reflection', meta: 'General', status: 'Planned', statusTone: 'purple' },
      ],
      boardColumns: [
        { title: 'Planned', dotColor: '#A78BFA', cards: ['Cornell notes review', 'Weekly reflection'] },
        { title: 'In Progress', dotColor: '#60A5FA', cards: ['Pomodoro 4 cycles', 'Spaced repetition deck'] },
        { title: 'Consistent', dotColor: '#22C55E', cards: ['Active recall quiz', 'Reading block (45m)'] },
      ],
      kpis: [
        { label: 'Habits', value: '18' },
        { label: 'Consistent', value: '7' },
        { label: 'Streak', value: '12 days' },
      ],
      notes: [
        'Habit tracker by subject',
        'Daily and weekly check-ins',
        'Streak and consistency view',
        'Time-block planning',
        'Review and reflection prompts',
        'Progress dashboard widgets',
      ],
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

  // ── Startup Operating System skeleton family (date filter + green line + dual bar) ──
  const isStartupOperatingSystem =
    title.includes('startup operating system') || title.includes('startup os');
  const isStepsActivityTracker = slug === 'steps-activity-tracker-168';
  if (isStartupOperatingSystem || isStepsActivityTracker) {
    return {
      layout: 'timeline',
      variant: seed % 12,
      shell: 'dashboard',
      skeleton: 'startup-os' as PreviewSkeleton,
      category: isStepsActivityTracker ? 'Fitness' : 'Business',
      badge: isStepsActivityTracker ? 'Steps Tracker' : 'Startup OS',
      accentGradient: 'linear-gradient(135deg,#3B82F6,#22C55E)',
      sidebarSections: isStepsActivityTracker
        ? ['Daily Steps', 'Weekly Goal', 'Activity Types', 'Trends']
        : ['Strategy', 'OKRs', 'Metrics', 'Meetings'],
      chartLine: {
        points: isStepsActivityTracker
          ? [48, 54, 60, 72, 68, 76, 84]
          : [32, 45, 38, 52, 58, 65, 70],
      },
      chartBarMulti: {
        labels: isStepsActivityTracker
          ? ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8']
          : ['W1', 'W2', 'W3', 'W4'],
        series: [
          isStepsActivityTracker
            ? { name: 'Steps', values: [62, 70, 76, 84, 88, 93, 97, 102] }
            : { name: 'A', values: [40, 55, 48, 62] },
          isStepsActivityTracker
            ? { name: 'Active min', values: [38, 46, 52, 58, 62, 66, 71, 75] }
            : { name: 'B', values: [28, 42, 50, 58] },
          ...(isStepsActivityTracker
            ? [
                { name: 'Distance', values: [24, 29, 33, 36, 39, 42, 46, 49] },
                { name: 'Floors', values: [12, 14, 16, 18, 19, 21, 23, 24] },
              ]
            : []),
        ],
      },
      notes: isStepsActivityTracker
        ? [
            'Daily steps tracker with weekly trend',
            'Activity minutes by week',
            'Goal progress and consistency view',
            'Walking and movement habit monitoring',
          ]
        : [],
    };
  }

  // ── Side Income / Commission / Cash Flow: use filter-driven charts skeleton ──
  if (
    slug === 'side-income-freelance-log-55' ||
    slug === 'commission-incentive-tracker-140' ||
    slug === 'cash-flow-overview-58'
  ) {
    const isCommissionIncentive = slug === 'commission-incentive-tracker-140';
    const isCashFlowOverview = slug === 'cash-flow-overview-58';
    return {
      layout: 'timeline',
      variant: seed % 12,
      shell: 'dashboard',
      skeleton: 'startup-os' as PreviewSkeleton,
      category: isCommissionIncentive ? 'CRM' : 'Finance',
      badge: isCommissionIncentive ? 'Commission Tracker' : isCashFlowOverview ? 'Cash Flow' : 'Freelance Log',
      accentGradient: isCommissionIncentive
        ? 'linear-gradient(135deg,#232100,#3A3615)'
        : isCashFlowOverview
          ? 'linear-gradient(135deg,#062B30,#0F766E)'
        : 'linear-gradient(135deg,#2563EB,#16A34A)',
      sidebarSections: isCommissionIncentive
        ? ['Dashboard', 'Deals', 'Reps', 'Payouts', 'Reports']
        : isCashFlowOverview
          ? ['Dashboard', 'Cash In', 'Cash Out', 'Recurring', 'Forecast']
        : ['Dashboard', 'Income', 'Clients', 'Expenses', 'Reports'],
      chartLine: {
        points: isCommissionIncentive
          ? [26, 33, 39, 45, 52, 60, 66]
          : isCashFlowOverview
            ? [34, 40, 37, 46, 52, 49, 58]
            : [28, 34, 42, 48, 54, 61, 68],
      },
      chartBarMulti: {
        labels: ['W1', 'W2', 'W3', 'W4'],
        series: [
          isCommissionIncentive
            ? { name: 'Commission', values: [30, 38, 45, 54] }
            : isCashFlowOverview
              ? { name: 'Inflow', values: [52, 58, 55, 63] }
            : { name: 'Income', values: [40, 52, 58, 66] },
          isCommissionIncentive
            ? { name: 'Incentive', values: [14, 18, 21, 26] }
            : isCashFlowOverview
              ? { name: 'Outflow', values: [36, 39, 41, 44] }
            : { name: 'Expense', values: [18, 22, 25, 29] },
        ],
      },
      tableHeaders: isCommissionIncentive
        ? ['Deal / Account', 'Payout', 'Status', 'Date']
        : isCashFlowOverview
          ? ['Cash Stream', 'Amount', 'Status', 'Date']
        : ['Client / Project', 'Amount', 'Status', 'Date'],
      tableRows: isCommissionIncentive
        ? [
            { title: 'ACME Renewal', meta: '$1,200', status: 'Paid', statusTone: 'green' },
            { title: 'Northwind Expansion', meta: '$860', status: 'Approved', statusTone: 'blue' },
            { title: 'Globex Upsell', meta: '$540', status: 'Pending', statusTone: 'amber' },
            { title: 'Quarterly Bonus', meta: '$400', status: 'Incentive', statusTone: 'purple' },
          ]
        : isCashFlowOverview
          ? [
              { title: 'Client Receivables', meta: '$1,640', status: 'Expected', statusTone: 'blue' },
              { title: 'Subscription Revenue', meta: '$980', status: 'Received', statusTone: 'green' },
              { title: 'Payroll + Ops', meta: '$1,120', status: 'Scheduled', statusTone: 'amber' },
              { title: 'Net Cash Position', meta: '+$740', status: 'Positive', statusTone: 'purple' },
            ]
        : [
            { title: 'Website Retainer', meta: '$800', status: 'Paid', statusTone: 'green' },
            { title: 'Brand Assets Pack', meta: '$520', status: 'Invoiced', statusTone: 'blue' },
            { title: 'Content Sprint', meta: '$460', status: 'Pending', statusTone: 'amber' },
            { title: 'Software Tools', meta: '$120', status: 'Expense', statusTone: 'purple' },
          ],
      notes: isCommissionIncentive
        ? ['Deal commission', 'Rep ownership', 'Payout status', 'Monthly incentive']
        : isCashFlowOverview
          ? ['Cash inflow and outflow dashboard', 'Recurring expense tracking', 'Weekly variance analysis', 'Net cash projection']
        : ['Income log', 'Client/project', 'Expenses', 'Monthly total'],
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

  // ── Bucket List & Life Goals: keep theme, use AI roadmap skeleton style ──
  if ((template.slug ?? '').includes('bucket-list-life-goals') || (title.includes('bucket list') && title.includes('life goals'))) {
    const base = buildProductivity(template, seed);
    return {
      ...base,
      layout: 'content',
      shell: 'doc',
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

  // ── Newsletter & Email Content family (shared skeleton with theme-specific content) ──
  const isNewsletterEmail =
    title.includes('newsletter') && title.includes('email content');
  const isDateNightIdeasBank = slug === 'date-night-ideas-bank-192';
  const isRfpResponseTracker = slug === 'rfp-response-tracker-138';
  if (isNewsletterEmail || isDateNightIdeasBank || isRfpResponseTracker) {
    const category = isDateNightIdeasBank
      ? 'Lifestyle'
      : isRfpResponseTracker
        ? 'CRM'
        : 'Creator';
    const badge = isDateNightIdeasBank
      ? 'Date Ideas'
      : isRfpResponseTracker
        ? 'RFP Tracker'
        : 'Email Planner';
    const sidebarSections = isDateNightIdeasBank
      ? ['All Ideas', 'At Home', 'Outdoors', 'Budget-Friendly', 'Special Occasion', 'Tried']
      : isRfpResponseTracker
        ? ['All RFPs', 'Qualified', 'Drafting', 'Review', 'Submitted', 'Won']
        : ['All Campaigns', 'Ideas', 'Drafting', 'Scheduled', 'Sent', 'Performance'];
    const tableHeaders = isDateNightIdeasBank
      ? ['Idea', 'Vibe', 'Status', 'When']
      : isRfpResponseTracker
        ? ['RFP', 'Client', 'Status', 'Deadline']
        : ['Campaign', 'Audience', 'Status', 'Send Date'];
    const tableRows = isDateNightIdeasBank
      ? [
          { title: 'Sunset picnic + playlist', meta: 'Romantic', status: 'Planned', statusTone: 'purple' as const },
          { title: 'Cook a new recipe together', meta: 'At Home', status: 'This Week', statusTone: 'blue' as const },
          { title: 'Game night challenge', meta: 'Cozy', status: 'Tried', statusTone: 'green' as const },
          { title: 'Museum + coffee walk', meta: 'City Date', status: 'Idea', statusTone: 'amber' as const },
          { title: 'No-phone conversation night', meta: 'Connection', status: 'Planned', statusTone: 'blue' as const },
          { title: 'Mini road trip', meta: 'Adventure', status: 'Saved', statusTone: 'purple' as const },
        ]
      : isRfpResponseTracker
        ? [
            { title: 'Enterprise Security Platform', meta: 'NorthBridge Inc.', status: 'Drafting', statusTone: 'purple' as const },
            { title: 'Data Migration Services', meta: 'Vertex Health', status: 'Review', statusTone: 'blue' as const },
            { title: 'Cloud Cost Optimization', meta: 'Apex Retail', status: 'Submitted', statusTone: 'green' as const },
            { title: 'Managed SOC Program', meta: 'Pioneer Bank', status: 'Qualified', statusTone: 'amber' as const },
            { title: 'CRM Consolidation', meta: 'Summit Group', status: 'Drafting', statusTone: 'purple' as const },
            { title: 'AI Support Copilot', meta: 'LumenCare', status: 'Won', statusTone: 'green' as const },
          ]
        : [
            { title: 'Welcome Flow', meta: 'New Subscribers', status: 'Drafting', statusTone: 'purple' as const },
            { title: 'Weekly Roundup', meta: 'All Subscribers', status: 'Scheduled', statusTone: 'blue' as const },
            { title: 'Product Launch', meta: 'Interested Leads', status: 'Scheduled', statusTone: 'blue' as const },
            { title: 'Abandoned Cart', meta: 'Cart Visitors', status: 'Idea', statusTone: 'amber' as const },
            { title: 'Holiday Promo', meta: 'Segment A', status: 'Sent', statusTone: 'green' as const },
            { title: 'Re-engagement', meta: 'Inactive List', status: 'Drafting', statusTone: 'purple' as const },
          ];
    const boardColumns = isDateNightIdeasBank
      ? [
          { title: 'Ideas', dotColor: '#A855F7', cards: ['Stargazing + hot cocoa', 'Bookstore + cafe date', 'DIY paint night'] },
          { title: 'Planned', dotColor: '#3B82F6', cards: ['Sunset picnic', 'Museum + coffee walk'] },
          { title: 'Tried', dotColor: '#22C55E', cards: ['Game night challenge', 'Home pasta night'] },
        ]
      : isRfpResponseTracker
        ? [
            { title: 'Qualified', dotColor: '#A855F7', cards: ['Managed SOC Program', 'Vendor onboarding checklist'] },
            { title: 'Drafting', dotColor: '#3B82F6', cards: ['Enterprise Security Platform', 'CRM Consolidation'] },
            { title: 'Submitted / Won', dotColor: '#22C55E', cards: ['Cloud Cost Optimization', 'AI Support Copilot'] },
          ]
        : [
            { title: 'Ideas', dotColor: '#A855F7', cards: ['Black Friday teaser', 'Lead magnet follow-up', 'Monthly wins email'] },
            { title: 'Drafting', dotColor: '#3B82F6', cards: ['Welcome Flow #2', 'Weekly Roundup #18'] },
            { title: 'Sent', dotColor: '#22C55E', cards: ['Holiday Promo', 'Product Update #7'] },
          ];
    const kpis = isDateNightIdeasBank
      ? [
          { label: 'Ideas', value: '36' },
          { label: 'Tried', value: '14' },
          { label: 'This Weekend', value: '2 plans' },
        ]
      : isRfpResponseTracker
        ? [
            { label: 'Open RFPs', value: '9' },
            { label: 'Submitted', value: '17' },
            { label: 'Win Rate', value: '31%' },
          ]
        : [
            { label: 'Campaigns', value: '24' },
            { label: 'Sent', value: '11' },
            { label: 'Next Send', value: 'Fri' },
          ];
    const notes = isDateNightIdeasBank
      ? [
          'Curated date-night idea bank',
          'Mood and budget-friendly categorization',
          'Plan and schedule upcoming dates',
          'Track tried ideas and favorites',
          'Quick inspiration prompts',
          'Reusable weekly date templates',
        ]
      : isRfpResponseTracker
        ? [
            'RFP intake and qualification workflow',
            'Section owners and due-date planning',
            'Draft, review, and approval checkpoints',
            'Submission tracker by client',
            'Win/loss notes and follow-up actions',
            'Reusable answer and compliance library',
          ]
        : [
            'Campaign planner with statuses',
            'Audience segmentation notes',
            'Draft-to-send workflow',
            'Weekly send cadence tracker',
            'Performance follow-up checklist',
            'Reusable campaign ideas bank',
          ];

    return {
      layout: 'travel',
      variant: seed % 12,
      shell: 'minimal',
      skeleton: 'featured-travel-bucket' as PreviewSkeleton,
      category,
      badge,
      accentGradient: 'linear-gradient(135deg,#06B6D4,#10B981)',
      sidebarSections,
      tableHeaders,
      tableRows,
      boardColumns,
      kpis,
      notes,
    };
  }

  // ── Content Creator Kit (soft orange theme) ──
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

  // ── Strategic Initiatives Tracker: reuse 12-week skeleton with strategic content ──
  const isStrategicInitiativesTracker =
    slug === 'strategic-initiatives-tracker-102' || title.includes('strategic initiatives tracker');
  if (isStrategicInitiativesTracker) {
    return {
      layout: 'timeline',
      variant: seed % 12,
      shell: 'app',
      skeleton: 'featured-12week' as PreviewSkeleton,
      category: 'Business',
      badge: 'Strategic Cycle',
      accentGradient: 'linear-gradient(135deg,#FFB6F3,#F9A8D4)',
      sidebarSections: ['Strategy HQ', 'Initiatives', 'Week Plan', 'Dependencies', 'Scorecard', 'Review'],
      milestones: [
        { label: 'Wk 1–3', short: 'W1', position: '8%' },
        { label: 'Wk 4–6', short: 'W4', position: '30%' },
        { label: 'Wk 7–9', short: 'W7', position: '54%' },
        { label: 'Wk 10–12', short: 'W10', position: '78%' },
      ],
      tableHeaders: ['Initiative', 'Owner', 'Status', 'Health'],
      tableRows: [
        { title: 'CRM migration rollout', meta: 'Revenue Ops', status: 'On Track', statusTone: 'green' },
        { title: 'Pricing & packaging refresh', meta: 'Strategy', status: 'At Risk', statusTone: 'amber' },
        { title: 'Partner channel expansion', meta: 'Sales', status: 'In Progress', statusTone: 'blue' },
        { title: 'QBR operating cadence', meta: 'Leadership', status: 'Blocked', statusTone: 'purple' },
      ],
      kpis: [
        { label: 'Week', value: '7 / 12' },
        { label: 'On-Track Initiatives', value: '6 / 9' },
        { label: 'Execution Score', value: '78%' },
      ],
      boardColumns: [
        { title: 'This Week', dotColor: '#F472B6', cards: ['Resolve pricing dependency', 'Approve launch plan', 'Sync owner updates'] },
        { title: 'Completed', dotColor: '#22C55E', cards: ['Baseline KPIs locked', 'Owner mapping finished'] },
        { title: 'Blocked', dotColor: '#C084FC', cards: ['Legal review pending'] },
      ],
      notes: [
        '12-week strategic initiative cycle view',
        'Weekly execution planning by owner',
        'Dependency and blocker visibility',
        'Initiative health scorecard',
        'Friday executive review template',
        'Cycle reset checklist for next quarter',
      ],
    };
  }

  // ── Project Roadmap & Timeline: reuse 12-week planner style with soft pink theme ──
  const isProjectRoadmapTimeline = slug === 'project-roadmap-timeline-103' || title.includes('project roadmap & timeline');
  if (isProjectRoadmapTimeline) {
    return {
      layout: 'timeline',
      variant: seed % 12,
      shell: 'app',
      skeleton: 'featured-12week' as PreviewSkeleton,
      category: 'Business',
      badge: 'Roadmap Timeline',
      accentGradient: 'linear-gradient(135deg,#FBCFE8,#F9A8D4)',
      sidebarSections: ['Roadmap', 'Milestones', 'Dependencies', 'Timeline', 'Owners', 'Status'],
      milestones: [
        { label: 'Kickoff', short: 'K', position: '8%' },
        { label: 'Build', short: 'B', position: '30%' },
        { label: 'Launch', short: 'L', position: '54%' },
        { label: 'Scale', short: 'S', position: '78%' },
      ],
      tableHeaders: ['Initiative', 'Owner', 'Status', 'Target'],
      tableRows: [
        { title: 'Onboarding revamp', meta: 'Product', status: 'On Track', statusTone: 'green' },
        { title: 'Mobile quick actions', meta: 'Engineering', status: 'In Progress', statusTone: 'blue' },
        { title: 'Billing migration', meta: 'Platform', status: 'At Risk', statusTone: 'amber' },
        { title: 'Insights dashboard', meta: 'Data', status: 'Planned', statusTone: 'purple' },
      ],
      kpis: [
        { label: 'Milestones', value: '12' },
        { label: 'On Track', value: '9' },
        { label: 'Blocked', value: '2' },
      ],
      boardColumns: [
        { title: 'This Sprint', dotColor: '#F472B6', cards: ['Finalize onboarding flow', 'Confirm migration cutover', 'QA timeline sign-off'] },
        { title: 'Completed', dotColor: '#22C55E', cards: ['Milestone ownership mapped', 'Dependency matrix updated'] },
        { title: 'Risks', dotColor: '#EC4899', cards: ['Vendor API delay'] },
      ],
      notes: [
        'Roadmap timeline by phase and milestone',
        'Owner and status tracking per initiative',
        'Dependency visibility across workstreams',
        'Weekly execution and risk review rhythm',
        'Milestone checkpoint dashboard',
        'Launch-readiness checklist',
      ],
    };
  }

  // ── Health Goals & Annual Check-Up: reuse roadmap timeline style with bright orange theme ──
  const isHealthGoalsAnnualCheckup =
    slug === 'health-goals-annual-check-up-177' ||
    title.includes('health goals & annual check-up') ||
    title.includes('health goals annual check-up');
  if (isHealthGoalsAnnualCheckup) {
    return {
      layout: 'timeline',
      variant: seed % 12,
      shell: 'app',
      skeleton: 'featured-12week' as PreviewSkeleton,
      category: 'Health',
      badge: 'Annual Health Plan',
      accentGradient: 'linear-gradient(135deg,#FB923C,#F97316)',
      sidebarSections: ['Health Goals', 'Check-Up Plan', 'Lab Timeline', 'Habits', 'Reminders', 'Progress'],
      milestones: [
        { label: 'Baseline', short: 'B', position: '8%' },
        { label: 'Monitor', short: 'M', position: '30%' },
        { label: 'Check-Up', short: 'C', position: '54%' },
        { label: 'Optimize', short: 'O', position: '78%' },
      ],
      tableHeaders: ['Goal / Check', 'Owner', 'Status', 'Target'],
      tableRows: [
        { title: 'Annual blood panel', meta: 'Primary Care', status: 'Scheduled', statusTone: 'blue' },
        { title: 'Cardio baseline test', meta: 'You', status: 'In Progress', statusTone: 'green' },
        { title: 'Sleep quality review', meta: 'You', status: 'At Risk', statusTone: 'amber' },
        { title: 'Nutrition adjustment', meta: 'Dietitian', status: 'Planned', statusTone: 'purple' },
      ],
      kpis: [
        { label: 'Goals Active', value: '6' },
        { label: 'Checks Booked', value: '4' },
        { label: 'Habits On Track', value: '78%' },
      ],
      boardColumns: [
        { title: 'This Week', dotColor: '#FB923C', cards: ['Book lab appointment', 'Log sleep for 7 days', 'Prep check-up questions'] },
        { title: 'Completed', dotColor: '#22C55E', cards: ['Set baseline metrics', 'Update supplement log'] },
        { title: 'Follow-up', dotColor: '#F97316', cards: ['Review bloodwork with doctor'] },
      ],
      notes: [
        '12-week health goal and check-up roadmap',
        'Baseline metrics and annual lab planning',
        'Appointment and follow-up tracker',
        'Habit consistency and risk visibility',
        'Weekly health review rhythm',
        'Post check-up optimization checklist',
      ],
    };
  }

  // ── Replica: Travel Bucket Wish List skeleton family ──
  const isTravelBucketWishList = title.includes('travel bucket wish list');
  const isPetCareVetTracker = slug === 'pet-care-vet-tracker-189';
  const isPlacesToRevisit = slug.includes('places-to-revisit');
  if (isTravelBucketWishList || isPetCareVetTracker || isPlacesToRevisit) {
    return {
      layout: 'travel',
      variant: seed % 12,
      shell: 'minimal',
      skeleton: 'featured-travel-wish' as PreviewSkeleton,
      category: isPetCareVetTracker ? 'Lifestyle' : 'Travel',
      badge: isPetCareVetTracker ? '🐾 Pet Care' : isPlacesToRevisit ? '' : '🌍 Wish List',
      accentGradient: 'linear-gradient(135deg,#06B6D4,#22C55E)',
      sidebarSections: isPetCareVetTracker
        ? ['All Pets', 'Health Records', 'Vet Visits', 'Medications', 'Vaccines']
        : ['All Places', 'Wish List', 'Planned', 'Visited', 'By Region'],
      tableHeaders: isPetCareVetTracker
        ? ['Pet', 'Next Care', 'Status', 'Date']
        : ['Destination', 'Country', 'Status', 'Season'],
      tableRows: isPetCareVetTracker
        ? [
            { title: 'Luna - Rabies booster', meta: 'Vaccination', status: 'Scheduled', statusTone: 'blue' },
            { title: 'Milo - Wellness check', meta: 'Vet Visit', status: 'Upcoming', statusTone: 'purple' },
            { title: 'Nori - Flea prevention', meta: 'Medication', status: 'Due Soon', statusTone: 'amber' },
            { title: 'Coco - Dental cleaning', meta: 'Procedure', status: 'Planned', statusTone: 'purple' },
            { title: 'Luna - Weight log', meta: 'Health Metric', status: 'Updated', statusTone: 'green' },
            { title: 'Milo - Deworming', meta: 'Medication', status: 'Completed', statusTone: 'green' },
          ]
        : [
            { title: 'Amalfi Coast', meta: 'Italy', status: 'Wish List', statusTone: 'purple' },
            { title: 'Tokyo', meta: 'Japan', status: 'Planned', statusTone: 'blue' },
            { title: 'Queenstown', meta: 'New Zealand', status: 'Wish List', statusTone: 'purple' },
            { title: 'Marrakech', meta: 'Morocco', status: 'Wish List', statusTone: 'amber' },
            { title: 'Swiss Alps', meta: 'Switzerland', status: 'Visited', statusTone: 'green' },
            { title: 'Havana', meta: 'Cuba', status: 'Wish List', statusTone: 'purple' },
          ],
      boardColumns: isPetCareVetTracker
        ? [
            { title: 'Upcoming', dotColor: '#A855F7', cards: ['Milo wellness check', 'Coco dental cleaning'] },
            { title: 'This Week', dotColor: '#3B82F6', cards: ['Luna rabies booster', 'Nori flea prevention'] },
            { title: 'Completed', dotColor: '#22C55E', cards: ['Milo deworming', 'Luna weight check-in'] },
          ]
        : [
            { title: 'Wish List', dotColor: '#A855F7', cards: ['Amalfi Coast', 'Queenstown', 'Marrakech', 'Havana'] },
            { title: 'Planned', dotColor: '#3B82F6', cards: ['Tokyo', 'Cape Town'] },
            { title: 'Visited', dotColor: '#22C55E', cards: ['Swiss Alps', 'Paris'] },
          ],
      kpis: isPetCareVetTracker
        ? [
            { label: 'Pets', value: '4' },
            { label: 'Upcoming', value: '6' },
            { label: 'Completed', value: '19' },
          ]
        : [
            { label: 'Wish List', value: '18' },
            { label: 'Planned', value: '3' },
            { label: 'Visited', value: '5' },
          ],
      notes: isPetCareVetTracker
        ? [
            'Central pet profiles and records',
            'Vet visit and vaccination timeline',
            'Medication and preventive care tracker',
            'Health metrics and follow-up reminders',
          ]
        : [
            'Gallery with cover photos',
            'Wish List → Planned → Visited',
            'Filter by region & season',
            'Budget & packing per trip',
          ],
    };
  }

  // ── Replica: The 2026 Social Media Content Planner skeleton family ──
  const isSocialMediaPlanner2026 = title.includes('2026 social media');
  const isProductRoadmapBacklog = slug === 'product-roadmap-backlog-91';
  if (isSocialMediaPlanner2026 || isProductRoadmapBacklog) {
    return {
      layout: 'content',
      variant: seed % 12,
      shell: 'dashboard',
      skeleton: 'featured-social-planner' as PreviewSkeleton,
      category: isProductRoadmapBacklog ? 'Business' : 'Event Planning',
      badge: isProductRoadmapBacklog ? '🗺️ Product Roadmap' : '📱 Social Planner',
      accentGradient: isProductRoadmapBacklog
        ? 'linear-gradient(135deg,#2563EB,#0EA5E9)'
        : 'linear-gradient(135deg,#8B5CF6,#EC4899)',
      sidebarSections: isProductRoadmapBacklog
        ? ['Roadmap', 'Backlog', 'In Progress', 'Milestones', 'Dependencies', 'Releases']
        : ['Dashboard', 'All Posts', 'Calendar', 'Hashtag Bank', 'Analytics', 'Repurpose'],
      tableHeaders: isProductRoadmapBacklog
        ? ['Initiative', 'Team', 'Status', 'Target']
        : ['Content', 'Platform', 'Status', 'Date'],
      tableRows: isProductRoadmapBacklog
        ? [
            { title: 'Unified search v2', meta: 'Product', status: 'In Progress', statusTone: 'blue' },
            { title: 'Onboarding revamp', meta: 'Design', status: 'Planned', statusTone: 'amber' },
            { title: 'Analytics dashboard', meta: 'Engineering', status: 'In Review', statusTone: 'purple' },
            { title: 'Billing migration', meta: 'Platform', status: 'Shipped', statusTone: 'green' },
            { title: 'Notification center', meta: 'Product', status: 'In Progress', statusTone: 'blue' },
          ]
        : [
            { title: 'Product launch reel', meta: 'Instagram', status: 'Scheduled', statusTone: 'green' },
            { title: 'Behind the scenes', meta: 'TikTok', status: 'Draft', statusTone: 'blue' },
            { title: 'Thread: 10 tips', meta: 'X / Twitter', status: 'Idea', statusTone: 'amber' },
            { title: 'Carousel: case study', meta: 'LinkedIn', status: 'Published', statusTone: 'green' },
            { title: 'Tutorial short', meta: 'YouTube Shorts', status: 'Draft', statusTone: 'blue' },
          ],
      boardColumns: isProductRoadmapBacklog
        ? [
            { title: 'Backlog', dotColor: '#F59E0B', cards: ['SSO rollout', 'Mobile quick actions', 'Audit trail API'] },
            { title: 'In Progress', dotColor: '#2563EB', cards: ['Unified search v2', 'Notification center'] },
            { title: 'Shipped', dotColor: '#10B981', cards: ['Billing migration', 'Permissions matrix'] },
          ]
        : [
            { title: 'Ideas', dotColor: '#F59E0B', cards: ['Trend reaction', 'Q&A post', 'Meme format'] },
            { title: 'In Production', dotColor: '#8B5CF6', cards: ['Tutorial reel', 'Carousel draft'] },
            { title: 'Scheduled', dotColor: '#22C55E', cards: ['Launch reel', 'Newsletter promo'] },
          ],
      kpis: isProductRoadmapBacklog
        ? [
            { label: 'Active Initiatives', value: '9' },
            { label: 'In Progress', value: '4' },
            { label: 'Shipped QTD', value: '13' },
          ]
        : [
            { label: 'This Week', value: '8 posts' },
            { label: 'Scheduled', value: '12' },
            { label: 'Published', value: '47' },
          ],
      calendarCells: Array.from({ length: 21 }).map((_, i) => ({
        day: i + 1,
        label: i % 3 === 0
          ? isProductRoadmapBacklog
            ? pick(['Spec', 'Dev', 'QA', 'Release', 'Retro'], seed, i)
            : pick(['Reel', 'Post', 'Story', 'Short', 'Thread'], seed, i)
          : undefined,
        active: i % 2 === 0,
      })),
      notes: isProductRoadmapBacklog
        ? [
            'Roadmap timeline by quarter',
            'Backlog prioritization workflow',
            'Cross-team initiative ownership',
            'Milestone and release planning',
            'Dependency visibility board',
            'Delivery status tracking',
          ]
        : [
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

  // ── Replica: Content Planner for TikTok & Instagram skeleton family ──
  const isTikTokIgPlanner = title.includes('content planner for tiktok');
  const isGlossaryDefinitions = slug === 'glossary-definitions-209';
  if (isTikTokIgPlanner || isGlossaryDefinitions) {
    return {
      layout: 'content',
      variant: seed % 12,
      shell: 'app',
      skeleton: 'featured-tiktok-ig' as PreviewSkeleton,
      category: isGlossaryDefinitions ? 'Knowledge' : 'Creator',
      badge: isGlossaryDefinitions ? '📚 Glossary Hub' : '🎬 TikTok & IG',
      accentGradient: 'linear-gradient(135deg,#EC4899,#F43F5E)',
      sidebarSections: isGlossaryDefinitions
        ? ['All Terms', 'Core Concepts', 'By Topic', 'Needs Review', 'Examples', 'Sources']
        : ['This Week', 'Content Bank', 'Reels', 'TikToks', 'Stories', 'Hashtags', 'Trending Audio'],
      tableHeaders: isGlossaryDefinitions
        ? ['Term', 'Domain', 'Status', 'Owner']
        : ['Content', 'Type', 'Status', 'Platform'],
      tableRows: isGlossaryDefinitions
        ? [
            { title: 'Embedding', meta: 'AI/ML', status: 'Reviewed', statusTone: 'green' },
            { title: 'Vector Database', meta: 'Data', status: 'Draft', statusTone: 'blue' },
            { title: 'Retrieval-Augmented Generation', meta: 'LLM', status: 'Needs Example', statusTone: 'amber' },
            { title: 'Hallucination', meta: 'LLM', status: 'In Review', statusTone: 'purple' },
            { title: 'Latency', meta: 'Systems', status: 'Reviewed', statusTone: 'green' },
          ]
        : [
            { title: 'Morning routine reel', meta: 'Reel', status: 'Filmed', statusTone: 'green' },
            { title: 'Get ready with me', meta: 'TikTok', status: 'Editing', statusTone: 'blue' },
            { title: 'Weekly favorites', meta: 'Story', status: 'Captioned', statusTone: 'purple' },
            { title: 'Outfit transition', meta: 'Reel + TikTok', status: 'Idea', statusTone: 'amber' },
            { title: 'Day in my life', meta: 'TikTok', status: 'Scheduled', statusTone: 'green' },
          ],
      boardColumns: isGlossaryDefinitions
        ? [
            { title: 'New Terms', dotColor: '#F43F5E', cards: ['Retrieval reranking', 'Prompt injection'] },
            { title: 'Review', dotColor: '#8B5CF6', cards: ['Vector Database', 'Hallucination'] },
            { title: 'Published', dotColor: '#22C55E', cards: ['Embedding', 'Latency'] },
          ]
        : [
            { title: 'Film', dotColor: '#F43F5E', cards: ['Outfit transition', 'Haul unboxing'] },
            { title: 'Edit', dotColor: '#8B5CF6', cards: ['Get ready with me', 'Recipe clip'] },
            { title: 'Caption', dotColor: '#F59E0B', cards: ['Weekly favorites'] },
            { title: 'Schedule', dotColor: '#22C55E', cards: ['Morning routine', 'Day in my life'] },
          ],
      kpis: isGlossaryDefinitions
        ? [
            { label: 'Terms', value: '142' },
            { label: 'Reviewed', value: '96' },
            { label: 'Needs Update', value: '11' },
          ]
        : [
            { label: 'This Week', value: '6 posts' },
            { label: 'Filmed', value: '3' },
            { label: 'Scheduled', value: '4' },
          ],
      notes: isGlossaryDefinitions
        ? [
            'Central glossary by domain and topic',
            'Definition quality review workflow',
            'Examples and usage notes per term',
            'Owner and last-updated metadata',
            'Cross-links to related concepts',
            'Source and citation tracking',
          ]
        : [
            'Weekly calendar for TikTok & IG',
            'Content pillars & idea bank',
            'Reel, Story & TikTok trackers',
            'Hashtag sets & trending audio',
            'Performance notes per post',
            'Film → Edit → Caption → Schedule',
          ],
    };
  }

  // ── Travel Journal & Memories (use TikTok/IG skeleton, travel-themed content) ──
  if ((template.slug ?? '').includes('travel-journal-memories') || (title.includes('travel journal') && title.includes('memories'))) {
    return {
      layout: 'content',
      variant: seed % 12,
      shell: 'app',
      skeleton: 'featured-tiktok-ig' as PreviewSkeleton,
      category: 'Travel',
      badge: '🧳 Travel Journal',
      accentGradient: 'linear-gradient(135deg,#06B6D4,#10B981)',
      sidebarSections: ['This Trip', 'Places', 'Memories', 'Photos', 'Highlights', 'Wishlist', 'Reflections'],
      tableHeaders: ['Memory', 'Location', 'Status', 'Type'],
      tableRows: [
        { title: 'Sunrise at Batur', meta: 'Bali', status: 'Captured', statusTone: 'green' },
        { title: 'Street food night', meta: 'Taipei', status: 'Writing', statusTone: 'blue' },
        { title: 'Old town walk', meta: 'Prague', status: 'Planned', statusTone: 'amber' },
        { title: 'Museum notes', meta: 'Paris', status: 'Drafted', statusTone: 'purple' },
        { title: 'Cafe journal page', meta: 'Kyoto', status: 'Captured', statusTone: 'green' },
      ],
      boardColumns: [
        { title: 'Capture', dotColor: '#06B6D4', cards: ['Photo spots', 'Quick notes', 'Audio snippets'] },
        { title: 'Curate', dotColor: '#10B981', cards: ['Best moments', 'Favorite meals', 'Route map'] },
        { title: 'Reflect', dotColor: '#F59E0B', cards: ['Lessons learned', 'Top 3 highlights', 'Next trip ideas'] },
        { title: 'Share', dotColor: '#A855F7', cards: ['Album draft', 'Travel story', 'Postcard notes'] },
      ],
      kpis: [
        { label: 'Trips Logged', value: '9' },
        { label: 'Memories', value: '47' },
        { label: 'Next Stop', value: 'Lisbon' },
      ],
      notes: [
        'Timeline of trips and memories',
        'Photo and link attachments',
        'Favorite places tracker',
        'Daily reflection prompts',
        'Highlights and lessons learned',
        'Wishlist for future destinations',
      ],
    };
  }

  // ── Board Meeting Pack (reuse Travel Journal visual skeleton, board-themed content) ──
  if (slug === 'board-meeting-pack-93' || title.includes('board meeting pack')) {
    return {
      layout: 'content',
      variant: seed % 12,
      shell: 'app',
      skeleton: 'featured-tiktok-ig' as PreviewSkeleton,
      category: 'Business',
      badge: 'Board Pack',
      accentGradient: 'linear-gradient(135deg,#2563EB,#0EA5E9)',
      sidebarSections: ['Agenda', 'Metrics', 'Highlights', 'Risks', 'Asks', 'Decisions', 'Follow-ups'],
      tableHeaders: ['Section', 'Owner', 'Status', 'Board Focus'],
      tableRows: [
        { title: 'KPI Snapshot', meta: 'CEO', status: 'Ready', statusTone: 'green' },
        { title: 'Financial Overview', meta: 'CFO', status: 'Draft', statusTone: 'blue' },
        { title: 'Top Risks', meta: 'COO', status: 'Review', statusTone: 'amber' },
        { title: 'Strategic Asks', meta: 'Founder', status: 'Pending', statusTone: 'purple' },
      ],
      boardColumns: [
        { title: 'Metrics', dotColor: '#0EA5E9', cards: ['MRR & growth', 'Burn multiple', 'Runway update'] },
        { title: 'Highlights', dotColor: '#22C55E', cards: ['Wins this quarter', 'Product milestones', 'Customer outcomes'] },
        { title: 'Risks', dotColor: '#F59E0B', cards: ['Delivery risk', 'Hiring gap', 'Market pressure'] },
        { title: 'Asks', dotColor: '#A855F7', cards: ['Budget approval', 'Hiring plan', 'Partner intro'] },
      ],
      kpis: [
        { label: 'Agenda Items', value: '7' },
        { label: 'Decision Points', value: '3' },
        { label: 'Open Risks', value: '5' },
      ],
      notes: [
        'Quarterly KPI and trend summary',
        'Leadership highlights and blockers',
        'Risk register with mitigations',
        'Clear asks and decisions needed',
        'Action owner and follow-up tracker',
        'Board-ready narrative structure',
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

