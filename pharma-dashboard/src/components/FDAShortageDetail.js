import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Table,
  Spinner,
  Alert,
  Breadcrumb,
  Button,
  Form,
  Row,
  Col,
  ListGroup,
  Pagination,
} from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Styled Components
const StyledContainer = styled(Container)`
  margin-top: 20px;
`;

const FeedbackConfirmation = styled.div`
  margin-top: 10px;
  font-size: 1rem;
  color: green;
`;

const FeedbackListItem = styled(ListGroup.Item)`
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  margin-bottom: 10px;
  border-radius: 5px;
  padding: 15px;
`;

const FeedbackText = styled.p`
  font-size: 1rem;
  color: #333;
  margin-bottom: 5px;
`;

const FeedbackDate = styled.small`
  font-size: 0.85rem;
  color: #777;
`;

const SubmitButton = styled(Button)`
  background-color: #007bff;
  border: none;
  &:hover {
    background-color: #0056b3;
  }
`;

const FeedbackSection = ({ shortageId }) => {
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [feedbackList, setFeedbackList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(
          `/fda-data/shortages/${shortageId}/feedback`
        );
        setFeedbackList(response.data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchFeedback();
  }, [shortageId]);

  const handleSubmitFeedback = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage('');

    try {
      const response = await axios.post(
        `/fda-data/shortages/${shortageId}/feedback`,
        { comment: feedback },
        {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        }
      );
      setSuccessMessage('Feedback submitted successfully!');
      setFeedback('');
      setFeedbackList([...feedbackList, response.data]);
    } catch (error) {
      setError('Failed to submit feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedFeedback = feedbackList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <h5>Leave Feedback</h5>
      {error && <Alert variant="danger">{error}</Alert>}
      {successMessage && (
        <FeedbackConfirmation>{successMessage}</FeedbackConfirmation>
      )}
      <Form>
        <Form.Group controlId="feedback">
          <Form.Control
            as="textarea"
            rows={3}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Leave your feedback here"
          />
        </Form.Group>
        <SubmitButton
          onClick={handleSubmitFeedback}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Feedback'}
        </SubmitButton>
      </Form>

      <h5 className="mt-4">Feedback</h5>
      <ListGroup>
        {paginatedFeedback.length > 0 ? (
          paginatedFeedback.map((item, index) => (
            <FeedbackListItem key={index}>
              <FeedbackText>{item.comment}</FeedbackText>
              <FeedbackDate>
                {new Date(item.date).toLocaleDateString()}
              </FeedbackDate>
            </FeedbackListItem>
          ))
        ) : (
          <ListGroup.Item>No feedback available.</ListGroup.Item>
        )}
      </ListGroup>

      {feedbackList.length > itemsPerPage && (
        <Pagination className="mt-3">
          {Array.from({
            length: Math.ceil(feedbackList.length / itemsPerPage),
          }).map((_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}
    </div>
  );
};

const FDAShortageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shortage, setShortage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShortageDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/fda-data/shortages/${id}`
        );
        setShortage(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch shortage details');
        setLoading(false);
      }
    };

    fetchShortageDetail();
  }, [id]);

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text('FDA Shortage Details', 20, 10);
    doc.autoTable({ html: '#shortageTable' });
    doc.save('shortage-details.pdf');
  };

  if (loading) {
    return (
      <StyledContainer className="text-center my-4">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </StyledContainer>
    );
  }

  if (error) {
    return (
      <StyledContainer className="text-center my-4">
        <Alert variant="danger">{error}</Alert>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <Breadcrumb>
        <Breadcrumb.Item onClick={() => navigate('/')}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item onClick={() => navigate('/fda-shortages')}>
          FDA Shortages
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{id}</Breadcrumb.Item>
      </Breadcrumb>

      <h1>{shortage.generic_name}</h1>
      <Table striped bordered hover responsive id="shortageTable">
        <tbody>
          <tr>
            <td>Company Name</td>
            <td>{shortage.company_name}</td>
          </tr>
          <tr>
            <td>Contact Info</td>
            <td>{shortage.contact_info}</td>
          </tr>
          <tr>
            <td>Presentation</td>
            <td>{shortage.presentation}</td>
          </tr>
          <tr>
            <td>Type of Update</td>
            <td>{shortage.type_of_update}</td>
          </tr>
          <tr>
            <td>Date of Update</td>
            <td>
              {new Date(shortage.date_of_update).toLocaleDateString()}
            </td>
          </tr>
          <tr>
            <td>Availability Info</td>
            <td>{shortage.availability_info}</td>
          </tr>
          <tr>
            <td>Resolved Note</td>
            <td>{shortage.resolved_note}</td>
          </tr>
          <tr>
            <td>Reason for Shortage</td>
            <td>{shortage.reason_for_shortage}</td>
          </tr>
          <tr>
            <td>Therapeutic Category</td>
            <td>{shortage.therapeutic_category}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>{shortage.status}</td>
          </tr>
          <tr>
            <td>Change Date</td>
            <td>
              {new Date(shortage.change_date).toLocaleDateString()}
            </td>
          </tr>
          <tr>
            <td>Initial Posting Date</td>
            <td>
              {new Date(
                shortage.initial_posting_date
              ).toLocaleDateString()}
            </td>
          </tr>
        </tbody>
      </Table>

      <Row className="mt-4">
        <Col md={4}>
          <Button
            variant="secondary"
            onClick={() => navigate('/fda-shortages')}
          >
            Back to List
          </Button>
        </Col>
        <Col md={4}>
          <Button variant="info" onClick={handleExportPDF}>
            Export as PDF
          </Button>
        </Col>
        <Col md={4}>
          <Button
            variant="primary"
            onClick={() =>
              navigator.clipboard.writeText(window.location.href)
            }
          >
            Copy Link
          </Button>
        </Col>
      </Row>

      <FeedbackSection shortageId={id} />
    </StyledContainer>
  );
};

export default FDAShortageDetail;
