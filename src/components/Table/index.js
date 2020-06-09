import React, { useState, useEffect, useRef } from 'react';
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
import {
  DefaultColumnFilter,
  SelectDifficultyColumnFilter,
  SelectColumnFilter,
} from './filters';
import { Event } from '../Shared/Tracking';

import questions from '../../data';

import './styles.scss';

const images = require.context('../../icons', true);

const Table = () => {
  const [checked, setChecked] = useState(
    JSON.parse(localStorage.getItem('checked')) ||
      new Array(questions.length).fill(false),
  );

  useEffect(() => {
    window.localStorage.setItem('checked', JSON.stringify(checked));
  }, [checked]);

  const data = React.useMemo(() => questions, []);

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
                    <span data-tip="Requires leetcode premium to view">
                      <FaLock />
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
            Cell: cellInfo => {
              const patterns = `${cellInfo.row.original.pattern}`
                .split(',')
                .map(pattern => {
                  return (
                    <Badge key={pattern} className={pattern} pill>
                      {checked[cellInfo.row.original.id] ? pattern : '***'}
                    </Badge>
                  );
                });

              return <Row className="patterns">{patterns}</Row>;
            },

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
            Filter: SelectDifficultyColumnFilter,
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
            Filter: SelectColumnFilter,
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
    useSortBy,
  );

  return (
    <Container className="table">
      <ReactTooltip />
      <ReactTable borderless striped hover {...getTableProps()}>
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
