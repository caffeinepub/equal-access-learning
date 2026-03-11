import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { motion } from "motion/react";

interface Resource {
  title: string;
  desc: string;
  url: string;
  tag?: string;
}

interface Category {
  icon: string;
  title: string;
  color: string;
  borderColor: string;
  resources: Resource[];
}

const categories: Category[] = [
  {
    icon: "📚",
    title: "Learn More",
    color: "bg-red-50",
    borderColor: "border-red-200",
    resources: [
      {
        title: "After-School Alliance",
        desc: "The leading national voice for after-school programs. Research, advocacy tools, and program directories.",
        url: "https://afterschoolalliance.org",
        tag: "Research",
      },
      {
        title: "Child Trends",
        desc: "In-depth research on extracurricular participation, equity gaps, and youth development outcomes.",
        url: "https://childtrends.org",
        tag: "Research",
      },
      {
        title: "NCES — National Center for Education Statistics",
        desc: "Official U.S. education data including participation rates, demographic breakdowns, and trend analysis.",
        url: "https://nces.ed.gov",
        tag: "Data",
      },
      {
        title: "EdTrust",
        desc: "Advocates for policies that close opportunity and achievement gaps for students of color and low-income students.",
        url: "https://edtrust.org",
        tag: "Advocacy",
      },
    ],
  },
  {
    icon: "🤝",
    title: "Get Help / Find Programs",
    color: "bg-orange-50",
    borderColor: "border-orange-200",
    resources: [
      {
        title: "VolunteerMatch",
        desc: "Find volunteer opportunities with youth nonprofits, after-school programs, and community organizations near you.",
        url: "https://volunteermatch.org",
        tag: "Volunteer",
      },
      {
        title: "AmeriCorps",
        desc: "National service programs that place members with nonprofits serving youth, education, and communities.",
        url: "https://americorps.gov",
        tag: "Service",
      },
      {
        title: "DonorsChoose",
        desc: "Directly fund classroom and club projects from teachers in high-need schools across the country.",
        url: "https://donorschoose.org",
        tag: "Donate",
      },
      {
        title: "Boys & Girls Club Locator",
        desc: "Find a Boys & Girls Club near you offering free or low-cost after-school programs for youth.",
        url: "https://bgca.org/find-a-club",
        tag: "Programs",
      },
      {
        title: "YMCA Youth Programs",
        desc: "After-school, camp, and enrichment programs with need-based financial assistance available nationwide.",
        url: "https://ymca.net",
        tag: "Programs",
      },
    ],
  },
  {
    icon: "🏛️",
    title: "Advocacy & Policy",
    color: "bg-blue-50",
    borderColor: "border-blue-200",
    resources: [
      {
        title: "Change.org — Start a Petition",
        desc: "Create and share a petition to advocate for equal access to extracurricular activities at your school or in your district.",
        url: "https://change.org",
        tag: "Petition",
      },
      {
        title: "USA.gov — Find Elected Officials",
        desc: "Find contact information for your federal, state, and local representatives to advocate for education equity.",
        url: "https://usa.gov/elected-officials",
        tag: "Civic",
      },
      {
        title: "ACLU — Student Rights",
        desc: "Know your rights: the ACLU's guide to students' legal rights in extracurricular activities and school programs.",
        url: "https://aclu.org/know-your-rights/students-rights",
        tag: "Rights",
      },
      {
        title: "National Education Association",
        desc: "Policy resources and advocacy tools for closing opportunity gaps in public education.",
        url: "https://nea.org",
        tag: "Policy",
      },
    ],
  },
  {
    icon: "🌱",
    title: "Youth Programs",
    color: "bg-green-50",
    borderColor: "border-green-200",
    resources: [
      {
        title: "National 4-H Council",
        desc: "Science, technology, agriculture, civic engagement, and health programs for young people across America.",
        url: "https://4-h.org",
        tag: "STEM",
      },
      {
        title: "First Book",
        desc: "Provides books and educational resources to children from low-income families and the programs that serve them.",
        url: "https://firstbook.org",
        tag: "Literacy",
      },
      {
        title: "Big Brothers Big Sisters",
        desc: "One-to-one mentoring for youth ages 6-18 with professionally supported, evidence-based matches.",
        url: "https://bbbs.org",
        tag: "Mentoring",
      },
      {
        title: "AmeriCorps Tutoring Programs",
        desc: "Free tutoring and academic support programs for students who need extra help, available in many communities.",
        url: "https://americorps.gov",
        tag: "Tutoring",
      },
      {
        title: "Khan Academy",
        desc: "Free world-class education for anyone, anywhere. Particularly valuable for students without access to tutors.",
        url: "https://khanacademy.org",
        tag: "Free",
      },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ResourcesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <Badge className="bg-primary/10 text-primary border-primary/20 mb-4 text-sm px-4 py-1">
          Resources
        </Badge>
        <h1 className="font-display text-5xl font-black text-foreground mb-4">
          Learn, Connect, Act
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Carefully curated resources for students, parents, educators, and
          advocates who want to understand and address the opportunity gap.
        </p>
      </motion.div>

      <div className="space-y-12">
        {categories.map((cat, ci) => (
          <motion.section
            key={cat.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: ci * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">{cat.icon}</span>
              <h2 className="font-display text-2xl font-bold">{cat.title}</h2>
            </div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {cat.resources.map((res) => (
                <motion.div key={res.title} variants={itemVariants}>
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid={`resources.${cat.title.toLowerCase().replace(/[^a-z0-9]/g, "")}.link`}
                    className="block h-full"
                  >
                    <Card
                      className={`h-full border-2 ${cat.color} ${cat.borderColor} hover:shadow-card transition-all hover:-translate-y-1 cursor-pointer`}
                    >
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-display font-bold text-foreground pr-2">
                            {res.title}
                          </h3>
                          <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                        </div>
                        {res.tag && (
                          <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary mb-2">
                            {res.tag}
                          </span>
                        )}
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {res.desc}
                        </p>
                        <p className="text-primary text-xs font-medium mt-3 truncate">
                          {res.url}
                        </p>
                      </CardContent>
                    </Card>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        ))}
      </div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-12 p-6 bg-muted rounded-xl text-center"
      >
        <p className="text-sm text-muted-foreground">
          All external links lead to third-party websites. Equal Access Learning
          is not affiliated with any of the organizations listed. We curate
          these resources based on their demonstrated impact and commitment to
          educational equity.
        </p>
      </motion.div>
    </div>
  );
}
