import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertCircle,
  ArrowRight,
  GraduationCap,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

type Page = "home" | "issue" | "survey" | "trivia" | "advocate" | "resources";

interface Props {
  onNavigate: (page: Page) => void;
}

const stats = [
  {
    icon: AlertCircle,
    value: "57%",
    label: "of low-income students never join a school club",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Users,
    value: "1 in 3",
    label: "kids can't attend summer camps due to cost",
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
  {
    icon: GraduationCap,
    value: "3x",
    label: "more likely to attend college for students in extracurriculars",
    color: "text-emerald-600",
    bg: "bg-emerald-100",
  },
];

const issues = [
  {
    icon: "💰",
    title: "Cost Barriers",
    desc: "Club dues, equipment, uniforms, and camp fees price out millions of students every year.",
  },
  {
    icon: "🚌",
    title: "Transportation",
    desc: "Without reliable transport, especially in rural areas, even free programs stay out of reach.",
  },
  {
    icon: "⏰",
    title: "Time Conflicts",
    desc: "Many students work jobs or care for siblings — leaving no time for after-school activities.",
  },
  {
    icon: "🏆",
    title: "Selective Processes",
    desc: "Tryouts and competitive applications favor students with prior training and resources.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function HomePage({ onNavigate }: Props) {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/20 py-20 md:py-28">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <TrendingUp className="w-4 h-4" />
              Education Equity Matters
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-black leading-tight text-foreground mb-6">
              Every Student
              <br />
              <span className="text-primary">Deserves</span> a
              <br />
              <span className="relative">
                Fair Start
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 8 Q75 2, 150 8 Q225 14, 298 8"
                    stroke="oklch(0.82 0.18 75)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
              Millions of students are locked out of school clubs, summer camps,
              and after-school programs — not because of talent, but because of
              zip codes, income, and access. It's time to change that.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={() => onNavigate("issue")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8"
                data-ocid="home.learn_issue.primary_button"
              >
                Learn the Issue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate("survey")}
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-8"
                data-ocid="home.take_survey.secondary_button"
              >
                Take the Survey
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden md:block"
          >
            <img
              src="/assets/generated/hero-students.dim_1200x600.jpg"
              alt="Diverse students engaged in learning activities"
              className="w-full rounded-2xl shadow-card object-cover aspect-video"
            />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-6"
          >
            {stats.map((stat) => (
              <motion.div key={stat.value} variants={itemVariants}>
                <Card className="border-0 shadow-card hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div
                      className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center mb-4`}
                    >
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div
                      className={`font-display text-5xl font-black mb-2 ${stat.color}`}
                    >
                      {stat.value}
                    </div>
                    <p className="text-muted-foreground font-medium leading-snug">
                      {stat.label}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Issues Preview */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              Why the Gap Exists
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The barriers to learning aren't random — they're systemic. Here's
              what's standing in the way.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {issues.map((issue) => (
              <motion.div key={issue.title} variants={itemVariants}>
                <Card className="h-full border-0 shadow-card hover:shadow-lg transition-all hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">{issue.icon}</div>
                    <h3 className="font-display text-lg font-bold mb-2">
                      {issue.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {issue.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-10">
            <Button
              variant="outline"
              size="lg"
              onClick={() => onNavigate("issue")}
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white"
              data-ocid="home.explore_issue.secondary_button"
            >
              Explore the Full Issue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-black mb-4">
              You Can Be Part of the Solution
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Whether you're a student, parent, educator, or community member —
              there are real actions you can take today to close the opportunity
              gap.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold px-8"
                onClick={() => onNavigate("advocate")}
                data-ocid="home.take_action.primary_button"
              >
                Take Action Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-bold px-8"
                onClick={() => onNavigate("trivia")}
                data-ocid="home.test_knowledge.secondary_button"
              >
                Test Your Knowledge
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
