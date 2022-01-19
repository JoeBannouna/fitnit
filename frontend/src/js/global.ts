// Global types
export type ExerciseType = {
  id: string;
  name: string;
  type: 'TIMED' | 'REPS' | 'TIMED-REPS' | 'VIDEO';
  amount: number;
  inbetween?: number;
};

export type WorkoutType = {
  id: string;
  name: string;
  rest: number;
  exercises: ExerciseType[];
};

// Global variables
export const workouts: WorkoutType[] = [
  {
    id: 'wdubdbwk',
    name: 'Upper-body workout',
    rest: 10,
    exercises: [
      {
        id: 'nwonso',
        name: 'Push-ups',
        type: 'REPS',
        amount: 20,
      },
      {
        id: 'nwonso',
        name: 'Wide Push-ups',
        type: 'TIMED-REPS',
        amount: 20,
        inbetween: 2,
      },
      {
        id: 'wdniodn',
        name: 'Arm circles',
        type: 'TIMED',
        amount: 60,
      },
    ],
  },
  {
    id: 'e2hndo',
    name: 'Lower-body workout',
    rest: 5,
    exercises: [
      {
        id: 'dwniod',
        name: 'Squats',
        type: 'REPS',
        amount: 20,
        inbetween: 2,
      },
      {
        id: 'dwniud',
        name: 'Leg raises',
        type: 'TIMED',
        amount: 60,
      },
      {
        id: 'dwdwdw',
        name: 'Cath raises',
        type: 'REPS',
        amount: 40,
      },
      {
        id: 'downww',
        name: 'Jumping squats',
        type: 'REPS',
        amount: 80,
      },
      {
        id: 'uiwyei',
        name: 'Lunges',
        type: 'TIMED',
        amount: 45,
      },
    ],
  },
];

// Endpoint URLs
export const UPLOAD_EXERCISE_IMAGE_URL = 'http://127.0.0.1:3000/';