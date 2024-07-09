import React from 'react';
import { ProgressBar, Container, Row, Col, Card } from 'react-bootstrap';
import './OrderProgress.css';

const OrderProgress = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header>
              <h4>Order Progress</h4>
            </Card.Header>
            <Card.Body>
              <div className="order-item">
                <h5>Item: Pizza</h5>
                <p>Status: In Progress</p>
              </div>
              <ProgressBar animated now={60} label="In Progress" />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderProgress;
