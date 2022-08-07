import questions from './questions.json';

const sortBy = { Easy: 0, Medium: 1, Hard: 2 };
const { updated, data } = questions;

for (let i = 0; i < data.length; i += 1) {
  data[i].companyNames = data[i].companies.map(company => company.name);
}

export { updated };
export default data.sort((a, b) => sortBy[a.difficulty] - sortBy[b.difficulty]);
