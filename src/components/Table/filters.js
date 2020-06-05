import React from 'react';

function CreateDropDownListHelper(options, filterValue, setFilter) {
  return (
    <select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || '');
      }}
    >
      <option value="">All</option>
      {options.map((option, idx) => (
        <option key={idx} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter, id },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || '');
      }}
      placeholder={`Search ${count} questions`}
    />
  );
}

export function SelectDifficultyColumnFilter({
  column: { filterValue, setFilter },
}) {
  const options = ['Easy', 'Medium', 'Hard'];

  return CreateDropDownListHelper(options, filterValue, setFilter);
}

export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  const options = React.useMemo(() => {
    const set = new Set();

    preFilteredRows.forEach(row => {
      const values = String(row.values[id]).split(',');

      values.forEach(value => {
        set.add(value);
      });
    });

    return [...set.values()].sort();
  }, [id, preFilteredRows]);

  return CreateDropDownListHelper(options, filterValue, setFilter);
}
