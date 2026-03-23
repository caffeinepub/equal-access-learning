import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Globe, TrendingDown, Users } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "1 in 5",
    label: "rural students miss opportunities due to transportation",
  },
  {
    icon: TrendingDown,
    value: "74%",
    label: "of low-income students can't afford extracurriculars",
  },
  {
    icon: Globe,
    value: "60%",
    label: "of families unaware of available learning programs",
  },
  {
    icon: BookOpen,
    value: "8",
    label: "major barriers blocking equal access to education",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-red-700 to-red-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Equal Access Learning
          </h1>
          <p className="text-lg md:text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Every child deserves equal access to learning opportunities — in
            school and beyond. Explore the barriers, understand the impact, and
            take action.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/quiz"
              data-ocid="home.primary_button"
              className="inline-flex items-center gap-2 bg-white font-bold px-6 py-3 rounded-full hover:bg-red-50 transition-colors text-lg"
            >
              <span className="text-red-600 font-bold">
                Test Your Knowledge
              </span>
              <ArrowRight size={18} className="text-red-600" />
            </Link>
            <Link
              to="/issue"
              data-ocid="home.secondary_button"
              className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold px-6 py-3 rounded-full hover:bg-white hover:text-red-800 transition-colors"
            >
              Learn the Issues
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center text-gray-800 mb-12">
            The Scale of the Problem
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-gray-50 rounded-xl p-6 text-center shadow-card"
              >
                <s.icon size={32} className="text-brand-red mx-auto mb-3" />
                <div className="text-3xl font-display font-bold text-brand-red mb-1">
                  {s.value}
                </div>
                <p className="text-sm text-gray-600 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-4 bg-red-50 border-y border-red-100">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest text-brand-red font-semibold mb-2">
            Interactive
          </p>
          <h2 className="font-display text-4xl font-bold text-brand-red mb-4">
            Test Your Knowledge
          </h2>
          <p className="text-gray-600 mb-6">
            How much do you know about barriers to educational access? Take our
            quiz and find out — choose a category and difficulty level.
          </p>
          <Link
            to="/quiz"
            data-ocid="home.quiz_button"
            className="inline-flex items-center gap-2 bg-brand-red text-white font-bold px-8 py-3 rounded-full hover:bg-brand-red-dark transition-colors"
          >
            Start the Quiz <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center text-gray-800 mb-10">
            Explore the Site
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                to: "/issue" as const,
                title: "The Issue",
                desc: "Deep dive into 8 key barriers — from cost and transportation to language barriers and technology gaps.",
              },
              {
                to: "/survey" as const,
                title: "Take the Survey",
                desc: "Share your experience with learning barriers and help us understand the real impact in your community.",
              },
              {
                to: "/advocate" as const,
                title: "Advocate & Serve",
                desc: "Sign the petition, volunteer, mentor, fundraise, and take action to make a difference for students everywhere.",
              },
            ].map((card) => (
              <Link
                key={card.to}
                to={card.to}
                data-ocid="home.link"
                className="bg-white border border-gray-100 rounded-xl p-6 shadow-card hover:shadow-card-hover hover:border-red-200 transition-all group"
              >
                <h3 className="font-display text-xl font-bold text-gray-800 group-hover:text-brand-red mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {card.desc}
                </p>
                <span className="inline-flex items-center gap-1 text-brand-red text-sm font-semibold mt-4">
                  Explore <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
