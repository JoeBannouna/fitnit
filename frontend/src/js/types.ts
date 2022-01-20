// Global types
export type ExerciseType = {
  id?: string;
  img?: string;
  name: string;
  type: 'TIMED' | 'REPS' | 'TIMED-REPS' | 'VIDEO';
  amount: number;
  inbetween?: number;
};

export type WorkoutType = {
  id?: string;
  name: string;
  rest: number;
  exercises: ExerciseType[];
};
