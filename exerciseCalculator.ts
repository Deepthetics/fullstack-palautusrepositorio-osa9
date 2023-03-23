interface ExerciseHourValues {
  hours: number[];
  target: number;
}

interface ExerciseInfoValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseExerciseArguments = (args: string[]): ExerciseHourValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const values = args.slice(2).map((value) => {
    if (!isNaN(Number(value))) {
      return Number(value);
    } else {
      throw new Error('All provided values were not numbers!');
    }
  });

  return {
    hours: values.slice(1),
    target: values[0]
  };
};

const calculateExercises = (hours: number[], target: number): ExerciseInfoValues => {
  const periodLength = hours.length;
  const trainingDays = hours.filter((hour) => hour > 0).length;
  const average = hours.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;
  const rating = success ? 3 : average >= target / 2 ? 2 : 1;
  const ratingDescription = rating === 3 ? 'Well done!' : rating === 2 ? 'Not too bad but could be better' : 'Work harder next time!';

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

try {
  const { hours, target } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(hours, target));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
