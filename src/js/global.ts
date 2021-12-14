// Global variables

export type ExercisesType = {
  id: string;
  name: string;
  type: 'TIMED' | 'REPS' | 'TIMED-REPS';
  amount: number;
  inbetween?: number;
};

export type WorkoutType = {
  id: string;
  name: string;
  rest: number;
  exercises: ExercisesType[];
};

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
        name: 'Push-ups',
        type: 'REPS',
        amount: 20,
        inbetween: 2,
      },
      {
        id: 'dwniud',
        name: 'Arm circles',
        type: 'TIMED',
        amount: 60,
      },
    ],
  },
];
