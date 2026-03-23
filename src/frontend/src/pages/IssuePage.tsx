const barriers = [
  {
    title: "Cost",
    emoji: "💸",
    stats: [
      "Tutoring costs $30–$85/hour on average",
      "74% of low-income students cannot afford extracurricular activities",
      "Private coaching for auditions can cost thousands annually",
    ],
    desc: "Financial barriers create a widening achievement gap. Families who can't afford tutoring, enrichment programs, or activity fees are systematically excluded from opportunities that can shape a student's future.",
  },
  {
    title: "Transportation",
    emoji: "🚌",
    stats: [
      "1 in 5 rural students miss opportunities due to distance",
      "Many programs only exist in urban/suburban areas",
      "Lack of public transit cuts access for low-income families",
    ],
    desc: "Programs placed far from students without reliable transportation effectively exclude entire communities. Even free programs are inaccessible when there's no way to get there.",
  },
  {
    title: "Time & Schedule Conflicts",
    emoji: "⏰",
    stats: [
      "Nearly 30% of high schoolers work part-time jobs",
      "Many students serve as primary caregivers for siblings or parents",
      "After-school windows conflict with family responsibilities",
    ],
    desc: "Students juggling jobs, family caregiving, and school have little flexibility. Programs that assume all students are free after 3pm exclude those with real-world responsibilities.",
  },
  {
    title: "Selectivity",
    emoji: "🎭",
    stats: [
      "Elite programs use auditions or tryouts as gatekeepers",
      "Students who can't afford prep coaching are eliminated early",
      "Only top performers advance, leaving most students behind",
    ],
    desc: "Competitive entry processes favor students with private coaching and practice time. This rewards privilege, not potential, locking out talented students from underserved backgrounds.",
  },
  {
    title: "Awareness",
    emoji: "📢",
    stats: [
      "60% of families are unaware of programs available to them",
      "Information is often only shared through school networks",
      "Non-English-speaking families receive less outreach",
    ],
    desc: "Many families don't know what resources exist. Schools and programs often rely on word-of-mouth or English-only communications, leaving out those who need support most.",
  },
  {
    title: "Disability & Accessibility",
    emoji: "♿",
    stats: [
      "Many extracurricular programs lack disability accommodations",
      "Physical barriers exclude students with mobility challenges",
      "Learning differences are rarely addressed in enrichment programs",
    ],
    desc: "Students with disabilities are often unable to participate in programs that lack proper accommodations. Inaccessible facilities and a lack of adaptive programming exclude millions of students.",
  },
  {
    title: "Language Barriers",
    emoji: "🌐",
    stats: [
      "5+ million students are English Language Learners",
      "Program materials and signups are rarely available in multiple languages",
      "Parent engagement is lower when communications are English-only",
    ],
    desc: "Families who speak languages other than English are frequently excluded from program information and enrollment processes, cutting off their children from valuable opportunities.",
  },
  {
    title: "Technology Access",
    emoji: "💻",
    stats: [
      "1 in 5 students lack home internet access",
      "Many students share devices or have none at all",
      "Digital learning programs assume access that millions don't have",
    ],
    desc: "As education and enrichment shift online, students without devices or reliable internet fall further behind. The digital divide directly translates to an opportunity divide.",
  },
];

export default function IssuePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          The Issue
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Eight systemic barriers prevent millions of students from accessing
          learning opportunities that shape their academic profiles, job
          prospects, and futures.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {barriers.map((b) => (
          <div
            key={b.title}
            className="bg-white border border-gray-100 rounded-xl p-6 shadow-card"
          >
            <div className="flex items-start gap-3 mb-3">
              <span className="text-3xl">{b.emoji}</span>
              <h2 className="font-display text-xl font-bold text-gray-800 mt-1">
                {b.title}
              </h2>
            </div>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              {b.desc}
            </p>
            <ul className="space-y-2">
              {b.stats.map((s) => (
                <li key={s} className="flex items-start gap-2">
                  <span className="mt-1 w-2 h-2 rounded-full bg-brand-red flex-shrink-0" />
                  <span className="text-sm text-gray-700">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-red-50 border border-red-100 rounded-xl p-8 text-center">
        <h2 className="font-display text-2xl font-bold text-brand-red mb-3">
          These barriers have real consequences
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Students who miss out on extracurricular, enrichment, and supplemental
          learning programs face reduced college acceptance rates, weaker job
          prospects, and wider academic achievement gaps. Equal access isn't
          just fair — it's essential.
        </p>
      </div>
    </div>
  );
}
