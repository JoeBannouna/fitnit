// Global types
export type NormalExerciseType = {
  id?: string;
  img?: string;
  name: string;
  type: 'TIMED' | 'REPS' | 'TIMED-REPS';
  amount: number;
  inbetween?: number;
};

export type VideoExerciseType = {
  id?: string;
  name: string;
  type: 'VIDEO';
  url: string;
  period?: { startSeconds: number; endSeconds: number };
};

export type ExerciseType = NormalExerciseType | VideoExerciseType;

export type WorkoutType = {
  id?: string;
  name: string;
  rest: number;
  exercises: ExerciseType[];
};

export type videoOptions = { videoId: string | false; startSeconds?: number; endSeconds?: number };

export interface YTClassType {
  Player(): this;
  cueVideoById: (options: videoOptions) => void;
  loadVideoById: (options: videoOptions) => void;
  playVideo: () => void;
  pauseVideo: () => void;
  stopVideo: () => void;
  getDuration: () => number;
  addEventListener: (event: string, listener: (e: { data: number; target: YTClassType }) => void) => void;
  removeEventListener: (event: string) => void;
}

export type currentActivityIndex = number | null;
export type currentActivityType = 'exercise' | 'rest' | null;
