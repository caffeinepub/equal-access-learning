import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface SurveyResponse {
    barriers: Array<string>;
    values: Array<string>;
    ratings: Array<bigint>;
    reflection: string;
    statistics: Array<boolean>;
}
export interface Question {
    difficulty: string;
    correctAnswer: bigint;
    questionText: string;
    category: string;
    options: Array<string>;
}
export interface Signature {
    name: string;
    message?: string;
    timestamp: bigint;
}
export interface backendInterface {
    getAllQuestions(): Promise<Array<Question>>;
    getQuestionsByCategory(category: string): Promise<Array<Question>>;
    getQuestionsByCategoryAndDifficulty(category: string, difficulty: string): Promise<Array<Question>>;
    getQuestionsByDifficulty(difficulty: string): Promise<Array<Question>>;
    getRemainingSignatures(): Promise<bigint>;
    getSignatureCount(): Promise<bigint>;
    getSignatures(): Promise<Array<Signature>>;
    getSurveyResponse(id: string): Promise<SurveyResponse | null>;
    signPetition(name: string, message: string | null): Promise<void>;
    submitSurvey(id: string, response: SurveyResponse): Promise<void>;
}
