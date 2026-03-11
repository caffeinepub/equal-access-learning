import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";

const actionCards = [
  {
    icon: "🤲",
    title: "Volunteer at a Club or Program",
    color: "bg-red-50 border-red-200",
    badgeColor: "bg-primary text-white",
    badge: "Direct Impact",
    desc: "Many school clubs and nonprofit programs are chronically understaffed. Your time — even a few hours a week — makes a direct, measurable impact on students who need it most.",
    steps: [
      "Find local nonprofits and programs at VolunteerMatch.org",
      "Contact your school's student activities office",
      "Reach out to Boys & Girls Clubs or 4-H in your area",
      "Commit to a regular, reliable schedule",
      "Bring a friend to double the impact",
    ],
    link: "https://www.volunteermatch.org",
    linkLabel: "VolunteerMatch.org",
  },
  {
    icon: "📢",
    title: "Petition Your School Board",
    color: "bg-orange-50 border-orange-200",
    badgeColor: "bg-orange-500 text-white",
    badge: "Civic Action",
    desc: "Advocate for free or subsidized club participation at the policy level. School boards respond to organized community pressure — especially from students and parents.",
    steps: [
      "Draft a petition at Change.org explaining the issue",
      "Gather signatures from classmates, parents, and teachers",
      "Request time at a school board meeting to present",
      "Bring statistics from this site to support your case",
      "Follow up consistently and track what gets promised",
    ],
    link: "https://www.change.org",
    linkLabel: "Change.org",
  },
  {
    icon: "💸",
    title: "Fundraise for Access",
    color: "bg-amber-50 border-amber-200",
    badgeColor: "bg-amber-500 text-white",
    badge: "Community Support",
    desc: "Help cover the real costs — dues, equipment, transportation — for students who can't afford them. Even small fundraisers make entire programs accessible for families.",
    steps: [
      "Organize a bake sale, car wash, or community event",
      "Create a campaign on GoFundMe or DonorsChoose.org",
      "Partner with local businesses for matching donations",
      "Donate directly to a club's general fund",
      "Set up a recurring monthly contribution",
    ],
    link: "https://www.donorschoose.org",
    linkLabel: "DonorsChoose.org",
  },
  {
    icon: "📱",
    title: "Spread Awareness on Social Media",
    color: "bg-blue-50 border-blue-200",
    badgeColor: "bg-blue-500 text-white",
    badge: "Amplify Voices",
    desc: "Share facts, stories, and resources to shift public opinion. Policy and funding follow attention — and social media is one of the most powerful tools to build it.",
    steps: [
      "Share statistics and facts from this site",
      "Use hashtags: #EqualAccess #OpportunityGap #YouthEquity",
      "Tag your local school board and elected representatives",
      "Share personal stories (with permission) that illustrate the issue",
      "Encourage followers to take the survey on this site",
    ],
    link: "https://www.afterschoolalliance.org",
    linkLabel: "After-School Alliance",
  },
  {
    icon: "🧑‍🏫",
    title: "Mentor a Student",
    color: "bg-purple-50 border-purple-200",
    badgeColor: "bg-purple-500 text-white",
    badge: "Long-Term Impact",
    desc: "Be a guide, champion, and advocate for a younger student. Mentorship has a proven long-term impact on graduation rates, college attendance, and life outcomes.",
    steps: [
      "Connect through Big Brothers Big Sisters (bbbs.org)",
      "Reach out to local middle and high schools",
      "Offer to help students find and apply for programs",
      "Help navigate financial aid and scholarship applications",
      "Show up consistently — reliability matters most",
    ],
    link: "https://www.bbbs.org",
    linkLabel: "Big Brothers Big Sisters",
  },
  {
    icon: "✉️",
    title: "Contact Your Representatives",
    color: "bg-teal-50 border-teal-200",
    badgeColor: "bg-teal-500 text-white",
    badge: "Policy Change",
    desc: "Systemic change requires policy change. Representatives respond to constituent mail — especially when constituents are organized and persistent.",
    steps: [
      "Find your reps at usa.gov/elected-officials",
      "Write a concise, personal email about extracurricular access",
      "Call their office — calls have even more impact than emails",
      "Attend town halls and ask questions publicly",
      "Track their voting record on education and youth funding",
    ],
    link: "https://www.usa.gov/elected-officials",
    linkLabel: "Find Your Representatives",
  },
  {
    icon: "🎁",
    title: "Donate to Organizations",
    color: "bg-green-50 border-green-200",
    badgeColor: "bg-green-600 text-white",
    badge: "Financial Support",
    desc: "Direct financial support to established nonprofits creates immediate, scalable impact. Every dollar is multiplied through their networks, expertise, and infrastructure.",
    steps: [
      "Boys & Girls Club of America — bgca.org",
      "After-School Alliance — afterschoolalliance.org",
      "National 4-H Council — 4-h.org",
      "First Book — firstbook.org",
      "DonorsChoose — donorschoose.org",
    ],
    link: "https://www.bgca.org",
    linkLabel: "Boys & Girls Club",
  },
  {
    icon: "🌟",
    title: "Start or Join an Inclusive Club",
    color: "bg-slate-50 border-slate-200",
    badgeColor: "bg-slate-600 text-white",
    badge: "Build Community",
    desc: "Create a space where students who've been excluded can belong. Clubs with free participation, welcoming cultures, and active outreach can transform a school's climate.",
    steps: [
      "Propose a new inclusive club at your school with teacher support",
      "Make dues free or strictly donation-based",
      "Partner with a teacher or counselor as an advisor",
      "Actively recruit students who feel excluded",
      "Celebrate diverse backgrounds and interests",
    ],
    link: "https://www.afterschoolalliance.org",
    linkLabel: "After-School Alliance Resources",
  },
];

const impactStats = [
  {
    icon: "🧒",
    value: "14M+",
    desc: "students lack access to after-school programs in the U.S.",
  },
  {
    icon: "📊",
    value: "1 in 5",
    desc: "students in low-income areas participates in a school club",
  },
  {
    icon: "💰",
    value: "$12",
    desc: "returned to the community for every $1 invested in youth programs",
  },
  {
    icon: "🎓",
    value: "400%",
    desc: "increase in college attendance for at-risk youth in extracurriculars",
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

export default function AdvocatePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <Badge className="bg-primary/10 text-primary border-primary/20 mb-4 text-sm px-4 py-1">
          Take Action
        </Badge>
        <h1 className="font-display text-5xl font-black text-foreground mb-4">
          Make a Difference
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          You don't need to be an adult or a politician to change things. Here's
          how <strong>students, parents, and community members</strong> can
          advocate and serve.
        </p>
      </motion.div>

      {/* Community Impact Stats */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <div className="bg-primary rounded-2xl p-8 text-primary-foreground">
          <h2 className="font-display text-2xl font-bold text-center mb-6">
            Community Impact by the Numbers
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((stat) => (
              <div key={stat.value} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="font-display text-4xl font-black text-accent">
                  {stat.value}
                </div>
                <div className="text-primary-foreground/80 text-sm mt-1">
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Action Cards */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="grid md:grid-cols-2 gap-6"
      >
        {actionCards.map((card) => (
          <motion.div key={card.title} variants={itemVariants}>
            <Card
              className={`h-full border-2 ${card.color} hover:shadow-card transition-all hover:-translate-y-1`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{card.icon}</span>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-full ${card.badgeColor}`}
                  >
                    {card.badge}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold mb-2">
                  {card.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {card.desc}
                </p>

                <div className="mb-4">
                  <div className="text-xs font-bold text-foreground/60 uppercase tracking-wide mb-2">
                    Steps to Take
                  </div>
                  <ol className="space-y-1.5">
                    {card.steps.map((step, j) => (
                      <li
                        key={step}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {j + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <a
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline mt-2"
                  data-ocid="advocate.resource.link"
                >
                  🔗 {card.linkLabel} →
                </a>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Closing CTA */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 text-center bg-accent/20 rounded-2xl p-12"
      >
        <h2 className="font-display text-4xl font-black text-foreground mb-4">
          Every Action Counts
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
          Change doesn't happen overnight — but it starts with one person
          deciding to act. Whether you donate, volunteer, mentor, or simply
          share this page, you're part of the solution.
        </p>
        <p className="font-semibold text-primary text-xl">
          Be that person. Start today.
        </p>
      </motion.div>
    </div>
  );
}
