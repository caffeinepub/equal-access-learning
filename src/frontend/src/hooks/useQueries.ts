import { useQuery } from "@tanstack/react-query";
import type { Question, Signature } from "../backend.d";
import { useActor } from "./useActor";

export function useAllQuestions() {
  const { actor, isFetching } = useActor();
  return useQuery<Question[]>({
    queryKey: ["questions", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllQuestions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSignatures() {
  const { actor, isFetching } = useActor();
  return useQuery<Signature[]>({
    queryKey: ["signatures"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSignatures();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSignatureCount() {
  const { actor, isFetching } = useActor();
  return useQuery<bigint>({
    queryKey: ["signatureCount"],
    queryFn: async () => {
      if (!actor) return 0n;
      return actor.getSignatureCount();
    },
    enabled: !!actor && !isFetching,
  });
}
