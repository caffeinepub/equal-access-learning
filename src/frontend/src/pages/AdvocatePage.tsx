import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BookOpen,
  Building,
  DollarSign,
  Heart,
  Loader2,
  Megaphone,
  Pencil,
  Star,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Signature } from "../backend.d";
import { useActor } from "../hooks/useActor";

const GOAL = 100;

const ACTION_CARDS = [
  {
    icon: Heart,
    title: "Volunteer",
    desc: "Give your time to afterschool programs, tutoring centers, and community learning initiatives near you.",
    cta: "Find Opportunities",
  },
  {
    icon: Users,
    title: "Sign the Petition",
    desc: "Add your name to support equal learning access for every child, regardless of background.",
    cta: "Sign Below ↓",
  },
  {
    icon: DollarSign,
    title: "Fundraise",
    desc: "Organize a fundraiser to cover program fees, transportation costs, or supplies for students in need.",
    cta: "Start Fundraising",
  },
  {
    icon: Star,
    title: "Mentor a Student",
    desc: "Share your skills and experience with a young person who needs guidance and encouragement.",
    cta: "Become a Mentor",
  },
  {
    icon: BookOpen,
    title: "Donate Supplies",
    desc: "Donate books, devices, school supplies, or learning materials to students who lack them.",
    cta: "Donate Now",
  },
  {
    icon: Megaphone,
    title: "Spread Awareness",
    desc: "Share facts about learning barriers on social media and within your community.",
    cta: "Share the Message",
  },
  {
    icon: Pencil,
    title: "Offer Tutoring",
    desc: "Provide free or reduced-cost tutoring to students who can't afford private instruction.",
    cta: "Offer Your Help",
  },
  {
    icon: Building,
    title: "Advocate Locally",
    desc: "Attend school board meetings, contact your representatives, and push for equitable education policy.",
    cta: "Get Involved",
  },
];

function timeAgo(ts: bigint) {
  const diff = Date.now() - Number(ts) / 1_000_000;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function AdvocatePage() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const { data: count = 0n } = useQuery<bigint>({
    queryKey: ["signatureCount"],
    queryFn: () => actor!.getSignatureCount(),
    enabled: !!actor && !isFetching,
    refetchInterval: 30000,
  });

  const { data: signatures = [] } = useQuery<Signature[]>({
    queryKey: ["signatures"],
    queryFn: () => actor!.getSignatures(),
    enabled: !!actor && !isFetching,
    refetchInterval: 30000,
  });

  const { mutate: sign, isPending } = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      await actor.signPetition(name.trim(), message.trim() || null);
    },
    onSuccess: () => {
      toast.success("Thank you for signing!");
      setName("");
      setMessage("");
      queryClient.invalidateQueries({ queryKey: ["signatureCount"] });
      queryClient.invalidateQueries({ queryKey: ["signatures"] });
    },
    onError: () => toast.error("Failed to sign. Please try again."),
  });

  const signedCount = Number(count);
  const progress = Math.min(100, Math.round((signedCount / GOAL) * 100));
  const pageUrl = window.location.href;

  function copyLink() {
    navigator.clipboard.writeText(pageUrl);
    toast.success("Link copied!");
  }

  function shareX() {
    const text = encodeURIComponent(
      `I just signed the petition for equal learning access for every child! Join me: ${pageUrl}`,
    );
    window.open(`https://x.com/intent/tweet?text=${text}`, "_blank");
  }

  function shareFacebook() {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
      "_blank",
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-800 mb-3">
          Advocate & Serve
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Awareness without action isn't enough. Here's how you can make a real
          difference for students facing barriers to equal learning.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        {ACTION_CARDS.map((card) => (
          <div
            key={card.title}
            className="bg-white border border-gray-100 rounded-xl p-5 shadow-card hover:shadow-card-hover hover:border-red-200 transition-all"
            data-ocid="advocate.card"
          >
            <card.icon size={28} className="text-brand-red mb-3" />
            <h3 className="font-semibold text-gray-800 mb-1 text-sm">
              {card.title}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed mb-3">
              {card.desc}
            </p>
            <span className="text-xs text-brand-red font-semibold">
              {card.cta}
            </span>
          </div>
        ))}
      </div>

      <div
        id="petition"
        className="bg-red-50 border border-red-100 rounded-2xl p-6 md:p-10"
      >
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl font-bold text-brand-red mb-2">
              Sign the Petition
            </h2>
            <p className="text-gray-600">
              Support equal learning access for every child, regardless of
              income, location, or background.
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-card mb-6">
            <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
              <span>{signedCount} signatures</span>
              <span>Goal: {GOAL}</span>
            </div>
            <Progress value={progress} className="h-3" />
            <p className="text-xs text-gray-500 mt-2 text-center">
              {GOAL - signedCount > 0
                ? `${GOAL - signedCount} more needed to reach our goal!`
                : "🎉 Goal reached! Keep sharing!"}
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">
                Your Name <span className="text-brand-red">*</span>
              </p>
              <Input
                placeholder="First and last name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                data-ocid="petition.input"
                className="border-red-200 focus:border-brand-red"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">
                Message <span className="text-gray-400">(optional)</span>
              </p>
              <Textarea
                placeholder="Why does equal access matter to you?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                data-ocid="petition.textarea"
                rows={3}
                className="border-red-200 focus:border-brand-red"
              />
            </div>
            <Button
              onClick={() => sign()}
              disabled={isPending || !name.trim() || !actor}
              data-ocid="petition.submit_button"
              className="w-full bg-brand-red hover:bg-brand-red-dark text-white font-semibold py-3"
            >
              {isPending ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Signing...
                </>
              ) : (
                "✍️ Sign the Petition"
              )}
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button
              type="button"
              onClick={shareX}
              data-ocid="petition.button"
              className="flex items-center gap-2 bg-black text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              𝕏 Share on X
            </button>
            <button
              type="button"
              onClick={shareFacebook}
              data-ocid="petition.button"
              className="flex items-center gap-2 bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              f Share on Facebook
            </button>
            <button
              type="button"
              onClick={copyLink}
              data-ocid="petition.button"
              className="flex items-center gap-2 border border-gray-300 text-gray-700 text-sm font-semibold px-4 py-2 rounded-full hover:border-brand-red hover:text-brand-red transition-colors"
            >
              🔗 Copy Link
            </button>
          </div>

          {signatures.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-700 text-sm mb-3 text-center">
                Recent Signers
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {[...signatures]
                  .reverse()
                  .slice(0, 10)
                  .map((sig, i) => (
                    <div
                      key={sig.name + String(sig.timestamp)}
                      className="bg-white rounded-lg p-3 flex items-start gap-3"
                      data-ocid={`petition.item.${i + 1}`}
                    >
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-sm font-bold flex-shrink-0 text-brand-red">
                        {sig.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-gray-800">
                            {sig.name}
                          </span>
                          <span className="text-xs text-gray-400">
                            {timeAgo(sig.timestamp)}
                          </span>
                        </div>
                        {sig.message && (
                          <p className="text-xs text-gray-500 mt-0.5 truncate">
                            {sig.message}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {signatures.length === 0 && (
            <p
              className="text-center text-sm text-gray-400"
              data-ocid="petition.empty_state"
            >
              Be the first to sign!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
