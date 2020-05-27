import React from 'react';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  NavLink,
  Row,
  Col,
  Container,
} from 'reactstrap';
import { Event } from '../Shared/Tracking';

import Blind from '../../images/Blind.png';
import Educative from '../../images/Educative.png';
import Hackernoon from '../../images/Hackernoon.png';

import './styles.scss';

const Acknowledgements = () => {
  return (
    <Container className="acknowledgements">
      <Row>
        <h1>
          The following sources were used in aggregating this question list:
        </h1>
      </Row>
      <Row>
        <Col sm={3}>
          <Card>
            <CardImg top width="100%" src={Blind} alt="Blind 75 Question" />
            <CardBody>
              <CardTitle>Blind Curated 75 Question List</CardTitle>
              <CardSubtitle>
                <NavLink
                  target="_blank"
                  href="https://www.teamblind.com/post/New-Year-Gift---Curated-List-of-Top-100-LeetCode-Questions-to-Save-Your-Time-OaM1orEU"
                  onClick={() => {
                    Event('Acknowledgements', 'Clicked URL', 'Blind 75 url');
                  }}
                >
                  https://www.teamblind.com/post/New-Year-Gift---Curated-List-of-Top-100-LeetCode-Questions-to-Save-Your-Time-OaM1orEU
                </NavLink>
              </CardSubtitle>
            </CardBody>
          </Card>
        </Col>
        <Col sm={3}>
          <Card>
            <CardImg top width="100%" src={Educative} alt="Educative.io" />
            <CardBody>
              <CardTitle>Grokking the Coding Interview</CardTitle>
              <CardSubtitle>
                <NavLink
                  target="_blank"
                  href="https://www.educative.io/courses/grokking-the-coding-interview"
                  onClick={() => {
                    Event(
                      'Acknowledgements',
                      'Clicked URL',
                      'Educative.io url',
                    );
                  }}
                >
                  https://www.educative.io/courses/grokking-the-coding-interview
                </NavLink>
              </CardSubtitle>
            </CardBody>
          </Card>
        </Col>
        <Col sm={3}>
          <Card>
            <CardImg top width="100%" src={Hackernoon} alt="Hackernoon" />
            <CardBody>
              <CardTitle>
                14 Patterns to Ace Any Coding Interview Question
              </CardTitle>
              <CardSubtitle>
                <NavLink
                  target="_blank"
                  href="https://hackernoon.com/14-patterns-to-ace-any-coding-interview-question-c5bb3357f6ed"
                  onClick={() => {
                    Event('Acknowledgements', 'Clicked URL', 'Hackernoon url');
                  }}
                >
                  https://hackernoon.com/14-patterns-to-ace-any-coding-interview-question-c5bb3357f6ed
                </NavLink>
              </CardSubtitle>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Acknowledgements;
