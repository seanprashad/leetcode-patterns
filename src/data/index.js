import questions from './questions.json';

const sortBy = { Easy: 0, Medium: 1, Hard: 2 };

export default questions.data.sort(
  (a, b) => sortBy[a.difficulty] - sortBy[b.difficulty],
);
