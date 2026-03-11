import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Bus,
  CheckCircle,
  Clock,
  DollarSign,
  Filter,
  Globe,
  RotateCcw,
  Settings,
  Trophy,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

type CategoryKey =
  | "cost"
  | "transportation"
  | "time"
  | "selectivity"
  | "general";
type Difficulty = "easy" | "medium" | "hard";
type Screen = "category" | "difficulty" | "quiz" | "results";

const CATEGORIES: {
  key: CategoryKey;
  label: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
  border: string;
  badge: string;
  description: string;
}[] = [
  {
    key: "cost",
    label: "Cost Barriers",
    icon: <DollarSign className="w-7 h-7" />,
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-300",
    badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
    description: "Fees, uniforms, materials & financial obstacles",
  },
  {
    key: "transportation",
    label: "Transportation",
    icon: <Bus className="w-7 h-7" />,
    color: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-300",
    badge: "bg-blue-100 text-blue-800 border-blue-200",
    description: "Getting to programs, rural vs urban, transit gaps",
  },
  {
    key: "time",
    label: "Time Conflicts",
    icon: <Clock className="w-7 h-7" />,
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-300",
    badge: "bg-amber-100 text-amber-800 border-amber-200",
    description: "Scheduling clashes, work obligations & overload",
  },
  {
    key: "selectivity",
    label: "Selectivity & Access",
    icon: <Filter className="w-7 h-7" />,
    color: "text-rose-700",
    bg: "bg-rose-50",
    border: "border-rose-300",
    badge: "bg-rose-100 text-rose-800 border-rose-200",
    description: "Tryouts, auditions & competitive entry processes",
  },
  {
    key: "general",
    label: "General Knowledge",
    icon: <Globe className="w-7 h-7" />,
    color: "text-violet-700",
    bg: "bg-violet-50",
    border: "border-violet-300",
    badge: "bg-violet-100 text-violet-800 border-violet-200",
    description: "Opportunity gaps, systemic issues & advocacy",
  },
];

const QUESTION_BANK: Record<CategoryKey, Record<Difficulty, Question[]>> = {
  cost: {
    easy: [
      {
        question: "What does 'cost barrier' mean for joining a school club?",
        options: [
          "The club is too far away",
          "Students can't afford fees or supplies needed",
          "The club meets at a bad time",
          "There are not enough members",
        ],
        correct: 1,
        explanation:
          "A cost barrier means the financial requirements — dues, uniforms, equipment, or supplies — prevent a student from joining even if they want to.",
      },
      {
        question:
          "Which of these is an example of a cost barrier to a school sport?",
        options: [
          "Practice runs too late",
          "You need a note from your doctor",
          "Equipment and uniform fees cost $200",
          "The coach is strict",
        ],
        correct: 2,
        explanation:
          "Equipment and uniform fees are a direct cost barrier — many families simply cannot afford these upfront costs, blocking access regardless of the student's talent or interest.",
      },
      {
        question:
          "If a club requires a $50 registration fee, which students are most affected?",
        options: [
          "Students who live far from school",
          "Students from low-income families",
          "Students with good grades",
          "Older students",
        ],
        correct: 1,
        explanation:
          "Registration fees disproportionately impact low-income families where $50 may represent a significant portion of a week's budget, effectively excluding these students.",
      },
      {
        question:
          "What is one way a school could help reduce cost barriers for clubs?",
        options: [
          "Make clubs harder to join",
          "Offer fee waivers or scholarships for low-income students",
          "Hold clubs only on weekends",
          "Remove all clubs from school",
        ],
        correct: 1,
        explanation:
          "Fee waivers and financial assistance programs allow students who cannot afford dues to still participate, directly addressing the cost barrier.",
      },
      {
        question:
          "Besides club fees, what other costs might stop a student from joining a music program?",
        options: [
          "The teacher's name",
          "The classroom location",
          "Instrument rental and sheet music costs",
          "The school's mascot",
        ],
        correct: 2,
        explanation:
          "Music programs often require students to rent or purchase instruments, buy sheet music, and sometimes pay for private lessons — creating layers of cost beyond any club fee.",
      },
    ],
    medium: [
      {
        question:
          "According to research, what is the #1 barrier students cite for not joining extracurriculars?",
        options: [
          "Lack of interest",
          "Transportation",
          "Cost",
          "Parental disapproval",
        ],
        correct: 2,
        explanation:
          "Cost — including dues, uniforms, materials, and travel — is the most frequently cited barrier across surveys of students who don't participate in extracurricular activities.",
      },
      {
        question:
          "How do 'hidden costs' differ from obvious costs in school activities?",
        options: [
          "Hidden costs are smaller than obvious ones",
          "Hidden costs like travel, food, and gear aren't listed in the fee schedule but add up significantly",
          "Hidden costs only affect wealthy students",
          "There are no hidden costs in school activities",
        ],
        correct: 1,
        explanation:
          "Hidden costs — like gas for travel, team meals, special shoes, or tournament entry — accumulate beyond the stated fee and can exceed the listed cost, catching families off guard.",
      },
      {
        question:
          "Which policy approach addresses cost barriers at a systemic level?",
        options: [
          "Requiring all students to pay the same fee",
          "Title I funding and free/reduced-price program access",
          "Making programs voluntary",
          "Reducing the number of clubs offered",
        ],
        correct: 1,
        explanation:
          "Title I funding and similar policies provide resources to schools in low-income areas, and free/reduced-price access policies ensure that financial need doesn't block participation.",
      },
      {
        question:
          "A student wants to join the debate team but can't afford the tournament travel fees. This is an example of:",
        options: [
          "A scheduling conflict",
          "A cost barrier compounding access inequality",
          "A transportation problem",
          "School policy disagreement",
        ],
        correct: 1,
        explanation:
          "Tournament fees and travel costs are cost barriers that compound access inequality — students with talent lose out not because of ability but because of financial constraints.",
      },
      {
        question:
          "Why might free after-school programs still create cost barriers?",
        options: [
          "They always charge hidden fees",
          "Even 'free' programs may require supplies, transportation, or childcare that cost money",
          "Free programs are never good quality",
          "Free programs don't exist",
        ],
        correct: 1,
        explanation:
          "Even programs advertised as free can carry indirect costs — families may need to arrange and pay for transportation, snacks, childcare for siblings, or required materials.",
      },
    ],
    hard: [
      {
        question:
          "What percentage of U.S. families report cost as the primary reason their child doesn't participate in organized sports or activities?",
        options: ["About 15%", "About 26%", "About 40%", "About 60%"],
        correct: 2,
        explanation:
          "Studies by the Aspen Institute and others have found that roughly 40% of families — and significantly higher proportions in low-income brackets — cite cost as the primary barrier to youth activity participation.",
      },
      {
        question:
          "How does the cost gap in extracurricular access intersect with racial inequality in the U.S.?",
        options: [
          "Race has no relationship to cost barriers",
          "Black and Latino families, who face higher poverty rates, disproportionately encounter cost barriers",
          "White students face the most cost barriers",
          "Cost barriers affect all races equally",
        ],
        correct: 1,
        explanation:
          "Due to systemic wealth gaps and higher poverty rates among Black and Latino families, these groups disproportionately face cost barriers to extracurricular participation — compounding existing educational inequities.",
      },
      {
        question: "The 'pay-to-play' model in U.S. public schools refers to:",
        options: [
          "Schools charging for lunch",
          "Requiring students to pay fees to participate in sports and activities that were once publicly funded",
          "Private tutoring for standardized tests",
          "Selling school merchandise",
        ],
        correct: 1,
        explanation:
          "Pay-to-play policies, adopted by cash-strapped districts, shift activity costs onto families. This has dramatically widened the participation gap between high- and low-income students.",
      },
      {
        question:
          "Research on the 'activity gap' shows that children from high-income families spend how much more per year on extracurriculars than low-income peers?",
        options: [
          "About $200 more",
          "About $500 more",
          "Up to $5,000–$8,000 more",
          "About $1,000 more",
        ],
        correct: 2,
        explanation:
          "The Equality of Opportunity Project found high-income families spend $5,000–$8,000+ more annually per child on enrichment activities, creating a compounding advantage over 18 years of childhood.",
      },
      {
        question:
          "How does the cost barrier in extracurriculars create what economists call a 'human capital trap'?",
        options: [
          "Students become less interested in learning over time",
          "Low-income students miss skill-building experiences that compound into lower lifetime earnings and opportunities",
          "Schools spend more money on wealthy students",
          "Teachers leave low-income schools for higher pay",
        ],
        correct: 1,
        explanation:
          "The human capital trap occurs when cost barriers prevent low-income students from gaining soft skills (leadership, teamwork, discipline) through extracurriculars that translate into higher college admission rates and lifetime earnings — perpetuating inequality across generations.",
      },
    ],
  },
  transportation: {
    easy: [
      {
        question:
          "Why might transportation be a barrier to joining after-school programs?",
        options: [
          "The programs are boring",
          "Students can't get to the program if they have no ride or bus service",
          "Programs start too early",
          "There are too many students in the program",
        ],
        correct: 1,
        explanation:
          "Without a way to get to a program — whether that's a parent's car, public transit, or school bus — a student effectively can't participate, no matter how interested they are.",
      },
      {
        question:
          "Which type of area typically has the biggest transportation problems for students?",
        options: [
          "Big cities",
          "Suburbs close to schools",
          "Rural areas",
          "College towns",
        ],
        correct: 2,
        explanation:
          "Rural areas lack public transit and have programs spread far apart, meaning students without a car or parent available are largely cut off from after-school opportunities.",
      },
      {
        question:
          "If a student's family doesn't own a car and lives 10 miles from an after-school program, what is the main challenge?",
        options: [
          "The program is too expensive",
          "Getting to and from the program safely",
          "Finding friends to join",
          "Getting homework done",
        ],
        correct: 1,
        explanation:
          "Distance combined with lack of personal transportation creates a physical access problem — the student can't reliably get to the program even if it's free and they want to attend.",
      },
      {
        question:
          "What is one way communities try to solve transportation barriers for students?",
        options: [
          "Moving all programs online only",
          "Providing free shuttle buses from schools to programs",
          "Making programs shorter",
          "Requiring students to have bikes",
        ],
        correct: 1,
        explanation:
          "Free shuttle services from schools to program locations directly address the transportation barrier, making participation physically possible for students who would otherwise be excluded.",
      },
      {
        question:
          "Why might a student who lives in a city still face transportation barriers?",
        options: [
          "Cities always have free transit for students",
          "Bus routes may not run late enough for after-school programs",
          "Cities have too many programs",
          "Urban students never need transportation help",
        ],
        correct: 1,
        explanation:
          "Even in cities with public transit, bus routes often stop running or reduce frequency in the evening, leaving students stranded after late-ending programs — especially in lower-income neighborhoods.",
      },
    ],
    medium: [
      {
        question:
          "How does the lack of transportation particularly affect students in after-school enrichment programs?",
        options: [
          "It only affects students during school hours",
          "Students who can't secure a ride must drop out even if the program itself is free",
          "Transportation only matters for sports",
          "Schools are required to provide all transportation",
        ],
        correct: 1,
        explanation:
          "When programs run past school bus hours, students without private transportation have no reliable way home — forcing families to choose between safety and participation, effectively excluding them.",
      },
      {
        question:
          "Research shows what percentage of rural students lack access to public transportation for after-school activities?",
        options: ["About 20%", "About 40%", "More than 60%", "About 10%"],
        correct: 2,
        explanation:
          "Studies consistently find that over 60% of rural communities have little to no public transit infrastructure, making transportation a dominant barrier for rural youth seeking extracurricular participation.",
      },
      {
        question:
          "How does transportation inequality intersect with economic inequality for extracurricular access?",
        options: [
          "Wealthy families have more transportation options, amplifying their children's access advantages",
          "Poor families always live near good transit",
          "Transportation doesn't affect wealthy students",
          "They are completely separate issues",
        ],
        correct: 0,
        explanation:
          "High-income families can afford cars, ride-shares, and flexible schedules. Low-income families often can't, meaning the transportation barrier layers on top of the cost barrier to compound access inequality.",
      },
      {
        question:
          "A community program wants to reduce transportation barriers. Which solution would be most effective?",
        options: [
          "Requiring all students to get their own bikes",
          "Co-locating programs within school buildings to eliminate travel entirely",
          "Telling students to walk",
          "Running programs only in summer",
        ],
        correct: 1,
        explanation:
          "Co-locating enrichment programs within school buildings eliminates the transportation problem entirely — students are already there and programs happen before school dismissal or immediately after.",
      },
      {
        question:
          "Which demographic is most likely to rely solely on school-provided busing for extracurricular access?",
        options: [
          "Students from wealthy families",
          "Students from low-income, single-parent, or no-car households",
          "Students at private schools",
          "Students in AP classes",
        ],
        correct: 1,
        explanation:
          "Students in households without cars, with single working parents, or with limited income depend entirely on school-provided or publicly-funded transportation — any gap in that system excludes them completely.",
      },
    ],
    hard: [
      {
        question: "The 'spatial mismatch hypothesis' in education argues that:",
        options: [
          "Schools are built too close to highways",
          "Enrichment opportunities are concentrated in wealthier areas while poor students are geographically separated from them",
          "Students should commute for better programs",
          "Distance has no effect on program participation",
        ],
        correct: 1,
        explanation:
          "The spatial mismatch hypothesis, applied to education, posits that high-quality enrichment programs cluster in high-income neighborhoods. Low-income students, who live far away and lack transportation, face geographic exclusion from these resources.",
      },
      {
        question:
          "Studies on transportation and extracurricular participation show that students without reliable transport are how much less likely to complete multi-year program sequences?",
        options: [
          "About 10% less likely",
          "About 25% less likely",
          "Up to 50% less likely",
          "It makes no difference",
        ],
        correct: 2,
        explanation:
          "Research indicates students with transportation barriers are up to 50% less likely to complete multi-year programs (like progression through music levels or sports seasons) because inconsistent attendance leads to dropout.",
      },
      {
        question:
          "How does 'transit desert' designation affect educational equity in U.S. cities?",
        options: [
          "Transit deserts only affect adult commuters",
          "Neighborhoods with no reliable transit — often low-income — have youth who cannot access programs in other parts of the city",
          "Transit deserts are only in rural areas",
          "Transit funding doesn't affect school programs",
        ],
        correct: 1,
        explanation:
          "Transit deserts — urban areas with insufficient public transportation — are disproportionately found in low-income and minority neighborhoods. Youth in these areas cannot access programs elsewhere in the city, deepening educational inequality.",
      },
      {
        question:
          "The '21st Century Community Learning Centers' federal program addresses transportation barriers by:",
        options: [
          "Providing students with bus passes",
          "Funding after-school programs located directly in school buildings",
          "Building new transit lines near schools",
          "Paying for ride-share services",
        ],
        correct: 1,
        explanation:
          "21CCLC grants fund after-school and summer programs located within school facilities, effectively eliminating transportation as a barrier by bringing enrichment to where students already are.",
      },
      {
        question:
          "When researchers control for socioeconomic status, transportation access still independently predicts extracurricular participation because:",
        options: [
          "Transportation is unrelated to SES",
          "Physical access and time burdens create real participation costs even after accounting for income",
          "Wealthy students also lack transportation sometimes",
          "This research finding is contested and doesn't hold up",
        ],
        correct: 1,
        explanation:
          "Even at similar income levels, students with unreliable transportation show lower participation rates — confirming that physical access and the time burden of travel are independently significant barriers beyond just cost.",
      },
    ],
  },
  time: {
    easy: [
      {
        question:
          "What is a 'time conflict' when it comes to joining school clubs?",
        options: [
          "Not knowing what time school starts",
          "Two activities happening at the same time so you can only choose one",
          "Having too much free time",
          "A club that lasts too long",
        ],
        correct: 1,
        explanation:
          "A time conflict means two things you want or need to do are scheduled at the same time, forcing you to choose one and miss the other.",
      },
      {
        question:
          "Why might a student have to choose between joining the school play and the science club?",
        options: [
          "Both clubs are too expensive",
          "Both activities meet on the same day and time",
          "The student doesn't like either one",
          "Both clubs are in the same room",
        ],
        correct: 1,
        explanation:
          "When clubs are scheduled simultaneously, a student must pick one, missing out on the other — even if they have the interest and ability to benefit from both.",
      },
      {
        question:
          "For many students, what is the most common reason they can't attend after-school programs?",
        options: [
          "They don't find them interesting",
          "They have to work a job or care for siblings after school",
          "Their parents won't let them",
          "The programs are full",
        ],
        correct: 1,
        explanation:
          "Many students — especially from low-income families — must work part-time jobs or care for younger siblings after school, making after-school programs impossible to attend.",
      },
      {
        question:
          "Why is it a problem when all sports tryouts happen during the same two-week window?",
        options: [
          "Students have to pick just one sport instead of trying multiple",
          "Coaches don't have time to evaluate everyone",
          "Sports are unhealthy for students",
          "Schools run out of equipment",
        ],
        correct: 0,
        explanation:
          "When all tryouts overlap, multi-sport athletes face impossible choices. This especially disadvantages students exploring new interests — they can't try a new sport without giving up their current one.",
      },
      {
        question:
          "A student works 20 hours per week after school. How does this create a time barrier?",
        options: [
          "It makes them too tired to do homework",
          "It leaves little time for clubs, sports, or enrichment programs",
          "It makes school more expensive",
          "It improves their time management",
        ],
        correct: 1,
        explanation:
          "Students who must work significant hours to help their families have very limited time after school, making participation in extracurriculars difficult or impossible — a time barrier tied directly to economic need.",
      },
    ],
    medium: [
      {
        question:
          "Research on after-school scheduling shows that which time slot creates the most access problems for working families?",
        options: [
          "Morning before school",
          "Immediately after school (3–5 PM) when parents are still at work",
          "Weekend programs",
          "Lunchtime activities",
        ],
        correct: 1,
        explanation:
          "The 3–5 PM window is peak participation time for activities, yet it's exactly when working parents cannot pick up or supervise children — creating transportation and safety barriers for low-income families.",
      },
      {
        question:
          "How do overlapping club meeting times disproportionately impact lower-income students?",
        options: [
          "Wealthy students have fewer club options",
          "Lower-income students can't pay for private coaching to compensate for lost club experience",
          "Scheduling is a problem for all students equally",
          "Lower-income students prefer fewer activities",
        ],
        correct: 1,
        explanation:
          "When time conflicts force students out of clubs, wealthy families can pay for private lessons or camps to fill the gap. Lower-income families cannot, so the scheduling barrier creates a permanent experiential deficit.",
      },
      {
        question: "The term 'time poverty' in education refers to:",
        options: [
          "Schools that don't have enough class time",
          "Students having so many obligations — work, caregiving, commuting — that they have no time for enrichment",
          "Teachers who don't have enough time to grade",
          "Schools without clocks in classrooms",
        ],
        correct: 1,
        explanation:
          "Time poverty describes the condition where a student's total burden of obligations — including paid work, caregiving for siblings, and long commutes — leaves insufficient time for extracurricular participation or even studying.",
      },
      {
        question:
          "Why do 'mandatory' vs. 'optional' framing of after-school activities matter for access?",
        options: [
          "Mandatory activities exclude students with conflicting obligations they can't get out of",
          "Optional activities are always better for students",
          "Framing has no effect on who participates",
          "Mandatory activities are better funded",
        ],
        correct: 0,
        explanation:
          "When activities have mandatory attendance requirements, students with legitimate conflicts — jobs, caregiving — face discipline or exclusion rather than accommodation, compounding inequity.",
      },
      {
        question:
          "Which school policy change would best address time conflict barriers for students who care for siblings?",
        options: [
          "Requiring parents to quit their jobs",
          "Offering sibling-inclusive programming so older students can bring younger siblings to activities",
          "Moving all activities to summer only",
          "Requiring students to prove they have childcare",
        ],
        correct: 1,
        explanation:
          "Sibling-inclusive programming directly addresses the caregiving time barrier by allowing older students to bring younger siblings, enabling participation that would otherwise be impossible.",
      },
    ],
    hard: [
      {
        question:
          "What does data show about the correlation between student employment hours and extracurricular dropout rates?",
        options: [
          "Working students participate equally in activities",
          "Students working 20+ hours per week show dramatically higher rates of extracurricular dropout across all activity types",
          "Part-time work improves club participation through discipline",
          "Employment only affects sports participation, not academic clubs",
        ],
        correct: 1,
        explanation:
          "Research consistently shows that students working 20 or more hours per week — a necessity for many low-income families — show significantly higher rates of dropping activities, with compounding effects on college application competitiveness.",
      },
      {
        question:
          "'Schedule bundling' by school districts (clustering all activities in one time window) is criticized for:",
        options: [
          "Making it easier for students to choose activities",
          "Artificially creating zero-sum competition between all activities, forcing students to specialize prematurely",
          "Being too expensive for schools to implement",
          "Encouraging more participation",
        ],
        correct: 1,
        explanation:
          "When all extracurriculars compete in one narrow time window, students cannot explore multiple interests — forcing early specialization that disadvantages late bloomers and compounds access inequality by eliminating diverse pathways.",
      },
      {
        question:
          "How does caregiver labor disproportionately fall on girls from low-income families, affecting extracurricular access?",
        options: [
          "Girls are less interested in extracurriculars",
          "Girls in low-income families are more often assigned sibling care and household responsibilities, reducing their available time",
          "Boys face more time barriers than girls",
          "Caregiver labor affects all family structures equally",
        ],
        correct: 1,
        explanation:
          "Research on gender and caregiving shows that girls — particularly in low-income families — are disproportionately assigned sibling care and household labor after school, creating a time barrier that compounds gender and class inequity.",
      },
      {
        question:
          "The 'enrichment time gap' documented in Lareau's 'Unequal Childhoods' study showed that:",
        options: [
          "Middle-class children have less structured time than working-class children",
          "Middle-class children spend significantly more hours in organized enrichment, creating cumulative developmental advantages",
          "Time allocation was equal across class backgrounds",
          "Working-class children benefited more from unstructured time",
        ],
        correct: 1,
        explanation:
          "Annette Lareau's landmark research showed middle-class children accumulate thousands of additional hours in structured enrichment activities over childhood compared to working-class peers — creating compounding developmental and social capital advantages.",
      },
      {
        question:
          "Under ESSA (Every Student Succeeds Act), schools are encouraged to address time barriers through:",
        options: [
          "Lengthening the school day for all students",
          "Expanded learning time and community school models that integrate services on-site",
          "Reducing after-school program funding",
          "Requiring students to be present for all activities",
        ],
        correct: 1,
        explanation:
          "ESSA's community school and expanded learning time provisions encourage integrating after-school programs, family services, and enrichment into the school day or building — reducing the transportation and time barriers that block low-income students.",
      },
    ],
  },
  selectivity: {
    easy: [
      {
        question: "What does it mean for a school program to be 'selective'?",
        options: [
          "Anyone can join at any time",
          "Only some students are chosen to participate, usually through tryouts or auditions",
          "The program costs money to join",
          "The program only meets once a week",
        ],
        correct: 1,
        explanation:
          "A selective program chooses participants through a competitive process — like tryouts, auditions, or applications — meaning not everyone who wants to join can.",
      },
      {
        question:
          "Why might tryouts for a sports team be unfair to students who have never had professional coaching?",
        options: [
          "Students without coaching are smarter",
          "Students with private coaching have practiced more and will likely perform better in tryouts",
          "Tryouts are always completely fair",
          "Sports don't require special skills",
        ],
        correct: 1,
        explanation:
          "Private coaching — which costs money — develops advanced skills that show up in tryouts. Students who couldn't afford lessons are at a disadvantage before they even begin.",
      },
      {
        question:
          "A student who has never taken dance lessons tries out for the school dance company. Why might they not make the team even if they are talented?",
        options: [
          "They are too old to try",
          "Judges often favor students with formal training, which requires money for lessons",
          "Dance teams don't allow new students",
          "Only the teacher's favorites make the team",
        ],
        correct: 1,
        explanation:
          "Without formal training, a naturally talented student may lack the technical vocabulary and technique that judges look for — skills that come from paid lessons unavailable to low-income families.",
      },
      {
        question:
          "What is one way schools make programs more inclusive and less selective?",
        options: [
          "Make tryouts harder",
          "Create open-enrollment or no-cut policies so all interested students can participate",
          "Only select the top 5% of students",
          "Remove all clubs from school",
        ],
        correct: 1,
        explanation:
          "No-cut policies and open-enrollment programs ensure that interest and commitment — not prior training or innate talent — determine who can participate, removing the selectivity barrier.",
      },
      {
        question:
          "Which type of club is most likely to be free of selectivity barriers?",
        options: [
          "Varsity sports teams",
          "Audition-only choir",
          "An open drama club that welcomes all skill levels",
          "Advanced placement academic team",
        ],
        correct: 2,
        explanation:
          "An open drama club that welcomes all skill levels has no selectivity barrier — any student can join regardless of prior experience, making participation accessible to everyone.",
      },
    ],
    medium: [
      {
        question:
          "How does the 'Matthew Effect' apply to selective extracurricular programs?",
        options: [
          "Students with more advantages gain access to programs that build further advantages, while disadvantaged students are excluded",
          "All students eventually get equal access to programs",
          "Good students always beat bad students in tryouts",
          "Private schools have better sports teams",
        ],
        correct: 0,
        explanation:
          "The Matthew Effect ('the rich get richer') in education means students who already have advantages — private coaching, lessons, connections — gain access to selective programs that further amplify those advantages, deepening inequality.",
      },
      {
        question:
          "A school's gifted-and-talented program selects students based on standardized tests. This creates a barrier because:",
        options: [
          "Tests are too easy for some students",
          "Test performance correlates with socioeconomic status, systematically screening out low-income students",
          "Only wealthy students want to be in gifted programs",
          "Gifted programs are not beneficial",
        ],
        correct: 1,
        explanation:
          "Standardized test performance correlates strongly with family income and educational resources. Using tests as the sole selection criterion for enrichment programs systematically excludes low-income students who may be equally capable.",
      },
      {
        question:
          "Why do selective program pathways compound over time for students?",
        options: [
          "Being selected for one program gives experience, credentials, and networks that make future selection more likely",
          "All programs reset fairly each year",
          "Selection processes don't affect long-term outcomes",
          "Students lose interest after being selected once",
        ],
        correct: 0,
        explanation:
          "Early selection creates a virtuous cycle for those chosen: participation builds skills, references, and confidence that advantage them in future competitive selections — while excluded students fall further behind.",
      },
      {
        question:
          "Research shows that selective music and arts programs at the middle school level lead to what outcome gap by high school?",
        options: [
          "Students who didn't make middle school programs show equal participation in high school",
          "Students excluded from middle school programs are significantly less likely to participate in arts at high school or beyond",
          "Selective programs improve access for everyone",
          "High school programs are all open enrollment",
        ],
        correct: 1,
        explanation:
          "Research on arts pipeline studies shows that middle school exclusion from selective programs creates a lasting participation gap — students who are cut are far less likely to re-engage with arts in high school due to lost confidence and skill gaps.",
      },
      {
        question:
          "What distinguishes 'structural selectivity' from 'individual selectivity' as a barrier?",
        options: [
          "They are the same thing",
          "Structural selectivity refers to systemic gatekeeping embedded in policy (like testing requirements), while individual selectivity is a single coach's bias",
          "Individual selectivity only affects sports",
          "Structural selectivity is easier to fix",
        ],
        correct: 1,
        explanation:
          "Structural selectivity — policies, testing requirements, formal auditions — creates systemic exclusion that affects all students equally across a system. Individual selectivity (bias) is localized. Both are harmful but require different interventions.",
      },
    ],
    hard: [
      {
        question:
          "Studies on 'competitive tracking' in extracurriculars show it mirrors academic tracking in that:",
        options: [
          "All students end up in the same opportunities eventually",
          "Both systems stratify students by background early and create diverging trajectories that are difficult to reverse",
          "Competitive tracking improves outcomes for all students",
          "Academic and extracurricular tracking are unrelated",
        ],
        correct: 1,
        explanation:
          "Research drawing on Oakes' tracking work applies the same lens to extracurriculars: early selection into advanced/competitive tracks creates self-reinforcing trajectories, with students from privileged backgrounds disproportionately occupying top tiers.",
      },
      {
        question:
          "The concept of 'cultural capital' (Bourdieu) explains selectivity barriers because:",
        options: [
          "Some cultures are more capable in extracurriculars",
          "Selection processes reward forms of knowledge, style, and experience that are more accessible to dominant-culture, higher-income families",
          "Cultural differences are irrelevant to tryout performance",
          "Only academic programs use cultural capital screening",
        ],
        correct: 1,
        explanation:
          "Bourdieu's cultural capital theory explains that auditions and tryouts don't just test skill — they reward specific styles of performance, comportment, and vocabulary associated with dominant culture and accessible through expensive private training.",
      },
      {
        question:
          "What did the 'Project STAR' and related studies find about early selection into enrichment programs?",
        options: [
          "Early selection had no lasting effect on outcomes",
          "Students selected for enrichment early showed compounding academic and social advantages through high school and college",
          "Late selection produced better outcomes than early selection",
          "Enrichment programs had negative effects overall",
        ],
        correct: 1,
        explanation:
          "Research shows compounding effects of early enrichment program selection: access to quality programs in elementary and middle school creates growing academic, social, and college preparation advantages that persist and expand through high school.",
      },
      {
        question:
          "How do 'feeder program' systems in competitive extracurriculars (like elite sports academies) perpetuate class inequality?",
        options: [
          "They provide equal opportunity to all students",
          "They require early paid training and selection that families must invest in years before any 'fair' open competition",
          "Feeder programs are funded by public schools",
          "They only affect professional athletes",
        ],
        correct: 1,
        explanation:
          "Elite feeder systems (travel sports academies, competitive music programs) require substantial financial investment years before any apparent 'open' tryout — effectively limiting the competitive pool to families who can afford the pipeline.",
      },
      {
        question:
          "Research on blind vs. non-blind auditions (like symphony orchestra screen trials) demonstrates that:",
        options: [
          "Blind auditions have no effect on who is selected",
          "Removing visual cues that signal race/gender significantly changes selection outcomes, revealing that selectivity encodes demographic bias",
          "Blind auditions make things worse for minorities",
          "Only classical music uses blind auditions",
        ],
        correct: 1,
        explanation:
          "Studies on blind auditions in orchestras (Goldin & Rouse) showed screens reduced gender bias in selection by 30–55%. This demonstrates that 'objective' selection processes encode cultural and demographic biases that disadvantage underrepresented groups.",
      },
    ],
  },
  general: {
    easy: [
      {
        question: "What is the 'opportunity gap' in education?",
        options: [
          "The time between school years",
          "When some students have far more access to learning resources and activities than others",
          "The gap between reading and math scores",
          "Differences in school lunch quality",
        ],
        correct: 1,
        explanation:
          "The opportunity gap describes the unequal access to quality education, enrichment, and learning experiences between students from different socioeconomic backgrounds.",
      },
      {
        question:
          "Why are extracurricular activities important for a student's future?",
        options: [
          "They take the place of homework",
          "They build skills, experiences, and connections that help with college applications and careers",
          "They are only for fun and have no impact",
          "They replace the need for good grades",
        ],
        correct: 1,
        explanation:
          "Extracurriculars build leadership, teamwork, communication, and discipline — skills that colleges and employers value highly. Missing them can weaken a student's long-term opportunities.",
      },
      {
        question: "Which of these best describes 'equal access' to education?",
        options: [
          "All students take the same classes",
          "Every student has a fair chance to participate in learning opportunities regardless of background",
          "Schools that are the same size",
          "Students who get the same grades",
        ],
        correct: 1,
        explanation:
          "Equal access means every student — regardless of income, race, location, or background — has a genuine opportunity to participate in quality learning experiences and enrichment activities.",
      },
      {
        question:
          "What is one action individuals can take to help increase access to programs for students?",
        options: [
          "Nothing — it's the government's problem",
          "Volunteer, mentor, or donate to organizations that support enrichment for underserved students",
          "Ignore the issue",
          "Create more selective programs",
        ],
        correct: 1,
        explanation:
          "Volunteering, mentoring, and donating to access-focused nonprofits are powerful individual actions that directly create more opportunities for students who face barriers.",
      },
      {
        question:
          "Compared to high-income peers, students from low-income families are approximately how much less likely to participate in extracurriculars?",
        options: [
          "The same",
          "Slightly less",
          "About 2 times less likely",
          "5 times less likely",
        ],
        correct: 2,
        explanation:
          "Research consistently shows that students from high-income families are approximately twice as likely to participate in extracurricular activities compared to their low-income peers.",
      },
    ],
    medium: [
      {
        question:
          "How does lack of extracurricular participation affect a student's college application?",
        options: [
          "It has no effect on college admissions",
          "It weakens the application profile and reduces scholarship eligibility, compounding disadvantage",
          "Colleges don't consider extracurriculars",
          "Students can replace them with better grades",
        ],
        correct: 1,
        explanation:
          "Many colleges explicitly value extracurriculars in admissions, and numerous scholarships require documented involvement. Students without this experience face a systematically weaker application through no fault of their own.",
      },
      {
        question: "The phrase 'systemic barrier' means:",
        options: [
          "A barrier only one student faces",
          "A structural obstacle built into policies and systems that consistently disadvantages particular groups",
          "A physical wall preventing entry",
          "A temporary problem that resolves on its own",
        ],
        correct: 1,
        explanation:
          "Systemic barriers are embedded in policies, practices, and structures — not individual prejudices. They consistently disadvantage specific groups regardless of individual intent, requiring policy-level solutions.",
      },
      {
        question:
          "Research by the Aspen Institute found that youth sports participation has declined most sharply among:",
        options: [
          "Upper-income suburban youth",
          "Low-income families and communities of color",
          "All demographics equally",
          "High-achieving students",
        ],
        correct: 1,
        explanation:
          "Aspen Institute's 'State of Play' reports document that declining youth sports participation is concentrated among low-income families and communities of color — driven by rising costs, facility closures, and transportation gaps.",
      },
      {
        question:
          "What is 'concerted cultivation' and why does it matter for equal access?",
        options: [
          "A farming technique used in schools",
          "A parenting strategy where affluent families deliberately fill children's time with structured enrichment, widening the gap with less-resourced families",
          "A curriculum design method",
          "A type of school scheduling",
        ],
        correct: 1,
        explanation:
          "Annette Lareau's 'concerted cultivation' describes how middle-class parents intentionally enroll children in numerous structured activities to build skills and social capital — a resource-intensive approach unavailable to most low-income families.",
      },
      {
        question:
          "Why is advocacy — like petitioning for policy change — important for addressing access barriers?",
        options: [
          "Individual charity alone can solve all access problems",
          "Policy changes can address barriers at scale, reaching thousands of students that individual charity cannot",
          "Advocacy is too slow to ever work",
          "Policy has no effect on school programs",
        ],
        correct: 1,
        explanation:
          "While individual donations or volunteering help specific students, policy changes — like funding mandates, fee elimination, or transportation requirements — address barriers systematically at a scale that reaches all students in a district or state.",
      },
    ],
    hard: [
      {
        question:
          "The 'participation penalty' concept argues that students excluded from extracurriculars face a compounding disadvantage because:",
        options: [
          "They have lower IQs on average",
          "Participation builds human capital, social networks, and credentials that create widening gaps in life outcomes over time",
          "Excluded students compensate through academics alone",
          "The penalty only lasts through high school",
        ],
        correct: 1,
        explanation:
          "The participation penalty describes how exclusion from extracurriculars creates cascading deficits: fewer leadership skills, thinner college applications, weaker networks, and lower social mobility — effects that compound across a lifetime.",
      },
      {
        question:
          "Research on extracurricular participation and college graduation rates shows:",
        options: [
          "No meaningful relationship between the two",
          "Students who participated in extracurriculars graduate college at significantly higher rates, with the effect strongest for first-generation students",
          "Extracurriculars reduce graduation rates by adding stress",
          "The relationship only holds for athletes",
        ],
        correct: 1,
        explanation:
          "Multiple longitudinal studies show extracurricular participation predicts higher college graduation rates — and the effect is strongest for first-generation college students, for whom structured skill-building and social integration are especially critical.",
      },
      {
        question:
          "The UN Convention on the Rights of the Child (Article 31) establishes that:",
        options: [
          "Children have the right to work from age 12",
          "Children have the right to rest, leisure, play, and participation in cultural and artistic life — a framework for equal access advocacy",
          "Education is optional for children under 12",
          "Extracurriculars should be privately funded",
        ],
        correct: 1,
        explanation:
          "Article 31 of the UNCRC establishes children's rights to play, leisure, and participation in cultural and artistic life — providing an international human rights framework for advocating equal access to enrichment opportunities.",
      },
      {
        question:
          "How do neighborhood school funding models (property tax-based) compound extracurricular access inequality?",
        options: [
          "All schools get equal funding under current law",
          "Schools in high-property-value areas receive more funding, supporting more programs and staff while low-income district schools have fewer",
          "Property taxes are unrelated to school funding",
          "Extracurriculars are funded separately from school budgets",
        ],
        correct: 1,
        explanation:
          "Property tax-based school funding means wealthier neighborhoods fund richer school programs. This systemic funding inequity directly translates to more extracurricular options, better-equipped programs, and more staff in high-income schools.",
      },
      {
        question:
          "The 'social reproduction theory' (Bourdieu) explains unequal extracurricular access by arguing:",
        options: [
          "Hard work always overcomes structural barriers",
          "Educational institutions reproduce existing class hierarchies by rewarding the cultural capital that privileged students inherit from their families",
          "Social mobility is primarily determined by genetics",
          "Schools are neutral institutions that don't reflect class",
        ],
        correct: 1,
        explanation:
          "Bourdieu's social reproduction theory argues that educational systems — including selective extracurriculars — reward the cultural capital (tastes, styles, behaviors) that privileged families transmit to children, reproducing class inequality across generations.",
      },
    ],
  },
};

const DIFFICULTY_CONFIG = {
  easy: {
    label: "Easy",
    color: "bg-emerald-500 hover:bg-emerald-600 text-white",
    badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
    description:
      "Simple questions with clear answers. Great for getting started!",
    emoji: "🌱",
  },
  medium: {
    label: "Medium",
    color: "bg-amber-500 hover:bg-amber-600 text-white",
    badge: "bg-amber-100 text-amber-800 border-amber-200",
    description: "Moderate challenge — tests solid knowledge of the topic.",
    emoji: "⚡",
  },
  hard: {
    label: "Hard",
    color: "bg-rose-500 hover:bg-rose-600 text-white",
    badge: "bg-rose-100 text-rose-800 border-rose-200",
    description:
      "Real statistics, research, and nuanced distinctions. Expert level!",
    emoji: "🔥",
  },
};

const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 60 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -60 }),
};

export default function TriviaPage() {
  const [screen, setScreen] = useState<Screen>("category");
  const [direction, setDirection] = useState(1);
  const [category, setCategory] = useState<CategoryKey | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);

  function goTo(next: Screen, dir = 1) {
    setDirection(dir);
    setScreen(next);
  }

  function selectCategory(cat: CategoryKey) {
    setCategory(cat);
    goTo("difficulty");
  }

  function selectDifficulty(diff: Difficulty) {
    if (!category) return;
    setDifficulty(diff);
    const qs = QUESTION_BANK[category][diff];
    setQuestions(qs);
    setCurrentQ(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setResults([]);
    goTo("quiz");
  }

  function handleSelect(i: number) {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    const correct = i === questions[currentQ].correct;
    if (correct) setScore((s) => s + 1);
    setResults((r) => [...r, correct]);
  }

  function handleNext() {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      goTo("results");
    }
  }

  function handleRestart() {
    if (!category || !difficulty) return;
    selectDifficulty(difficulty);
  }

  function handleChangeSettings() {
    goTo("category", -1);
    setCategory(null);
    setDifficulty(null);
  }

  const progress =
    questions.length > 0
      ? ((currentQ + (answered ? 1 : 0)) / questions.length) * 100
      : 0;

  const catInfo = CATEGORIES.find((c) => c.key === category);
  const diffInfo = difficulty ? DIFFICULTY_CONFIG[difficulty] : null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <BookOpen className="w-8 h-8 text-primary" />
          <h1 className="font-display text-3xl font-black text-foreground">
            Learning Quiz Game
          </h1>
        </div>
        <p className="text-muted-foreground">
          Choose a category and difficulty to test your knowledge on equal
          access to learning
        </p>

        {/* Breadcrumb */}
        {screen !== "category" && (
          <div className="flex items-center justify-center gap-2 mt-4 text-sm">
            <button
              type="button"
              onClick={() => goTo("category", -1)}
              className="text-primary hover:underline font-medium"
            >
              Categories
            </button>
            {catInfo && (
              <>
                <span className="text-muted-foreground">/</span>
                <span
                  className={`font-semibold ${
                    screen === "difficulty"
                      ? "text-foreground"
                      : "text-primary hover:underline cursor-pointer"
                  }`}
                  onClick={
                    screen !== "difficulty"
                      ? () => goTo("difficulty", -1)
                      : undefined
                  }
                  onKeyDown={
                    screen !== "difficulty"
                      ? (e) => e.key === "Enter" && goTo("difficulty", -1)
                      : undefined
                  }
                  role={screen !== "difficulty" ? "button" : undefined}
                  tabIndex={screen !== "difficulty" ? 0 : undefined}
                >
                  {catInfo.label}
                </span>
              </>
            )}
            {diffInfo && screen !== "difficulty" && (
              <>
                <span className="text-muted-foreground">/</span>
                <span className="font-semibold text-foreground">
                  {diffInfo.label}
                </span>
              </>
            )}
          </div>
        )}
      </motion.div>

      <AnimatePresence mode="wait" custom={direction}>
        {/* ─── CATEGORY SCREEN ─── */}
        {screen === "category" && (
          <motion.div
            key="category"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <h2 className="font-display text-xl font-bold text-center mb-6">
              Pick a Topic
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CATEGORIES.map((cat, idx) => (
                <motion.button
                  key={cat.key}
                  type="button"
                  data-ocid={`game.category.item.${idx + 1}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.07 }}
                  whileHover={{ scale: 1.03, translateY: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => selectCategory(cat.key)}
                  className={`text-left p-5 rounded-2xl border-2 ${cat.bg} ${cat.border} transition-all shadow-sm hover:shadow-md`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${cat.bg} border ${cat.border} flex items-center justify-center mb-3 ${cat.color}`}
                  >
                    {cat.icon}
                  </div>
                  <div
                    className={`font-display font-bold text-lg mb-1 ${cat.color}`}
                  >
                    {cat.label}
                  </div>
                  <div className="text-sm text-muted-foreground leading-snug">
                    {cat.description}
                  </div>
                  <div className="mt-3 text-xs font-semibold text-muted-foreground">
                    5 questions per difficulty
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ─── DIFFICULTY SCREEN ─── */}
        {screen === "difficulty" && (
          <motion.div
            key="difficulty"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <div className="text-center mb-8">
              {catInfo && (
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${catInfo.bg} ${catInfo.border} ${catInfo.color} font-semibold mb-4`}
                >
                  {catInfo.icon}
                  {catInfo.label}
                </div>
              )}
              <h2 className="font-display text-2xl font-bold">
                Choose Your Difficulty
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {(
                Object.entries(DIFFICULTY_CONFIG) as [
                  Difficulty,
                  typeof DIFFICULTY_CONFIG.easy,
                ][]
              ).map(([key, cfg], idx) => (
                <motion.button
                  key={key}
                  type="button"
                  data-ocid={`game.difficulty.${key}.button`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => selectDifficulty(key)}
                  className={`${cfg.color} rounded-2xl p-7 flex flex-col items-center gap-3 font-display font-bold text-xl shadow-md transition-all`}
                >
                  <span className="text-4xl">{cfg.emoji}</span>
                  <span>{cfg.label}</span>
                  <p className="text-sm font-normal opacity-90 text-center leading-snug">
                    {cfg.description}
                  </p>
                </motion.button>
              ))}
            </div>

            <div className="text-center mt-8">
              <button
                type="button"
                onClick={() => goTo("category", -1)}
                className="text-muted-foreground hover:text-foreground text-sm underline-offset-2 hover:underline"
              >
                ← Back to categories
              </button>
            </div>
          </motion.div>
        )}

        {/* ─── QUIZ SCREEN ─── */}
        {screen === "quiz" && questions.length > 0 && (
          <motion.div
            key="quiz"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            {/* Progress header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {catInfo && (
                    <Badge className={`${catInfo.badge} border`}>
                      {catInfo.label}
                    </Badge>
                  )}
                  {diffInfo && (
                    <Badge className={`${diffInfo.badge} border`}>
                      {diffInfo.emoji} {diffInfo.label}
                    </Badge>
                  )}
                </div>
                <span className="text-sm text-muted-foreground">
                  {currentQ + 1} / {questions.length}
                </span>
              </div>
              <Progress value={progress} className="h-3" />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-muted-foreground">
                  {score} correct
                </span>
                <span className="text-xs text-muted-foreground">
                  {questions.length - currentQ - (answered ? 1 : 0)} remaining
                </span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQ}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.28 }}
              >
                <Card className="border-0 shadow-card mb-6">
                  <CardContent className="p-8">
                    <p className="font-display text-xl font-bold text-foreground mb-8 leading-snug">
                      {questions[currentQ].question}
                    </p>

                    <div className="space-y-3">
                      {questions[currentQ].options.map((opt, i) => {
                        let style =
                          "border-2 border-border bg-white hover:border-primary/50 hover:bg-primary/5";
                        if (answered) {
                          if (i === questions[currentQ].correct)
                            style = "border-2 border-emerald-500 bg-emerald-50";
                          else if (i === selected)
                            style = "border-2 border-rose-400 bg-rose-50";
                          else
                            style =
                              "border-2 border-border bg-white opacity-50";
                        } else if (selected === i) {
                          style = "border-2 border-primary bg-primary/10";
                        }

                        return (
                          <button
                            type="button"
                            key={opt}
                            onClick={() => handleSelect(i)}
                            disabled={answered}
                            data-ocid={`game.answer.item.${i + 1}`}
                            className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all cursor-pointer disabled:cursor-default ${style}`}
                          >
                            <span className="inline-flex items-center gap-3">
                              <span
                                className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 ${
                                  answered && i === questions[currentQ].correct
                                    ? "border-emerald-500 bg-emerald-500 text-white"
                                    : answered && i === selected
                                      ? "border-rose-400 bg-rose-400 text-white"
                                      : "border-current"
                                }`}
                              >
                                {["A", "B", "C", "D"][i]}
                              </span>
                              {opt}
                              {answered &&
                                i === questions[currentQ].correct && (
                                  <CheckCircle className="w-4 h-4 text-emerald-600 ml-auto shrink-0" />
                                )}
                              {answered &&
                                i === selected &&
                                i !== questions[currentQ].correct && (
                                  <XCircle className="w-4 h-4 text-rose-500 ml-auto shrink-0" />
                                )}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {answered && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mt-6 p-4 rounded-xl text-sm ${
                          selected === questions[currentQ].correct
                            ? "bg-emerald-50 border border-emerald-200"
                            : "bg-rose-50 border border-rose-200"
                        }`}
                      >
                        <strong>
                          {selected === questions[currentQ].correct
                            ? "✓ Correct!"
                            : "✗ Incorrect"}
                        </strong>
                        <p className="mt-1 text-muted-foreground">
                          {questions[currentQ].explanation}
                        </p>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>

                {answered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                  >
                    <Button
                      size="lg"
                      onClick={handleNext}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      data-ocid="game.next.button"
                    >
                      {currentQ < questions.length - 1
                        ? "Next Question"
                        : "See Results"}
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        {/* ─── RESULTS SCREEN ─── */}
        {screen === "results" && (
          <motion.div
            key="results"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  damping: 12,
                  stiffness: 200,
                  delay: 0.1,
                }}
                className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4"
              >
                <Trophy className="w-12 h-12 text-accent" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <h1 className="font-display text-4xl font-black mb-2">
                  Quiz Complete!
                </h1>
                <div className="flex items-center justify-center gap-3 mb-4">
                  {catInfo && (
                    <Badge className={`${catInfo?.badge} border`}>
                      {catInfo.label}
                    </Badge>
                  )}
                  {diffInfo && (
                    <Badge className={`${diffInfo?.badge} border`}>
                      {diffInfo.emoji} {diffInfo.label}
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground text-lg">
                  You scored {score} out of {questions.length}
                </p>
                <div className="mt-4">
                  <div className="font-display text-6xl font-black text-primary">
                    {Math.round((score / questions.length) * 100)}%
                  </div>
                  <p className="text-muted-foreground mt-1">
                    {(() => {
                      const pct = Math.round((score / questions.length) * 100);
                      if (pct >= 90)
                        return "Outstanding! You're an expert on this topic. 🌟";
                      if (pct >= 70)
                        return "Great job! You have a solid understanding. 👏";
                      if (pct >= 50)
                        return "Good effort! There's more to learn. 📚";
                      return "Keep learning — this issue matters deeply! 💪";
                    })()}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Review answers */}
            <Card className="border-0 shadow-card mb-6">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-display font-bold text-lg mb-4">
                  Review Your Answers
                </h3>
                {questions.map((q, i) => (
                  <motion.div
                    key={q.question.slice(0, 30)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.06 }}
                    className={`p-4 rounded-xl border-2 ${
                      results[i]
                        ? "border-emerald-200 bg-emerald-50"
                        : "border-rose-200 bg-rose-50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {results[i] ? (
                        <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-500 mt-0.5 shrink-0" />
                      )}
                      <div>
                        <p className="font-semibold text-sm mb-1">
                          {q.question}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          <strong>Correct answer:</strong>{" "}
                          {q.options[q.correct]}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {q.explanation}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleRestart}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                data-ocid="game.restart.button"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Play Again (Same Settings)
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleChangeSettings}
                data-ocid="game.change_settings.button"
              >
                <Settings className="w-4 h-4 mr-2" />
                Change Settings
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
