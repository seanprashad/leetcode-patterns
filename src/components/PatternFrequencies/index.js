import { Badge } from 'reactstrap';
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import './styles.scss';

const PatternFrequencies = ({ filters, rows }) => {
  const patternsMap = rows.reduce((acc, row) => {
    for (let i = 0; i < row.original.pattern.length; i += 1) {
      const pattern = row.original.pattern[i];
      acc[pattern] = acc[pattern] + 1 || 1;
    }
    return acc;
  }, Object.create(null));
  const sortedPatternsByFrequency = Object.keys(patternsMap).sort(
    (a, b) => patternsMap[b] - patternsMap[a],
  );
  const showComponent = filters.find(filter =>
    ['companies', 'difficulty'].includes(filter.id),
  );

  const getFrequencyClass = rate => {
    const highestFrequency = Math.round(
      patternsMap[sortedPatternsByFrequency[0]],
    );

    if (highestFrequency / 3 < 1) {
      return '';
    }

    const frequencyRate = {
      easy: Math.round(highestFrequency / 3),
      medium: Math.round((highestFrequency / 3) * 2),
      hard: highestFrequency,
    };

    return Object.keys(frequencyRate).find(key => rate <= frequencyRate[key]);
  };

  return showComponent ? (
    <div className="pattern-count">
      <h5>Problems pattern frequency</h5>
      {sortedPatternsByFrequency.map((pattern, index) => (
        <Badge
          // eslint-disable-next-line react/no-array-index-key
          key={pattern + index}
          className={`${getFrequencyClass(patternsMap[pattern])}`}
          pill
        >
          <span
            data-tip={`${patternsMap[pattern]} "${pattern}" related problems`}
          >
            {pattern} : {patternsMap[pattern]}
          </span>
        </Badge>
      ))}
    </div>
  ) : null;
};

PatternFrequencies.propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, value: PropTypes.string }),
  ).isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      original: PropTypes.shape({
        pattern: PropTypes.arrayOf(PropTypes.string),
      }),
    }),
  ).isRequired,
};

export default PatternFrequencies;
