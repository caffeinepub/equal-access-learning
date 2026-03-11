import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const PETITION_GOAL = 100;
const STORAGE_KEY = "equal_access_petition";

interface Signer {
  name: string;
  message: string;
  date: string;
}

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
  const [signers, setSigners] = useState<Signer[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [signed, setSigned] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        setSigners(data.signers || []);
        setSigned(data.hasSigned || false);
      } else {
        // Seed with some initial signatures to give momentum
        const seed: Signer[] = [
          {
            name: "Maria G.",
            message: "Every child deserves a fair shot.",
            date: "2026-03-01",
          },
          {
            name: "James T.",
            message: "I grew up without access. Let's change that.",
            date: "2026-03-02",
          },
          {
            name: "Priya S.",
            message: "Equal learning, equal futures.",
            date: "2026-03-04",
          },
          { name: "Devon W.", message: "", date: "2026-03-05" },
          {
            name: "Lily C.",
            message: "No kid should be left out because of cost.",
            date: "2026-03-07",
          },
          { name: "Aaron M.", message: "", date: "2026-03-08" },
          {
            name: "Sofia R.",
            message: "Signed and sharing!",
            date: "2026-03-09",
          },
          {
            name: "Ethan B.",
            message:
              "Teachers, parents, students — we all have to push for this.",
            date: "2026-03-10",
          },
          { name: "Nadia K.", message: "", date: "2026-03-10" },
          {
            name: "Chris H.",
            message: "A small action today = a big change tomorrow.",
            date: "2026-03-11",
          },
        ];
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ signers: seed, hasSigned: false }),
        );
        setSigners(seed);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const handleSign = () => {
    if (!name.trim()) return;
    const newSigner: Signer = {
      name: name.trim(),
      message: message.trim(),
      date: new Date().toISOString().split("T")[0],
    };
    const updated = [...signers, newSigner];
    setSigners(updated);
    setSigned(true);
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ signers: updated, hasSigned: true }),
      );
    } catch {
      // ignore
    }
    setName("");
    setMessage("");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const shareText =
    "I just signed a petition for equal learning access for every child. Join me! #EqualAccess #OpportunityGap";
  const shareUrl = encodeURIComponent(window.location.href);

  const count = signers.length;
  const progress = Math.min((count / PETITION_GOAL) * 100, 100);

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

      {/* Petition Section */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
        data-ocid="petition.section"
      >
        <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">✍️</span>
            <Badge className="bg-red-600 text-white border-none text-sm px-3 py-1">
              Sign the Petition
            </Badge>
          </div>
          <h2 className="font-display text-3xl font-black text-foreground mb-2">
            Every Child Deserves Equal Learning Access
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl">
            We call on schools, policymakers, and communities to remove the
            barriers — cost, transportation, time conflicts, and selectivity —
            that prevent millions of children from participating in educational
            programs inside and outside of school.
          </p>

          {/* Goal Counter */}
          <div className="mb-6" data-ocid="petition.card">
            <div className="flex items-end justify-between mb-2">
              <span className="font-display text-4xl font-black text-red-600">
                {count.toLocaleString()}
              </span>
              <span className="text-muted-foreground text-sm">
                of <strong>{PETITION_GOAL.toLocaleString()}</strong> signatures
              </span>
            </div>
            <Progress value={progress} className="h-3 bg-red-100" />
            <p className="text-sm text-muted-foreground mt-2">
              {PETITION_GOAL - count > 0
                ? `${(PETITION_GOAL - count).toLocaleString()} more signatures needed to reach our goal`
                : "Goal reached! Thank you for your support."}
            </p>
          </div>

          {/* Sign Form */}
          {!signed ? (
            <div
              className="bg-white rounded-xl p-6 border border-red-100 mb-6"
              data-ocid="petition.panel"
            >
              <h3 className="font-semibold text-lg mb-4">Add Your Signature</h3>
              <div className="space-y-3">
                <div>
                  <label
                    htmlFor="petition-name"
                    className="text-sm font-medium text-foreground/80 mb-1 block"
                  >
                    Your Name *
                  </label>
                  <Input
                    id="petition-name"
                    placeholder="First name or full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    data-ocid="petition.input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="petition-message"
                    className="text-sm font-medium text-foreground/80 mb-1 block"
                  >
                    Message (optional)
                  </label>
                  <Textarea
                    id="petition-message"
                    placeholder="Why does equal access matter to you?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={2}
                    data-ocid="petition.textarea"
                  />
                </div>
                <Button
                  onClick={handleSign}
                  disabled={!name.trim()}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold"
                  data-ocid="petition.submit_button"
                >
                  Sign the Petition
                </Button>
              </div>
            </div>
          ) : (
            <div
              className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6 text-center"
              data-ocid="petition.success_state"
            >
              <div className="text-4xl mb-2">🎉</div>
              <h3 className="font-display text-xl font-bold text-green-700 mb-1">
                Thank you for signing!
              </h3>
              <p className="text-muted-foreground text-sm">
                You're part of a growing community demanding change. Help us
                reach our goal by sharing the petition.
              </p>
            </div>
          )}

          {/* Share Buttons */}
          <div>
            <p className="text-sm font-semibold text-foreground/70 mb-3">
              Share this petition:
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="petition.primary_button"
              >
                <Button
                  variant="outline"
                  className="gap-2 border-sky-400 text-sky-600 hover:bg-sky-50"
                >
                  <svg
                    role="img"
                    aria-label="Share on X"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.84L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Share on X
                </Button>
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="petition.secondary_button"
              >
                <Button
                  variant="outline"
                  className="gap-2 border-blue-500 text-blue-600 hover:bg-blue-50"
                >
                  <svg
                    role="img"
                    aria-label="Share on Facebook"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Share on Facebook
                </Button>
              </a>
              <Button
                variant="outline"
                onClick={handleCopyLink}
                className="gap-2"
                data-ocid="petition.toggle"
              >
                {copied ? (
                  <>
                    <span>✓</span> Copied!
                  </>
                ) : (
                  <>
                    <svg
                      role="img"
                      aria-label="Copy link"
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" />
                      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                    </svg>{" "}
                    Copy Link
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Recent signatures */}
          {signers.length > 0 && (
            <div className="mt-6">
              <p className="text-xs font-bold text-foreground/50 uppercase tracking-wide mb-3">
                Recent Signatures
              </p>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {[...signers]
                  .reverse()
                  .slice(0, 8)
                  .map((s, i) => (
                    <div
                      key={`${s.name}-${s.date}-${i}`}
                      className="flex items-start gap-3 bg-white rounded-lg px-3 py-2 border border-red-100"
                      data-ocid={`petition.item.${i + 1}`}
                    >
                      <span className="w-7 h-7 rounded-full bg-red-100 text-red-600 text-xs font-bold flex items-center justify-center shrink-0">
                        {s.name.charAt(0).toUpperCase()}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {s.name}
                        </p>
                        {s.message && (
                          <p className="text-xs text-muted-foreground truncate">
                            {s.message}
                          </p>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground/60 shrink-0 ml-auto">
                        {s.date}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}
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
