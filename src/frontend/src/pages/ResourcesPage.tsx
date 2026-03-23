import { ExternalLink } from "lucide-react";

const resources = [
  {
    category: "National Research & Statistics",
    items: [
      {
        title: "AfterSchool Alliance",
        desc: "Research and advocacy for afterschool programs and access equity across America.",
        url: "http://www.afterschoolalliance.org/",
      },
      {
        title: "National Center for Education Statistics (NCES)",
        desc: "Federal data on U.S. education, including gaps in access, achievement, and enrollment.",
        url: "https://nces.ed.gov/",
      },
      {
        title: "Annie E. Casey Foundation",
        desc: "Data and advocacy on child poverty, educational inequity, and family economic security.",
        url: "https://www.aecf.org/",
      },
    ],
  },
  {
    category: "Policy & Advocacy",
    items: [
      {
        title: "Education Trust",
        desc: "Closing opportunity gaps through advocacy, policy change, and data analysis.",
        url: "https://edtrust.org/",
      },
      {
        title: "National Education Association (NEA)",
        desc: "Resources on equity in education, disability rights, and student advocacy.",
        url: "https://www.nea.org/",
      },
      {
        title: "Learning Policy Institute",
        desc: "Research on equitable access, school funding, and policy reform.",
        url: "https://learningpolicyinstitute.org/",
      },
    ],
  },
  {
    category: "Transportation & Rural Access",
    items: [
      {
        title: "Rural School and Community Trust",
        desc: "Supporting rural schools and addressing distance barriers to learning.",
        url: "https://www.ruraledu.org/",
      },
      {
        title: "USDA Rural Development – Education Programs",
        desc: "Federal programs supporting education in rural communities.",
        url: "https://www.rd.usda.gov/",
      },
    ],
  },
  {
    category: "Technology & Digital Equity",
    items: [
      {
        title: "EveryoneOn",
        desc: "Connecting low-income families to affordable internet and devices.",
        url: "https://www.everyoneon.org/",
      },
      {
        title: "Common Sense Media – Digital Equity",
        desc: "Research and resources on the digital divide and its impact on student learning.",
        url: "https://www.commonsensemedia.org/kids-action/digital-equity",
      },
    ],
  },
  {
    category: "Language & Disability Access",
    items: [
      {
        title: "National Disability Rights Network",
        desc: "Advocates for equal access and accommodations for students with disabilities.",
        url: "https://www.ndrn.org/",
      },
      {
        title: "Colorín Colorado",
        desc: "Resources for English Language Learners and their families.",
        url: "https://www.colorincolorado.org/",
      },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="font-display text-4xl font-bold text-gray-800 mb-3">
          Resources
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Trusted organizations, data sources, and advocacy groups working to
          close the access gap in education.
        </p>
      </div>

      <div className="space-y-10">
        {resources.map((cat) => (
          <div key={cat.category}>
            <h2 className="font-display text-xl font-bold text-brand-red mb-4 pb-2 border-b border-red-100">
              {cat.category}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {cat.items.map((item) => (
                <a
                  key={item.title}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="resources.link"
                  className="bg-white border border-gray-100 rounded-xl p-5 shadow-card hover:shadow-card-hover hover:border-red-200 transition-all group flex flex-col"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-gray-800 group-hover:text-brand-red text-sm">
                      {item.title}
                    </h3>
                    <ExternalLink
                      size={14}
                      className="text-gray-400 group-hover:text-brand-red flex-shrink-0 mt-0.5"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
