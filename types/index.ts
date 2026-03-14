// types/index.ts

export type Difficulty = "Easy" | "Medium" | "Hard";
export type Language = "python" | "javascript" | "java" | "cpp";
export type UserRole = "USER" | "ADMIN" | "PREMIUM";

export interface Topic {
  id: string;
  name: string;
  slug: string;
}

export interface Problem {
  id: string;
  number: number | null;
  title: string;
  slug: string;
  difficulty: Difficulty;
  topic: Topic;
  isPremium: boolean;
  isSolved?: boolean;
  isBookmarked?: boolean;
}

export interface ProblemDetail extends Problem {
  statement: string;
  hints: string[];
  solutions: Solution[];
  visualCode: string | null;
  pdfUrl: string | null;
}

export interface Solution {
  id: string;
  language: Language;
  code: string;
  explanation: string | null;
  timeComplexity: string | null;
  spaceComplexity: string | null;
}

export interface Streak {
  currentStreak: number;
  longestStreak: number;
  activeDays: Date[];
  lastSolvedAt: Date | null;
}

export interface UserStats {
  solved: number;
  bookmarks: number;
  roadmapTopicsDone: number;
  streak: {
    current: number;
    longest: number;
    activeDays: Date[];
  };
  difficultyBreakdown: Record<Difficulty, number>;
}

export interface RoadmapLevel {
  id: string;
  name: string;
  color: string;
  topics: RoadmapTopic[];
}

export interface RoadmapTopic {
  id: string;
  name: string;
  slug: string;
  totalProblems: number;
  problems: Pick<Problem, "id" | "title" | "slug" | "difficulty">[];
  isCompleted: boolean;
}

export interface Resource {
  id: string;
  title: string;
  description: string | null;
  fileUrl: string;
  fileSize: string | null;
  topic: string | null;
  isPremium: boolean;
}

export interface ExecutionResult {
  status: string;
  statusId: number;
  stdout: string | null;
  stderr: string | null;
  compileOutput: string | null;
  time: string | null;
  memory: number | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
