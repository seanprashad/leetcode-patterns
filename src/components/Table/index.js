/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import {
  Table as ReactTable,
  Container,
  Row,
  Badge,
  NavLink,
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
} from 'reactstrap';
import Toggle from 'react-toggle';
import ReactTooltip from 'react-tooltip';
import { useTable, useFilters, useSortBy } from 'react-table';
import { FaLock, FaExternalLinkAlt, FaQuestionCircle } from 'react-icons/fa';
import {
  DefaultColumnFilter,
  SelectDifficultyColumnFilter,
  SelectColumnFilter,
  SelectCheckedColumnFilter,
} from './filters';
import { Event } from '../Shared/Tracking';

import questions, { updated } from '../../data';

import 'react-toggle/style.css';
import './styles.scss';
import PatternFrequencies from '../PatternFrequencies';

const iconPath = `${process.env.PUBLIC_URL}/static/icons/`;

const Table = () => {
  const [resetCount, setResetCount] = useState(0);
  let checkedList =
    JSON.parse(localStorage.getItem('checked')) ||
    new Array(questions.length).fill(false);

  /* If the user has previously visited the website, then an array in
  LocalStorage would exist of a certain length which corresponds to which
  questions they have/have not completed. In the event that we add new questions
  to the list, then we would need to resize and copy the existing 'checked'
  array before updating it in LocalStorage in order to transfer their saved
  progress. */
  if (checkedList.length !== questions.length) {
    const resizedCheckedList = new Array(questions.length).fill(false);

    for (let i = 0; i < checkedList.length; i += 1) {
      resizedCheckedList[i] = checkedList[i];
    }

    checkedList = resizedCheckedList;
    window.localStorage.setItem('checked', JSON.stringify(checkedList));
  }

  const filteredByCheckbox = () => {
    const checkbox = localStorage.getItem('checkbox') || '';
    return questions.filter(question => {
      if (!checkbox) return true;
      return question.checkbox === checkbox;
    });
  };

  for (let i = 0; i < questions.length; i += 1) {
    if (checkedList[questions[i].id]) {
      questions[i].checkbox = 'Checked';
    } else {
      questions[i].checkbox = 'Unchecked';
    }
  }

  const difficultyMap = { Easy: 0, Medium: 0, Hard: 0 };
  const totalDifficultyCount = { Easy: 0, Medium: 0, Hard: 0 };
  for (let i = 0; i < questions.length; i += 1) {
    difficultyMap[questions[i].difficulty] += checkedList[questions[i].id];
    totalDifficultyCount[questions[i].difficulty] += 1;
  }

  const [data, setData] = useState(filteredByCheckbox());
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

  const resetHandler = () => {
    setChecked(new Array(checked.length).fill(false));
    setDifficultyCount(() => {
      return { Easy: 0, Medium: 0, Hard: 0 };
    });
    const count = resetCount + 1;
    setResetCount(count);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'Leetcode Patterns',
        columns: [
          {
            Header: () => {
              const [resetModal, setResetModal] = React.useState(false);
              const toggleResetModal = () => {
                setResetModal(!resetModal);
              };

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
                  <br />
                  <Button
                    className="reset-button"
                    outline
                    size="sm"
                    color="danger"
                    onClick={toggleResetModal}
                  >
                    Reset
                  </Button>
                  <Modal isOpen={resetModal} toggle={toggleResetModal}>
                    <ModalHeader toggle={toggleResetModal}>
                      Are you sure you want to reset your progress?
                    </ModalHeader>
                    <ModalFooter>
                      <Button onClick={resetHandler} color="success">
                        Reset
                      </Button>
                      <Button onClick={toggleResetModal}>Cancel</Button>
                    </ModalFooter>
                  </Modal>
                </span>
              );
            },
            accessor: 'checkbox',
            id: 'checkbox',
            filterByCheckbox: () => {
              setData(filteredByCheckbox());
            },
            disableSortBy: true,
            Cell: cellInfo => {
              return (
                <span data-tip={`Question #${Number(cellInfo.row.id) + 1}`}>
                  <input
                    type="checkbox"
                    checked={checked[cellInfo.row.original.id]}
                    onChange={() => {
                      checked[cellInfo.row.original.id] = !checked[
                        cellInfo.row.original.id
                      ];
                      const question = questions.find(
                        q => q.id === cellInfo.row.original.id,
                      );
                      if (checked[cellInfo.row.original.id]) {
                        question.checkbox = 'Checked';
                      } else {
                        question.checkbox = 'Unchecked';
                      }
                      const additive = checked[cellInfo.row.original.id]
                        ? 1
                        : -1;
                      difficultyCount[
                        cellInfo.row.original.difficulty
                      ] += additive;
                      setDifficultyCount(difficultyCount);
                      setChecked([...checked]);
                      setData(filteredByCheckbox());
                    }}
                  />
                </span>
              );
            },
            Filter: SelectCheckedColumnFilter,
          },
          {
            Header: 'Questions',
            accessor: 'questions',
            disableSortBy: true,
            Cell: cellInfo => {
              return (
                <NavLink
                  target="_blank"
                  href={`https://leetcode.com/problems/${cellInfo.row.original.slug}/`}
                  onClick={() => {
                    Event(
                      'Table',
                      'Clicked question title',
                      `${cellInfo.row.original.title} question title`,
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
                  {cellInfo.row.original.title}
                </NavLink>
              );
            },
            disableFilters: true,
          },
          {
            Header: 'Solutions',
            accessor: 'solutions',
            disableSortBy: true,
            Cell: cellInfo => {
              const url = `https://leetcode.com/problems/${cellInfo.row.original.slug}/`;
              return (
                <NavLink
                  target="_blank"
                  href={`${url}discuss/?currentPage=1&orderBy=most_votes`}
                  onClick={() => {
                    Event(
                      'Table',
                      'Clicked solution',
                      `${cellInfo.row.original.slug} solution`,
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
            disableSortBy: true,
            id: 'pattern',
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
            id: 'difficulty',
            disableSortBy: true,
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
              const date = new Date(updated);
              const month = date.toLocaleString('default', {
                month: 'long',
              });
              const day = date.getDate();
              const year = date.getFullYear();
              return (
                <>
                  <div
                    style={{ whiteSpace: 'nowrap', display: 'inline-block' }}
                  >
                    Companies{' '}
                    <span
                      data-tip={`Companies that have asked these questions in the past year; retrieved from Leetcode Premium on ${month} ${day}, ${year} - thanks to @leo-step!`}
                    >
                      <FaQuestionCircle />
                    </span>
                  </div>
                </>
              );
            },
            accessor: 'companyNames',
            sortType: (a, b) => {
              if (a.original.companies.length === b.original.companies.length) {
                return 0;
              }
              return a.original.companies.length > b.original.companies.length
                ? 1
                : -1;
            },
            Cell: cellInfo => {
              const questionSlug = cellInfo.row.original.slug;
              const companies = cellInfo.row.original.companies.map(company => {
                const tooltipText = `Asked by ${company.name} ${company.frequency} times`;
                return (
                  <img
                    key={`${questionSlug}-${company.name}`}
                    src={`${iconPath}${company.slug}.png`}
                    alt={company.name}
                    data-tip={tooltipText}
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
    [resetCount],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    filteredRows,
    state: { filters },
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: {
        filters: [
          {
            id: 'checkbox',
            value: localStorage.getItem('checkbox') || '',
          },
          {
            id: 'difficulty',
            value: localStorage.getItem('difficulty') || '',
          },
          {
            id: 'pattern',
            value: localStorage.getItem('pattern') || '',
          },
          {
            id: 'companyNames',
            value: localStorage.getItem('companyNames') || '',
          },
        ],
      },
    },
    useFilters,
    useSortBy,
  );

  return (
    <Container className="table">
      <ReactTooltip />
      <PatternFrequencies filters={filters} rows={filteredRows} />
      <ReactTable borderless striped hover {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  <div {...column.getSortByToggleProps({ title: null })}>
                    {column.render('Header')}
                    {/* eslint-disable-next-line no-nested-ternary */}
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </div>
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
