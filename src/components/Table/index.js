import React, { useState, useEffect } from 'react';
import {
  Table as ReactTable,
  Container,
  Row,
  Badge,
  NavLink,
} from 'reactstrap';
import ReactTooltip from 'react-tooltip';
import { useTable, useFilters } from 'react-table';
import { FaSortAlphaUp, FaSortAlphaDown } from 'react-icons/fa';
import { Event } from '../Shared/Tracking';

import questionList from '../../data';

import './styles.scss';

const images = require.context('../../icons', true);

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
    return [...options.values()];
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

const Table = () => {
  const [checked, setChecked] = useState(
    JSON.parse(localStorage.getItem('checked')) ||
      new Array(questionList.length).fill(false),
  );

  useEffect(() => {
    window.localStorage.setItem('checked', JSON.stringify(checked));
  }, [checked]);

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
      minWidth: 30,
      maxWidth: 10,
    }),
    [],
  );

  const data = React.useMemo(() => questionList, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Sort questions by name or pattern!',
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
            maxWidth: 2,
          },
          {
            Header: 'Pattern',
            accessor: 'pattern',
            Filter: SelectColumnFilter,
          },
          {
            Header: 'Difficulty',
            accessor: 'difficulty',
            Filter: SelectColumnFilter,
            Cell: cellInfo => (
              <Badge
                className={cellInfo.row.original.difficulty.toLowerCase()}
                pill
              >
                {cellInfo.row.original.difficulty}
              </Badge>
            ),
          },
          {
            Header: 'Companies',
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
    },
    useFilters,
  );

  return (
    <Container className="table">
      <ReactTooltip />
      <ReactTable align="center" striped hover {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                  <span>
                    {' '}
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <FaSortAlphaUp />
                      ) : (
                        <FaSortAlphaDown />
                      )
                    ) : (
                      ''
                    )}
                  </span>
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
