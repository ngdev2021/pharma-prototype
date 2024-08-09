import React from 'react';
import { Card, Table } from 'react-bootstrap';

const ContractsAndCompliance = ({ supplier }) => {
  return (
    <Card className="mb-4">
      <Card.Header as="h5">Contracts and Compliance</Card.Header>
      <Card.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Contract Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Compliance Status</th>
            </tr>
          </thead>
          <tbody>
            {supplier.contracts?.length > 0 ? (
              supplier.contracts.map((contract, index) => (
                <tr key={index}>
                  <td>{contract.name}</td>
                  <td>{contract.startDate}</td>
                  <td>{contract.endDate}</td>
                  <td>{contract.complianceStatus}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No contracts available.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default ContractsAndCompliance;
