import React, { useState } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, NavLink } from 'reactstrap';
import ReactMarkdown from 'react-markdown';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { Event } from '../Shared/Tracking';

import './styles.scss';

const PATTERNS = [
  { name: 'Arrays', file: 'arrays.md', slug: 'arrays' },
  { name: 'BFS', file: 'bfs.md', slug: 'bfs' },
  { name: 'Backtracking', file: 'backtracking.md', slug: 'backtracking' },
  { name: 'Binary Search', file: 'binary-search.md', slug: 'binary-search' },
  { name: 'Bit Manipulation', file: 'bit-manipulation.md', slug: 'bit-manipulation' },
  { name: 'Bucket Sort', file: 'bucket-sort.md', slug: 'bucket-sort' },
  { name: 'DFS', file: 'dfs.md', slug: 'dfs' },
  { name: 'Design', file: 'design.md', slug: 'design' },
  { name: 'Dynamic Programming', file: 'dynamic-programming.md', slug: 'dynamic-programming' },
  { name: 'Fast & Slow Pointers', file: 'fast-slow-pointers.md', slug: 'fast-slow-pointers' },
  { name: 'Graph', file: 'graph.md', slug: 'graph' },
  { name: 'Greedy', file: 'greedy.md', slug: 'greedy' },
  { name: 'Heap', file: 'heap.md', slug: 'heap' },
  { name: 'In-place reversal of a linked list', file: 'in-place-reversal-linked-list.md', slug: 'in-place-reversal-linked-list' },
  { name: 'Intervals', file: 'intervals.md', slug: 'intervals' },
  { name: 'QuickSelect', file: 'quickselect.md', slug: 'quickselect' },
  { name: 'Sliding Window', file: 'sliding-window.md', slug: 'sliding-window' },
  { name: 'Sorting', file: 'sorting.md', slug: 'sorting' },
  { name: 'Topological Sort', file: 'topological-sort.md', slug: 'topological-sort' },
  { name: 'Trie', file: 'trie.md', slug: 'trie' },
  { name: 'Two Pointers', file: 'two-pointers.md', slug: 'two-pointers' },
  { name: 'Union Find', file: 'union-find.md', slug: 'union-find' },
];

const PatternGuides = () => {
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [guideContent, setGuideContent] = useState('');

  const loadGuide = async (pattern) => {
    setSelectedPattern(pattern);
    try {
      // In production, guides would be served from public/guides
      // For now, we'll link to GitHub
      const response = await fetch(
        `https://raw.githubusercontent.com/SeanPrashad/leetcode-patterns/main/guides/${pattern.file}`
      );
      if (response.ok) {
        const text = await response.text();
        setGuideContent(text);
      } else {
        setGuideContent(`# ${pattern.name}\n\nGuide content will be available soon. Please check the [GitHub repository](https://github.com/SeanPrashad/leetcode-patterns/tree/main/guides) for the latest guides.`);
      }
    } catch (error) {
      setGuideContent(`# ${pattern.name}\n\nUnable to load guide. Please check the [GitHub repository](https://github.com/SeanPrashad/leetcode-patterns/tree/main/guides/${pattern.file}) for this guide.`);
    }
  };

  return (
    <Container className="pattern-guides">
      <Row>
        <Col md={12}>
          <div className="guides-header mb-4">
            <h2>Pattern Deep-Dive Guides</h2>
            <p className="text-muted">
              Comprehensive guides for each coding pattern used in LeetCode problems.
              Each guide explains the core concept, when to use the pattern, provides template code,
              and links to relevant problems.
            </p>
            <NavLink
              href="https://github.com/SeanPrashad/leetcode-patterns/tree/main/guides"
              target="_blank"
              onClick={() => Event('PatternGuides', 'Clicked link', 'GitHub guides link')}
            >
              View all guides on GitHub <FaExternalLinkAlt />
            </NavLink>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Card>
            <CardBody>
              <CardTitle tag="h5">Available Patterns</CardTitle>
              <div className="pattern-list">
                {PATTERNS.map((pattern) => (
                  <NavLink
                    key={pattern.slug}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      loadGuide(pattern);
                      Event('PatternGuides', 'Selected pattern', pattern.name);
                    }}
                    className={selectedPattern?.slug === pattern.slug ? 'active' : ''}
                  >
                    {pattern.name}
                  </NavLink>
                ))}
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={8}>
          {selectedPattern ? (
            <Card>
              <CardBody>
                <div className="guide-content">
                  <ReactMarkdown>{guideContent}</ReactMarkdown>
                </div>
              </CardBody>
            </Card>
          ) : (
            <Card>
              <CardBody>
                <p className="text-muted">
                  Select a pattern from the list to view its comprehensive guide.
                  Each guide includes:
                </p>
                <ul>
                  <li><strong>Core Concept</strong>: What the pattern is and why it exists</li>
                  <li><strong>When to Use</strong>: Problem characteristics that signal this pattern</li>
                  <li><strong>Template Code</strong>: Skeleton code showing the structure</li>
                  <li><strong>Related Problems</strong>: Links to problems using this pattern</li>
                  <li><strong>Time & Space Complexity</strong>: Complexity analysis</li>
                </ul>
              </CardBody>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PatternGuides;

