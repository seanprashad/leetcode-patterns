/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import {
  Table as ReactTable,
  Container,
  Row,
  Badge,
  NavLink,
} from 'reactstrap';
import Toggle from 'react-toggle';
import ReactTooltip from 'react-tooltip';
import { useTable, useFilters, useSortBy } from 'react-table';
import { FaLock, FaExternalLinkAlt, FaQuestionCircle } from 'react-icons/fa';
import {
  DefaultColumnFilter,
  SelectDifficultyColumnFilter,
  SelectColumnFilter,
} from './filters';
import { Event } from '../Shared/Tracking';

import questions from '../../data';

import 'react-toggle/style.css';
import './styles.scss';

const iconPath = `${process.env.PUBLIC_URL}/assets/icons/`;

const Table = () => {
  const data = React.useMemo(() => questions, []);

  let checkedList =
    JSON.parse(localStorage.getItem('checked')) ||
    new Array(data.length).fill(false);

  /* If the user has previously visited the website, then an array in
  LocalStorage would exist of a certain length which corresponds to which
  questions they have/have not completed. In the event that we add new questions
  to the list, then we would need to resize and copy the existing 'checked'
  array before updating it in LocalStorage in order to transfer their saved
  progress. */
  if (checkedList.length !== data.length) {
    const resizedCheckedList = new Array(data.length).fill(false);

    for (let i = 0; i < checkedList.length; i += 1) {
      resizedCheckedList[i] = checkedList[i];
    }

    checkedList = resizedCheckedList;
    window.localStorage.setItem('checked', JSON.stringify(checkedList));
  }

  const difficultyMap = { Easy: 0, Medium: 0, Hard: 0 };
  const totalDifficultyCount = { Easy: 0, Medium: 0, Hard: 0 };
  for (let i = 0; i < data.length; i += 1) {
    difficultyMap[data[i].difficulty] += checkedList[data[i].id];
    totalDifficultyCount[data[i].difficulty] += 1;
  }

  const [difficultyCount, setDifficultyCount] = useState(difficultyMap);
  const [checked, setChecked] = useState(checkedList);
  const [showPatterns, setShowPatterns] = useState(
    JSON.parse(localStorage.getItem('showPatterns')) || new Array(1).fill(true),
  );

  useEffect(() => {
    window.localStorage.setItem('checked', JSON.stringify(checked));
  }, [checked]);

  useEffect(() => {
    window.localStorage.setItem('showPatterns', JSON.stringify(showPatterns));
  }, [showPatterns]);

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
            Header: () => {
              return (
                <span>
                  <Badge className="" pill>
                    <span
                      data-tip={`You've completed ${difficultyCount.Easy +
                        difficultyCount.Medium +
                        difficultyCount.Hard}/${totalDifficultyCount.Easy +
                        totalDifficultyCount.Medium +
                        totalDifficultyCount.Hard} total questions`}
                    >
                      Total:{' '}
                      {difficultyCount.Easy +
                        difficultyCount.Medium +
                        difficultyCount.Hard}
                      /
                      {totalDifficultyCount.Easy +
                        totalDifficultyCount.Medium +
                        totalDifficultyCount.Hard}
                    </span>
                  </Badge>
                  <br />
                  <Badge className="easy" pill>
                    <span
                      data-tip={`You've completed ${difficultyCount.Easy}/${totalDifficultyCount.Easy} easy questions`}
                    >
                      Easy: {difficultyCount.Easy}/{totalDifficultyCount.Easy}
                    </span>
                  </Badge>
                  <br />
                  <Badge className="medium" pill>
                    <span
                      data-tip={`You've completed ${difficultyCount.Medium}/${totalDifficultyCount.Medium} medium questions`}
                    >
                      Medium: {difficultyCount.Medium}/
                      {totalDifficultyCount.Medium}
                    </span>
                  </Badge>
                  <br />
                  <Badge className="hard" pill>
                    <span
                      data-tip={`You've completed ${difficultyCount.Hard}/${totalDifficultyCount.Hard} hard questions`}
                    >
                      Hard: {difficultyCount.Hard}/{totalDifficultyCount.Hard}
                    </span>
                  </Badge>
                </span>
              );
            },
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

                    const additive = checked[cellInfo.row.original.id] ? 1 : -1;
                    difficultyCount[
                      cellInfo.row.original.difficulty
                    ] += additive;

                    setDifficultyCount(difficultyCount);
                    setChecked([...checked]);
                  }}
                />
              );
            },
          },
          {
            Header: 'Questions',
            accessor: 'questions',
            Cell: cellInfo => {
              return (
                <NavLink
                  target="_blank"
                  href={cellInfo.row.original.url}
                  onClick={() => {
                    Event(
                      'Table',
                      'Clicked question url',
                      `${cellInfo.row.original.name} question url`,
                    );
                  }}
                >
                  {cellInfo.row.original.premium ? (
                    <span data-tip="Requires leetcode premium to view">
                      <FaLock />{' '}
                    </span>
                  ) : (
                    ''
                  )}
                  {cellInfo.row.original.name}
                </NavLink>
              );
            },
            disableFilters: true,
          },
          {
            Header: 'Solutions',
            accessor: 'solutions',
            Cell: cellInfo => {
              const url = cellInfo.row.original.premium
                ? `${cellInfo.row.original.url}/`
                : cellInfo.row.original.url;
              return (
                <NavLink
                  target="_blank"
                  href={`${url}discuss/?currentPage=1&orderBy=most_votes`}
                  onClick={() => {
                    Event(
                      'Table',
                      'Clicked solution',
                      `${cellInfo.row.original.name} solution`,
                    );
                  }}
                >
                  <FaExternalLinkAlt />
                </NavLink>
              );
            },
            disableFilters: true,
          },
          {
            Header: () => {
              return (
                // eslint-disable-next-line
                // eslint-disable-next-line jsx-a11y/label-has-associated-control
                <label htmlFor="pattern-toggle">
                  <span>Show/Hide Patterns </span>
                  <Toggle
                    id="pattern-toggle"
                    defaultChecked={showPatterns[0]}
                    icons={{
                      checked: null,
                      unchecked: null,
                    }}
                    onChange={() => {
                      showPatterns[0] = !showPatterns[0];
                      setShowPatterns([...showPatterns]);
                    }}
                  />
                </label>
              );
            },
            accessor: 'pattern',
            Cell: cellInfo => {
              const patterns = `${cellInfo.row.original.pattern}`
                .split(',')
                .map(pattern => {
                  if (showPatterns[0] || checked[cellInfo.row.original.id]) {
                    return (
                      <Badge key={pattern} pill>
                        {pattern}
                      </Badge>
                    );
                  }

                  return (
                    <Badge key={pattern} pill>
                      ***
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
              <Row>
                <Badge
                  className={cellInfo.row.original.difficulty.toLowerCase()}
                  pill
                >
                  {cellInfo.row.original.difficulty}
                </Badge>
              </Row>
            ),
            Filter: SelectDifficultyColumnFilter,
          },
          {
            Header: () => {
              return (
                <div style={{ whiteSpace: 'nowrap' }}>
                  Companies{' '}
                  <span data-tip="Companies retrieved from Leetcode Premium (May 2021)">
                    <FaQuestionCircle />
                  </span>
                </div>
              );
            },
            accessor: 'companies',
            Cell: cellInfo => {
              const companies = cellInfo.row.original.companies.map(company => {
                return (
                  <img
                    key={company}
                    src={`${iconPath}${company}.png`}
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
