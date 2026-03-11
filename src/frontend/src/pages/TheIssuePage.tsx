import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const barriers = [
  {
    icon: "💰",
    title: "Cost",
    color: "bg-red-50 border-red-200",
    badge: "Most Common",
    badgeColor: "bg-primary text-white",
    desc: "Club dues, uniforms, equipment, registration fees, and camp tuition can easily cost hundreds to thousands of dollars per year. For families below the poverty line, this is simply not possible.",
    stat: "Average cost of youth sports participation: $693/year",
  },
  {
    icon: "🚌",
    title: "Transportation",
    color: "bg-orange-50 border-orange-200",
    badge: "Critical in Rural Areas",
    badgeColor: "bg-orange-500 text-white",
    desc: "Without a car or public transit, students in suburban and rural areas often cannot get to after-school programs. Even urban students face challenges when programs are across town.",
    stat: "Rural students are 2.5x less likely to have access to after-school programs",
  },
  {
    icon: "⏰",
    title: "Time Conflicts",
    color: "bg-amber-50 border-amber-200",
    badge: "Scheduling Crisis",
    badgeColor: "bg-amber-500 text-white",
    desc: "Schools typically have only 1–2 activity periods per day. Popular clubs like debate, robotics, choir, drama, and sports all compete for the same narrow after-school windows — forcing students who love multiple subjects to pick just one. A student who wants to be in both Science Club and Drama Club may literally be unable to join both, not because of lack of interest, but because both meet Tuesday at 3pm. With 15–30 clubs but only 3–5 non-overlapping time slots, the math simply doesn't work. Low-income schools with fewer faculty have even fewer available slots.",
    stat: "Over 70% of students report having to skip or drop a club due to scheduling conflicts with another activity",
    details: [
      "Average school offers 20+ clubs but only 2–3 distinct after-school time slots",
      "45% of club members have dropped a club because it conflicted with another activity they valued equally",
      "Students with multiple interests are forced to choose one passion — directly disadvantaging well-rounded applicants",
      "Low-income schools have 40% fewer available activity time slots than wealthy schools due to limited supervising staff",
    ],
    conflictStats: [
      {
        label: "Clubs per average school",
        value: "20–30",
        note: "competing for same slots",
      },
      { label: "Non-overlapping slots", value: "2–3", note: "per school day" },
      {
        label: "Students who had to drop a club",
        value: "45%",
        note: "due to time conflicts",
      },
      {
        label: "Slot reduction in low-income schools",
        value: "–40%",
        note: "vs. wealthy schools",
      },
    ],
  },
  {
    icon: "🏆",
    title: "Selective Processes",
    color: "bg-blue-50 border-blue-200",
    badge: "Systemic Bias",
    badgeColor: "bg-blue-500 text-white",
    desc: "Tryouts, auditions, and competitive applications favor students who have already had private coaching, lessons, or training. This creates a cycle where resources beget more resources.",
    stat: "Students from high-income families are 2x more likely to have had prior training",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Family Obligations",
    color: "bg-purple-50 border-purple-200",
    badge: "Often Overlooked",
    badgeColor: "bg-purple-500 text-white",
    desc: "Cultural expectations, caregiving duties, language barriers in communications, and lack of parental awareness about programs all limit participation, especially for first-generation immigrant families.",
    stat: "40% of immigrant families report not knowing about available after-school programs",
  },
  {
    icon: "♿",
    title: "Disability & Accessibility",
    color: "bg-teal-50 border-teal-200",
    badge: "Legal Right Denied",
    badgeColor: "bg-teal-500 text-white",
    desc: "Many school clubs and programs lack accommodations for students with physical, cognitive, or sensory disabilities. Despite legal protections, accessibility remains a major barrier.",
    stat: "Only 38% of schools report having fully accessible extracurricular programs",
  },
  {
    icon: "🌍",
    title: "Language & Cultural Barriers",
    color: "bg-green-50 border-green-200",
    badge: "Invisible Barrier",
    badgeColor: "bg-green-600 text-white",
    desc: "Program announcements, permission slips, and communications often only exist in English. Cultural mismatch in activities can also make students feel unwelcome or like they don't belong.",
    stat: "5 million+ K-12 students are English Language Learners",
  },
  {
    icon: "📢",
    title: "Lack of Information",
    color: "bg-slate-50 border-slate-200",
    badge: "Awareness Gap",
    badgeColor: "bg-slate-500 text-white",
    desc: "Low-income students are far less likely to hear about scholarships, free programs, or subsidized activities. Information is shared through informal networks that favor already-connected families.",
    stat: "60% of eligible students don't apply for program scholarships due to lack of awareness",
  },
];

const consequences = [
  {
    icon: "📋",
    title: "Weaker College Applications",
    desc: "Extracurriculars are a major factor in college admissions. Students without them — not by choice but by circumstance — face an immediate disadvantage compared to peers with full activity portfolios.",
    severity: "High Impact",
  },
  {
    icon: "💼",
    title: "Career Disadvantage",
    desc: "Leadership roles in clubs, volunteer experience, and skill-building in programs are key resume builders. Missing these opportunities creates long-term career gaps that compound over decades.",
    severity: "High Impact",
  },
  {
    icon: "📈",
    title: "Widening Wealth Gap",
    desc: "The cycle is self-reinforcing: wealthy students gain more resources, better colleges, better jobs, and more wealth. Students without access fall further behind with each generation.",
    severity: "Systemic",
  },
  {
    icon: "🧠",
    title: "Mental Health & Wellbeing",
    desc: "After-school programs provide safe spaces, mentorship, and community. Without them, students — especially in under-resourced communities — face higher rates of depression, anxiety, and loneliness.",
    severity: "Critical",
  },
  {
    icon: "🤝",
    title: "Reduced Social Capital",
    desc: "Networking, collaboration, leadership, and communication skills are built through group activities. Students who miss out enter adulthood with fewer of these critical social skills and connections.",
    severity: "Long-Term",
  },
  {
    icon: "🎓",
    title: "Lower College Attendance",
    desc: "Research shows extracurricular participation increases college attendance rates for at-risk youth by 400%. Missing out dramatically changes a student's educational trajectory.",
    severity: "Proven",
  },
];

const rootCauses = [
  {
    icon: "🏛️",
    title: "Underfunding of Public Education",
    color: "border-red-400/40",
    iconBg: "bg-red-500/20",
    desc: "In the U.S., school funding is largely tied to local property taxes — meaning schools in wealthy zip codes receive dramatically more money per student. The national average spending is ~$13,000/student/year, but individual schools range from under $7,000 to over $25,000. That $18,000 gap translates directly into more clubs, more advisors, more equipment, and more time slots for richer schools.",
    pullStat:
      "Wealthiest school districts spend 2–3× more per student than the poorest",
  },
  {
    icon: "💸",
    title: "The Volunteer & Donation Club Model",
    color: "border-orange-400/40",
    iconBg: "bg-orange-500/20",
    desc: "Most school clubs are funded almost entirely through parent donations, booster clubs, or volunteer teacher time — not school budgets. Wealthy PTAs can raise hundreds of thousands of dollars for their schools' programs. Low-income PTAs may raise nearly nothing. This means the quality, variety, and capacity of a school's clubs directly mirrors the wealth of its parent community.",
    pullStat:
      "High-income school PTAs raise on average 10× more per pupil than low-income PTAs",
  },
  {
    icon: "📜",
    title: "No Federal Mandate for Equitable Access",
    color: "border-blue-400/40",
    iconBg: "bg-blue-500/20",
    desc: "Unlike core academics, there is no federal law requiring schools to provide equitable extracurricular access. Title IX protects against gender discrimination in school programs, but there is no equivalent mandate for socioeconomic, geographic, or linguistic equity. This means schools face no legal consequence for having zero clubs, zero after-school programming, or wildly unequal access.",
    pullStat:
      "34 states have no minimum requirement for extracurricular program offerings",
  },
  {
    icon: "📅",
    title: "Schedules Built for the Majority",
    color: "border-amber-400/40",
    iconBg: "bg-amber-500/20",
    desc: "School schedules are typically designed around the needs of the median student — a student with at least one available parent, no caregiving duties, and access to transportation. Students who work after school, care for siblings, rely on the school bus (which leaves at 3:05pm), or have language barriers are effectively excluded by design, not by policy. The structural assumption of availability erases entire populations.",
    pullStat:
      "1 in 4 high schoolers regularly misses after-school activities due to work or caregiving",
  },
  {
    icon: "🕸️",
    title: "Social Capital Networks & Information Gaps",
    color: "border-purple-400/40",
    iconBg: "bg-purple-500/20",
    desc: "Information about enrichment programs — scholarships, free camps, elite club openings — flows primarily through informal parent networks, not official school announcements. Well-connected families in affluent areas hear about opportunities first, apply first, and fill spots first. First-generation families, non-English-speaking households, and socially isolated families are structurally left out of these invisible pipelines — not because programs don't exist, but because they never heard about them.",
    pullStat:
      "60% of scholarship-eligible students don't apply because they never learned the program existed",
  },
];

// Typical school schedule showing conflicts
const scheduleSlots = [
  {
    day: "Monday",
    time: "3:00–5:00 PM",
    clubs: ["🎭 Drama Club", "🤖 Robotics Team", "🖌️ Art Club", "📰 Yearbook"],
    conflict: true,
  },
  {
    day: "Tuesday",
    time: "3:00–5:00 PM",
    clubs: ["🗣️ Debate Team", "🔬 Science Club", "🎵 Choir", "♟️ Chess Club"],
    conflict: true,
  },
  {
    day: "Wednesday",
    time: "3:00–4:30 PM",
    clubs: ["⚽ Soccer Practice", "🏀 Basketball", "🌿 Environmental Club"],
    conflict: true,
  },
  {
    day: "Thursday",
    time: "3:00–5:00 PM",
    clubs: [
      "💻 Coding Club",
      "🎸 Music Ensemble",
      "📚 Book Club",
      "🌐 Model UN",
    ],
    conflict: true,
  },
  {
    day: "Friday",
    time: "No slots",
    clubs: [],
    conflict: false,
    none: true,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function StatCallout({ text }: { text: string }) {
  return (
    <div className="my-6 border-l-4 border-primary pl-4 py-3 bg-primary/5 rounded-r-lg">
      <p className="text-primary font-semibold text-sm italic">"{text}"</p>
    </div>
  );
}

function TimeConflictExpansion({
  details,
  conflictStats,
}: {
  details: string[];
  conflictStats: { label: string; value: string; note: string }[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      className="mt-4 space-y-4"
    >
      <div className="grid grid-cols-2 gap-2">
        {conflictStats.map((s) => (
          <div
            key={s.label}
            className="bg-white/80 border border-amber-200 rounded-lg p-3 text-center"
          >
            <div className="font-display text-2xl font-black text-amber-600">
              {s.value}
            </div>
            <div className="text-xs font-semibold text-foreground/70 leading-tight mt-0.5">
              {s.label}
            </div>
            <div className="text-xs text-muted-foreground italic">{s.note}</div>
          </div>
        ))}
      </div>
      <ul className="space-y-2">
        {details.map((d) => (
          <li
            key={d.slice(0, 20)}
            className="flex gap-2 text-sm text-foreground/80"
          >
            <span className="text-amber-500 font-bold shrink-0 mt-0.5">▸</span>
            <span>{d}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function TheIssuePage() {
  const [scheduleExpanded, setScheduleExpanded] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <Badge className="bg-primary/10 text-primary border-primary/20 mb-4 text-sm px-4 py-1">
          Understanding the Problem
        </Badge>
        <h1 className="font-display text-5xl font-black text-foreground mb-4">
          The Opportunity Gap
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Millions of students are systematically excluded from the learning
          opportunities that shape their futures. Here's a deep dive into why —
          and what it costs them.
        </p>
      </motion.div>

      <Tabs defaultValue="clubs" className="space-y-8">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto gap-1 bg-secondary p-1 rounded-xl">
          <TabsTrigger
            value="clubs"
            data-ocid="issue.clubs.tab"
            className="rounded-lg py-2.5 font-medium data-[state=active]:bg-white data-[state=active]:shadow-xs"
          >
            🏫 School Clubs
          </TabsTrigger>
          <TabsTrigger
            value="camps"
            data-ocid="issue.camps.tab"
            className="rounded-lg py-2.5 font-medium data-[state=active]:bg-white data-[state=active]:shadow-xs"
          >
            ⛺ Camps & Programs
          </TabsTrigger>
          <TabsTrigger
            value="barriers"
            data-ocid="issue.barriers.tab"
            className="rounded-lg py-2.5 font-medium data-[state=active]:bg-white data-[state=active]:shadow-xs"
          >
            🚧 Key Barriers
          </TabsTrigger>
          <TabsTrigger
            value="consequences"
            data-ocid="issue.consequences.tab"
            className="rounded-lg py-2.5 font-medium data-[state=active]:bg-white data-[state=active]:shadow-xs"
          >
            ⚠️ Consequences
          </TabsTrigger>
        </TabsList>

        {/* School Clubs Tab */}
        <TabsContent value="clubs">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="font-display text-3xl font-bold mb-4">
                  What Are School Clubs?
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  School clubs are student-led or faculty-led groups that meet
                  regularly to pursue shared interests — debate teams, science
                  clubs, STEM programs, cultural clubs, arts organizations,
                  community service groups, and more.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  They are one of the primary vehicles for developing
                  leadership, collaboration, creativity, and civic engagement in
                  young people. Colleges heavily weight these activities in
                  admissions decisions.
                </p>
                <StatCallout text="Students who participate in school clubs are 3x more likely to attend college and report higher rates of life satisfaction." />
                <p className="text-muted-foreground leading-relaxed">
                  Most school clubs are run by nonprofits or volunteer teachers
                  on shoestring budgets. They're understaffed, underfunded, and
                  often the first thing cut when school budgets get tight — even
                  though they may be the most transformative resource a school
                  offers.
                </p>
              </div>
              <div>
                <h2 className="font-display text-3xl font-bold mb-4">
                  How Access Is Unequal
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      stat: "Only 1 in 5",
                      desc: "students in low-income areas participates in a school club",
                    },
                    {
                      stat: "3x higher",
                      desc: "club participation rate in high-income vs. low-income schools",
                    },
                    {
                      stat: "$200–$800",
                      desc: "typical annual cost of participating in a competitive club",
                    },
                    {
                      stat: "60%",
                      desc: "of club advisors report their program is chronically underfunded",
                    },
                  ].map((item) => (
                    <Card
                      key={item.stat}
                      className="border-l-4 border-primary border-t-0 border-r-0 border-b-0 rounded-l-none"
                    >
                      <CardContent className="p-4">
                        <span className="font-display text-2xl font-black text-primary">
                          {item.stat}
                        </span>
                        <span className="text-muted-foreground ml-2">
                          {item.desc}
                        </span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Deep Dive: Scheduling Crisis */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-12"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📅</span>
                  <h2 className="font-display text-2xl font-bold">
                    Deep Dive: The Scheduling Crisis
                  </h2>
                </div>
                <button
                  type="button"
                  data-ocid="issue.clubs.toggle"
                  onClick={() => setScheduleExpanded((p) => !p)}
                  className="text-sm text-primary font-semibold flex items-center gap-1 hover:underline focus:outline-none"
                >
                  {scheduleExpanded ? "Hide" : "Show"} details
                  <span
                    className="transition-transform"
                    style={{
                      display: "inline-block",
                      transform: scheduleExpanded
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                  >
                    ▾
                  </span>
                </button>
              </div>
              <p className="text-muted-foreground text-sm mb-6">
                Even if a student can afford a club and get there — they still
                might not be able to attend due to scheduling conflicts.
              </p>

              <AnimatePresence>
                {scheduleExpanded && (
                  <motion.div
                    key="schedule-detail"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35 }}
                    className="overflow-hidden"
                  >
                    <div className="mb-6 p-5 bg-amber-50 border border-amber-200 rounded-xl">
                      <p className="text-sm text-amber-900 leading-relaxed">
                        <strong>The core problem:</strong> Most schools are run
                        by a limited number of faculty and staff. After-school
                        supervision requires a teacher present — and teachers
                        can only supervise one room at one time. As a result,
                        underfunded schools with fewer staff can only keep a
                        handful of rooms open after the bell rings. Dozens of
                        clubs get crammed into 2–3 time slots, making conflicts
                        mathematically inevitable.
                      </p>
                      <p className="text-sm text-amber-900 mt-3 leading-relaxed">
                        Wealthy schools with more staff, more rooms, and more
                        resources can spread clubs across different days and
                        times — giving students real choice. In low-income
                        schools, a student who wants to do Robotics <em>and</em>{" "}
                        Choir is simply out of luck.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Always-visible schedule grid */}
              <div className="rounded-xl border border-border overflow-hidden">
                <div className="bg-foreground text-background px-4 py-3">
                  <p className="text-sm font-bold">
                    📋 Typical Low-Income School: Weekly Club Schedule
                  </p>
                  <p className="text-xs opacity-70 mt-0.5">
                    All clubs fighting for the same after-school windows
                  </p>
                </div>
                <div className="divide-y divide-border">
                  {scheduleSlots.map((slot, i) => (
                    <motion.div
                      key={slot.day}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.06 }}
                      className={`flex flex-col sm:flex-row sm:items-center gap-3 px-4 py-4 ${
                        slot.none
                          ? "bg-slate-50"
                          : slot.conflict
                            ? "bg-white"
                            : "bg-white"
                      }`}
                    >
                      <div className="sm:w-40 shrink-0">
                        <div className="font-bold text-sm">{slot.day}</div>
                        <div
                          className={`text-xs font-mono mt-0.5 ${slot.none ? "text-muted-foreground" : "text-amber-600 font-semibold"}`}
                        >
                          {slot.time}
                        </div>
                      </div>
                      {slot.none ? (
                        <div className="text-sm text-muted-foreground italic">
                          No after-school activity period available
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {slot.clubs.map((club) => (
                            <span
                              key={club}
                              className="text-xs bg-amber-100 border border-amber-300 text-amber-800 font-medium px-2.5 py-1 rounded-full"
                            >
                              {club}
                            </span>
                          ))}
                          <span className="text-xs bg-red-100 border border-red-300 text-red-700 font-bold px-2.5 py-1 rounded-full">
                            ⚠️ All at same time!
                          </span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
                <div className="bg-red-50 border-t border-red-200 px-4 py-3">
                  <p className="text-xs text-red-700 font-semibold">
                    ⬆️ In this example, a student cannot attend Debate Team AND
                    Science Club, OR Choir AND Robotics — even if they love and
                    excel at both. They are forced to abandon one passion
                    entirely.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </TabsContent>

        {/* Camps Tab */}
        <TabsContent value="camps">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="font-display text-3xl font-bold mb-4">
                  Camps & Extracurriculars
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Summer camps, sports leagues, tutoring centers, music schools,
                  theater programs, coding bootcamps — these out-of-school
                  programs are enormously valuable for developing skills,
                  exploring passions, and building a college-ready profile.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  But they come at a steep price. A single week at a quality
                  summer camp can cost $800–$2,000. Year-round sports leagues
                  can run $1,500–$5,000 including equipment. Music or arts
                  lessons average $60–$120 per session.
                </p>
                <StatCallout text="Children from families earning over $100k spend 6x more time in enrichment activities than children from families earning under $25k." />
              </div>
              <div>
                <h2 className="font-display text-3xl font-bold mb-4">
                  Geographic & Structural Barriers
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Even when cost is addressed, geography, selectivity, and
                  systemic design create additional walls. Here's what students
                  face:
                </p>
                <div className="space-y-3">
                  {[
                    {
                      icon: "📍",
                      title: "Geographic Deserts",
                      desc: "Many rural and suburban low-income areas have virtually no local programs. The nearest option may be hours away.",
                    },
                    {
                      icon: "🎯",
                      title: "Competitive Selection",
                      desc: "Prestigious camps and STEM programs use selective applications that favor already-advantaged students.",
                    },
                    {
                      icon: "📅",
                      title: "Schedule Conflicts",
                      desc: "Programs assume consistent schedules — ignoring realities of shift-work families and caregiving obligations.",
                    },
                    {
                      icon: "📋",
                      title: "Application Complexity",
                      desc: "Financial aid applications for programs are often lengthy, English-only, and require documentation hard to obtain.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex gap-3 p-3 rounded-lg bg-secondary"
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <div className="font-semibold text-sm">
                          {item.title}
                        </div>
                        <div className="text-muted-foreground text-sm">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </TabsContent>

        {/* Barriers Tab */}
        <TabsContent value="barriers">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <h2 className="font-display text-3xl font-bold mb-2">
              The 8 Key Barriers
            </h2>
            <p className="text-muted-foreground mb-8">
              These aren't excuses — they're documented, systemic obstacles that
              prevent millions of students from reaching their potential.
            </p>
            <div className="grid sm:grid-cols-2 xl:grid-cols-2 gap-6">
              {barriers.map((barrier) => (
                <motion.div key={barrier.title} variants={itemVariants}>
                  <Card
                    className={`h-full border-2 ${barrier.color} hover:shadow-card transition-shadow`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-3xl">{barrier.icon}</span>
                        <span
                          className={`text-xs font-bold px-2 py-1 rounded-full ${barrier.badgeColor}`}
                        >
                          {barrier.badge}
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-bold mb-2">
                        {barrier.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {barrier.desc}
                      </p>
                      <div className="bg-white/70 rounded-lg p-3 text-xs font-semibold text-foreground/80 border border-current/20">
                        📊 {barrier.stat}
                      </div>

                      {/* Expanded detail panel for Time Conflicts */}
                      {barrier.title === "Time Conflicts" &&
                        barrier.details &&
                        barrier.conflictStats && (
                          <TimeConflictExpansion
                            details={barrier.details}
                            conflictStats={barrier.conflictStats}
                          />
                        )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </TabsContent>

        {/* Consequences Tab */}
        <TabsContent value="consequences">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <h2 className="font-display text-3xl font-bold mb-2">
              Real Consequences
            </h2>
            <p className="text-muted-foreground mb-8">
              Missing out on extracurricular opportunities isn't just
              disappointing — it has measurable, lasting impacts on a student's
              entire life trajectory.
            </p>

            <div className="mb-8 p-6 bg-primary text-primary-foreground rounded-2xl">
              <div className="grid sm:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="font-display text-4xl font-black">400%</div>
                  <div className="text-primary-foreground/80 text-sm mt-1">
                    increase in college attendance for at-risk youth who
                    participate in extracurriculars
                  </div>
                </div>
                <div>
                  <div className="font-display text-4xl font-black">$12</div>
                  <div className="text-primary-foreground/80 text-sm mt-1">
                    returned to the community for every $1 invested in youth
                    programs
                  </div>
                </div>
                <div>
                  <div className="font-display text-4xl font-black">14M+</div>
                  <div className="text-primary-foreground/80 text-sm mt-1">
                    students currently lack access to after-school programs in
                    the U.S.
                  </div>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {consequences.map((item) => (
                <motion.div key={item.title} variants={itemVariants}>
                  <Card className="h-full hover:shadow-card transition-shadow">
                    <CardContent className="p-6">
                      <div className="text-3xl mb-3">{item.icon}</div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-display text-lg font-bold">
                          {item.title}
                        </h3>
                        <span className="text-xs bg-primary/10 text-primary font-semibold px-2 py-0.5 rounded-full">
                          {item.severity}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>

      {/* Root Causes Section */}
      <motion.section
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mt-20"
        data-ocid="issue.root_causes.section"
      >
        <div className="rounded-3xl bg-foreground text-background overflow-hidden">
          <div className="px-6 md:px-12 py-10 border-b border-white/10">
            <Badge className="bg-white/10 text-white border-white/20 mb-4 text-sm px-4 py-1">
              Going Deeper
            </Badge>
            <h2 className="font-display text-4xl font-black mb-3">
              Root Causes
            </h2>
            <p className="text-white/70 text-lg max-w-2xl">
              The barriers students face aren't accidents. They're the result of
              systemic structures that have been built — and ignored — for
              decades. Understanding the root causes is the first step to
              dismantling them.
            </p>
          </div>

          <div className="px-6 md:px-12 py-10">
            <div className="grid md:grid-cols-2 gap-6">
              {rootCauses.map((cause, i) => (
                <motion.div
                  key={cause.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  data-ocid={`issue.root_causes.item.${i + 1}`}
                  className={`rounded-2xl border ${cause.color} bg-white/5 p-6 hover:bg-white/10 transition-colors`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`${cause.iconBg} rounded-xl p-3 text-2xl shrink-0`}
                    >
                      {cause.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-lg font-bold text-white mb-2">
                        {cause.title}
                      </h3>
                      <p className="text-white/65 text-sm leading-relaxed mb-4">
                        {cause.desc}
                      </p>
                      <div className="bg-white/10 border border-white/15 rounded-lg px-4 py-2.5">
                        <p className="text-white/90 text-xs font-semibold italic">
                          📊 {cause.pullStat}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Call to action within root causes */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 text-center p-8 rounded-2xl bg-primary/20 border border-primary/30"
            >
              <div className="text-4xl mb-3">💡</div>
              <h3 className="font-display text-2xl font-bold text-white mb-2">
                These Causes Have Solutions
              </h3>
              <p className="text-white/70 max-w-xl mx-auto text-sm leading-relaxed">
                None of these root causes are inevitable or permanent. Policy
                changes, equitable funding formulas, flexible scheduling
                mandates, and community-led advocacy have already reversed these
                trends in dozens of school districts. Learn how you can help.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
