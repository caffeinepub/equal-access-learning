import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";

const BARRIERS = [
  "Cost",
  "Transportation",
  "Time / Schedule Conflicts",
  "Selectivity",
  "Awareness",
  "Disability / Accessibility",
  "Language Barriers",
  "Technology Access",
];

const STATISTICS = [
  "Tutoring costs $30–$85/hour",
  "74% of low-income students can't afford extracurriculars",
  "1 in 5 rural students miss opportunities due to distance",
  "60% of families are unaware of available programs",
  "1 in 5 students lack home internet access",
];

const VALUES_QUESTIONS = [
  {
    q: "What matters most to improving learning access?",
    options: [
      "Lower program costs",
      "Better transportation",
      "More flexible scheduling",
      "Increased awareness outreach",
    ],
  },
  {
    q: "Who should lead efforts to fix access barriers?",
    options: [
      "Government & policymakers",
      "Schools & educators",
      "Community organizations",
      "Parents & families",
    ],
  },
];

function ratingLabel(v: number) {
  return [
    "Not serious",
    "Slightly serious",
    "Moderately serious",
    "Very serious",
    "Extremely serious",
  ][v - 1];
}

export default function SurveyPage() {
  const { actor } = useActor();
  const [section, setSection] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedBarriers, setSelectedBarriers] = useState<string[]>([]);
  const [ratings, setRatings] = useState<number[]>(BARRIERS.map(() => 3));
  const [statReactions, setStatReactions] = useState<
    ("agree" | "disagree" | "unsure" | null)[]
  >(STATISTICS.map(() => null));
  const [valueSelections, setValueSelections] = useState<string[]>(
    VALUES_QUESTIONS.map(() => ""),
  );
  const [reflection, setReflection] = useState("");

  function toggleBarrier(b: string) {
    setSelectedBarriers((prev) =>
      prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b],
    );
  }

  async function handleSubmit() {
    if (!actor) {
      toast.error("Not connected to backend");
      return;
    }
    setLoading(true);
    try {
      const id = crypto.randomUUID();
      await actor.submitSurvey(id, {
        barriers: selectedBarriers,
        ratings: ratings.map(BigInt),
        statistics: statReactions.map((r) => r === "agree"),
        values: valueSelections,
        reflection,
      });
      setSubmitted(true);
      toast.success("Survey submitted! Thank you.");
    } catch {
      toast.error("Failed to submit survey. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div
        className="max-w-2xl mx-auto px-4 py-20 text-center"
        data-ocid="survey.success_state"
      >
        <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
        <h2 className="font-display text-3xl font-bold text-gray-800 mb-3">
          Thank you!
        </h2>
        <p className="text-gray-500">
          Your survey response has been recorded. Your voice helps raise
          awareness and drive change.
        </p>
      </div>
    );
  }

  const sections = [
    <div key="barriers">
      <h2 className="font-display text-2xl font-bold text-gray-800 mb-2">
        Section 1: Barriers Experienced
      </h2>
      <p className="text-gray-500 mb-6 text-sm">
        Which of these barriers have you or someone you know experienced? Select
        all that apply.
      </p>
      <div className="flex flex-wrap gap-3">
        {BARRIERS.map((b) => (
          <button
            key={b}
            type="button"
            onClick={() => toggleBarrier(b)}
            data-ocid="survey.toggle"
            className={`option-bubble ${selectedBarriers.includes(b) ? "selected" : ""}`}
          >
            {b}
          </button>
        ))}
      </div>
    </div>,

    <div key="ratings">
      <h2 className="font-display text-2xl font-bold text-gray-800 mb-2">
        Section 2: Rate the Seriousness
      </h2>
      <p className="text-gray-500 mb-6 text-sm">
        How serious is each barrier? (1 = Not serious, 5 = Extremely serious)
      </p>
      <div className="space-y-5">
        {BARRIERS.map((b, i) => (
          <div key={b}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">{b}</span>
              <span className="text-sm text-brand-red font-semibold">
                {ratings[i]} — {ratingLabel(ratings[i])}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={5}
              step={1}
              value={ratings[i]}
              onChange={(e) => {
                const updated = [...ratings];
                updated[i] = Number(e.target.value);
                setRatings(updated);
              }}
              data-ocid="survey.input"
              className="w-full"
              style={{ accentColor: "#dc2626" }}
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
          </div>
        ))}
      </div>
    </div>,

    <div key="stats">
      <h2 className="font-display text-2xl font-bold text-gray-800 mb-2">
        Section 3: React to the Statistics
      </h2>
      <p className="text-gray-500 mb-6 text-sm">
        Do these statistics surprise you?
      </p>
      <div className="space-y-5">
        {STATISTICS.map((s, i) => (
          <div key={s} className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-800 mb-3">📊 {s}</p>
            <div className="flex flex-wrap gap-2">
              {(["agree", "unsure", "disagree"] as const).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    const updated = [...statReactions];
                    updated[i] = opt;
                    setStatReactions(updated);
                  }}
                  data-ocid="survey.toggle"
                  className={`option-bubble ${statReactions[i] === opt ? "selected" : ""}`}
                >
                  {opt === "agree"
                    ? "Agree"
                    : opt === "unsure"
                      ? "Unsure"
                      : "Disagree"}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>,

    <div key="values">
      <h2 className="font-display text-2xl font-bold text-gray-800 mb-2">
        Section 4: Your Values
      </h2>
      <p className="text-gray-500 mb-6 text-sm">
        Select the answer that best reflects your views.
      </p>
      <div className="space-y-8">
        {VALUES_QUESTIONS.map((vq, i) => (
          <div key={vq.q}>
            <p className="font-medium text-gray-800 mb-3">{vq.q}</p>
            <div className="flex flex-wrap gap-3">
              {vq.options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    const updated = [...valueSelections];
                    updated[i] = opt;
                    setValueSelections(updated);
                  }}
                  data-ocid="survey.toggle"
                  className={`option-bubble ${valueSelections[i] === opt ? "selected" : ""}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>,

    <div key="reflection">
      <h2 className="font-display text-2xl font-bold text-gray-800 mb-2">
        Section 5: Open Reflection
      </h2>
      <p className="text-gray-500 mb-6 text-sm">
        In your own words — what should change to improve equal access to
        learning?
      </p>
      <Textarea
        placeholder="Share your thoughts here..."
        value={reflection}
        onChange={(e) => setReflection(e.target.value)}
        data-ocid="survey.textarea"
        rows={6}
        className="border-2 border-brand-red focus:ring-brand-red"
      />
    </div>,
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="font-display text-4xl font-bold text-gray-800 mb-2">
          Learning Access Survey
        </h1>
        <p className="text-gray-500">
          5 sections · ~5 minutes · Your responses help drive change
        </p>
      </div>

      <div className="flex items-center gap-1 mb-8">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-colors ${i <= section ? "bg-brand-red" : "bg-gray-200"}`}
          />
        ))}
      </div>

      <div className="bg-white border border-gray-100 rounded-xl p-6 md:p-8 shadow-card min-h-[300px]">
        {sections[section]}
      </div>

      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={() => setSection((s) => Math.max(0, s - 1))}
          disabled={section === 0}
          data-ocid="survey.secondary_button"
        >
          Back
        </Button>
        {section < 4 ? (
          <Button
            onClick={() => setSection((s) => s + 1)}
            data-ocid="survey.primary_button"
            className="bg-brand-red hover:bg-brand-red-dark text-white"
          >
            Next Section
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={loading || !actor}
            data-ocid="survey.submit_button"
            className="bg-brand-red hover:bg-brand-red-dark text-white"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Survey"
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
