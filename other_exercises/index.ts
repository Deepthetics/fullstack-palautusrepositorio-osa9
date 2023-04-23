import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (isNaN(Number(height)) || isNaN(Number(weight))
      || height === '' || weight === ''
      || height === undefined || weight === undefined) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const bmi = calculateBmi(Number(height), Number(weight));
  return res.json({ height, weight, bmi });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: 'missing parameters' });
  }

  const hours = daily_exercises as number[];

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (isNaN(Number(target)) || hours.some((value: number) => isNaN(value))) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const result = calculateExercises(hours, Number(target));
  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
