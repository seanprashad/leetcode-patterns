import React, { useState, useEffect } from 'react';
import {
  Table as ReactTable,
  Container,
  Row,
  Badge,
  NavLink,
} from 'reactstrap';
import ReactTooltip from 'react-tooltip';
import { useTable, useFilters, useSortBy } from 'react-table';
import { FaQuestionCircle, FaLock } from 'react-icons/fa';
import { Event } from '../Shared/Tracking';

import questionList from '../../data';

import './styles.scss';

const images = require.context('../../icons', true);

const sortByObject = { Easy: 0, Medium: 1, Hard: 2 };
questionList.sort(
  (a, b) => sortByObject[a.difficulty] - sortByObject[b.difficulty],
);

const Table = () => {
  const [checked, setChecked] = useState(
    JSON.parse(localStorage.getItem('checked')) ||
      new Array(questionList.length).fill(false),
  );

  useEffect(() => {
    window.localStorage.setItem('checked', JSON.stringify(checked));
  }, [checked]);

  const data = React.useMemo(() => questionList, []);

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
      minWidth: 30,
      maxWidth: 30,
    }),
    [],
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'Leetcode Patterns',
        columns: [
          {
            id: 'Checkbox',
            Cell: cellInfo => {
              return (
                <input
                  type="checkbox"
                  className="checkbox"
                  name={cellInfo.row.original.name}
                  checked={checked[cellInfo.row.original.id]}
                  onChange={() => {
                    checked[cellInfo.row.original.id] = !checked[
                      cellInfo.row.original.id
                    ];
                    setChecked([...checked]);
                  }}
                />
              );
            },
          },
          {
            id: 'Premium',
            Cell: cellInfo => {
              return (
                <span>
                  {cellInfo.row.original.premium ? (
                    <span data-tip="Requires leetcode premium">
                      <FaLock />{' '}
                    </span>
                  ) : (
                    ''
                  )}
                </span>
              );
            },
          },
          {
            Header: 'Name',
            accessor: 'name',
          },
          {
            Header: 'URL',
            accessor: 'url',
            Cell: cellInfo => (
              <NavLink
                target="_blank"
                href={cellInfo.row.original.url}
                onClick={() => {
                  Event(
                    'Table',
                    'Clicked url',
                    `${cellInfo.row.original.name} url`,
                  );
                }}
              >
                {cellInfo.row.original.url}
              </NavLink>
            ),
            disableFilters: true,
          },
          {
            Header: 'Pattern',
            accessor: 'pattern',
            Filter: SelectColumnFilter,
          },
          {
            Header: 'Difficulty',
            accessor: 'difficulty',
            Cell: cellInfo => (
              <Badge
                className={cellInfo.row.original.difficulty.toLowerCase()}
                pill
              >
                {cellInfo.row.original.difficulty}
              </Badge>
            ),
            Filter: SelectColumnFilter,
          },
          {
            Header: () => {
              return (
                <div style={{ whiteSpace: 'nowrap' }}>
                  Companies{' '}
                  <span data-tip="Companies retrieved from Leetcode Premium (May 2020)">
                    <FaQuestionCircle />
                  </span>
                </div>
              );
            },
            accessor: 'companies',
            Cell: cellInfo => {
              const companies = cellInfo.row.original.companies.map(company => {
                const icon = images(`./${company}.png`);
                return (
                  <img
                    key={company}
                    src={icon}
                    alt={company}
                    data-tip={company}
                  />
                );
              });

              return <Row className="companies">{companies}</Row>;
            },
            disableFilters: true,
          },
        ],
      },
    ],
    // eslint-disable-next-line
    [],
  );

  function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
    const count = preFilteredRows.length;

    return (
      <input
        value={filterValue || ''}
        onChange={e => {
          setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} questions...`}
      />
    );
  }

  function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) {
    const options = React.useMemo(() => {
      const options = new Set();

      preFilteredRows.forEach(row => {
        options.add(row.values[id]);
      });

      if (id === 'difficulty') {
        return [...options.values()];
      }

      return [...options.values()].sort();
    }, [id, preFilteredRows]);

    return (
      <select
        value={filterValue}
        onChange={e => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: {
        sortBy: [{ id: 'pattern' }],
      },
    },
    useFilters,
    useSortBy,
  );

  return (
    <Container className="table">
      <ReactTooltip />
      <ReactTable
        align="center"
        responsive
        borderless
        striped
        hover
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </ReactTable>
    </Container>
  );
};

export default Table;
