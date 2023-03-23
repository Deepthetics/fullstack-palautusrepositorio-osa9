interface exerciseValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (hours: number[], target: number): exerciseValues => {
  const periodLength = hours.length;
  const trainingDays = hours.filter((hour) => hour > 0).length;
  const average = hours.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;
  const rating = success ? 3 : average >= target / 2 ? 2 : 1;
  const ratingDescription = rating === 3 ? "Well done!" : rating === 2 ? "Not too bad but could be better" : "Work harder nex time!";

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
