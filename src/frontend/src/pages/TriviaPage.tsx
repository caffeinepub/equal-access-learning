import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, RotateCcw, Trophy, XCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const questions: Question[] = [
  {
    question:
      "Compared to high-income peers, how much less likely are low-income students to participate in extracurriculars?",
    options: [
      "About 10% less likely",
      "2x less likely",
      "5x less likely",
      "About the same",
    ],
    correct: 1,
    explanation:
      "Research consistently shows students from high-income families are approximately 2x more likely to participate in extracurricular activities than their low-income peers.",
  },
  {
    question:
      "Which barrier is most commonly cited as the top reason students can't join school clubs?",
    options: [
      "Lack of interest",
      "Cost",
      "Distance from school",
      "Age restrictions",
    ],
    correct: 1,
    explanation:
      "Cost — including dues, uniforms, materials, and fees — is overwhelmingly cited as the #1 barrier preventing students from joining clubs and extracurricular activities.",
  },
  {
    question:
      "By approximately how much does participation in extracurriculars increase college attendance rates for at-risk youth?",
    options: ["50%", "100%", "400%", "200%"],
    correct: 2,
    explanation:
      "Studies show that participation in extracurricular activities is linked to a 400% increase in college attendance rates for at-risk youth — one of the most powerful interventions available.",
  },
  {
    question:
      "What type of organization typically runs after-school clubs and community programs?",
    options: [
      "For-profit corporations",
      "Government agencies",
      "Nonprofits",
      "Universities",
    ],
    correct: 2,
    explanation:
      "The vast majority of after-school clubs and enrichment programs are run by nonprofits, often underfunded and understaffed, relying heavily on volunteers and donations.",
  },
  {
    question:
      "Which group of students faces the most barriers to extracurricular access?",
    options: [
      "Urban high-income students",
      "Rural and low-income students",
      "Private school students",
      "Graduate students",
    ],
    correct: 1,
    explanation:
      "Rural and low-income students face the most compounded barriers — including cost, transportation, lack of nearby programs, and fewer resources — making access especially difficult.",
  },
  {
    question:
      "What is a major consequence of missing extracurricular activities for a student's college application?",
    options: [
      "Lower GPA",
      "Weaker overall application profile",
      "No scholarship eligibility",
      "Both B and C",
    ],
    correct: 3,
    explanation:
      "Missing extracurriculars leads to both a weaker application profile (fewer leadership experiences, less demonstrated passion) and reduced scholarship eligibility, as many scholarships require extracurricular involvement.",
  },
  {
    question:
      "Why can selective processes like tryouts create unequal barriers?",
    options: [
      "They are unfair to all students equally",
      "They favor students with prior training and resources",
      "They take too much time to complete",
      "Schools don't actually use tryouts",
    ],
    correct: 1,
    explanation:
      "Tryouts and competitive auditions advantage students who have already had private coaching, lessons, or training — resources that require money. This creates a cycle that perpetuates inequality.",
  },
  {
    question:
      "Transportation is especially a barrier for students living in which type of area?",
    options: ["Cities", "Suburbs", "Rural areas", "All areas equally"],
    correct: 2,
    explanation:
      "Rural students face the greatest transportation challenges because programs are often far away and public transit is unavailable, making even free programs effectively inaccessible.",
  },
  {
    question: "What is the 'opportunity gap' in the context of education?",
    options: [
      "The time between school years",
      "Disparity in access to resources and enrichment between students",
      "The difference between students' grades",
      "None of the above",
    ],
    correct: 1,
    explanation:
      "The opportunity gap refers to the systemic disparity in access to resources, enrichment activities, and learning opportunities between students from different socioeconomic backgrounds.",
  },
  {
    question:
      "Which of the following is NOT commonly listed as a barrier to learning access?",
    options: [
      "Cost of participation",
      "Having too many club options",
      "Transportation challenges",
      "Selective tryout processes",
    ],
    correct: 1,
    explanation:
      "Having 'too many club options' is not a documented barrier — it's actually a privilege. The real barriers are cost, transportation, selectivity, time conflicts, and lack of awareness.",
  },
];

export default function TriviaPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [finished, setFinished] = useState(false);

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
      setFinished(true);
    }
  }

  function handleRestart() {
    setCurrentQ(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setResults([]);
    setFinished(false);
  }

  const progress = ((currentQ + (answered ? 1 : 0)) / questions.length) * 100;

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="text-center mb-8">
            <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-12 h-12 text-accent" />
            </div>
            <h1 className="font-display text-4xl font-black mb-2">
              Quiz Complete!
            </h1>
            <p className="text-muted-foreground text-lg">
              You scored {score} out of {questions.length}
            </p>
            <div className="mt-4">
              <div className="font-display text-6xl font-black text-primary">
                {pct}%
              </div>
              <p className="text-muted-foreground mt-1">
                {pct >= 90
                  ? "Outstanding! You're an expert on this issue."
                  : pct >= 70
                    ? "Great job! You have a solid understanding."
                    : pct >= 50
                      ? "Good effort! There's more to learn."
                      : "Keep learning — this issue matters!"}
              </p>
            </div>
          </div>

          <Card className="border-0 shadow-card mb-6">
            <CardHeader>
              <CardTitle className="font-display">
                Review Your Answers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {questions.map((q, i) => (
                <div
                  key={q.question.slice(0, 20)}
                  className={`p-4 rounded-xl border-2 ${results[i] ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
                >
                  <div className="flex items-start gap-3">
                    {results[i] ? (
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                    )}
                    <div>
                      <p className="font-semibold text-sm mb-1">{q.question}</p>
                      <p className="text-xs text-muted-foreground">
                        <strong>Correct answer:</strong> {q.options[q.correct]}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {q.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="text-center">
            <Button
              size="lg"
              onClick={handleRestart}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              data-ocid="trivia.restart.button"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Play Again
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  const q = questions[currentQ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-2">
          <Badge className="bg-primary/10 text-primary border-primary/20">
            Question {currentQ + 1} of {questions.length}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {score} correct so far
          </span>
        </div>
        <Progress
          value={progress}
          className="h-3"
          data-ocid="trivia.progress.loading_state"
        />
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-0 shadow-card mb-6">
            <CardContent className="p-8">
              <p className="font-display text-xl font-bold text-foreground mb-8 leading-snug">
                {q.question}
              </p>

              <div className="space-y-3">
                {q.options.map((opt, i) => {
                  let style =
                    "border-2 border-border bg-white hover:border-primary/50 hover:bg-primary/5";
                  if (answered) {
                    if (i === q.correct)
                      style = "border-2 border-green-500 bg-green-50";
                    else if (i === selected)
                      style = "border-2 border-red-400 bg-red-50";
                    else style = "border-2 border-border bg-white opacity-60";
                  } else if (selected === i) {
                    style = "border-2 border-primary bg-primary/10";
                  }

                  return (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => handleSelect(i)}
                      disabled={answered}
                      data-ocid={`trivia.answer.item.${i + 1}`}
                      className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all cursor-pointer disabled:cursor-default ${style}`}
                    >
                      <span className="inline-flex items-center gap-3">
                        <span
                          className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 ${
                            answered && i === q.correct
                              ? "border-green-500 bg-green-500 text-white"
                              : answered && i === selected
                                ? "border-red-400 bg-red-400 text-white"
                                : "border-current"
                          }`}
                        >
                          {["A", "B", "C", "D"][i]}
                        </span>
                        {opt}
                        {answered && i === q.correct && (
                          <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />
                        )}
                        {answered && i === selected && i !== q.correct && (
                          <XCircle className="w-4 h-4 text-red-500 ml-auto" />
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
                    selected === q.correct
                      ? "bg-green-50 border border-green-200"
                      : "bg-red-50 border border-red-200"
                  }`}
                >
                  <strong>
                    {selected === q.correct ? "✓ Correct!" : "✗ Incorrect"}
                  </strong>
                  <p className="mt-1 text-muted-foreground">{q.explanation}</p>
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
                data-ocid="trivia.next.button"
              >
                {currentQ < questions.length - 1
                  ? "Next Question"
                  : "See Results"}
              </Button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
