import React from 'react';
import { Card, Table } from 'react-bootstrap';

const FinancialInfo = ({ supplier }) => {
  return (
    <Card className="mb-4">
      <Card.Header as="h5">Financial Information</Card.Header>
      <Card.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {supplier.financialInfo?.transactions?.length > 0 ? (
              supplier.financialInfo.transactions.map(
                (transaction, index) => (
                  <tr key={index}>
                    <td>{transaction.id}</td>
                    <td>{transaction.date}</td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.status}</td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td colSpan="4">No transactions available.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default FinancialInfo;
