/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Table as ReactTable,
  Container,
  Row,
  Badge,
  Progress,
  NavLink,
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
} from 'reactstrap';
import Toggle from 'react-toggle';
import ReactTooltip from 'react-tooltip';
import { PieChart } from 'react-minimal-pie-chart';
import { useTable, useFilters, useSortBy } from 'react-table';
import {
  FaLock,
  FaExternalLinkAlt,
  FaRandom,
  FaQuestionCircle,
} from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

  let checkedAtList =
    JSON.parse(localStorage.getItem('checkedAt')) ||
    new Array(questions.length).fill('');

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

  if (checkedAtList.length !== questions.length) {
    const resizedCheckedAtList = new Array(questions.length).fill('');

    for (let i = 0; i < checkedAtList.length; i += 1) {
      resizedCheckedAtList[i] = checkedAtList[i];
    }

    checkedAtList = resizedCheckedAtList;
    window.localStorage.setItem('checkedAt', JSON.stringify(checkedAtList));
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

  const difficultyMap = { Easy: 0, Medium: 0, Hard: 0, Total: 0 };
  const totalDifficultyCount = {
    Easy: 0,
    Medium: 0,
    Hard: 0,
    Total: questions.length,
  };
  for (let i = 0; i < questions.length; i += 1) {
    difficultyMap[questions[i].difficulty] += checkedList[questions[i].id];
    difficultyMap.Total += checkedList[questions[i].id];
    totalDifficultyCount[questions[i].difficulty] += 1;
  }

  const [checkedAt, setCheckedAt] = useState(checkedAtList);
  const [data, setData] = useState(filteredByCheckbox());
  const [difficultyCount, setDifficultyCount] = useState(difficultyMap);
  const [checked, setChecked] = useState(checkedList);
  const [showPatterns, setShowPatterns] = useState(
    JSON.parse(localStorage.getItem('showPatterns')) || new Array(1).fill(true),
  );
  const savedImportant = JSON.parse(localStorage.getItem('importantProblems'));
  const [important, setImportant] = useState(
    savedImportant && savedImportant.length === questions.length
      ? savedImportant
      : new Array(questions.length).fill(false),
  );
  const [starAnimation, setStarAnimation] = useState({});

  // Returns an array of question objects that are starred
  const getStarredQuestions = () => {
    return questions.filter((q, idx) => important[idx]);
  };
  useEffect(() => {
    localStorage.setItem('importantProblems', JSON.stringify(important));
  }, [important]);

  useEffect(() => {
    window.localStorage.setItem('checked', JSON.stringify(checked));
  }, [checked]);

  useEffect(() => {
    window.localStorage.setItem('checkedAt', JSON.stringify(checkedAt));
  }, [checkedAt]);

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
      return { Easy: 0, Medium: 0, Hard: 0, Total: 0 };
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
                const clearedCheckedAt = checkedAt.map(() => null);
                setCheckedAt(clearedCheckedAt);
              };

              return (
                <span className="d-flex flex-column justify-content-between">
                  <PieChart
                    data={[
                      {
                        title: 'One',
                        value: difficultyCount.Total,
                        color: '#ffa929',
                      },
                    ]}
                    totalValue={totalDifficultyCount.Total}
                    label={() =>
                      `${difficultyCount.Total} /
                        ${totalDifficultyCount.Total}`
                    }
                    labelPosition={0}
                    labelStyle={{
                      // Needed for Dark Reader to work
                      fill: '#A54800',
                    }}
                    startAngle={-90}
                    lineWidth={12}
                    className="progress-pie"
                    background="#e9ecef"
                  />
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
                      const currentTime = new Date().toISOString().slice(0, 10);
                      // const updatedCheckedAt = [...checkedAt];
                      checkedAt[cellInfo.row.original.id] = checked[
                        cellInfo.row.original.id
                      ]
                        ? currentTime
                        : null;
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
                      difficultyCount.Total += additive;
                      setDifficultyCount(difficultyCount);
                      setChecked([...checked]);
                      setData(filteredByCheckbox());
                      setCheckedAt([...checkedAt]);
                    }}
                  />
                </span>
              );
            },
            Filter: SelectCheckedColumnFilter,
          },
          {
            /* eslint-disable react/prop-types */
            Header: ({ filteredRows }) => {
              const disableRandomQuestionButton = filteredRows.length === 0;

              const randomQuestion = () => {
                const random = Math.floor(Math.random() * filteredRows.length);
                const randomFilteredRow = filteredRows[random];
                const questionSlug = randomFilteredRow.original.slug;
                /* eslint-enable react/prop-types */

                window.open(
                  `https://leetcode.com/problems/${questionSlug}/`,
                  '_blank',
                );
              };
              return (
                <>
                  <div id="difficultyProgress">
                    <ProgressBar
                      style={{ marginBottom: 10 }}
                      name="Easy"
                      value={difficultyCount.Easy}
                      total={totalDifficultyCount.Easy}
                      barClassName="easy"
                    />
                    <ProgressBar
                      name="Medium"
                      value={difficultyCount.Medium}
                      total={totalDifficultyCount.Medium}
                      barClassName="medium"
                    />
                    <ProgressBar
                      name="Hard"
                      value={difficultyCount.Hard}
                      total={totalDifficultyCount.Hard}
                      barClassName="hard"
                    />
                  </div>
                  <div
                    style={{ whiteSpace: 'nowrap', display: 'inline-block' }}
                  >
                    Questions{' '}
                    <Button
                      disabled={disableRandomQuestionButton}
                      onClick={randomQuestion}
                      color="dark"
                      id="random-question-button"
                      size="sm"
                    >
                      <span data-tip="Try a random question!">
                        <FaRandom />
                      </span>
                    </Button>
                  </div>
                </>
              );
            },
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
          /* eslint-disable react/prop-types */
          {
            Header: '⭐',
            accessor: 'important',
            disableSortBy: true,
            disableFilters: true,
            Cell: ({ row }) => {
              const id = Number(row?.original?.id);
              if (Number.isNaN(id)) return '❌';

              const handleToggle = () => {
                const updatedImportant = [...important];
                updatedImportant[id] = !updatedImportant[id];
                setImportant(updatedImportant);
                toast(
                  updatedImportant[id]
                    ? 'Marked as Important'
                    : 'Removed from Important',
                  {
                    type: updatedImportant[id] ? 'success' : 'info',
                    autoClose: 1200,
                    hideProgressBar: true,
                    position: 'bottom-center',
                  },
                );
                // Trigger animation
                setStarAnimation(prev => ({ ...prev, [id]: true }));
                setTimeout(() => {
                  setStarAnimation(prev => ({ ...prev, [id]: false }));
                }, 400);
              };

              const handleKeyPress = e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleToggle();
                }
              };

              return (
                <span
                  role="button"
                  tabIndex={0}
                  style={{
                    cursor: 'pointer',
                    fontSize: '1.2em',
                    transition: 'color 0.2s',
                  }}
                  className={
                    important[id] && starAnimation[id] ? 'star-animate' : ''
                  }
                  onClick={handleToggle}
                  onKeyDown={handleKeyPress}
                  aria-label="Mark as important for revision"
                  data-tip="Mark as important for revision"
                >
                  {important[id] ? '⭐' : '☆'}
                </span>
              );
            },
          }, // Optional
          /* eslint-enable react/prop-types */ {
            Header: 'Last Solved On',
            accessor: 'LastSolvedOn',
            disableSortBy: true,
            Cell: cellInfo => {
              return (
                <div className="lastSolvedOn">
                  {checkedAt[cellInfo.row.original.id]}
                </div>
              );
            },
            disableFilters: true,
          },
        ],
      },
    ],
    // eslint-disable-next-line
    [resetCount, important],
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

  const [showOnlyStarred, setShowOnlyStarred] = useState(false);

  useEffect(() => {
    if (showOnlyStarred) {
      setData(getStarredQuestions());
    } else {
      setData(filteredByCheckbox());
    }
    // eslint-disable-next-line
  }, [showOnlyStarred, important, checked, resetCount]);

  return (
    <Container className="table">
      <ToastContainer />
      <ReactTooltip />
      <PatternFrequencies filters={filters} rows={filteredRows} />

      {/* Minimal Show Only Starred Button */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '1rem',
        }}
      >
        <Button
          color={showOnlyStarred ? 'warning' : 'secondary'}
          outline={!showOnlyStarred}
          size="sm"
          style={{
            fontWeight: 600,
            letterSpacing: '0.5px',
            boxShadow: showOnlyStarred
              ? '0 0 0 2px #ffd666'
              : '0 0 0 1px #d9d9d9',
            transition: 'box-shadow 0.2s',
          }}
          onClick={() => setShowOnlyStarred(!showOnlyStarred)}
        >
          {showOnlyStarred ? 'Show All Questions' : 'Show Only Starred ⭐'}
        </Button>
      </div>

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

const ProgressBar = ({ name, value, total, className, barClassName }) => {
  return (
    <div>
      <div className="d-flex justify-content-between">
        <div>{name}</div>
        <div>
          {value}/{total}
        </div>
      </div>
      <Progress
        className={className}
        barClassName={barClassName}
        value={(value / total) * 100}
      />
    </div>
  );
};

ProgressBar.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  className: PropTypes.string,
  barClassName: PropTypes.string,
};

ProgressBar.defaultProps = {
  className: 'progress-bar-sm',
  barClassName: null,
};

export default Table;
