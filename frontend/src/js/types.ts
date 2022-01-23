// Global types
export type NormalExerciseType = {
  id?: string;
  img?: string;
  name: string;
  type: 'TIMED' | 'REPS' | 'TIMED-REPS';
  amount: number;
  inbetween?: number;
}

export type VideoExerciseType = {
  id?: string;
  name: string;
  type: 'VIDEO';
  url: string;
};

export type ExerciseType = NormalExerciseType | VideoExerciseType;

export type WorkoutType = {
  id?: string;
  name: string;
  rest: number;
  exercises: ExerciseType[];
};
