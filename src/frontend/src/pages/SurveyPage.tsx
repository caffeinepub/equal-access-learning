import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type Page = "home" | "issue" | "survey" | "trivia" | "advocate" | "resources";

interface Props {
  onNavigate: (page: Page) => void;
}

interface SurveyAnswers {
  inClub: string;
  wantedClub: string;
  clubReasons: string[];
  outOfSchool: string;
  wantedOutOfSchool: string;
  outOfSchoolReasons: string[];
  costRating: number;
  transportRating: number;
  selectiveRating: number;
  equalAccess: string;
  mostResponsible: string;
  schoolsDoEnough: string;
  surprisedFact1: string;
  fairFact2: string;
  priorityFact3: string;
  systemView: string;
  witnessedExclusion: string;
  freeClubs: string;
  personalImportance: number;
  willingToHelp: string;
  biggestBarrier: string;
  desiredChange: string;
  otherThoughts: string;
}

const defaultAnswers: SurveyAnswers = {
  inClub: "",
  wantedClub: "",
  clubReasons: [],
  outOfSchool: "",
  wantedOutOfSchool: "",
  outOfSchoolReasons: [],
  costRating: 0,
  transportRating: 0,
  selectiveRating: 0,
  equalAccess: "",
  mostResponsible: "",
  schoolsDoEnough: "",
  surprisedFact1: "",
  fairFact2: "",
  priorityFact3: "",
  systemView: "",
  witnessedExclusion: "",
  freeClubs: "",
  personalImportance: 0,
  willingToHelp: "",
  biggestBarrier: "",
  desiredChange: "",
  otherThoughts: "",
};

const clubReasonOptions = [
  "Cost of dues/materials",
  "No transportation",
  "Time conflict with work or family",
  "Didn't make the tryout/selection",
  "Felt unwelcome or excluded",
  "Club didn't match my interests",
  "Disability or accessibility issues",
  "Language or cultural barriers",
  "Didn't know about the opportunity",
  "Lack of parental support or awareness",
  "Other",
];

const outOfSchoolReasonOptions = [
  "Too expensive",
  "No transportation available",
  "No programs in my area",
  "Program was full or selective",
  "Conflicted with family/work schedule",
  "Lack of awareness/information",
  "Disability or accessibility issues",
  "Language or cultural barriers",
  "Didn't qualify for financial aid",
  "Safety concerns in getting there",
  "Other",
];

const systemViewOptions = [
  "The system is deeply unfair and needs major structural reform",
  "There are real issues, but targeted fixes can make a difference",
  "The system is mostly fair — hard work determines outcomes",
  "It depends greatly on the school district and region",
  "I don't know enough about the issue to say",
];

function RadioGroup({
  options,
  value,
  onChange,
  name,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  name: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          data-ocid={`survey.${name}.radio`}
          className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
            value === opt
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-white text-foreground hover:border-primary/50"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function RatingRow({
  label,
  value,
  onChange,
  name,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  name: string;
}) {
  return (
    <div className="space-y-2">
      <Label className="font-medium text-foreground">{label}</Label>
      <div className="flex gap-2 flex-wrap">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            data-ocid={`survey.${name}.radio`}
            className={`w-12 h-12 rounded-xl border-2 font-bold text-sm transition-all ${
              value === n
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-white text-foreground hover:border-primary/50"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="flex justify-between text-xs text-muted-foreground px-1">
        <span>Not at all</span>
        <span>Extremely</span>
      </div>
    </div>
  );
}

function StarRating({
  value,
  onChange,
  name,
}: { value: number; onChange: (v: number) => void; name: string }) {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          data-ocid={`survey.${name}.radio`}
          className="transition-transform hover:scale-110"
        >
          <Star
            className={`w-8 h-8 transition-colors ${
              n <= value
                ? "fill-accent text-accent"
                : "fill-none text-muted-foreground"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

function MultiCheckbox({
  options,
  selected,
  onChange,
  name,
}: {
  options: string[];
  selected: string[];
  onChange: (v: string[]) => void;
  name: string;
}) {
  function toggle(opt: string) {
    if (selected.includes(opt)) {
      onChange(selected.filter((s) => s !== opt));
    } else {
      onChange([...selected, opt]);
    }
  }
  return (
    <div className="grid sm:grid-cols-2 gap-2">
      {options.map((opt) => (
        <div
          key={opt}
          className="flex items-center gap-2 p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
        >
          <Checkbox
            id={`${name}-${opt}`}
            checked={selected.includes(opt)}
            onCheckedChange={() => toggle(opt)}
            data-ocid={`survey.${name}.checkbox`}
          />
          <Label htmlFor={`${name}-${opt}`} className="text-sm cursor-pointer">
            {opt}
          </Label>
        </div>
      ))}
    </div>
  );
}

const sectionTitles = [
  "Your Experience",
  "Barriers & Opinions",
  "Statistics & Your Reaction",
  "Values & Deeper Opinions",
  "Reflection",
];

const aggregateStats = [
  {
    label: "Agree cost is a major barrier to learning opportunities",
    value: 82,
  },
  {
    label: "Believe all students deserve equal access to extracurriculars",
    value: 91,
  },
  { label: "Would be willing to volunteer, donate, or advocate", value: 74 },
  {
    label: "Have personally witnessed someone being excluded due to cost",
    value: 68,
  },
  {
    label: "Think selective processes unfairly advantage wealthy students",
    value: 79,
  },
  {
    label: "Believe schools don't do enough to make clubs accessible",
    value: 65,
  },
  { label: "Think closing this gap should be a national priority", value: 87 },
];

export default function SurveyPage({ onNavigate }: Props) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<SurveyAnswers>(defaultAnswers);
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof SurveyAnswers>(
    key: K,
    value: SurveyAnswers[K],
  ) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function nextStep() {
    if (step < 4) setStep(step + 1);
    else setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function prevStep() {
    if (step > 0) setStep(step - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const progress = ((step + 1) / 5) * 100;

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="font-display text-4xl font-black mb-2">
              Thank You!
            </h1>
            <p className="text-muted-foreground text-lg">
              Your voice matters. Here's what others think too.
            </p>
          </div>

          <Card className="border-0 shadow-card mb-6">
            <CardHeader>
              <CardTitle className="font-display text-xl">
                You're Not Alone — Here's What Others Think
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {aggregateStats.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-foreground">{item.label}</span>
                    <span className="font-bold text-primary">
                      {item.value}%
                    </span>
                  </div>
                  <Progress value={item.value} className="h-2.5" />
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="bg-primary/10 rounded-xl p-6 text-center">
            <p className="font-semibold text-foreground mb-4">
              Ready to make a difference?
            </p>
            <Button
              size="lg"
              onClick={() => onNavigate("advocate")}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              data-ocid="survey.see_how_to_help.primary_button"
            >
              See How You Can Help
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-2">
          <Badge className="bg-primary/10 text-primary border-primary/20">
            Section {step + 1} of 5
          </Badge>
          <span className="text-sm text-muted-foreground font-medium">
            {Math.round(progress)}% complete
          </span>
        </div>
        <Progress
          value={progress}
          className="h-3 mb-4"
          data-ocid="survey.progress.loading_state"
        />
        <div className="flex gap-2 overflow-x-auto pb-1">
          {sectionTitles.map((title, i) => (
            <div
              key={title}
              className={`text-xs px-3 py-1 rounded-full whitespace-nowrap font-medium transition-colors ${
                i === step
                  ? "bg-primary text-white"
                  : i < step
                    ? "bg-green-100 text-green-700"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {i < step ? "✓ " : ""}
              {title}
            </div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-0 shadow-card">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-display font-bold">
                  {step + 1}
                </div>
                <CardTitle className="font-display text-2xl">
                  {sectionTitles[step]}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Section 1 — Your Experience */}
              {step === 0 && (
                <>
                  <div className="space-y-3">
                    <Label className="font-semibold text-base">
                      Are you currently a member of any school clubs?
                    </Label>
                    <RadioGroup
                      name="inClub"
                      options={["Yes", "No", "I'm not currently in school"]}
                      value={answers.inClub}
                      onChange={(v) => update("inClub", v)}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="font-semibold text-base">
                      Have you ever wanted to join a club but couldn't?
                    </Label>
                    <RadioGroup
                      name="wantedClub"
                      options={["Yes", "No", "Not sure"]}
                      value={answers.wantedClub}
                      onChange={(v) => update("wantedClub", v)}
                    />
                  </div>

                  {answers.wantedClub === "Yes" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-3"
                    >
                      <Label className="font-semibold text-base">
                        Which reasons applied?{" "}
                        <span className="text-muted-foreground font-normal">
                          (Select all that apply)
                        </span>
                      </Label>
                      <MultiCheckbox
                        name="clubReasons"
                        options={clubReasonOptions}
                        selected={answers.clubReasons}
                        onChange={(v) => update("clubReasons", v)}
                      />
                    </motion.div>
                  )}

                  <div className="space-y-3">
                    <Label className="font-semibold text-base">
                      Have you participated in any out-of-school activities
                      (camps, sports, arts, tutoring, etc.)?
                    </Label>
                    <RadioGroup
                      name="outOfSchool"
                      options={[
                        "Yes, regularly",
                        "Yes, occasionally",
                        "No, but I wanted to",
                        "No",
                      ]}
                      value={answers.outOfSchool}
                      onChange={(v) => update("outOfSchool", v)}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="font-semibold text-base">
                      Have you ever wanted to attend an out-of-school program
                      but couldn't?
                    </Label>
                    <RadioGroup
                      name="wantedOutOfSchool"
                      options={["Yes", "No", "Not sure"]}
                      value={answers.wantedOutOfSchool}
                      onChange={(v) => update("wantedOutOfSchool", v)}
                    />
                  </div>

                  {answers.wantedOutOfSchool === "Yes" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-3"
                    >
                      <Label className="font-semibold text-base">
                        Why couldn't you attend?{" "}
                        <span className="text-muted-foreground font-normal">
                          (Select all that apply)
                        </span>
                      </Label>
                      <MultiCheckbox
                        name="outOfSchoolReasons"
                        options={outOfSchoolReasonOptions}
                        selected={answers.outOfSchoolReasons}
                        onChange={(v) => update("outOfSchoolReasons", v)}
                      />
                    </motion.div>
                  )}
                </>
              )}

              {/* Section 2 — Barriers & Opinions */}
              {step === 1 && (
                <>
                  <RatingRow
                    label="How much does COST prevent students from accessing learning opportunities?"
                    value={answers.costRating}
                    onChange={(v) => update("costRating", v)}
                    name="costRating"
                  />
                  <RatingRow
                    label="How much does TRANSPORTATION prevent students from accessing programs?"
                    value={answers.transportRating}
                    onChange={(v) => update("transportRating", v)}
                    name="transportRating"
                  />
                  <RatingRow
                    label="How much do SELECTIVE PROCESSES (tryouts, applications) create barriers?"
                    value={answers.selectiveRating}
                    onChange={(v) => update("selectiveRating", v)}
                    name="selectiveRating"
                  />

                  <div className="space-y-3">
                    <Label className="font-semibold text-base">
                      Do you believe all students should have equal access to
                      learning opportunities?
                    </Label>
                    <RadioGroup
                      name="equalAccess"
                      options={[
                        "Strongly Agree",
                        "Agree",
                        "Neutral",
                        "Disagree",
                        "Strongly Disagree",
                      ]}
                      value={answers.equalAccess}
                      onChange={(v) => update("equalAccess", v)}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="font-semibold text-base">
                      Who is MOST responsible for closing the access gap?
                    </Label>
                    <RadioGroup
                      name="mostResponsible"
                      options={[
                        "Schools",
                        "Government / Policy Makers",
                        "Nonprofits / Community Orgs",
                        "Parents / Families",
                        "Everyone Equally",
                        "Not Sure",
                      ]}
                      value={answers.mostResponsible}
                      onChange={(v) => update("mostResponsible", v)}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="font-semibold text-base">
                      Do you think schools currently do enough to make clubs and
                      activities accessible?
                    </Label>
                    <RadioGroup
                      name="schoolsDoEnough"
                      options={[
                        "Yes, they do enough",
                        "Somewhat — some schools do",
                        "No, most schools fall short",
                        "Unsure",
                      ]}
                      value={answers.schoolsDoEnough}
                      onChange={(v) => update("schoolsDoEnough", v)}
                    />
                  </div>
                </>
              )}

              {/* Section 3 — Statistics & Your Reaction */}
              {step === 2 && (
                <div className="space-y-6">
                  {/* Fact 1 */}
                  <Card className="border-l-4 border-primary bg-primary/5 border-t-0 border-r-0 border-b-0 rounded-l-none shadow-none">
                    <CardContent className="p-5">
                      <div className="text-xs font-bold text-primary uppercase tracking-wide mb-2">
                        Did You Know? 📊
                      </div>
                      <p className="font-semibold text-foreground mb-4">
                        Students from high-income families are{" "}
                        <strong>2x more likely</strong> to participate in
                        extracurriculars than low-income peers.
                      </p>
                      <Label className="font-medium block mb-2">
                        Does this surprise you?
                      </Label>
                      <RadioGroup
                        name="surprisedFact1"
                        options={[
                          "Not at all — I knew this",
                          "Somewhat surprised",
                          "Very surprised",
                          "I'm not sure",
                        ]}
                        value={answers.surprisedFact1}
                        onChange={(v) => update("surprisedFact1", v)}
                      />
                    </CardContent>
                  </Card>

                  {/* Fact 2 */}
                  <Card className="border-l-4 border-orange-400 bg-orange-50 border-t-0 border-r-0 border-b-0 rounded-l-none shadow-none">
                    <CardContent className="p-5">
                      <div className="text-xs font-bold text-orange-600 uppercase tracking-wide mb-2">
                        By the Numbers 📉
                      </div>
                      <p className="font-semibold text-foreground mb-4">
                        Only <strong>19%</strong> of high school students from
                        low-income households participate in school sports,
                        compared to <strong>40%</strong> from high-income
                        households.
                      </p>
                      <Label className="font-medium block mb-2">
                        Do you think this gap is fair?
                      </Label>
                      <RadioGroup
                        name="fairFact2"
                        options={[
                          "Yes, it reflects individual effort",
                          "No, it reflects systemic inequality",
                          "It's complicated",
                          "I'm not sure",
                        ]}
                        value={answers.fairFact2}
                        onChange={(v) => update("fairFact2", v)}
                      />
                    </CardContent>
                  </Card>

                  {/* Fact 3 */}
                  <Card className="border-l-4 border-green-500 bg-green-50 border-t-0 border-r-0 border-b-0 rounded-l-none shadow-none">
                    <CardContent className="p-5">
                      <div className="text-xs font-bold text-green-700 uppercase tracking-wide mb-2">
                        The Impact 🚀
                      </div>
                      <p className="font-semibold text-foreground mb-4">
                        Participation in extracurriculars is linked to a{" "}
                        <strong>400% increase</strong> in college attendance
                        rates for at-risk youth.
                      </p>
                      <Label className="font-medium block mb-2">
                        Should closing this gap be a national priority?
                      </Label>
                      <RadioGroup
                        name="priorityFact3"
                        options={[
                          "Definitely yes",
                          "Probably yes",
                          "Not sure",
                          "Probably not",
                          "Definitely not",
                        ]}
                        value={answers.priorityFact3}
                        onChange={(v) => update("priorityFact3", v)}
                      />
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Section 4 — Values & Deeper Opinions */}
              {step === 3 && (
                <>
                  <div className="space-y-3">
                    <Label className="font-semibold text-base">
                      Which best describes your view of the current education
                      system regarding access?
                    </Label>
                    <div className="space-y-2">
                      {systemViewOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => update("systemView", opt)}
                          data-ocid="survey.systemView.radio"
                          className={`w-full text-left p-4 rounded-xl border-2 text-sm font-medium transition-all ${
                            answers.systemView === opt
                              ? "border-primary bg-primary/5"
                              : "border-border bg-white hover:border-primary/50"
                          }`}
                        >
                          {answers.systemView === opt ? "✓ " : ""}
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="font-semibold text-base">
                      Have you personally witnessed someone being excluded from
                      an opportunity due to cost, resources, or inequality?
                    </Label>
                    <RadioGroup
                      name="witnessedExclusion"
                      options={[
                        "Yes, definitely",
                        "Yes, I think so",
                        "No",
                        "Maybe — I'm not sure",
                      ]}
                      value={answers.witnessedExclusion}
                      onChange={(v) => update("witnessedExclusion", v)}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="font-semibold text-base">
                      Should school clubs and extracurricular programs be fully
                      free for students?
                    </Label>
                    <RadioGroup
                      name="freeClubs"
                      options={[
                        "Yes, free for all students",
                        "Only free for low-income students",
                        "Subsidized but not fully free",
                        "No, students should contribute",
                        "Not sure",
                      ]}
                      value={answers.freeClubs}
                      onChange={(v) => update("freeClubs", v)}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="font-semibold text-base">
                      How personally important is it to you to help address this
                      issue?
                    </Label>
                    <StarRating
                      value={answers.personalImportance}
                      onChange={(v) => update("personalImportance", v)}
                      name="personalImportance"
                    />
                    {answers.personalImportance > 0 && (
                      <p className="text-sm text-muted-foreground">
                        {
                          [
                            "Not important",
                            "Slightly important",
                            "Moderately important",
                            "Very important",
                            "Extremely important",
                          ][answers.personalImportance - 1]
                        }
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label className="font-semibold text-base">
                      Would you be willing to volunteer, donate, or advocate to
                      help close the opportunity gap?
                    </Label>
                    <RadioGroup
                      name="willingToHelp"
                      options={[
                        "Definitely yes",
                        "Probably yes",
                        "Maybe",
                        "Probably not",
                        "No",
                      ]}
                      value={answers.willingToHelp}
                      onChange={(v) => update("willingToHelp", v)}
                    />
                  </div>
                </>
              )}

              {/* Section 5 — Reflection */}
              {step === 4 && (
                <>
                  <div className="space-y-3">
                    <Label className="font-semibold text-base">
                      In your opinion, what is the single biggest barrier to
                      equal learning opportunities?
                    </Label>
                    <Textarea
                      placeholder="Share your thoughts here..."
                      value={answers.biggestBarrier}
                      onChange={(e) => update("biggestBarrier", e.target.value)}
                      className="min-h-[100px] resize-none"
                      data-ocid="survey.biggestBarrier.textarea"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="font-semibold text-base">
                      What single change would you most like to see to improve
                      access to learning opportunities?
                    </Label>
                    <Textarea
                      placeholder="Be as specific or broad as you like..."
                      value={answers.desiredChange}
                      onChange={(e) => update("desiredChange", e.target.value)}
                      className="min-h-[100px] resize-none"
                      data-ocid="survey.desiredChange.textarea"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="font-semibold text-base">
                      Any other thoughts, stories, or ideas?{" "}
                      <span className="text-muted-foreground font-normal">
                        (Optional)
                      </span>
                    </Label>
                    <Textarea
                      placeholder="Anything else you'd like to share..."
                      value={answers.otherThoughts}
                      onChange={(e) => update("otherThoughts", e.target.value)}
                      className="min-h-[80px] resize-none"
                      data-ocid="survey.otherThoughts.textarea"
                    />
                  </div>

                  <div className="bg-primary/5 rounded-xl p-4 text-sm text-muted-foreground">
                    <strong className="text-foreground">
                      Thank you for completing this survey.
                    </strong>{" "}
                    Your responses are anonymous and help raise awareness about
                    the opportunity gap in education.
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={step === 0}
              className="flex items-center gap-2"
              data-ocid="survey.prev.button"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            <Button
              type="button"
              onClick={nextStep}
              className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
              data-ocid={
                step === 4
                  ? "survey.submit.submit_button"
                  : "survey.next.button"
              }
            >
              {step === 4 ? "Submit Survey" : "Next Section"}
              {step < 4 && <ChevronRight className="w-4 h-4" />}
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
