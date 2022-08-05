import questions from './questions.json';

const sortBy = { Easy: 0, Medium: 1, Hard: 2 };
const { updated, data } = questions;

export { updated };
export default data.sort((a, b) => sortBy[a.difficulty] - sortBy[b.difficulty]);
