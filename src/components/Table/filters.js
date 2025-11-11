import React from 'react';

function CreateDropDownListHelper(options, filterValue, setFilter, id) {
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        localStorage.setItem(id, e.target.value);
        setFilter(e.target.value || '');
      }}
    >
      <option value="">All</option>
      {options.map((option, idx) => (
        <option key={`${idx + option}`} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export function DefaultColumnFilter({
  // eslint-disable-next-line react/prop-types
  column: { filterValue, preFilteredRows, setFilter },
}) {
  // eslint-disable-next-line react/prop-types
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || '');
      }}
      placeholder={`Search ${count} questions`}
    />
  );
}

export function SelectDifficultyColumnFilter({
  column: { filterValue, setFilter, id },
}) {
  const options = ['Easy', 'Medium', 'Hard'];

  return CreateDropDownListHelper(options, filterValue, setFilter, id);
}

export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  const options = React.useMemo(() => {
    const set = new Set();

    preFilteredRows.forEach((row) => {
      const values = String(row.values[id]).split(',');

      values.forEach((value) => {
        set.add(value);
      });
    });

    return [...set.values()].sort();
  }, [id, preFilteredRows]);

  return CreateDropDownListHelper(options, filterValue, setFilter, id);
}

export function SelectCheckedColumnFilter({
  column: { filterValue, setFilter, id, filterByCheckbox },
}) {
  const options = ['Checked', 'Unchecked'];
  const filter = (val) => {
    setFilter(val);
    filterByCheckbox();
  };

  return CreateDropDownListHelper(options, filterValue, filter, id);
}
