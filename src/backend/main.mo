import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Text "mo:core/Text";

actor {
  // Types
  type SurveyResponse = {
    barriers : [Text];
    ratings : [Nat];
    statistics : [Bool];
    values : [Text];
    reflection : Text;
  };

  type Signature = {
    name : Text;
    message : ?Text;
    timestamp : Int;
  };

  type Question = {
    category : Text;
    difficulty : Text;
    questionText : Text;
    options : [Text];
    correctAnswer : Nat;
  };

  // Persistent state
  let surveyResponses = Map.empty<Text, SurveyResponse>();
  let signatures = List.fromArray<Signature>([
    { name = "Alice"; message = ?"Education should be accessible to all"; timestamp = 1680000000 },
    { name = "Bob"; message = null; timestamp = 1680000100 },
    { name = "Carol"; message = ?"Let's remove cost barriers"; timestamp = 1680000200 },
    { name = "Dave"; message = ?"Keep up the good work"; timestamp = 1680000300 },
    { name = "Eve"; message = null; timestamp = 1680000400 },
    { name = "Frank"; message = null; timestamp = 1680000500 },
    { name = "Grace"; message = ?"Education is a right"; timestamp = 1680000600 },
    { name = "Heidi"; message = ?"Accessibility matters"; timestamp = 1680000700 },
  ]);

  let questions = List.fromArray<Question>([
    {
      category = "Cost Barriers";
      difficulty = "Easy";
      questionText = "What is a common cost barrier to education?";
      options = ["Tuition", "Free books", "Scholarships", "Grants"];
      correctAnswer = 0;
    },
    {
      category = "Transportation Barriers";
      difficulty = "Medium";
      questionText = "How can transportation affect access to education?";
      options = ["Makes it easier", "Creates barriers", "Has no effect", "Only affects rural areas"];
      correctAnswer = 1;
    },
    {
      category = "Time Barriers";
      difficulty = "Hard";
      questionText = "What is a time barrier to education?";
      options = ["Flexible schedules", "Free time", "Work commitments", "Online classes"];
      correctAnswer = 2;
    },
    {
      category = "Selectivity Barriers";
      difficulty = "Easy";
      questionText = "What is a selectivity barrier?";
      options = ["Open admissions", "High tuition", "Competitive entry", "Financial aid"];
      correctAnswer = 2;
    },
    {
      category = "Awareness Barriers";
      difficulty = "Medium";
      questionText = "What is an awareness barrier?";
      options = ["Lack of information", "Too much information", "Free resources", "Online courses"];
      correctAnswer = 0;
    },
    {
      category = "Technology Barriers";
      difficulty = "Hard";
      questionText = "What is a technology barrier?";
      options = ["Easy access to devices", "Lack of internet access", "Free software", "Online tutorials"];
      correctAnswer = 1;
    },
  ]);

  // Survey responses
  public shared ({ caller }) func submitSurvey(id : Text, response : SurveyResponse) : async () {
    surveyResponses.add(id, response);
  };

  public query ({ caller }) func getSurveyResponse(id : Text) : async ?SurveyResponse {
    surveyResponses.get(id);
  };

  // Petition signatures
  public shared ({ caller }) func signPetition(name : Text, message : ?Text) : async () {
    let timestamp = Time.now();
    let signature = { name; message; timestamp };
    signatures.add(signature);
  };

  public query ({ caller }) func getSignatures() : async [Signature] {
    signatures.toArray();
  };

  public query ({ caller }) func getSignatureCount() : async Nat {
    signatures.size();
  };

  public query ({ caller }) func getRemainingSignatures() : async Nat {
    if (signatures.size() >= 100) {
      0;
    } else {
      100 - signatures.size();
    };
  };

  // Quiz questions
  public query ({ caller }) func getQuestionsByCategory(category : Text) : async [Question] {
    questions.filter(func(q) { q.category == category }).toArray();
  };

  public query ({ caller }) func getQuestionsByDifficulty(difficulty : Text) : async [Question] {
    questions.filter(func(q) { q.difficulty == difficulty }).toArray();
  };

  public query ({ caller }) func getQuestionsByCategoryAndDifficulty(category : Text, difficulty : Text) : async [Question] {
    questions.filter(func(q) { q.category == category and q.difficulty == difficulty }).toArray();
  };

  public query ({ caller }) func getAllQuestions() : async [Question] {
    questions.toArray();
  };
};
