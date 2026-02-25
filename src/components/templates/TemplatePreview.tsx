import { Template } from '@/types/template';
import { getTemplatePreviewConfig } from '@/lib/template-previews';

interface TemplatePreviewProps {
  template: Template;
  variant?: 'card' | 'detail';
}

function statusToneClass(tone: 'green' | 'blue' | 'amber' | 'purple') {
  switch (tone) {
    case 'green':
      return 'bg-emerald-500/20 text-emerald-200 border-emerald-400/30';
    case 'blue':
      return 'bg-sky-500/20 text-sky-200 border-sky-400/30';
    case 'amber':
      return 'bg-amber-500/20 text-amber-200 border-amber-400/30';
    case 'purple':
    default:
      return 'bg-violet-500/20 text-violet-200 border-violet-400/30';
  }
}

/* ------------------------------------------------------------------ */
/*  Featured: Tarot Learning Vault                                     */
/* ------------------------------------------------------------------ */
function TarotPreview({ config, template }: { config: ReturnType<typeof getTemplatePreviewConfig>; template: Template }) {
  const rows = config.tableRows ?? [];
  const kpis = config.kpis ?? [];
  const calCells = config.calendarCells ?? [];

  return (
    <div className="space-y-2.5 h-full">
      {/* KPIs */}
      <div className="grid grid-cols-3 gap-2">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-lg border border-violet-500/30 bg-violet-950/40 p-2">
            <div className="text-[8px] text-violet-300/70">{kpi.label}</div>
            <div className="text-[11px] text-violet-100 font-semibold">{kpi.value}</div>
          </div>
        ))}
      </div>

      {/* Card gallery — 4 tarot card tiles */}
      <div className="rounded-lg border border-border/70 bg-foreground/5 p-2">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[9px] text-muted-foreground font-medium">Card Database</span>
          <div className="flex gap-1">
            {['Table', 'Gallery', 'Board'].map((v) => (
              <span key={v} className={`px-1.5 py-0.5 text-[7px] rounded border ${v === 'Gallery' ? 'bg-violet-600/25 border-violet-500/40 text-violet-200' : 'bg-foreground/5 border-border/60 text-muted-foreground'}`}>{v}</span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {rows.slice(0, 4).map((row) => (
            <div key={row.title} className="rounded-md border border-border/60 bg-background/70 p-1.5 flex flex-col items-center text-center">
              <div className="w-full h-6 rounded bg-gradient-to-b from-violet-600/30 to-pink-600/20 mb-1 flex items-center justify-center text-[10px]">
                {row.title.includes('Fool') ? '☆' : row.title.includes('Magician') ? '⚡' : row.title.includes('Priestess') ? '☽' : '♛'}
              </div>
              <div className="text-[7px] text-foreground font-medium truncate w-full">{row.title.replace(/^\d+ – /, '')}</div>
              <div className="text-[6px] text-muted-foreground truncate w-full">{row.meta}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Spread encyclopedia + Daily draw journal side by side */}
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-border/70 bg-foreground/5 p-2">
          <div className="text-[9px] text-muted-foreground font-medium mb-1">Spread Encyclopedia</div>
          {['Celtic Cross — 10 cards', 'Past-Present-Future — 3 cards', 'Horseshoe — 7 cards', 'Single Card Pull — 1 card'].map((s) => (
            <div key={s} className="flex items-center gap-1 mb-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400/60" />
              <span className="text-[7px] text-foreground truncate">{s}</span>
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-border/70 bg-foreground/5 p-2">
          <div className="text-[9px] text-muted-foreground font-medium mb-1">Daily Draw Journal</div>
          {calCells.filter((c) => c.label).slice(0, 4).map((c, i) => (
            <div key={i} className="flex items-center gap-1 mb-0.5">
              <span className="text-[7px] text-violet-300/60">Day {c.day}</span>
              <span className="text-[7px] text-foreground truncate">{c.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: What's inside list */}
      <div className="rounded-lg border border-violet-500/20 bg-violet-950/25 p-2">
        <div className="text-[8px] text-violet-300/60 mb-1">What's inside</div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
          {(config.notes ?? []).slice(0, 6).map((n, i) => (
            <div key={i} className="flex items-center gap-1">
              <span className="text-[7px] text-violet-400">✓</span>
              <span className="text-[7px] text-foreground truncate">{n}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  AI Engineering Roadmap by Data With Baraa — hero image + title + article (no sidebar) */
/* ------------------------------------------------------------------ */
const AI_ROADMAP_HERO_IMAGE = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80';
const BUCKET_LIST_HERO_IMAGE = 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80';
const GTD_TASK_SYSTEM_HERO_IMAGE = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=80';
const TERRITORY_ACCOUNT_HERO_IMAGE = 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=900&q=80';
const CAPSTONE_SHOWCASE_HERO_IMAGE = 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=900&q=80';

function AIRoadmapPreview({ config, template }: { config: ReturnType<typeof getTemplatePreviewConfig>; template: Template }) {
  const lowerTitle = template.title.toLowerCase();
  const isBucketListLifeGoals =
    (template.slug ?? '').toLowerCase().includes('bucket-list-life-goals') ||
    (lowerTitle.includes('bucket list') && lowerTitle.includes('life goals'));
  const heroImage = isBucketListLifeGoals ? BUCKET_LIST_HERO_IMAGE : AI_ROADMAP_HERO_IMAGE;
  const sectionTitles = isBucketListLifeGoals
    ? {
        first: 'Vision & Life Areas',
        second: 'Top Goals This Year',
        third: 'Milestones & Next Actions',
      }
    : {
        first: 'Overview & Prerequisites',
        second: 'Phase 1: Foundations',
        third: 'Phase 2: ML Core',
      };

  return (
    <div className="space-y-3 h-full flex flex-col">
      {/* Top: AI-related image */}
      <div className="w-full rounded-lg overflow-hidden border border-border/60 flex-shrink-0 bg-muted">
        <img
          src={heroImage}
          alt=""
          className="w-full h-full object-cover min-h-[4rem] max-h-[6.5rem]"
        />
      </div>
      {/* Big title (article main title) */}
      <h2 className="text-sm sm:text-base font-bold text-foreground leading-tight flex-shrink-0">
        {template.title}
      </h2>
      {/* Article structure: H2 and paragraph placeholders */}
      <div className="space-y-2 flex-1 min-h-0">
        <div className="rounded border border-border/60 bg-foreground/5 p-2">
          <div className="h-3 w-3/4 rounded-sm bg-foreground/20 mb-1.5" />
          <div className="text-[10px] font-semibold text-foreground">{sectionTitles.first}</div>
        </div>
        <div className="rounded border border-border/60 bg-foreground/5 p-2">
          <div className="h-3 w-2/3 rounded-sm bg-foreground/20 mb-1.5" />
          <div className="text-[10px] font-semibold text-foreground">{sectionTitles.second}</div>
        </div>
        <div className="rounded border border-border/60 bg-foreground/5 p-2">
          <div className="h-2.5 w-full rounded-sm bg-foreground/10 mb-1" />
          <div className="h-2.5 w-5/6 rounded-sm bg-foreground/10 mb-1" />
          <div className="text-[9px] text-muted-foreground">Paragraph placeholder text…</div>
        </div>
        <div className="rounded border border-border/60 bg-foreground/5 p-2">
          <div className="h-3 w-1/2 rounded-sm bg-foreground/20 mb-1.5" />
          <div className="text-[10px] font-semibold text-foreground">{sectionTitles.third}</div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  AI Engineering Skill Path — roadmap with KPIs, table, sidebar (50% complete) */
/* ------------------------------------------------------------------ */
function AISkillPathPreview({ config, template }: { config: ReturnType<typeof getTemplatePreviewConfig>; template: Template }) {
  const rows = config.tableRows ?? [];
  const kpis = config.kpis ?? [];
  const cols = config.boardColumns ?? [];

  return (
    <div className="space-y-2.5 h-full">
      <div className="grid grid-cols-3 gap-2">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-lg border border-sky-500/30 bg-sky-950/40 p-2">
            <div className="text-[8px] text-sky-300/70">{kpi.label}</div>
            <div className="text-[11px] text-sky-100 font-semibold">{kpi.value}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {cols.slice(0, 3).map((col) => (
          <div key={col.title} className="rounded-lg border border-border/70 bg-foreground/5 p-2">
            <div className="flex items-center gap-1 mb-1">
              <span className="h-2 w-2 rounded-full" style={{ background: col.dotColor }} />
              <span className="text-[9px] text-foreground font-medium">{col.title}</span>
            </div>
            {col.cards.slice(0, 2).map((c) => (
              <div key={c} className="rounded border border-border/60 bg-background/70 px-1.5 py-0.5 text-[8px] text-foreground truncate mb-0.5">{c}</div>
            ))}
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-border/70 overflow-hidden">
        <div className="grid grid-cols-4 bg-foreground/5 border-b border-border/70">
          {(config.tableHeaders ?? []).map((h) => (
            <div key={h} className="px-2 py-1 text-[8px] font-medium text-muted-foreground truncate">{h}</div>
          ))}
        </div>
        <div className="divide-y divide-border/60">
          {rows.slice(0, 4).map((row, i) => (
            <div key={`${row.title}-${i}`} className="grid grid-cols-4 items-center">
              <div className="px-2 py-1 text-[8px] text-foreground truncate">{row.title}</div>
              <div className="px-2 py-1 text-[8px] text-muted-foreground truncate">{row.meta}</div>
              <div className="px-2 py-1 text-[8px] text-muted-foreground truncate">{row.status}</div>
              <div className="px-2 py-1">
                <span className={`inline-block px-1 py-0 text-[7px] rounded border ${statusToneClass(row.statusTone)}`}>
                  {row.statusTone === 'green' ? 'Done' : row.statusTone === 'blue' ? 'In Progress' : row.statusTone === 'amber' ? 'Due soon' : 'Planned'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Featured: Travel Bucket List & Wish List                           */
/* ------------------------------------------------------------------ */
function TravelBucketPreview({ config, template }: { config: ReturnType<typeof getTemplatePreviewConfig>; template: Template }) {
  const rows = config.tableRows ?? [];
  const cols = config.boardColumns ?? [];
  const lowerTitle = template.title.toLowerCase();
  const lowerSlug = (template.slug ?? '').toLowerCase();
  const isNewsletterEmail =
    (lowerTitle.includes('newsletter') && lowerTitle.includes('email content')) ||
    lowerSlug === 'date-night-ideas-bank-192' ||
    lowerSlug === 'rfp-response-tracker-138';

  // Destination cover gradients to simulate travel photos
  const coverGradients = isNewsletterEmail ? [
    'linear-gradient(135deg,#0EA5E9,#3B82F6)', // newsletter blue
    'linear-gradient(135deg,#06B6D4,#14B8A6)', // campaign teal
    'linear-gradient(135deg,#8B5CF6,#A855F7)', // automation purple
    'linear-gradient(135deg,#F59E0B,#F97316)', // promo orange
    'linear-gradient(135deg,#10B981,#22C55E)', // sent green
    'linear-gradient(135deg,#EC4899,#F43F5E)', // segment pink
  ] : [
    'linear-gradient(135deg,#06B6D4,#3B82F6)', // ocean blue
    'linear-gradient(135deg,#F472B6,#FB923C)', // sunset
    'linear-gradient(135deg,#34D399,#059669)', // forest
    'linear-gradient(135deg,#A78BFA,#6366F1)', // mountains
    'linear-gradient(135deg,#FCD34D,#F59E0B)', // desert
    'linear-gradient(135deg,#E879F9,#7C3AED)', // northern lights
  ];
  const coverIcons = isNewsletterEmail
    ? ['📧', '🗞️', '📬', '🧲', '📈', '🎯']
    : ['🏝️', '⛩️', '🏔️', '🧊', '🌴', '🗻'];

  const moduleBgClasses = isNewsletterEmail
    ? [
        'bg-sky-50/80 dark:bg-sky-950/25',
        'bg-cyan-50/80 dark:bg-cyan-950/25',
        'bg-violet-50/80 dark:bg-violet-950/25',
        'bg-amber-50/80 dark:bg-amber-950/25',
        'bg-emerald-50/80 dark:bg-emerald-950/25',
        'bg-pink-50/80 dark:bg-pink-950/25',
      ]
    : ['bg-background/70'];
  const textTitleClass = isNewsletterEmail ? 'text-slate-800 dark:text-slate-100' : 'text-foreground';
  const textMetaClass = isNewsletterEmail ? 'text-slate-600 dark:text-slate-300' : 'text-muted-foreground';

  return (
    <div className="space-y-2.5 h-full">
      {/* Gallery view — destination cards (replicates Notion gallery layout) */}
      <div className="rounded-lg border border-border/70 bg-foreground/5 p-2">
        <div className="flex items-center justify-between mb-1.5">
          <span className={`text-[9px] font-medium ${isNewsletterEmail ? 'text-slate-600 dark:text-slate-300' : 'text-muted-foreground'}`}>
            {isNewsletterEmail ? 'All Campaigns' : 'All Destinations'}
          </span>
          <div className="flex gap-1">
            {(isNewsletterEmail ? ['Gallery', 'Board', 'Table', 'Calendar'] : ['Gallery', 'Board', 'Table', 'Map']).map((v) => (
              <span key={v} className={`px-1.5 py-0.5 text-[7px] rounded border ${v === 'Gallery' ? 'bg-teal-600/25 border-teal-500/40 text-teal-200' : 'bg-foreground/5 border-border/60 text-muted-foreground'}`}>{v}</span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {rows.slice(0, 6).map((row, i) => (
            <div key={row.title} className={`rounded-md border border-border/60 overflow-hidden ${moduleBgClasses[i % moduleBgClasses.length]}`}>
              {/* Cover photo sim */}
              <div className="h-8 w-full flex items-center justify-center text-sm" style={{ background: coverGradients[i % coverGradients.length] }}>
                {coverIcons[i % coverIcons.length]}
              </div>
              <div className="p-1.5">
                <div className={`text-[8px] font-medium truncate ${textTitleClass}`}>{row.title}</div>
                <div className={`text-[7px] truncate ${textMetaClass}`}>{row.meta}</div>
                <span className={`inline-block mt-0.5 px-1 py-0 text-[6px] rounded border ${statusToneClass(row.statusTone)}`}>{row.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Board columns — Dreaming / Planning / Explored */}
      <div className="grid grid-cols-3 gap-1.5">
        {cols.slice(0, 3).map((col, i) => (
          <div key={col.title} className={`rounded-lg border border-border/70 p-1.5 ${moduleBgClasses[i % moduleBgClasses.length]}`}>
            <div className="flex items-center gap-1 mb-1">
              <span className="h-2 w-2 rounded-full" style={{ background: col.dotColor }} />
              <span className={`text-[8px] font-medium ${textTitleClass}`}>{col.title}</span>
              <span className={`text-[7px] ml-auto ${textMetaClass}`}>{col.cards.length}</span>
            </div>
            {col.cards.slice(0, 2).map((c, j) => (
              <div key={c} className={`rounded border border-border/60 px-1.5 py-0.5 text-[7px] truncate mb-0.5 ${moduleBgClasses[(i + j + 1) % moduleBgClasses.length]} ${textTitleClass}`}>{c}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Featured: 12 Week Year Planner                                     */
/* ------------------------------------------------------------------ */
function TwelveWeekPreview({ config, template }: { config: ReturnType<typeof getTemplatePreviewConfig>; template: Template }) {
  const rows = config.tableRows ?? [];
  const kpis = config.kpis ?? [];
  const milestones = config.milestones ?? [];
  const sprints = config.boardColumns ?? [];
  const lowerSlug = (template.slug ?? '').toLowerCase();
  const isProjectRoadmapTimeline = lowerSlug === 'project-roadmap-timeline-103';
  const isHealthGoalsAnnualCheckup = lowerSlug === 'health-goals-annual-check-up-177';
  const isPink12WeekStyle =
    lowerSlug === 'strategic-initiatives-tracker-102' || isProjectRoadmapTimeline;
  const isOrange12WeekStyle = isHealthGoalsAnnualCheckup;
  const kpiPanelClass = isPink12WeekStyle
    ? 'rounded-lg border border-pink-400/30 bg-pink-950/35 p-2'
    : isOrange12WeekStyle
      ? 'rounded-lg border border-orange-400/35 bg-orange-950/35 p-2'
      : 'rounded-lg border border-amber-500/30 bg-amber-950/40 p-2';
  const kpiLabelClass = isPink12WeekStyle
    ? 'text-[8px] text-pink-200/75'
    : isOrange12WeekStyle
      ? 'text-[8px] text-orange-200/80'
      : 'text-[8px] text-amber-300/70';
  const kpiValueClass = isPink12WeekStyle
    ? 'text-[11px] text-pink-100 font-semibold'
    : isOrange12WeekStyle
      ? 'text-[11px] text-orange-100 font-semibold'
      : 'text-[11px] text-amber-100 font-semibold';
  const weekMetaClass = isPink12WeekStyle
    ? 'text-[8px] text-pink-200/75'
    : isOrange12WeekStyle
      ? 'text-[8px] text-orange-200/80'
      : 'text-[8px] text-amber-300/70';
  const weekMarkerClass = isPink12WeekStyle
    ? 'text-pink-200 font-bold'
    : isOrange12WeekStyle
      ? 'text-orange-200 font-bold'
      : 'text-amber-300 font-bold';
  const fridayPanelClass = isPink12WeekStyle
    ? 'col-span-2 rounded-lg border border-pink-400/20 bg-pink-950/25 p-2'
    : isOrange12WeekStyle
      ? 'col-span-2 rounded-lg border border-orange-400/25 bg-orange-950/25 p-2'
      : 'col-span-2 rounded-lg border border-amber-500/20 bg-amber-950/25 p-2';
  const fridayTitleClass = isPink12WeekStyle
    ? 'text-[8px] text-pink-200/70 mb-1'
    : isOrange12WeekStyle
      ? 'text-[8px] text-orange-200/80 mb-1'
      : 'text-[8px] text-amber-300/60 mb-1';
  const fridayArrowClass = isPink12WeekStyle
    ? 'text-[7px] text-pink-300 mt-0.5'
    : isOrange12WeekStyle
      ? 'text-[7px] text-orange-300 mt-0.5'
      : 'text-[7px] text-amber-400 mt-0.5';

  // Weekly scorecard bar heights (simulate 12 weeks of execution scores)
  const weekScores = [75, 82, 68, 90, 85, 78, 88, 0, 0, 0, 0, 0];

  return (
    <div className="space-y-2.5 h-full">
      {/* KPIs */}
      <div className="grid grid-cols-3 gap-2">
        {kpis.map((kpi) => (
          <div key={kpi.label} className={kpiPanelClass}>
            <div className={kpiLabelClass}>{kpi.label}</div>
            <div className={kpiValueClass}>{kpi.value}</div>
          </div>
        ))}
      </div>

      {/* 12-Week Timeline bar */}
      <div className="rounded-lg border border-border/70 bg-foreground/5 p-2.5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] text-muted-foreground font-medium">Weekly Scorecard</span>
          <span className={weekMetaClass}>Week 7 of 12</span>
        </div>
        <div className="flex items-end gap-[3px] h-12">
          {weekScores.map((score, i) => (
            <div key={i} className="relative flex-1 flex flex-col items-center gap-0.5">
              <span
                className={`w-full rounded-t-sm ${i < 7 ? (score >= 80 ? 'bg-emerald-500/60' : 'bg-amber-500/50') : 'bg-foreground/10'}`}
                style={{ height: `${score > 0 ? score * 0.9 : 8}%` }}
              />
              {((isProjectRoadmapTimeline || isHealthGoalsAnnualCheckup) && i < 7 && score > 0) ? (
                <span
                  className={`absolute h-1.5 w-1.5 rounded-full ring-1 ${
                    isHealthGoalsAnnualCheckup
                      ? 'bg-orange-300 ring-orange-200/70'
                      : 'bg-pink-300 ring-pink-200/70'
                  }`}
                  style={{ left: '50%', bottom: `calc(${score * 0.9}% + 8px)`, transform: 'translateX(-50%)' }}
                />
              ) : null}
              <span className={`text-[5px] ${i === 6 ? weekMarkerClass : 'text-muted-foreground'}`}>{i + 1}</span>
            </div>
          ))}
        </div>
        {/* Phase markers below */}
        <div className="flex justify-between mt-1 px-1">
          {milestones.map((m) => (
            <span key={m.short} className="text-[6px] text-muted-foreground">{m.label}</span>
          ))}
        </div>
      </div>

      {/* Goal tracker table */}
      <div className="rounded-lg border border-border/70 overflow-hidden">
        <div className="grid grid-cols-4 bg-foreground/5 border-b border-border/70">
          {(config.tableHeaders ?? ['Goal', 'Tactic', 'Status', 'Score']).map((h) => (
            <div key={h} className="px-2 py-1.5 text-[8px] font-medium text-muted-foreground truncate">{h}</div>
          ))}
        </div>
        <div className="divide-y divide-border/60">
          {rows.slice(0, 4).map((row, i) => (
            <div key={`${row.title}-${i}`} className="grid grid-cols-4 items-center">
              <div className="px-2 py-1 text-[8px] text-foreground truncate">{row.title}</div>
              <div className="px-2 py-1 text-[7px] text-muted-foreground truncate">{row.meta}</div>
              <div className="px-2 py-1">
                <span className={`inline-block px-1.5 py-0.5 text-[7px] rounded border ${statusToneClass(row.statusTone)}`}>{row.status}</span>
              </div>
              <div className="px-2 py-1">
                {/* Mini progress bar */}
                <div className="h-1.5 w-full rounded-full bg-foreground/10 overflow-hidden">
                  <div className={`h-full rounded-full ${row.statusTone === 'green' ? 'bg-emerald-500/70' : row.statusTone === 'blue' ? 'bg-sky-500/70' : 'bg-amber-500/70'}`} style={{ width: row.status }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* This week + Friday review */}
      <div className="grid grid-cols-5 gap-2">
        <div className="col-span-3 rounded-lg border border-border/70 bg-foreground/5 p-2">
          <div className="text-[9px] text-muted-foreground font-medium mb-1">This Week's Tactics</div>
          {sprints.slice(0, 2).map((col) => (
            <div key={col.title} className="mb-1">
              <div className="flex items-center gap-1 mb-0.5">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: col.dotColor }} />
                <span className="text-[7px] text-muted-foreground">{col.title}</span>
              </div>
              {col.cards.slice(0, 2).map((c) => (
                <div key={c} className="flex items-center gap-1 mb-0.5 ml-2.5">
                  <span className={`h-2 w-2 rounded-sm border ${col.title === 'Done' ? 'bg-emerald-500/30 border-emerald-500/50' : 'border-border/70 bg-background/80'}`} />
                  <span className="text-[7px] text-foreground truncate">{c}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className={fridayPanelClass}>
          <div className={fridayTitleClass}>Friday Review</div>
          {['What went well?', 'What to improve?', 'Next week focus'].map((q) => (
            <div key={q} className="flex items-start gap-1 mb-0.5">
              <span className={fridayArrowClass}>›</span>
              <span className="text-[7px] text-foreground">{q}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Reading List — big title + table (书名, 作者, 阅读进度, 打分, 阅读心得) */
/* ------------------------------------------------------------------ */
function ReadingListPreview({ config, template }: { config: ReturnType<typeof getTemplatePreviewConfig>; template: Template }) {
  const headers = config.tableHeaders ?? ['Book', 'Author', 'Progress', 'Rating', 'Notes'];
  const rows = config.tableRows ?? [];

  return (
    <div className="space-y-3 h-full">
      <div className="rounded-lg border border-sky-500/20 bg-sky-950/20 p-3">
        <h2 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
          {template.title}
        </h2>
        <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">
          Track every book you read or want to read in one place.
        </p>
      </div>
      <div className="rounded-lg border border-border/70 overflow-hidden">
        <div className="grid gap-0 border-b border-border/70 bg-foreground/5" style={{ gridTemplateColumns: `repeat(${headers.length}, minmax(0, 1fr))` }}>
          {headers.map((h) => (
            <div key={h} className="px-2 py-1.5 text-[9px] font-medium text-muted-foreground truncate">
              {h}
            </div>
          ))}
        </div>
        <div className="divide-y divide-border/60">
          {rows.slice(0, 5).map((row, i) => (
            <div key={`${row.title}-${i}`} className="grid gap-0 items-center" style={{ gridTemplateColumns: `repeat(${headers.length}, minmax(0, 1fr))` }}>
              <div className="px-2 py-1.5 text-[9px] text-foreground truncate">{row.title}</div>
              <div className="px-2 py-1.5 text-[9px] text-muted-foreground truncate">{row.meta}</div>
              <div className="px-2 py-1.5">
                <span className={`inline-block px-1.5 py-0.5 text-[8px] rounded border ${statusToneClass(row.statusTone)}`}>{row.status}</span>
              </div>
              <div className="px-2 py-1.5 text-[9px] text-muted-foreground">{i < 2 ? '★★★★☆' : '★★★☆☆'}</div>
              <div className="px-2 py-1.5 text-[8px] text-muted-foreground truncate">{i % 2 === 0 ? 'Notes…' : '—'}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Student and Lesson Planner — bulletin-board / lesson style        */
/* ------------------------------------------------------------------ */
function StudentLessonPlannerPreview({ config, template }: { config: ReturnType<typeof getTemplatePreviewConfig>; template: Template }) {
  const rows = config.tableRows ?? [];
  const cols = config.boardColumns ?? [];

  return (
    <div className="space-y-3 h-full">
      <div className="rounded-lg border border-emerald-500/20 bg-emerald-950/20 p-3">
        <h2 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
          {template.title}
        </h2>
        <p className="text-[10px] text-muted-foreground mt-0.5">
          Lesson planning & assignment tracker — bulletin-board style.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {cols.slice(0, 3).map((col) => (
          <div key={col.title} className="rounded-lg border border-border/70 bg-foreground/5 p-2">
            <div className="flex items-center gap-1 mb-1">
              <span className="h-2 w-2 rounded-full" style={{ background: col.dotColor }} />
              <span className="text-[9px] text-foreground font-medium">{col.title}</span>
            </div>
            {col.cards.slice(0, 2).map((c) => (
              <div key={c} className="rounded border border-border/60 bg-background/70 px-1.5 py-0.5 text-[8px] text-foreground truncate mb-0.5">{c}</div>
            ))}
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-border/70 overflow-hidden">
        <div className="grid grid-cols-4 bg-foreground/5 border-b border-border/70">
          {(config.tableHeaders ?? []).map((h) => (
            <div key={h} className="px-2 py-1 text-[8px] font-medium text-muted-foreground truncate">{h}</div>
          ))}
        </div>
        <div className="divide-y divide-border/60">
          {rows.slice(0, 4).map((row, i) => (
            <div key={`${row.title}-${i}`} className="grid grid-cols-4 items-center">
              <div className="px-2 py-1 text-[8px] text-foreground truncate">{row.title}</div>
              <div className="px-2 py-1 text-[8px] text-muted-foreground truncate">{row.meta}</div>
              <div className="px-2 py-1 text-[8px] text-muted-foreground truncate">{row.status}</div>
              <div className="px-2 py-1">
                <span className={`inline-block px-1 py-0 text-[7px] rounded border ${statusToneClass(row.statusTone)}`}>
                  {row.statusTone === 'green' ? 'Done' : row.statusTone === 'blue' ? 'In Progress' : row.statusTone === 'amber' ? 'Due soon' : 'Planned'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Replica: Travel Bucket Wish List (Lilian-style)                    */
/* ------------------------------------------------------------------ */
function TravelWishPreview({ config, template }: { config: ReturnType<typeof getTemplatePreviewConfig>; template: Template }) {
  const rows = config.tableRows ?? [];
  const kpis = config.kpis ?? [];
  const cols = config.boardColumns ?? [];
  const slug = (template.slug ?? '').toLowerCase();
  const isStudyHabitTracker =
    slug.includes('study-habit-tracker') ||
    template.title.toLowerCase().includes('study habit tracker');
  const isPetCareVetTracker = slug === 'pet-care-vet-tracker-189';
  const isPlacesToRevisit = slug.includes('places-to-revisit');
  const covers = isStudyHabitTracker
    ? [
        'linear-gradient(135deg,#60A5FA,#2563EB)',
        'linear-gradient(135deg,#A78BFA,#7C3AED)',
        'linear-gradient(135deg,#34D399,#059669)',
        'linear-gradient(135deg,#FBBF24,#F59E0B)',
        'linear-gradient(135deg,#67E8F9,#0EA5E9)',
        'linear-gradient(135deg,#C4B5FD,#8B5CF6)',
      ]
    : isPetCareVetTracker
      ? [
          'linear-gradient(135deg,#34D399,#059669)',
          'linear-gradient(135deg,#22C55E,#16A34A)',
          'linear-gradient(135deg,#10B981,#0EA5E9)',
          'linear-gradient(135deg,#84CC16,#22C55E)',
          'linear-gradient(135deg,#14B8A6,#10B981)',
          'linear-gradient(135deg,#4ADE80,#059669)',
        ]
    : [
        'linear-gradient(135deg,#38BDF8,#2563EB)',
        'linear-gradient(135deg,#F472B6,#FB923C)',
        'linear-gradient(135deg,#34D399,#059669)',
        'linear-gradient(135deg,#FBBF24,#EF4444)',
        'linear-gradient(135deg,#A78BFA,#6366F1)',
        'linear-gradient(135deg,#67E8F9,#22D3EE)',
      ];
  const icons = isStudyHabitTracker
    ? ['📘', '🧠', '📝', '⏱️', '📚', '🎯']
    : isPetCareVetTracker
      ? ['🐶', '🐱', '💉', '🩺', '💊', '🦴']
      : ['🏖️', '🗼', '🏔️', '🕌', '🏔️', '🌴'];
  const kpiClass = isStudyHabitTracker
    ? 'rounded-lg border border-sky-500/30 bg-sky-950/40 p-2'
    : isPetCareVetTracker
      ? 'rounded-lg border border-emerald-500/30 bg-emerald-950/40 p-2'
    : 'rounded-lg border border-teal-500/30 bg-teal-950/40 p-2';
  const kpiLabelClass = isStudyHabitTracker
    ? 'text-[8px] text-sky-300/70'
    : isPetCareVetTracker
      ? 'text-[8px] text-emerald-300/70'
      : 'text-[8px] text-teal-300/70';
  const kpiValueClass = isStudyHabitTracker
    ? 'text-[11px] text-sky-100 font-semibold'
    : isPetCareVetTracker
      ? 'text-[11px] text-emerald-100 font-semibold'
      : 'text-[11px] text-teal-100 font-semibold';
  const galleryTitle = isStudyHabitTracker ? 'All Habits' : isPetCareVetTracker ? 'All Pets' : 'All Places';
  const activeTabClass = isStudyHabitTracker
    ? 'bg-sky-600/25 border-sky-500/40 text-sky-200'
    : isPetCareVetTracker
      ? 'bg-emerald-600/25 border-emerald-500/40 text-emerald-200'
    : 'bg-teal-600/25 border-teal-500/40 text-teal-200';
  const tabs = isStudyHabitTracker || isPetCareVetTracker ? ['Grid', 'Board', 'List'] : ['Gallery', 'Board', 'List'];

  return (
    <div className="space-y-2.5 h-full">
      <div className="grid grid-cols-3 gap-2">
        {kpis.map((kpi) => (
          <div key={kpi.label} className={kpiClass}>
            <div className={kpiLabelClass}>{kpi.label}</div>
            <div className={kpiValueClass}>{kpi.value}</div>
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-border/70 bg-foreground/5 p-2">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[9px] text-muted-foreground font-medium">{galleryTitle}</span>
          <div className="flex gap-1">
            {tabs.map((v, i) => (
              <span key={v} className={`px-1.5 py-0.5 text-[7px] rounded border ${i === 0 ? activeTabClass : 'bg-foreground/5 border-border/60 text-muted-foreground'}`}>{v}</span>
            ))}
          </div>
        </div>
        <div className={isPlacesToRevisit ? 'grid grid-cols-2 gap-1.5' : 'grid grid-cols-3 gap-1.5'}>
          {rows.slice(0, isPlacesToRevisit ? 2 : 6).map((row, i) => (
            <div key={row.title} className="rounded-md border border-border/60 bg-background/70 overflow-hidden">
              <div className="h-7 w-full flex items-center justify-center text-sm" style={{ background: covers[i % covers.length] }}>{icons[i % icons.length]}</div>
              <div className="p-1.5">
                <div className="text-[8px] text-foreground font-medium truncate">{row.title}</div>
                <div className="text-[7px] text-muted-foreground truncate">{row.meta}</div>
                <span className={`inline-block mt-0.5 px-1 py-0 text-[6px] rounded border ${statusToneClass(row.statusTone)}`}>{row.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {cols.slice(0, 3).map((col) => (
          <div key={col.title} className="rounded-lg border border-border/70 bg-foreground/5 p-1.5">
            <div className="flex items-center gap-1 mb-1">
              <span className="h-2 w-2 rounded-full" style={{ background: col.dotColor }} />
              <span className="text-[8px] text-foreground font-medium">{col.title}</span>
              <span className="text-[7px] text-muted-foreground ml-auto">{col.cards.length}</span>
            </div>
            {col.cards.slice(0, 2).map((c) => (
              <div key={c} className="rounded border border-border/60 bg-background/70 px-1.5 py-0.5 text-[7px] text-foreground truncate mb-0.5">{c}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Replica: The 2026 Social Media Content Planner (heyismail-style)   */
/* ------------------------------------------------------------------ */
function SocialPlannerPreview({ config, template }: { config: ReturnType<typeof getTemplatePreviewConfig>; template: Template }) {
  const rows = config.tableRows ?? [];
  const kpis = config.kpis ?? [];
  const cols = config.boardColumns ?? [];
  const calCells = config.calendarCells ?? [];
  const lowerSlug = (template.slug ?? '').toLowerCase();
  const isProductRoadmap = lowerSlug === 'product-roadmap-backlog-91';

  const platformColor = (p: string) => {
    if (isProductRoadmap) {
      if (p.includes('Engineering')) return 'bg-blue-500/20 text-blue-200 border-blue-400/30';
      if (p.includes('Product')) return 'bg-cyan-500/20 text-cyan-200 border-cyan-400/30';
      if (p.includes('Design')) return 'bg-violet-500/20 text-violet-200 border-violet-400/30';
      if (p.includes('Platform')) return 'bg-emerald-500/20 text-emerald-200 border-emerald-400/30';
    }
    if (p.includes('Instagram')) return 'bg-pink-500/20 text-pink-200 border-pink-400/30';
    if (p.includes('TikTok')) return 'bg-slate-500/20 text-slate-200 border-slate-400/30';
    if (p.includes('YouTube')) return 'bg-red-500/20 text-red-200 border-red-400/30';
    if (p.includes('LinkedIn')) return 'bg-blue-500/20 text-blue-200 border-blue-400/30';
    return 'bg-foreground/5 text-muted-foreground border-border/60';
  };

  return (
    <div className="space-y-2.5 h-full">
      <div className="grid grid-cols-3 gap-2">
        {kpis.map((kpi) => (
          <div key={kpi.label} className={`rounded-lg border p-2 ${isProductRoadmap ? 'border-sky-500/30 bg-sky-950/40' : 'border-violet-500/30 bg-violet-950/40'}`}>
            <div className={`text-[8px] ${isProductRoadmap ? 'text-sky-300/70' : 'text-violet-300/70'}`}>{kpi.label}</div>
            <div className={`text-[11px] font-semibold ${isProductRoadmap ? 'text-sky-100' : 'text-violet-100'}`}>{kpi.value}</div>
          </div>
        ))}
      </div>
      {/* Calendar mini-view */}
      <div className="rounded-lg border border-border/70 bg-foreground/5 p-2">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[9px] text-muted-foreground font-medium">Calendar</span>
          <div className="flex gap-1">
            {['Calendar', 'Board', 'Table'].map((v) => (
              <span key={v} className={`px-1.5 py-0.5 text-[7px] rounded border ${v === 'Calendar' ? (isProductRoadmap ? 'bg-sky-600/25 border-sky-500/40 text-sky-200' : 'bg-violet-600/25 border-violet-500/40 text-violet-200') : 'bg-foreground/5 border-border/60 text-muted-foreground'}`}>{v}</span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-7 gap-0.5">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
            <div key={`h${i}`} className="text-[6px] text-muted-foreground text-center">{d}</div>
          ))}
          {calCells.slice(0, 21).map((cell, i) => (
            <div key={i} className={`text-center rounded py-0.5 ${cell.active ? (isProductRoadmap ? 'bg-sky-600/20 border border-sky-500/30' : 'bg-violet-600/20 border border-violet-500/30') : 'bg-foreground/5 border border-transparent'}`}>
              <div className="text-[6px] text-muted-foreground">{cell.day}</div>
              {cell.label ? <div className={`text-[5px] truncate ${isProductRoadmap ? 'text-sky-300' : 'text-violet-300'}`}>{cell.label}</div> : null}
            </div>
          ))}
        </div>
      </div>
      {/* Pipeline table */}
      <div className="rounded-lg border border-border/70 overflow-hidden">
        <div className="grid grid-cols-4 bg-foreground/5 border-b border-border/70">
          {(config.tableHeaders ?? []).map((h) => (
            <div key={h} className="px-2 py-1 text-[8px] font-medium text-muted-foreground truncate">{h}</div>
          ))}
        </div>
        <div className="divide-y divide-border/60">
          {rows.slice(0, 4).map((row, i) => (
            <div key={`${row.title}-${i}`} className="grid grid-cols-4 items-center">
              <div className="px-2 py-1 text-[8px] text-foreground truncate">{row.title}</div>
              <div className="px-2 py-1"><span className={`inline-block px-1 py-0 text-[7px] rounded border ${platformColor(row.meta)}`}>{row.meta}</span></div>
              <div className="px-2 py-1"><span className={`inline-block px-1 py-0 text-[7px] rounded border ${statusToneClass(row.statusTone)}`}>{row.status}</span></div>
              <div className="px-2 py-1 text-[7px] text-muted-foreground">Feb {8 + i * 3}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Kanban columns */}
      <div className="grid grid-cols-3 gap-1.5">
        {cols.slice(0, 3).map((col) => (
          <div key={col.title} className="rounded-lg border border-border/70 bg-foreground/5 p-1.5">
            <div className="flex items-center gap-1 mb-1">
              <span className="h-2 w-2 rounded-full" style={{ background: col.dotColor }} />
              <span className="text-[8px] text-foreground font-medium">{col.title}</span>
            </div>
            {col.cards.slice(0, 2).map((c) => (
              <div key={c} className="rounded border border-border/60 bg-background/70 px-1.5 py-0.5 text-[7px] text-foreground truncate mb-0.5">{c}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* TikTok & Instagram icon SVGs (simplified brand-style shapes for preview) */
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function CandlestickIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <line x1="6" y1="3" x2="6" y2="21" />
      <rect x="4.5" y="8" width="3" height="6" rx="0.8" fill="currentColor" stroke="none" />
      <line x1="12" y1="4" x2="12" y2="20" />
      <rect x="10.5" y="6" width="3" height="9" rx="0.8" fill="currentColor" stroke="none" />
      <line x1="18" y1="2.5" x2="18" y2="21.5" />
      <rect x="16.5" y="11" width="3" height="5.5" rx="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PortfolioPieIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M12 3v9h9A9 9 0 0 0 12 3Z" fill="currentColor" stroke="none" />
      <path d="M11 3.06a9 9 0 1 0 9.94 9.94H11V3.06Z" />
    </svg>
  );
}

function TrendingLineIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M3 17 9 11l4 4 8-8" />
      <path d="M16 7h5v5" />
      <path d="M3 21h18" />
    </svg>
  );
}

function RiskShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M12 3 4.5 6v5.2c0 5.2 3.4 8.2 7.5 9.8 4.1-1.6 7.5-4.6 7.5-9.8V6L12 3Z" />
      <path d="m9.2 12.2 1.8 1.8 3.8-3.8" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Replica: Content Planner for TikTok & Instagram — real hero image, title, row of social icons */
/* ------------------------------------------------------------------ */
const TIKTOK_IG_HERO_IMAGE = 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80';
const TRAVEL_JOURNAL_HERO_IMAGE = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80';
const GLOSSARY_HERO_IMAGE = 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80';
const BOARD_MEETING_HERO_IMAGE = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80';

function TikTokIGPreview({ config, template }: { config: ReturnType<typeof getTemplatePreviewConfig>; template: Template }) {
  const lowerSlug = (template.slug ?? '').toLowerCase();
  const isTravelJournalMemories =
    lowerSlug.includes('travel-journal-memories') ||
    (template.title.toLowerCase().includes('travel journal') && template.title.toLowerCase().includes('memories'));
  const isGlossaryDefinitions = lowerSlug === 'glossary-definitions-209';
  const isBoardMeetingPack = lowerSlug === 'board-meeting-pack-93';
  const heroImage = isTravelJournalMemories
    ? TRAVEL_JOURNAL_HERO_IMAGE
    : isBoardMeetingPack
      ? BOARD_MEETING_HERO_IMAGE
    : isGlossaryDefinitions
      ? GLOSSARY_HERO_IMAGE
      : TIKTOK_IG_HERO_IMAGE;
  const socialRow = isTravelJournalMemories
    ? [
        { title: 'Places', emoji: '🗺️', color: 'text-cyan-300' },
        { title: 'Moments', emoji: '✨', color: 'text-emerald-300' },
        { title: 'Photos', emoji: '📷', color: 'text-sky-300' },
        { title: 'Notes', emoji: '📝', color: 'text-amber-300' },
      ]
    : isBoardMeetingPack
      ? [
          { title: 'Metrics', emoji: '📊', color: 'text-sky-300' },
          { title: 'Highlights', emoji: '✅', color: 'text-emerald-300' },
          { title: 'Risks', emoji: '⚠️', color: 'text-amber-300' },
          { title: 'Asks', emoji: '🧭', color: 'text-violet-300' },
        ]
    : isGlossaryDefinitions
      ? [
          { title: 'Terms', emoji: '📘', color: 'text-violet-300' },
          { title: 'Definitions', emoji: '🧾', color: 'text-sky-300' },
          { title: 'Examples', emoji: '💡', color: 'text-amber-300' },
          { title: 'Sources', emoji: '🔎', color: 'text-emerald-300' },
        ]
    : [
        { title: 'TikTok', Icon: TikTokIcon, color: 'text-foreground' },
        { title: 'Instagram', Icon: InstagramIcon, color: 'text-pink-500' },
        { title: 'Reels', Icon: InstagramIcon, color: 'text-purple-500' },
        { title: 'Stories', Icon: InstagramIcon, color: 'text-amber-500' },
      ];

  return (
    <div className="space-y-3 h-full flex flex-col">
      {/* Top: real image */}
      <div className="w-full rounded-lg overflow-hidden border border-border/60 flex-shrink-0 bg-muted">
        <img
          src={heroImage}
          alt=""
          className="w-full h-full object-cover min-h-[4.5rem] max-h-[7rem]"
        />
      </div>
      {/* Big title */}
      <h2 className="text-sm sm:text-base font-bold text-foreground truncate flex-shrink-0">
        {template.title}
      </h2>
      {/* Row of social icons with labels */}
      <div className="grid grid-cols-4 gap-1.5 flex-shrink-0">
        {socialRow.map((item) => (
          <div key={item.title} className="rounded-md border border-border/60 overflow-hidden bg-foreground/5 flex flex-col items-center justify-center p-1.5">
            {'Icon' in item ? (
              <item.Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${item.color}`} />
            ) : (
              <span className={`text-xl leading-none ${item.color}`}>{item.emoji}</span>
            )}
            <span className="mt-0.5 text-[8px] text-foreground font-medium truncate w-full text-center">
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const INVESTMENT_PORTFOLIO_HERO_IMAGE = 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80';

function InvestmentPortfolioPreview({ template }: { template: Template }) {
  const marketRow = [
    { title: 'Stocks', Icon: CandlestickIcon, color: 'text-emerald-500' },
    { title: 'ETF', Icon: PortfolioPieIcon, color: 'text-sky-500' },
    { title: 'Trend', Icon: TrendingLineIcon, color: 'text-violet-500' },
    { title: 'Risk', Icon: RiskShieldIcon, color: 'text-amber-500' },
  ];

  return (
    <div className="space-y-3 h-full flex flex-col">
      <div className="w-full rounded-lg overflow-hidden border border-border/60 flex-shrink-0 bg-muted">
        <img
          src={INVESTMENT_PORTFOLIO_HERO_IMAGE}
          alt=""
          className="w-full h-full object-cover min-h-[4.5rem] max-h-[7rem]"
        />
      </div>
      <h2 className="text-sm sm:text-base font-bold text-foreground truncate flex-shrink-0">
        {template.title}
      </h2>
      <div className="grid grid-cols-4 gap-1.5 flex-shrink-0">
        {marketRow.map((item) => (
          <div key={item.title} className="rounded-md border border-border/60 overflow-hidden bg-foreground/5 flex flex-col items-center justify-center p-1.5">
            <item.Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${item.color}`} />
            <span className="mt-0.5 text-[8px] text-foreground font-medium truncate w-full text-center">
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  UX Research Repository Lite — cartoon painter + big title + 4 color cards */
/* ------------------------------------------------------------------ */
function UXResearchRepositoryLitePreview({ template }: { template: Template }) {
  const swatches = [
    { title: 'Usability', tone: 'bg-rose-400/90' },
    { title: 'Interviews', tone: 'bg-violet-400/90' },
    { title: 'Analytics', tone: 'bg-sky-400/90' },
    { title: 'Actions', tone: 'bg-emerald-400/90' },
  ];

  return (
    <div className="space-y-2.5 h-full flex flex-col">
      <div className="w-full rounded-lg overflow-hidden border border-border/60 flex-shrink-0 bg-gradient-to-br from-amber-100/80 via-orange-100/70 to-pink-100/80 dark:from-amber-950/30 dark:via-orange-950/20 dark:to-pink-950/25 min-h-[4rem] max-h-[6rem] flex items-center justify-center">
        <svg viewBox="0 0 180 80" className="w-full h-full p-2" role="img" aria-label="Cartoon person painting">
          <rect x="0" y="0" width="180" height="80" fill="transparent" />
          <rect x="118" y="18" width="44" height="30" rx="3" className="fill-white/90 dark:fill-zinc-900/70 stroke-zinc-700/30" />
          <rect x="123" y="23" width="14" height="8" rx="1.5" className="fill-sky-300/90" />
          <rect x="140" y="23" width="16" height="8" rx="1.5" className="fill-rose-300/90" />
          <rect x="123" y="34" width="14" height="9" rx="1.5" className="fill-amber-300/90" />
          <rect x="140" y="34" width="16" height="9" rx="1.5" className="fill-emerald-300/90" />
          <line x1="118" y1="48" x2="108" y2="74" className="stroke-zinc-700/40" strokeWidth="2" />
          <line x1="162" y1="48" x2="172" y2="74" className="stroke-zinc-700/40" strokeWidth="2" />
          <circle cx="68" cy="24" r="8" className="fill-orange-200 dark:fill-orange-300/80" />
          <path d="M58 50 C62 38, 79 38, 83 50 L83 63 L58 63 Z" className="fill-violet-500/80" />
          <rect x="56" y="62" width="9" height="12" rx="2" className="fill-zinc-600/80" />
          <rect x="76" y="62" width="9" height="12" rx="2" className="fill-zinc-600/80" />
          <line x1="79" y1="40" x2="117" y2="32" className="stroke-zinc-700/50" strokeWidth="2" />
          <circle cx="118" cy="32" r="2.5" className="fill-zinc-700/60" />
          <circle cx="97" cy="60" r="8" className="fill-zinc-100 dark:fill-zinc-800" />
          <circle cx="92" cy="58" r="2.8" className="fill-rose-300/95" />
          <circle cx="97" cy="55" r="2.8" className="fill-sky-300/95" />
          <circle cx="102" cy="58" r="2.8" className="fill-amber-300/95" />
          <circle cx="97" cy="63" r="2.8" className="fill-emerald-300/95" />
        </svg>
      </div>

      <h2 className="text-base font-bold text-foreground leading-tight flex-shrink-0">
        {template.title}
      </h2>

      <div className="grid grid-cols-4 gap-1.5 flex-shrink-0">
        {swatches.map((item) => (
          <div key={item.title} className="rounded-md border border-border/60 overflow-hidden bg-background/70">
            <div className={`h-8 ${item.tone}`} />
            <div className="px-1 py-1 text-[8px] font-medium text-foreground truncate text-center">{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sales Activity Log — same skeleton as UX Research Lite: sales hero image + big title + row of sales channel images */
/* ------------------------------------------------------------------ */
const SALES_ACTIVITY_HERO_IMAGE = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80';
const SALES_CHANNEL_IMAGES = [
  { title: 'Website', src: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80' },
  { title: 'Email', src: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&q=80' },
  { title: 'TikTok', src: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&q=80' },
  { title: 'Others', src: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80' },
];

function SalesActivityLogPreview({ template }: { template: Template }) {
  return (
    <div className="space-y-2.5 h-full flex flex-col">
      <div className="w-full rounded-lg overflow-hidden border border-border/60 flex-shrink-0 bg-muted min-h-[4rem] max-h-[6rem]">
        <img
          src={SALES_ACTIVITY_HERO_IMAGE}
          alt=""
          className="w-full h-full object-cover min-h-[4rem] max-h-[6rem]"
          onError={(e) => {
            const t = e.currentTarget;
            t.style.display = 'none';
            const fallback = t.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = 'flex';
          }}
        />
        <div
          className="hidden w-full min-h-[4rem] max-h-[6rem] items-center justify-center bg-gradient-to-br from-sky-100 to-indigo-100 dark:from-sky-950/50 dark:to-indigo-950/40"
          style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #e0e7ff 100%)' }}
        >
          <span className="text-sm font-bold text-sky-700/90 dark:text-sky-300/90">Sales</span>
        </div>
      </div>

      <h2 className="text-base font-bold text-foreground leading-tight flex-shrink-0">
        {template.title}
      </h2>

      <div className="grid grid-cols-4 gap-1.5 flex-shrink-0">
        {SALES_CHANNEL_IMAGES.map((item) => (
          <div key={item.title} className="rounded-md border border-border/60 overflow-hidden bg-background/70">
            <div className="h-8 w-full bg-muted">
              <img
                src={item.src}
                alt=""
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const next = e.currentTarget.nextElementSibling as HTMLElement;
                  if (next) next.style.display = 'block';
                }}
              />
              <div className="hidden h-8 w-full bg-gradient-to-b from-muted to-muted/80" />
            </div>
            <div className="px-1 py-1 text-[8px] font-medium text-foreground truncate text-center">{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Wedding Planning Hub — wedding dress image + big title + checklist with completed */
/* ------------------------------------------------------------------ */
const WEDDING_DRESS_IMAGE = 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&q=80';

function WeddingPlanningPreview({ config, template }: { config: ReturnType<typeof getTemplatePreviewConfig>; template?: Template }) {
  const items = (config.notes ?? ['Book venue', 'Choose caterer', 'Send invites', 'Finalize flowers', 'Hire photographer', 'Dress fitting']).slice(0, 6);
  const completedCount = 2;
  const title = template?.title ?? 'Wedding Planning Hub';
  return (
    <div className="space-y-2.5 h-full flex flex-col">
      <div className="w-full rounded-lg overflow-hidden border border-pink-200/40 dark:border-pink-500/20 flex-shrink-0 min-h-[3.5rem] max-h-[5rem] bg-pink-50/30 dark:bg-pink-950/20">
        <img
          src={WEDDING_DRESS_IMAGE}
          alt=""
          className="w-full h-full object-cover min-h-[3.5rem] max-h-[5rem]"
          onError={(e) => {
            const t = e.currentTarget;
            t.style.display = 'none';
            const fallback = t.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = 'flex';
          }}
        />
        <div
          className="hidden w-full min-h-[3.5rem] max-h-[5rem] items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #fce7f3 0%, #fdf2f8 50%, #fef3c7 100%)' }}
        >
          <span className="text-sm font-bold text-pink-700/90">Wedding</span>
        </div>
      </div>
      <h2 className="text-base font-bold text-foreground leading-tight flex-shrink-0">
        {title}
      </h2>
      <div className="flex-1 min-h-0 p-0">
        <div className="text-[10px] font-bold text-pink-800 dark:text-pink-200 mb-1.5">Wedding prep checklist</div>
        <div className="space-y-1.5">
          {items.map((label, i) => {
            const done = i < completedCount;
            return (
              <div key={i} className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-[8px] font-bold text-pink-600 dark:text-pink-400 border-pink-400/60 dark:border-pink-400/50 bg-pink-100/50 dark:bg-pink-900/20">
                  {done ? '✓' : ''}
                </span>
                <span
                  className={`text-[8px] truncate ${done ? 'line-through decoration-pink-500 decoration-2 text-muted-foreground' : 'text-foreground'}`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Conference & Trip Agenda — same skeleton as Wedding: image + title + checklist (conference/trip theme) */
/* ------------------------------------------------------------------ */
const CONFERENCE_IMAGE = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80';

function ConferenceAgendaPreview({ config, template }: { config: ReturnType<typeof getTemplatePreviewConfig>; template?: Template }) {
  const items = (config.notes ?? ['Keynote & sessions', 'Meetings & 1:1s', 'Contacts & follow-ups', 'Session notes', 'Travel & logistics', 'Action items']).slice(0, 6);
  const completedCount = 2;
  const title = template?.title ?? 'Conference & Trip Agenda';
  return (
    <div className="space-y-2.5 h-full flex flex-col">
      <div className="w-full rounded-lg overflow-hidden border border-teal-200/40 dark:border-teal-500/20 flex-shrink-0 min-h-[3.5rem] max-h-[5rem] bg-teal-50/30 dark:bg-teal-950/20">
        <img
          src={CONFERENCE_IMAGE}
          alt=""
          className="w-full h-full object-cover min-h-[3.5rem] max-h-[5rem]"
          onError={(e) => {
            const t = e.currentTarget;
            t.style.display = 'none';
            const fallback = t.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = 'flex';
          }}
        />
        <div
          className="hidden w-full min-h-[3.5rem] max-h-[5rem] items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #ccfbf1 0%, #99f6e4 50%, #5eead4 100%)' }}
        >
          <span className="text-sm font-bold text-teal-700/90">Conference</span>
        </div>
      </div>
      <h2 className="text-base font-bold text-foreground leading-tight flex-shrink-0">
        {title}
      </h2>
      <div className="flex-1 min-h-0 p-0">
        <div className="text-[10px] font-bold text-teal-800 dark:text-teal-200 mb-1.5">Conference & trip checklist</div>
        <div className="space-y-1.5">
          {items.map((label, i) => {
            const done = i < completedCount;
            return (
              <div key={i} className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-[8px] font-bold text-teal-600 dark:text-teal-400 border-teal-400/60 dark:border-teal-400/50 bg-teal-100/50 dark:bg-teal-900/20">
                  {done ? '✓' : ''}
                </span>
                <span
                  className={`text-[8px] truncate ${done ? 'line-through decoration-teal-500 decoration-2 text-muted-foreground' : 'text-foreground'}`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Student: Monthly Planner — realistic month illustration + calendar grid (refined yellow theme) */
/* ------------------------------------------------------------------ */
function MonthlyPlannerPreview() {
  const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const daysInMonth = 28;
  const firstDay = 6; // 0 = Sun, 6 = Sat (e.g. Feb 2025 starts on Sat)
  const cells = Array.from({ length: 7 * 5 }, (_, i) => {
    const dayNum = i - firstDay + 1;
    return dayNum >= 1 && dayNum <= daysInMonth ? dayNum : null;
  });
  return (
    <div className="space-y-2.5 h-full flex flex-col">
      {/* Refined month illustration: soft yellow gradient header + elegant date grid */}
      <div className="w-full rounded-xl overflow-hidden border border-yellow-200/60 dark:border-yellow-500/25 flex-shrink-0 bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 dark:from-yellow-950/30 dark:via-amber-950/30 dark:to-yellow-900/40 p-3 shadow-md">
        <div className="text-[11px] font-bold text-yellow-900 dark:text-yellow-200 text-center mb-2 tracking-wide">February 2025</div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekdays.map((d) => (
            <div key={d} className="text-center text-[8px] text-yellow-700/80 dark:text-yellow-300/70 font-semibold">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {cells.slice(0, 14).map((d, i) => (
            <div 
              key={i} 
              className={`aspect-square rounded-md flex items-center justify-center text-[8px] font-medium shadow-sm transition-all ${
                d 
                  ? 'bg-white dark:bg-yellow-900/60 border border-yellow-300/50 dark:border-yellow-500/30 text-yellow-900 dark:text-yellow-100 hover:shadow-md hover:border-yellow-400/70' 
                  : 'bg-transparent'
              }`}
            >
              {d ?? ''}
            </div>
          ))}
        </div>
      </div>
      <h2 className="text-sm font-bold text-foreground leading-tight flex-shrink-0">
        Minimal Planner
      </h2>
      {/* Full calendar grid with refined styling */}
      <div className="rounded-lg border border-yellow-200/70 dark:border-yellow-500/20 bg-gradient-to-br from-yellow-50/50 to-amber-50/30 dark:from-yellow-950/20 dark:to-amber-950/10 p-2 flex-1 min-h-0 shadow-sm">
        <div className="grid grid-cols-7 gap-1">
          {weekdays.map((d) => (
            <div key={d} className="text-center text-[7px] text-yellow-700/80 dark:text-yellow-300/70 font-semibold py-0.5 border-b border-yellow-300/40 dark:border-yellow-500/20">{d}</div>
          ))}
          {Array.from({ length: 7 * 4 }).map((_, i) => (
            <div key={i} className="aspect-square min-h-[14px] rounded-md border border-yellow-300/50 dark:border-yellow-500/25 bg-white/80 dark:bg-yellow-900/40 shadow-sm hover:shadow-md hover:border-yellow-400/70 transition-all" />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Startup Operating System — date filter + green line + blue/green dual bar */
/* ------------------------------------------------------------------ */
function StartupOSPreview({
  config,
  template,
}: {
  config: ReturnType<typeof getTemplatePreviewConfig>;
  template: Template;
}) {
  const isStepsTracker = (config.badge ?? '').toLowerCase().includes('steps');
  const isSideIncomeFreelance = (template.slug ?? '').toLowerCase() === 'side-income-freelance-log-55';
  const isCommissionIncentive = (template.slug ?? '').toLowerCase() === 'commission-incentive-tracker-140';
  const isCashFlowOverview = (template.slug ?? '').toLowerCase() === 'cash-flow-overview-58';
  const usesSalesPieCards = isSideIncomeFreelance || isCommissionIncentive || isCashFlowOverview;
  const linePoints = config.chartLine?.points ?? [32, 45, 38, 52, 58, 65, 70];
  const barMulti = config.chartBarMulti ?? {
    labels: ['W1', 'W2', 'W3', 'W4'],
    series: [
      { name: 'A', values: [40, 55, 48, 62] },
      { name: 'B', values: [28, 42, 50, 58] },
    ],
  };
  const maxLine = Math.max(...linePoints, 1);
  const allBarValues = barMulti.series.flatMap((s) => s.values ?? []);
  const maxBar = Math.max(...allBarValues, 1);
  const sideIncomePies = [
    {
      title: 'Income Sources',
      totalLabel: 'Total Income',
      totalValue: '$2.4k',
      segments: [
        { label: 'Retainers', value: 46, color: '#3B82F6' },
        { label: 'Projects', value: 34, color: '#22C55E' },
        { label: 'Other', value: 20, color: '#A78BFA' },
      ],
    },
    {
      title: 'Expense Split',
      totalLabel: 'Total Expenses',
      totalValue: '$640',
      segments: [
        { label: 'Tools', value: 39, color: '#F59E0B' },
        { label: 'Software', value: 33, color: '#06B6D4' },
        { label: 'Fees', value: 28, color: '#EC4899' },
      ],
    },
  ] as const;
  const commissionPies = [
    {
      title: 'Commission Mix',
      totalLabel: 'Total Commission',
      totalValue: '$3.1k',
      segments: [
        { label: 'New Biz', value: 48, color: '#0EA5E9' },
        { label: 'Renewals', value: 32, color: '#22C55E' },
        { label: 'Upsell', value: 20, color: '#F97316' },
      ],
    },
    {
      title: 'Incentive Payout',
      totalLabel: 'Total Incentive',
      totalValue: '$980',
      segments: [
        { label: 'Team Bonus', value: 44, color: '#8B5CF6' },
        { label: 'Quarter Goal', value: 36, color: '#F43F5E' },
        { label: 'SPIF', value: 20, color: '#EAB308' },
      ],
    },
  ] as const;
  const cashFlowPies = [
    {
      title: 'Cash Inflow',
      totalLabel: 'Total Inflow',
      totalValue: '$4.2k',
      segments: [
        { label: 'Sales', value: 44, color: '#14B8A6' },
        { label: 'Services', value: 34, color: '#0EA5E9' },
        { label: 'Other', value: 22, color: '#2DD4BF' },
      ],
    },
    {
      title: 'Cash Outflow',
      totalLabel: 'Total Outflow',
      totalValue: '$2.9k',
      segments: [
        { label: 'Payroll', value: 46, color: '#06B6D4' },
        { label: 'Operations', value: 31, color: '#22D3EE' },
        { label: 'Tools', value: 23, color: '#67E8F9' },
      ],
    },
  ] as const;
  const activePies = isCommissionIncentive ? commissionPies : isCashFlowOverview ? cashFlowPies : sideIncomePies;
  const salesCardClass = isCommissionIncentive
    ? 'rounded-lg border border-[#585426] bg-[#232100cc] p-2'
    : isCashFlowOverview
      ? 'rounded-lg border border-[#1b5f66] bg-[#062b30cc] p-2'
      : 'rounded-lg border border-border/70 bg-foreground/5 p-2';
  const salesTitleClass = isCommissionIncentive
    ? 'text-[9px] text-[#f2ecbc] mb-1'
    : isCashFlowOverview
      ? 'text-[9px] text-[#c7f7fb] mb-1'
      : 'text-[9px] text-muted-foreground mb-1';
  const salesMutedClass = isCommissionIncentive
    ? 'text-[7px] text-[#dfd8a0]'
    : isCashFlowOverview
      ? 'text-[7px] text-[#9fe8ef]'
      : 'text-[7px] text-muted-foreground';
  const salesValueClass = isCommissionIncentive
    ? 'text-[9px] text-[#fff9d6] font-semibold'
    : isCashFlowOverview
      ? 'text-[9px] text-[#e6fdff] font-semibold'
      : 'text-[9px] text-foreground font-semibold';
  const salesDonutInnerClass = isCommissionIncentive
    ? 'bg-[#1a1806]/95'
    : isCashFlowOverview
      ? 'bg-[#04191d]/95'
      : 'bg-background/90';
  const salesSegmentTextClass = isCommissionIncentive
    ? 'text-[#e8e1af]'
    : isCashFlowOverview
      ? 'text-[#b7edf2]'
      : 'text-muted-foreground';
  const barColors = [
    'bg-blue-500/80',
    'bg-emerald-500/80',
    'bg-violet-500/80',
    'bg-amber-500/80',
  ];
  return (
    <div className="space-y-2.5 h-full">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[8px] text-muted-foreground">Date:</span>
        {['Last month', 'This week', 'Last week', 'Custom'].map((label, i) => (
          <span
            key={label}
            className={`px-2.5 py-1 rounded-md text-[8px] border ${
              isCommissionIncentive
                ? i === 0
                  ? 'bg-[#2c290fcc] border-[#726b35] text-[#fff9d6] font-medium'
                  : 'bg-[#23210099] border-[#4f4a22] text-[#dfd8a0]'
                : isCashFlowOverview
                  ? i === 0
                    ? 'bg-[#0c3c42cc] border-[#1f7f86] text-[#d7fbff] font-medium'
                    : 'bg-[#062b3099] border-[#1b5f66] text-[#9fe8ef]'
                : i === 0
                  ? `bg-blue-500/25 border-blue-500/50 ${usesSalesPieCards ? 'text-white' : 'text-[#e7edff]'} font-medium`
                  : 'bg-foreground/5 border-border/60 text-muted-foreground'
            }`}
          >
            {label}
          </span>
        ))}
      </div>
      {usesSalesPieCards ? (
        <div className="grid grid-cols-2 gap-2">
          {activePies.map((pie) => {
            const total = pie.segments.reduce((sum, segment) => sum + segment.value, 0) || 1;
            const gradient = pie.segments
              .map((segment, idx) => {
                const start = (pie.segments.slice(0, idx).reduce((sum, item) => sum + item.value, 0) / total) * 100;
                const end = (pie.segments.slice(0, idx + 1).reduce((sum, item) => sum + item.value, 0) / total) * 100;
                return `${segment.color} ${start}% ${end}%`;
              })
              .join(', ');

            return (
              <div key={pie.title} className={salesCardClass}>
                <div className={salesTitleClass}>{pie.title}</div>
                <div className="flex items-center gap-2">
                  <div
                    className="relative h-10 w-10 rounded-full flex-shrink-0"
                    style={{ background: `conic-gradient(${gradient})` }}
                  >
                    <div className={`absolute inset-2 rounded-full ${salesDonutInnerClass}`} />
                  </div>
                  <div className="min-w-0">
                    <div className={salesMutedClass}>{pie.totalLabel}</div>
                    <div className={salesValueClass}>{pie.totalValue}</div>
                  </div>
                </div>
                <div className="mt-1.5 space-y-0.5">
                  {pie.segments.map((segment) => (
                    <div
                      key={segment.label}
                      className={`flex items-center justify-between text-[7px] ${salesSegmentTextClass}`}
                    >
                      <span className="flex items-center gap-1 truncate">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: segment.color }} />
                        {segment.label}
                      </span>
                      <span>{segment.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
      {!isStepsTracker && !usesSalesPieCards ? (
        <div className="rounded-lg border border-border/70 bg-foreground/5 p-2">
          <div className="text-[9px] text-muted-foreground mb-1.5">Trend</div>
          <div className="h-12 w-full relative">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
              <polyline
                fill="none"
                stroke="rgb(16, 185, 129)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={linePoints.slice(0, 7).map((p, i) => `${(i / 6) * 100},${100 - (p / maxLine) * 95}`).join(' ')}
              />
            </svg>
          </div>
        </div>
      ) : null}
      {!usesSalesPieCards ? (
        <div className="rounded-lg border border-border/70 bg-foreground/5 p-2">
          <div className="text-[9px] text-muted-foreground mb-1.5">By week</div>
          <div className="flex items-end gap-2 h-14">
            {barMulti.labels.map((label, i) => (
              <div key={label} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex gap-1 justify-center items-end h-10">
                  {barMulti.series.map((series, seriesIdx) => (
                    <span
                      key={`${series.name}-${label}`}
                      className={`w-1.5 rounded-t flex-shrink-0 ${barColors[seriesIdx % barColors.length]}`}
                      style={{ height: `${((series.values[i] ?? 0) / maxBar) * 100}%`, minHeight: 2 }}
                    />
                  ))}
                </div>
                <span className="text-[7px] text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Finance OS — KPIs + trend line + document/expense table (Tax Prep, etc.) */
/* ------------------------------------------------------------------ */
function FinanceOSPreview({
  config,
  template,
}: {
  config: ReturnType<typeof getTemplatePreviewConfig>;
  template: Template;
}) {
  const kpis = config.kpis ?? [
    { label: 'Gathered', value: '8' },
    { label: 'Pending', value: '4' },
    { label: 'Due', value: 'Apr 15' },
    { label: 'Documents', value: '12' },
  ];
  const linePoints = config.chartLine?.points ?? [2, 4, 5, 6, 8, 9, 10, 11, 12];
  const maxLine = Math.max(...linePoints, 1);
  const headers = config.tableHeaders ?? ['Document', 'Category', 'Status', 'Due'];
  const rows = config.tableRows ?? [];

  return (
    <div className="space-y-2.5 h-full">
      <div className="grid grid-cols-4 gap-2">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-md border border-border/70 bg-foreground/5 p-2">
            <div className="text-[8px] text-muted-foreground">{kpi.label}</div>
            <div className="text-[10px] text-foreground font-semibold">{kpi.value}</div>
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-border/70 bg-foreground/5 p-2">
        <div className="text-[9px] text-muted-foreground mb-1.5">Trend</div>
        <div className="h-12 w-full relative">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            <polyline
              fill="none"
              stroke="rgb(139, 92, 246)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={linePoints
                .slice(0, 9)
                .map((p, i) => `${(i / Math.max(linePoints.length - 1, 1)) * 100},${100 - (p / maxLine) * 95}`)
                .join(' ')}
            />
          </svg>
        </div>
      </div>
      <div className="rounded-md border border-border/70 overflow-hidden">
        <div className="grid gap-0 border-b border-border/70 bg-foreground/5" style={{ gridTemplateColumns: `repeat(${headers.length}, minmax(0, 1fr))` }}>
          {headers.map((h) => (
            <div key={h} className="px-2 py-1.5 text-[9px] font-medium text-muted-foreground truncate">
              {h}
            </div>
          ))}
        </div>
        <div className="divide-y divide-border/60">
          {rows.slice(0, 4).map((row, i) => (
            <div key={`${row.title}-${i}`} className="grid gap-0 items-center" style={{ gridTemplateColumns: `repeat(${headers.length}, minmax(0, 1fr))` }}>
              <div className="px-2 py-1.5 text-[9px] text-foreground truncate">{row.title}</div>
              <div className="px-2 py-1.5 text-[9px] text-muted-foreground truncate">{row.meta}</div>
              <div className="px-2 py-1.5">
                <span className={`inline-block px-1.5 py-0.5 text-[8px] rounded border ${statusToneClass(row.statusTone)}`}>
                  {row.status}
                </span>
              </div>
              <div className="px-2 py-1.5 text-[9px] text-muted-foreground truncate">
                {i < 2 ? 'Apr 15' : '—'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Note-Taking Methods Library — filter + line chart */
/* ------------------------------------------------------------------ */
function NoteTakingMethodsPreview({ config }: { config: ReturnType<typeof getTemplatePreviewConfig> }) {
  const linePoints = config.chartLine?.points ?? [20, 35, 28, 48, 52, 60, 55, 72];
  const maxP = Math.max(...linePoints, 1);
  const lineColor = '#60A5FA';
  const activeFilterStyle = {
    backgroundColor: 'rgba(96, 165, 250, 0.18)',
    borderColor: 'rgba(96, 165, 250, 0.45)',
    color: lineColor,
  };
  return (
    <div className="space-y-2.5 h-full">
      <div className="flex gap-1.5 flex-wrap">
        {['Cornell', 'Outline', 'Concept map', 'Other'].map((label, i) => (
          <span
            key={label}
            className={`px-2 py-1 rounded text-[8px] border ${i === 0 ? 'font-medium' : 'bg-foreground/5 border-border/60 text-muted-foreground'}`}
            style={i === 0 ? activeFilterStyle : undefined}
          >
            {label}
          </span>
        ))}
      </div>
      <div className="rounded-lg border border-border/70 bg-foreground/5 p-2 flex-1 min-h-0">
        <div className="h-14 w-full relative">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            <polyline
              fill="none"
              stroke={lineColor}
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={linePoints.map((p, i) => `${(i / (linePoints.length - 1)) * 100},${100 - (p / maxP) * 95}`).join(' ')}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Student: Semester Planner & GPA Tracker — pie chart, rich colors */
/* ------------------------------------------------------------------ */
const SEMESTER_PIE_COLORS = ['#60A5FA', '#A78BFA', '#34D399', '#FBBF24', '#F472B6', '#38BDF8', '#C084FC', '#2DD4BF'];

function SemesterGpaPreview({ config }: { config: ReturnType<typeof getTemplatePreviewConfig> }) {
  const notes = (config.notes ?? []).slice(0, 4);
  const chartPie = config.chartPie ?? [];
  const pieTotal = chartPie.reduce((s, d) => s + d.value, 0) || 1;
  return (
    <div className="space-y-2 h-full">
      <div className="grid grid-cols-5 gap-1.5">
        {['Year', 'Quarter', 'Month', 'Week', 'Day'].map((p, i) => (
          <div key={p} className={`rounded border px-1.5 py-1 text-[8px] ${i === 2 ? 'bg-primary/20 border-primary/40 text-primary-foreground' : 'bg-foreground/5 border-border/60 text-muted-foreground'}`}>
            {p}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-md border border-border/70 bg-foreground/5 p-2">
          <div className="text-[9px] text-muted-foreground mb-1">Cycle plan</div>
          {notes.slice(0, 4).map((n, i) => (
            <div key={i} className="flex items-center gap-1.5 mb-1">
              <span className="h-2.5 w-2.5 rounded border border-border/70 bg-background/80" />
              <span className="text-[8px] text-foreground truncate">{n}</span>
            </div>
          ))}
        </div>
        <div className="rounded-md border border-border/70 bg-foreground/5 p-2">
          <div className="text-[9px] text-muted-foreground mb-1">Grade breakdown</div>
          {chartPie.length > 0 ? (
            <div className="flex items-center gap-2">
              <div
                className="w-10 h-10 rounded-full flex-shrink-0"
                style={{
                  background: `conic-gradient(${chartPie.map((d, i) => {
                    const start = (chartPie.slice(0, i).reduce((s, x) => s + x.value, 0) / pieTotal) * 100;
                    const end = (chartPie.slice(0, i + 1).reduce((s, x) => s + x.value, 0) / pieTotal) * 100;
                    return `${SEMESTER_PIE_COLORS[i % SEMESTER_PIE_COLORS.length]} ${start}% ${end}%`;
                  }).join(', ')})`,
                }}
              />
              <div className="flex-1 min-w-0 space-y-0.5">
                {chartPie.slice(0, 4).map((d, i) => (
                  <div key={d.label} className="flex items-center gap-1 text-[7px]">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: SEMESTER_PIE_COLORS[i % SEMESTER_PIE_COLORS.length] }} />
                    <span className="text-foreground truncate">{d.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-end gap-1 h-14">
              {[24, 48, 30, 66].map((h, i) => (
                <span key={i} className="flex-1 rounded-t-sm bg-primary/40" style={{ height: `${h}%` }} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Student: My Class Schedule — gradient "Use it for school" + week grid with to-dos in cells */
/* ------------------------------------------------------------------ */
const CLASS_SCHEDULE_ITEM_COLORS = [
  'bg-amber-200/80 text-amber-900',
  'bg-pink-200/80 text-pink-900',
  'bg-emerald-200/80 text-emerald-900',
  'bg-sky-200/80 text-sky-900',
  'bg-violet-200/80 text-violet-900',
  'bg-rose-200/80 text-rose-900',
];

function ClassSchedulePreview({ config }: { config: ReturnType<typeof getTemplatePreviewConfig> }) {
  const notes = (config.notes ?? ['Review Ch.4', 'Problem set', 'Essay draft', 'Lab prep', 'Read Ch.2']).slice(0, 6);
  const weekLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  // Assign to-dos to days: Mon 2, Tue 0, Wed 1, Thu 2, Fri 1 (example)
  const dayItems: string[][] = [[notes[0], notes[1]], [], [notes[2]], [notes[3], notes[4]], notes[5] ? [notes[5]] : []];
  return (
    <div className="space-y-3 h-full flex flex-col">
      <div className="w-full rounded-lg overflow-hidden border border-border/60 flex-shrink-0 min-h-[3.25rem] bg-gradient-to-br from-sky-200/90 via-cyan-100/95 to-emerald-200/90 flex items-center justify-center py-3">
        <span className="text-sm font-semibold text-teal-800/95" style={{ fontFamily: '"Fredoka", sans-serif' }}>
          Use it for school
        </span>
      </div>
      <div className="rounded-md border border-border/70 bg-foreground/5 p-2 flex-1 min-h-0">
        <div className="text-[8px] text-muted-foreground mb-1.5">Week</div>
        <div className="grid grid-cols-5 gap-1.5">
          {weekLabels.map((d) => (
            <div key={d} className="rounded border border-border/60 bg-background/70 py-0.5 text-center text-[8px] font-medium text-foreground">
              {d}
            </div>
          ))}
          {dayItems.map((items, dayIndex) => (
            <div key={dayIndex} className="rounded border border-border/50 bg-background/40 p-1 min-h-[2.5rem] flex flex-col gap-0.5">
              {items.map((item, i) => (
                <div
                  key={i}
                  className={`rounded px-1 py-0.5 text-[7px] font-medium truncate ${CLASS_SCHEDULE_ITEM_COLORS[(dayIndex + i) % CLASS_SCHEDULE_ITEM_COLORS.length]}`}
                >
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Productivity charts skeleton: pie / line / bar + theme + typography */
/* ------------------------------------------------------------------ */
const THEME_CLASSES: Record<string, { border: string; bg: string; bar: string; text: string }> = {
  emerald: { border: 'border-emerald-500/25', bg: 'bg-emerald-950/20', bar: 'bg-emerald-500/50', text: 'text-emerald-200' },
  sky: { border: 'border-sky-500/25', bg: 'bg-sky-950/20', bar: 'bg-sky-500/50', text: 'text-sky-200' },
  violet: { border: 'border-violet-500/25', bg: 'bg-violet-950/20', bar: 'bg-violet-500/50', text: 'text-violet-200' },
  amber: { border: 'border-amber-500/25', bg: 'bg-amber-950/20', bar: 'bg-amber-500/50', text: 'text-amber-200' },
  rose: { border: 'border-rose-500/25', bg: 'bg-rose-950/20', bar: 'bg-rose-500/50', text: 'text-rose-200' },
  slate: { border: 'border-slate-500/25', bg: 'bg-slate-950/20', bar: 'bg-slate-500/50', text: 'text-slate-200' },
};

function ProductivityChartsPreview({ config }: { config: ReturnType<typeof getTemplatePreviewConfig> }) {
  const theme = config.accentTheme ?? 'emerald';
  const tc = THEME_CLASSES[theme] ?? THEME_CLASSES.emerald;
  const kpis = config.kpis ?? [{ label: 'Tasks', value: '—' }, { label: 'Done', value: '—' }, { label: 'Focus', value: '—' }];
  const notes = (config.notes ?? []).slice(0, 3);

  const pieTotal = config.chartPie?.reduce((s, d) => s + d.value, 0) ?? 1;

  return (
    <div className="space-y-2 h-full">
      <div className="grid grid-cols-3 gap-1.5">
        {kpis.map((kpi, i) => (
          <div key={kpi.label} className={`rounded-md border ${tc.border} ${tc.bg} p-1.5`}>
            <div className={`${i === 0 ? 'text-[7px]' : i === 1 ? 'text-[8px]' : 'text-[9px]'} text-muted-foreground`}>{kpi.label}</div>
            <div className={`${i === 0 ? 'text-[10px] font-semibold' : i === 1 ? 'text-[9px] font-medium' : 'text-[8px]'} ${tc.text} truncate`}>{kpi.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {config.chartPie && config.chartPie.length > 0 ? (
          <div className={`rounded-md border ${tc.border} ${tc.bg} p-2`}>
            <div className="text-[8px] font-semibold text-foreground mb-1">Breakdown</div>
            <div className="flex items-center gap-2">
              <div
                className="w-10 h-10 rounded-full flex-shrink-0"
                style={{
                  background: `conic-gradient(${config.chartPie.map((d, i) => {
                    const colors = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B'];
                    const start = (config.chartPie!.slice(0, i).reduce((s, x) => s + x.value, 0) / pieTotal) * 100;
                    const end = (config.chartPie!.slice(0, i + 1).reduce((s, x) => s + x.value, 0) / pieTotal) * 100;
                    return `${colors[i % colors.length]} ${start}% ${end}%`;
                  }).join(', ')})`,
                }}
              />
              <div className="flex-1 min-w-0">
                {config.chartPie.slice(0, 3).map((d, i) => (
                  <div key={d.label} className="flex items-center gap-1 text-[7px]">
                    <span className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-emerald-500' : i === 1 ? 'bg-sky-500' : 'bg-violet-500'}`} />
                    <span className="text-foreground truncate">{d.label}</span>
                    <span className="text-muted-foreground">{Math.round((d.value / pieTotal) * 100)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {config.chartLine?.points?.length ? (
          <div className={`rounded-md border ${tc.border} ${tc.bg} p-2`}>
            <div className="text-[8px] font-medium text-foreground mb-1">Trend</div>
            <div className="flex items-end gap-0.5 h-8">
              {config.chartLine.points.slice(0, 6).map((p, i) => (
                <span key={i} className={`flex-1 rounded-t-sm min-w-[3px] ${tc.bar}`} style={{ height: `${Math.min(100, p)}%` }} />
              ))}
            </div>
            <div className="text-[6px] text-muted-foreground mt-0.5">This week</div>
          </div>
        ) : null}

        {config.chartBar && config.chartBar.length > 0 && !config.chartBarMulti ? (
          <div className={`rounded-md border ${tc.border} ${tc.bg} p-2`}>
            <div className="text-[8px] font-semibold text-foreground mb-1">By day</div>
            <div className="flex items-end gap-1 h-9">
              {config.chartBar.slice(0, 5).map((d, i) => (
                <div key={d.label} className="flex-1 flex flex-col items-center gap-0.5">
                  <span className={`w-full rounded-t min-h-[2px] ${tc.bar}`} style={{ height: `${Math.min(100, d.value)}%`, maxHeight: '24px' }} />
                  <span className="text-[6px] text-muted-foreground truncate w-full text-center">{d.label}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {config.chartBarMulti ? (
          <div className={`rounded-md border ${tc.border} ${tc.bg} p-2 col-span-2`}>
            <div className="text-[9px] font-semibold text-foreground mb-1">Tasks vs Done</div>
            <div className="flex items-end gap-1 h-10">
              {config.chartBarMulti.labels.map((label, i) => (
                <div key={label} className="flex-1 flex flex-col items-center gap-0.5">
                  <div className="w-full flex gap-0.5 justify-center items-end h-8">
                    {config.chartBarMulti!.series.map((s, j) => (
                      <span
                        key={s.name}
                        className={`flex-1 rounded-t min-w-[2px] ${j === 0 ? tc.bar : 'bg-emerald-500/40'}`}
                        style={{ height: `${Math.min(100, (s.values[i] ?? 0) * 5)}%` }}
                      />
                    ))}
                  </div>
                  <span className="text-[6px] text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {notes.length > 0 ? (
        <div className={`rounded-md border ${tc.border} ${tc.bg} p-2`}>
          <div className="text-[8px] font-medium text-muted-foreground mb-1">Quick list</div>
          {notes.map((n, i) => (
            <div key={i} className={`${i === 0 ? 'text-[9px] font-semibold' : 'text-[8px]'} text-foreground truncate`}>{n}</div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Preview Component                                             */
/* ------------------------------------------------------------------ */
export function TemplatePreview({ template, variant = 'card' }: TemplatePreviewProps) {
  const config = getTemplatePreviewConfig(template);
  const notes = (config.notes ?? template.whats_inside ?? []).slice(0, 4);
  const lowerSlug = (template.slug ?? '').toLowerCase();

  const skeleton = config.skeleton ?? 'dashboard';
  const isDocShell = config.shell === 'doc';
  const isDashboardShell = config.shell === 'dashboard';
  const isMinimalShell = config.shell === 'minimal';
  const showSidebar = skeleton === 'wiki-hub' || (!isMinimalShell && !isDocShell);

  const isFeaturedTarot = template.title.toLowerCase().includes('tarot learning vault');
  const isAIEngineeringBaraa = template.title.toLowerCase().includes('ai engineering roadmap by data with baraa');
  const isBucketListLifeGoals =
    (template.slug ?? '').toLowerCase().includes('bucket-list-life-goals') ||
    (template.title.toLowerCase().includes('bucket list') && template.title.toLowerCase().includes('life goals'));
  const isAIEngineeringSkillPath = template.title.toLowerCase().includes('ai engineering skill path');
  const isFeaturedAI = isAIEngineeringBaraa || isAIEngineeringSkillPath;
  const isFeaturedTravel =
    template.title.toLowerCase().includes('travel bucket list') ||
    (template.title.toLowerCase().includes('newsletter') && template.title.toLowerCase().includes('email content')) ||
    lowerSlug === 'date-night-ideas-bank-192' ||
    lowerSlug === 'rfp-response-tracker-138';
  const isFeatured12Week = template.title.toLowerCase().includes('12 week year planner');
  const isStrategicInitiativesTracker =
    lowerSlug === 'strategic-initiatives-tracker-102' ||
    template.title.toLowerCase().includes('strategic initiatives tracker');
  const isProjectRoadmapTimeline =
    lowerSlug === 'project-roadmap-timeline-103' ||
    template.title.toLowerCase().includes('project roadmap & timeline');
  const isHealthGoalsAnnualCheckup = lowerSlug === 'health-goals-annual-check-up-177';
  const isFeatured12WeekLike =
    isFeatured12Week || isStrategicInitiativesTracker || isProjectRoadmapTimeline || isHealthGoalsAnnualCheckup;
  const isReplicaTravelWish =
    template.title.toLowerCase().includes('travel bucket wish list') ||
    lowerSlug === 'pet-care-vet-tracker-189' ||
    lowerSlug.includes('places-to-revisit');
  const isPlacesToRevisit = lowerSlug.includes('places-to-revisit');
  const isReplicaSocialPlanner =
    template.title.toLowerCase().includes('2026 social media') ||
    lowerSlug === 'product-roadmap-backlog-91';
  const isReplicaTikTokIG =
    template.title.toLowerCase().includes('content planner for tiktok') ||
    lowerSlug === 'glossary-definitions-209';
  const isInvestmentPortfolioLog =
    template.title.toLowerCase().includes('investment & portfolio log') ||
    (template.slug ?? '').toLowerCase().includes('investment-portfolio-log');
  const isReadingList = template.title.toLowerCase().includes('reading list');
  const isStudentLessonPlanner = template.title.toLowerCase().includes('student and lesson planner');
  const isMonthlyPlanner = template.title.toLowerCase().includes('monthly planner');
  const isMyClassSchedule = template.title.toLowerCase().includes('my class schedule');
  const isStartupOS =
    template.title.toLowerCase().includes('startup operating system') ||
    template.title.toLowerCase().includes('startup os') ||
    lowerSlug === 'steps-activity-tracker-168';
  const isWeddingPlanning = template.title.toLowerCase().includes('wedding planning');
  const isConferenceAgenda = template.title.toLowerCase().includes('conference') && template.title.toLowerCase().includes('trip agenda');
  const isStudyHabitTracker =
    (template.slug ?? '').toLowerCase().includes('study-habit-tracker') ||
    template.title.toLowerCase().includes('study habit tracker');
  const isTravelJournalMemories =
    (template.slug ?? '').toLowerCase().includes('travel-journal-memories') ||
    (template.title.toLowerCase().includes('travel journal') && template.title.toLowerCase().includes('memories'));
  const isUXResearchRepositoryLite = template.title.toLowerCase().includes('ux research repository lite');
  const isSalesActivityLog = template.title.toLowerCase().includes('sales activity log');
  const isContentCreatorKit = (template.slug ?? '').toLowerCase().includes('content-creator-kit') || template.title.toLowerCase().includes('content creator kit');
  const isSubscriptionRecurring = (template.slug ?? '').toLowerCase().includes('subscription-recurring-costs');
  const isExpenseTracker2026 = (template.slug ?? '').toLowerCase().includes('expense-tracker-2026');
  const isWeddingBudgetExpenses = lowerSlug.includes('wedding-budget-expenses');
  const isGtdInspiredTaskSystem = lowerSlug === 'gtd-inspired-task-system-6';
  const isTerritoryAccountAssignment = lowerSlug === 'territory-account-assignment-131';
  const isCapstoneProjectShowcase = lowerSlug === 'capstone-project-showcase-40';
  const isBoardMeetingPack = lowerSlug === 'board-meeting-pack-93';
  const isAnyFeatured = isFeaturedTarot || isFeaturedAI || isFeaturedTravel || isFeatured12WeekLike || isReplicaTravelWish || isReplicaSocialPlanner || isReplicaTikTokIG || isInvestmentPortfolioLog || isReadingList || isStudentLessonPlanner || isMonthlyPlanner || isMyClassSchedule || isStartupOS || isWeddingPlanning || isConferenceAgenda || isStudyHabitTracker || isTravelJournalMemories || isUXResearchRepositoryLite || isSalesActivityLog || isBucketListLifeGoals;

  return (
    <div className={`relative w-full h-full ${variant === 'card' ? 'scale-[1.02]' : ''}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background/40 to-background/80" />

      <div
        className={`relative z-10 h-full w-full rounded-xl border border-border/70 shadow-[0_18px_40px_rgba(15,23,42,0.65)] overflow-hidden ${
          isDashboardShell
            ? 'bg-slate-950/95'
            : isDocShell
              ? 'bg-zinc-950/95'
              : isMinimalShell
                ? 'bg-card/90'
                : 'bg-card/95'
        }`}
      >
        {/* ── Top chrome (hidden for Reading List to avoid duplicate title) ── */}
        {!isReadingList && !isPlacesToRevisit && (
          <div
            className={`flex items-center justify-between px-4 py-2 border-b border-border/70 gap-2 ${
              isDocShell
                ? 'bg-gradient-to-r from-zinc-900/90 via-zinc-900/80 to-zinc-900/90'
                : isDashboardShell
                  ? 'bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/90'
                  : 'bg-gradient-to-r from-background/80 via-background/90 to-background/80'
            }`}
          >
            <div className="flex items-center gap-1.5 min-w-0">
              {isMinimalShell ? (
                <div className="h-4 w-16 rounded bg-foreground/5 border border-border/60" />
              ) : isDocShell ? (
                <>
                  <div className="h-4 w-14 rounded bg-foreground/5 border border-border/60" />
                  <span className="text-[9px] text-muted-foreground">/ {config.category}</span>
                </>
              ) : (
                <>
                  <span className={`w-2.5 h-2.5 rounded-full ${isContentCreatorKit ? 'bg-amber-500/80' : 'bg-red-500/80'}`} />
                  <span className={`w-2.5 h-2.5 rounded-full ${isContentCreatorKit ? 'bg-orange-400/80' : 'bg-amber-400/80'}`} />
                  <span className={`w-2.5 h-2.5 rounded-full ${isContentCreatorKit ? 'bg-amber-400/80' : 'bg-emerald-400/80'}`} />
                </>
              )}
            </div>
            <div className={`px-2 py-0.5 rounded-full text-[10px] font-medium truncate ${isContentCreatorKit ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40' : isExpenseTracker2026 ? 'bg-amber-500/20 text-amber-100 border border-amber-400/40' : 'bg-foreground/5 text-muted-foreground border border-border/60'}`}>
              {config.badge}
            </div>
          </div>
        )}

        {/* ── Body ── */}
        <div className={`flex ${isReadingList || isPlacesToRevisit ? 'h-full' : 'h-[92%]'}`}>
          {showSidebar && !isAnyFeatured && !isSubscriptionRecurring && !isExpenseTracker2026 ? (
            <aside className="hidden sm:flex flex-col w-28 border-r border-border/70 bg-background/80 px-2 py-3 gap-2">
              <div className="h-7 rounded-md bg-foreground/5" />
              <div className="space-y-1.5 mt-1">
                {config.sidebarSections.map((section) => (
                  <div key={section} className="px-1.5 py-1 rounded-sm bg-foreground/5 text-[9px] text-muted-foreground truncate">
                    {section}
                  </div>
                ))}
              </div>
            </aside>
          ) : null}

          {/* Expense Tracker 2026: light yellow sidebar for left-right layout */}
          {isExpenseTracker2026 ? (
            <aside className="hidden sm:flex flex-col w-28 border-r border-amber-500/25 bg-amber-950/35 px-2 py-3 gap-2 text-amber-100">
              <div className="h-7 rounded-md bg-amber-900/45 border border-amber-500/25" />
              <div className="space-y-1.5 mt-1">
                {config.sidebarSections.map((section) => (
                  <div key={section} className="px-1.5 py-1 rounded-sm bg-amber-900/35 border border-amber-500/25 text-[9px] text-amber-100/90 truncate">
                    {section}
                  </div>
                ))}
              </div>
            </aside>
          ) : null}

          {/* Featured: Tarot sidebar */}
          {isFeaturedTarot ? (
            <aside className="hidden sm:flex flex-col w-28 border-r border-violet-500/20 bg-violet-950/30 px-2 py-3 gap-2">
              <div className="h-7 rounded-md bg-violet-600/15 border border-violet-500/20" />
              <div className="space-y-1.5 mt-1">
                {config.sidebarSections.map((section) => (
                  <div key={section} className="px-1.5 py-1 rounded-sm bg-violet-600/10 text-[9px] text-violet-200/70 truncate border border-violet-500/10">
                    {section}
                  </div>
                ))}
              </div>
            </aside>
          ) : null}

          {/* Featured: AI sidebar (only for AI Engineering Skill Path; Baraa template has no sidebar) */}
          {isAIEngineeringSkillPath ? (
            <aside className="hidden sm:flex flex-col w-28 border-r border-sky-500/20 bg-sky-950/30 px-2 py-3 gap-2">
              <div className="h-7 rounded-md bg-sky-600/15 border border-sky-500/20 flex items-center justify-center">
                <span className="text-[8px] text-sky-300/80 font-medium">50% complete</span>
              </div>
              <div className="space-y-1.5 mt-1">
                {config.sidebarSections.map((section, i) => (
                  <div key={section} className={`px-1.5 py-1 rounded-sm text-[9px] truncate border ${
                    i < 2 ? 'bg-emerald-600/15 border-emerald-500/20 text-emerald-200/80' :
                    i === 2 ? 'bg-sky-600/20 border-sky-500/30 text-sky-200/90' :
                    'bg-sky-600/5 border-sky-500/10 text-sky-200/50'
                  }`}>
                    {i < 2 ? '✓ ' : i === 2 ? '▶ ' : ''}{section}
                  </div>
                ))}
              </div>
            </aside>
          ) : null}

          {/* Featured: 12-Week sidebar */}
          {isFeatured12WeekLike ? (
            <aside
              className={`hidden sm:flex flex-col w-28 border-r px-2 py-3 gap-2 ${
                isStrategicInitiativesTracker || isProjectRoadmapTimeline
                  ? 'border-pink-400/20 bg-pink-950/25'
                  : isHealthGoalsAnnualCheckup
                    ? 'border-orange-400/25 bg-orange-950/25'
                  : 'border-amber-500/20 bg-amber-950/30'
              }`}
            >
              <div
                className={`h-7 rounded-md flex items-center justify-center ${
                  isStrategicInitiativesTracker || isProjectRoadmapTimeline
                    ? 'bg-pink-500/15 border border-pink-400/20'
                    : isHealthGoalsAnnualCheckup
                      ? 'bg-orange-500/20 border border-orange-400/25'
                    : 'bg-amber-600/15 border border-amber-500/20'
                }`}
              >
                <span
                  className={`text-[8px] font-medium ${
                    isStrategicInitiativesTracker || isProjectRoadmapTimeline
                      ? 'text-pink-200/80'
                      : isHealthGoalsAnnualCheckup
                        ? 'text-orange-200/85'
                        : 'text-amber-300/80'
                  }`}
                >
                  Week 7 / 12
                </span>
              </div>
              <div className="space-y-1.5 mt-1">
                {config.sidebarSections.map((section, i) => (
                  <div
                    key={section}
                    className={`px-1.5 py-1 rounded-sm text-[9px] truncate border ${
                      isStrategicInitiativesTracker || isProjectRoadmapTimeline
                        ? i === 0
                          ? 'bg-pink-500/20 border-pink-400/30 text-pink-100/90'
                          : 'bg-pink-500/10 border-pink-400/15 text-pink-100/70'
                        : isHealthGoalsAnnualCheckup
                          ? i === 0
                            ? 'bg-orange-500/25 border-orange-400/35 text-orange-100/95'
                            : 'bg-orange-500/10 border-orange-400/20 text-orange-100/80'
                        : i === 0
                          ? 'bg-amber-600/20 border-amber-500/30 text-amber-200/90'
                          : 'bg-amber-600/10 border-amber-500/15 text-amber-200/70'
                    }`}
                  >
                    {section}
                  </div>
                ))}
              </div>
            </aside>
          ) : null}

          {/* Replica: Travel Wish sidebar */}
          {isReplicaTravelWish && !isPlacesToRevisit ? (
            <aside className="hidden sm:flex flex-col w-28 border-r border-teal-500/20 bg-teal-950/25 px-2 py-3 gap-2">
              <div className="h-7 rounded-md bg-teal-600/15 border border-teal-500/20" />
              <div className="space-y-1.5 mt-1">
                {config.sidebarSections.map((section) => (
                  <div key={section} className="px-1.5 py-1 rounded-sm bg-teal-600/10 border border-teal-500/10 text-[9px] text-teal-200/70 truncate">{section}</div>
                ))}
              </div>
            </aside>
          ) : null}

          {/* Replica: Social Planner sidebar */}
          {isReplicaSocialPlanner ? (
            <aside className={`hidden sm:flex flex-col w-28 border-r px-2 py-3 gap-2 ${lowerSlug === 'product-roadmap-backlog-91' ? 'border-sky-500/20 bg-sky-950/25' : 'border-violet-500/20 bg-violet-950/25'}`}>
              <div className={`h-7 rounded-md ${lowerSlug === 'product-roadmap-backlog-91' ? 'bg-sky-600/15 border border-sky-500/20' : 'bg-violet-600/15 border border-violet-500/20'}`} />
              <div className="space-y-1.5 mt-1">
                {config.sidebarSections.map((section) => (
                  <div
                    key={section}
                    className={`px-1.5 py-1 rounded-sm text-[9px] truncate ${lowerSlug === 'product-roadmap-backlog-91' ? 'bg-sky-600/10 border border-sky-500/10 text-sky-200/70' : 'bg-violet-600/10 border border-violet-500/10 text-violet-200/70'}`}
                  >
                    {section}
                  </div>
                ))}
              </div>
            </aside>
          ) : null}

          {/* Student and Lesson Planner sidebar */}
          {isStudentLessonPlanner ? (
            <aside className="hidden sm:flex flex-col w-28 border-r border-emerald-500/20 bg-emerald-950/25 px-2 py-3 gap-2">
              <div className="h-7 rounded-md bg-emerald-600/15 border border-emerald-500/20" />
              <div className="space-y-1.5 mt-1">
                {config.sidebarSections.map((section) => (
                  <div key={section} className="px-1.5 py-1 rounded-sm bg-emerald-600/10 border border-emerald-500/10 text-[9px] text-emerald-200/70 truncate">{section}</div>
                ))}
              </div>
            </aside>
          ) : null}

          <main
            className={`flex-1 px-4 py-3 overflow-hidden ${
              isSubscriptionRecurring
                ? 'bg-emerald-950/70 text-emerald-100'
                : isExpenseTracker2026
                  ? 'bg-amber-950/30 text-amber-100 [&_.text-foreground]:text-amber-100 [&_.text-muted-foreground]:text-amber-200/75 [&_.bg-background\\/70]:bg-amber-900/35 [&_.bg-background\\/80]:bg-amber-900/45 [&_.border-border\\/60]:border-amber-500/25 [&_.border-border\\/70]:border-amber-500/30'
                  : isDashboardShell
                    ? 'bg-slate-900/80'
                    : isDocShell
                      ? 'bg-zinc-900/70'
                      : 'bg-background/95'
            }`}
          >
            {/* Title header — category line and tags removed for all templates */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className={`text-[11px] sm:text-xs font-semibold truncate max-w-[220px] ${isSubscriptionRecurring ? 'text-emerald-100' : isExpenseTracker2026 ? 'text-amber-100' : isDashboardShell ? 'text-slate-100' : 'text-foreground'}`}>
                  {template.title}
                </h3>
              </div>
            </div>

            {/* ── Featured: Tarot custom body ── */}
            {isFeaturedTarot ? <TarotPreview config={config} template={template} /> : null}

            {/* ── AI Engineering Roadmap by Data With Baraa (article-style, no sidebar) ── */}
            {isAIEngineeringBaraa || isBucketListLifeGoals ? <AIRoadmapPreview config={config} template={template} /> : null}
            {/* ── AI Engineering Skill Path (roadmap with sidebar) ── */}
            {isAIEngineeringSkillPath ? <AISkillPathPreview config={config} template={template} /> : null}

            {/* ── Featured: Travel Bucket List custom body ── */}
            {isFeaturedTravel ? <TravelBucketPreview config={config} template={template} /> : null}

            {/* ── Featured: 12 Week Year Planner custom body ── */}
            {isFeatured12WeekLike ? <TwelveWeekPreview config={config} template={template} /> : null}

            {/* ── Reading List custom body ── */}
            {isReadingList ? <ReadingListPreview config={config} template={template} /> : null}

            {/* ── Student and Lesson Planner custom body ── */}
            {isStudentLessonPlanner ? <StudentLessonPlannerPreview config={config} template={template} /> : null}

            {/* ── Student: Monthly Planner custom body ── */}
            {isMonthlyPlanner ? <MonthlyPlannerPreview /> : null}

            {/* ── Student: My Class Schedule custom body ── */}
            {isMyClassSchedule ? <ClassSchedulePreview config={config} /> : null}

            {/* ── Startup OS: date filter + green line + blue/green dual bar ── */}
            {isStartupOS ? <StartupOSPreview config={config} template={template} /> : null}

            {/* ── Wedding Planning Hub ── */}
            {isWeddingPlanning ? <WeddingPlanningPreview config={config} template={template} /> : null}

            {/* ── Conference & Trip Agenda (same skeleton as Wedding, conference/trip theme) ── */}
            {isConferenceAgenda ? <ConferenceAgendaPreview config={config} template={template} /> : null}

            {/* ── UX Research Repository Lite ── */}
            {isUXResearchRepositoryLite ? <UXResearchRepositoryLitePreview template={template} /> : null}

            {/* ── Sales Activity Log (same skeleton as UX Research Lite: sales image + title + channel row) ── */}
            {isSalesActivityLog ? <SalesActivityLogPreview template={template} /> : null}

            {/* ── Replica: Travel Bucket Wish List custom body ── */}
            {isReplicaTravelWish || isStudyHabitTracker ? <TravelWishPreview config={config} template={template} /> : null}

            {/* ── Replica: Social Media Content Planner custom body ── */}
            {isReplicaSocialPlanner ? <SocialPlannerPreview config={config} template={template} /> : null}

            {/* ── Replica: TikTok & Instagram Content Planner custom body ── */}
            {isReplicaTikTokIG || isTravelJournalMemories || isBoardMeetingPack ? <TikTokIGPreview config={config} template={template} /> : null}

            {/* ── Replica: Investment & Portfolio Log custom body ── */}
            {isInvestmentPortfolioLog ? <InvestmentPortfolioPreview template={template} /> : null}

            {/* ── Generic skeletons (non-featured) ── */}
            {!isAnyFeatured && skeleton === 'dashboard' ? (
              <div className="space-y-2 h-full">
                <div className="grid grid-cols-3 gap-2">
                  {(config.kpis ?? [
                    { label: 'Today', value: '6 tasks' },
                    { label: 'Due', value: '2 items' },
                    { label: 'Focus', value: '84%' },
                  ]).map((kpi) => (
                    <div key={kpi.label} className="rounded-md border border-border/70 bg-foreground/5 p-2">
                      <div className="text-[8px] text-muted-foreground">{kpi.label}</div>
                      <div className="text-[10px] text-foreground font-semibold">{kpi.value}</div>
                    </div>
                  ))}
                </div>
                {!isWeddingBudgetExpenses ? (
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-md border border-border/70 bg-foreground/5 p-2">
                      <div className="text-[9px] text-muted-foreground mb-1">Quick links</div>
                      <div className="grid grid-cols-2 gap-1">
                        {['Tasks', 'Calendar', 'Notes', 'Projects'].map((s) => (
                          <div key={s} className="rounded bg-background/70 border border-border/60 px-1.5 py-1 text-[8px] text-foreground truncate">{s}</div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-md border border-border/70 bg-foreground/5 p-2">
                      <div className="text-[9px] text-muted-foreground mb-1">Today focus</div>
                      {notes.slice(0, 3).map((n, i) => (
                        <div key={i} className="text-[8px] text-foreground truncate mb-0.5">{n}</div>
                      ))}
                    </div>
                  </div>
                ) : null}
                <div className="rounded-md border border-border/70 overflow-hidden">
                  <div className="grid grid-cols-4 bg-foreground/5 border-b border-border/70">
                    {(config.tableHeaders ?? ['Item', 'Owner', 'Status', 'Date']).map((h) => (
                      <div key={h} className="px-2 py-1.5 text-[9px] font-medium text-muted-foreground truncate">{h}</div>
                    ))}
                  </div>
                  <div className="divide-y divide-border/60">
                    {(config.tableRows ?? []).slice(0, 3).map((row, i) => (
                      <div key={`${row.title}-${i}`} className="grid grid-cols-4 items-center">
                        <div className="px-2 py-1.5 text-[9px] text-foreground truncate">{row.title}</div>
                        <div className="px-2 py-1.5 text-[9px] text-muted-foreground truncate">{row.meta}</div>
                        <div className="px-2 py-1.5">
                          <span className={`inline-block px-1.5 py-0.5 text-[8px] rounded border ${statusToneClass(row.statusTone)}`}>{row.status}</span>
                        </div>
                        <div className="px-2 py-1.5 text-[9px] text-muted-foreground truncate">{['Mon', 'Tue', 'Wed'][i]}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

            {!isAnyFeatured && skeleton === 'database-first' ? (
              <div className={`space-y-2 h-full ${isContentCreatorKit ? 'text-slate-200' : ''}`}>
                <div className="flex gap-1.5">
                  {['Table', 'Board', 'Calendar', 'Timeline', 'List'].map((v) => (
                    <span key={v} className={`px-1.5 py-0.5 text-[8px] rounded border ${v === 'Table' ? (isContentCreatorKit ? 'bg-amber-500/25 border-amber-500/50 text-amber-100' : 'bg-primary/20 border-primary/40 text-primary-foreground') : 'bg-foreground/5 border-border/60 text-muted-foreground'}`}>
                      {v}
                    </span>
                  ))}
                </div>
                <div className="rounded-md border border-border/70 overflow-hidden">
                  <div className="grid grid-cols-4 bg-foreground/5 border-b border-border/70">
                    {(config.tableHeaders ?? ['Name', 'Owner', 'Status', 'Updated']).map((h) => (
                      <div key={h} className={`px-2 py-1.5 text-[9px] font-medium truncate ${isContentCreatorKit ? 'text-slate-400' : 'text-muted-foreground'}`}>{h}</div>
                    ))}
                  </div>
                  <div className="divide-y divide-border/60">
                    {(config.tableRows ?? []).slice(0, 5).map((row, i) => (
                      <div key={`${row.title}-${i}`} className="grid grid-cols-4 items-center">
                        <div className={`px-2 py-1.5 text-[9px] truncate ${isContentCreatorKit ? 'text-slate-200' : 'text-foreground'}`}>{row.title}</div>
                        <div className={`px-2 py-1.5 text-[9px] truncate ${isContentCreatorKit ? 'text-slate-400' : 'text-muted-foreground'}`}>{row.meta}</div>
                        <div className="px-2 py-1.5"><span className={`inline-block px-1.5 py-0.5 text-[8px] rounded border ${isContentCreatorKit ? 'bg-amber-500/20 text-amber-200 border-amber-500/40' : statusToneClass(row.statusTone)}`}>{row.status}</span></div>
                        <div className={`px-2 py-1.5 text-[9px] truncate ${isContentCreatorKit ? 'text-slate-400' : 'text-muted-foreground'}`}>{`D-${12 + i}`}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(config.boardColumns ?? []).slice(0, 3).map((col) => (
                    <div key={col.title} className={`rounded-md border p-2 ${isContentCreatorKit ? 'border-amber-500/30 bg-white/5' : 'border-border/70 bg-foreground/5'}`}>
                      <div className={`text-[9px] mb-1 flex items-center gap-1 ${isContentCreatorKit ? 'text-amber-200' : 'text-foreground'}`}>
                        {isContentCreatorKit ? <span className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: col.dotColor }} /> : null}
                        {col.title}
                      </div>
                      <div className="space-y-1">
                        {col.cards.slice(0, 2).map((c) => (
                          <div key={c} className={`rounded border px-1.5 py-1 text-[8px] truncate ${isContentCreatorKit ? 'bg-white/5 border-amber-500/20 text-slate-200' : 'bg-background/70 border-border/60 text-foreground'}`}>{c}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {!isAnyFeatured && skeleton === 'wiki-hub' ? (
              <div className="grid grid-cols-3 gap-2 h-full">
                <div className="rounded-md border border-border/70 bg-foreground/5 p-2">
                  <div className="text-[9px] text-muted-foreground mb-1">Directory</div>
                  {config.sidebarSections.slice(0, 5).map((section) => (
                    <div key={section} className="text-[8px] text-foreground truncate mb-1">• {section}</div>
                  ))}
                </div>
                <div className="col-span-2 space-y-2">
                  <div className="rounded-md border border-border/70 bg-foreground/5 p-2">
                    <div className="text-[9px] text-muted-foreground mb-1">Topic hubs</div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {['Product', 'Engineering', 'Marketing', 'Operations'].map((hub) => (
                        <div key={hub} className="rounded border border-border/60 bg-background/70 px-1.5 py-1 text-[8px] text-foreground truncate">{hub} hub</div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-md border border-border/70 bg-foreground/5 p-2">
                    <div className="text-[9px] text-muted-foreground mb-1">Recent docs</div>
                    {notes.slice(0, 3).map((n, i) => (
                      <div key={i} className="text-[8px] text-foreground truncate mb-0.5">{n}</div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

            {!isAnyFeatured && skeleton === 'workflow' ? (
              <div className="space-y-2 h-full">
                <div className="flex items-center gap-1.5">
                  {['Intake', 'Validate', 'Execute', 'QA', 'Archive'].map((s, i) => (
                    <div key={s} className="flex items-center gap-1">
                      <span className={`px-1.5 py-0.5 text-[8px] rounded border ${i === 2 ? 'bg-primary/20 border-primary/40 text-primary-foreground' : 'bg-foreground/5 border-border/60 text-muted-foreground'}`}>
                        {s}
                      </span>
                      {i < 4 ? <span className="text-[8px] text-muted-foreground">→</span> : null}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {['Todo', 'In Progress', 'Archive'].map((c, i) => (
                    <div key={c} className="rounded-md border border-border/70 bg-foreground/5 p-2">
                      <div className="text-[9px] text-foreground mb-1">{c}</div>
                      {notes.slice(i, i + 2).map((n, idx) => (
                        <div key={idx} className="rounded border border-border/60 bg-background/70 px-1.5 py-1 text-[8px] text-foreground truncate mb-1">
                          {n}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="rounded-md border border-border/70 bg-foreground/5 p-2 text-[8px] text-muted-foreground">
                  SOP templates attached by stage • auto views by status
                </div>
              </div>
            ) : null}

            {!isAnyFeatured && skeleton === 'rhythm' ? (
              <div className="space-y-2 h-full">
                <div className="grid grid-cols-5 gap-1.5">
                  {['Year', 'Quarter', 'Month', 'Week', 'Day'].map((p, i) => (
                    <div key={p} className={`rounded border px-1.5 py-1 text-[8px] ${i === 2 ? 'bg-primary/20 border-primary/40 text-primary-foreground' : 'bg-foreground/5 border-border/60 text-muted-foreground'}`}>
                      {p}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-md border border-border/70 bg-foreground/5 p-2">
                    <div className="text-[9px] text-muted-foreground mb-1">Cycle plan</div>
                    {notes.slice(0, 4).map((n, i) => (
                      <div key={i} className="flex items-center gap-1.5 mb-1">
                        <span className="h-2.5 w-2.5 rounded border border-border/70 bg-background/80" />
                        <span className="text-[8px] text-foreground truncate">{n}</span>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-md border border-border/70 bg-foreground/5 p-2">
                    <div className="text-[9px] text-muted-foreground mb-1">Rhythm chart</div>
                    <div className="flex items-end gap-1 h-14">
                      {[24, 48, 30, 66, 54, 74].map((h, i) => (
                        <span key={i} className="flex-1 rounded-t-sm bg-primary/40" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Student: Semester Planner & GPA Tracker — pie chart with rich colors */}
            {!isAnyFeatured && skeleton === 'student-semester-gpa' ? (
              <SemesterGpaPreview config={config} />
            ) : null}

            {/* Startup Operating System — date filter + green line + dual bar */}
            {!isAnyFeatured && skeleton === 'startup-os' ? (
              <StartupOSPreview config={config} template={template} />
            ) : null}

            {/* Finance OS — KPIs + trend line + document table (Tax Prep, etc.) */}
            {!isAnyFeatured && skeleton === 'finance-os' ? (
              <FinanceOSPreview config={config} template={template} />
            ) : null}

            {/* Note-Taking Methods Library — filter + line chart */}
            {!isAnyFeatured && skeleton === 'note-taking-methods' ? (
              <NoteTakingMethodsPreview config={config} />
            ) : null}

            {!isAnyFeatured && skeleton === 'doc-report' ? (
              template.title.toLowerCase().includes('meeting notes') && template.title.toLowerCase().includes('agendas') ? (
                <div className="space-y-2 h-full">
                  <div className="rounded-md border border-border/70 bg-foreground/5 p-2">
                    <div className="h-8 rounded bg-sky-200/80 border border-sky-300/50" />
                    <div className="text-[10px] text-foreground font-medium mt-1">Executive Summary</div>
                  </div>
                  <div className="rounded-md border border-border/70 bg-foreground/5 p-2">
                    <div className="text-[9px] text-muted-foreground mb-1">Agenda</div>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <div key={n} className="flex items-center gap-2 mb-1">
                        <span className="text-[9px] font-medium text-muted-foreground w-3">{n}.</span>
                        <span className="h-1.5 flex-1 rounded-full bg-foreground/10 max-w-[85%]" />
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-md border border-border/70 bg-foreground/5 p-2 text-[8px] text-muted-foreground">
                      "Key insight quote / callout block"
                    </div>
                    <div className="rounded-md border border-border/70 bg-foreground/5 p-2">
                      <div className="h-8 rounded bg-primary/15 border border-primary/20" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 h-full">
                  <div className="rounded-md border border-border/70 bg-foreground/5 p-2">
                    {isGtdInspiredTaskSystem || isTerritoryAccountAssignment || isCapstoneProjectShowcase ? (
                      <div className="h-8 rounded overflow-hidden border border-primary/20">
                        <img
                          src={
                            isTerritoryAccountAssignment
                              ? TERRITORY_ACCOUNT_HERO_IMAGE
                              : isCapstoneProjectShowcase
                                ? CAPSTONE_SHOWCASE_HERO_IMAGE
                                : GTD_TASK_SYSTEM_HERO_IMAGE
                          }
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-8 rounded bg-gradient-to-r from-primary/20 to-transparent border border-primary/20" />
                    )}
                    <div className="text-[10px] text-foreground font-medium mt-1">Executive Summary</div>
                  </div>
                  <div className="rounded-md border border-border/70 bg-foreground/5 p-2">
                    <div className="text-[9px] text-muted-foreground mb-1">H1 / H2 Sections</div>
                    <div className="h-1.5 w-1/3 rounded-full bg-foreground/15 mb-1.5" />
                    <div className="h-1.5 w-full rounded-full bg-foreground/10 mb-1" />
                    <div className="h-1.5 w-5/6 rounded-full bg-foreground/10 mb-1" />
                    <div className="h-1.5 w-4/6 rounded-full bg-foreground/10" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {isCapstoneProjectShowcase ? (
                      <>
                        <div className="rounded-md border border-border/70 bg-foreground/5 p-2">
                          <div className="h-8 rounded border bg-slate-400/20 border-slate-300/35" />
                        </div>
                        <div className="rounded-md border border-border/70 bg-foreground/5 p-2 text-[8px] text-muted-foreground">
                          "Key insight quote / callout block"
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="rounded-md border border-border/70 bg-foreground/5 p-2 text-[8px] text-muted-foreground">
                          "Key insight quote / callout block"
                        </div>
                        <div className="rounded-md border border-border/70 bg-foreground/5 p-2">
                          <div
                            className={`h-8 rounded border ${isTerritoryAccountAssignment ? 'bg-amber-400/25 border-amber-300/45' : 'bg-primary/15 border-primary/20'}`}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )
            ) : null}

            {/* Productivity charts skeleton: pie / line / bar + theme + typography variety */}
            {!isAnyFeatured && skeleton === 'productivity-charts' ? (
              <ProductivityChartsPreview config={config} />
            ) : null}
          </main>
        </div>
      </div>
    </div>
  );
}
