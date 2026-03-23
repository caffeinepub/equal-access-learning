import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle, RotateCcw, XCircle } from "lucide-react";
import { useState } from "react";
import type { Question } from "../backend.d";
import { useActor } from "../hooks/useActor";

const CATEGORIES = [
  "All",
  "Cost Barriers",
  "Transportation Barriers",
  "Time Barriers",
  "Selectivity Barriers",
  "Awareness Barriers",
  "Technology Barriers",
];
const DIFFICULTIES = ["All", "Easy", "Medium", "Hard"];

export default function QuizPage() {
  const { actor, isFetching } = useActor();
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const { data: questions = [], isLoading } = useQuery<Question[]>({
    queryKey: ["questions", category, difficulty],
    queryFn: async () => {
      if (!actor) return [];
      if (category !== "All" && difficulty !== "All") {
        return actor.getQuestionsByCategoryAndDifficulty(
          category,
          difficulty.toLowerCase(),
        );
      }
      if (category !== "All") {
        return actor.getQuestionsByCategory(category);
      }
      if (difficulty !== "All") {
        return actor.getQuestionsByDifficulty(difficulty.toLowerCase());
      }
      return actor.getAllQuestions();
    },
    enabled: !!actor && !isFetching,
  });

  function startQuiz() {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
    setStarted(true);
  }

  function handleSelect(idx: number) {
    if (selected !== null) return;
    setSelected(idx);
    const q = questions[current];
    const correct = Number(q.correctAnswer) === idx;
    if (correct) setScore((s) => s + 1);
  }

  function handleNext() {
    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  }

  if (!started) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <h1 className="font-display text-4xl font-bold text-brand-red mb-3">
          Test Your Knowledge
        </h1>
        <p className="text-gray-500 mb-8">
          Select a category and difficulty, then start the quiz.
        </p>

        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-card text-left space-y-4 mb-8">
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-1">Category</p>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger data-ocid="quiz.select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-1">
              Difficulty
            </p>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger data-ocid="quiz.select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DIFFICULTIES.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          onClick={startQuiz}
          disabled={isLoading || questions.length === 0}
          data-ocid="quiz.primary_button"
          className="bg-brand-red hover:bg-brand-red-dark text-white px-8 py-3 text-base font-semibold rounded-full"
        >
          {isLoading
            ? "Loading questions..."
            : questions.length === 0
              ? "No questions found"
              : `Start Quiz (${questions.length} questions)`}
        </Button>
      </div>
    );
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div
        className="max-w-xl mx-auto px-4 py-16 text-center"
        data-ocid="quiz.success_state"
      >
        <div className="text-5xl mb-4">
          {pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "📚"}
        </div>
        <h2 className="font-display text-3xl font-bold text-gray-800 mb-2">
          Quiz Complete!
        </h2>
        <p className="text-gray-500 mb-6">
          You scored {score} out of {questions.length}
        </p>
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-card mb-6">
          <div className="text-5xl font-display font-bold text-brand-red mb-1">
            {pct}%
          </div>
          <Progress value={pct} className="mt-3" />
          <p className="text-sm text-gray-500 mt-3">
            {pct >= 80
              ? "Excellent! You really know your stuff."
              : pct >= 50
                ? "Good effort! Keep learning."
                : "Keep exploring — knowledge is the first step to change."}
          </p>
        </div>
        <Button
          onClick={() => setStarted(false)}
          data-ocid="quiz.secondary_button"
          variant="outline"
          className="gap-2"
        >
          <RotateCcw size={16} /> Try Again
        </Button>
      </div>
    );
  }

  const q = questions[current];
  const pct = Math.round((current / questions.length) * 100);

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-3">
        <h1 className="font-display text-2xl font-bold text-brand-red">
          Test Your Knowledge
        </h1>
        <span className="text-sm text-gray-500">
          {current + 1} / {questions.length}
        </span>
      </div>
      <Progress value={pct} className="mb-6" />

      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-card mb-6">
        <p className="text-sm text-brand-red font-semibold mb-1 uppercase tracking-wide">
          {q.category} · {q.difficulty}
        </p>
        <h2 className="font-display text-xl font-bold text-gray-800 mb-6">
          {q.questionText}
        </h2>

        <div className="space-y-3">
          {q.options.map((opt, idx) => {
            let cls =
              "w-full text-left p-4 rounded-lg border-2 transition-all font-medium text-sm ";
            if (selected === null) {
              cls +=
                "border-gray-200 hover:border-brand-red hover:bg-red-50 cursor-pointer";
            } else if (idx === Number(q.correctAnswer)) {
              cls += "border-green-500 bg-green-50 text-green-800";
            } else if (idx === selected) {
              cls += "border-red-400 bg-red-50 text-red-800";
            } else {
              cls += "border-gray-200 opacity-50";
            }
            return (
              <button
                key={opt}
                type="button"
                onClick={() => handleSelect(idx)}
                data-ocid={`quiz.item.${idx + 1}`}
                className={cls}
              >
                <span className="inline-flex items-center gap-3">
                  {selected !== null && idx === Number(q.correctAnswer) && (
                    <CheckCircle size={16} className="text-green-500" />
                  )}
                  {selected !== null &&
                    idx === selected &&
                    idx !== Number(q.correctAnswer) && (
                      <XCircle size={16} className="text-red-500" />
                    )}
                  {opt}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {selected !== null && (
        <div className="flex justify-end">
          <Button
            onClick={handleNext}
            data-ocid="quiz.primary_button"
            className="bg-brand-red hover:bg-brand-red-dark text-white"
          >
            {current + 1 >= questions.length ? "See Results" : "Next Question"}
          </Button>
        </div>
      )}
    </div>
  );
}
