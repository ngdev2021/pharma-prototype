import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import SupplierOverview from './SupplierOverview';
import ProductAssociations from './ProductAssociations';
import ActivityLog from './ActivityLog';
import PerformanceMetrics from './PerformanceMetrics';
import ContractsAndCompliance from './ContractsAndCompliance';
import FinancialInfo from './FinancialInfo';
import ReviewSection from './ReviewSection';
import CommunicationAndCollaboration from './CommunicationAndCollaboration';
import SupplierAnalyticsDashboard from './SupplierAnalyticsDashboard';

const SupplierDetailsPage = () => {
  const { id } = useParams();
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAppContext();

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/suppliers/${id}`,
          {
            headers: {
              'x-auth-token': localStorage.getItem('token'),
            },
          }
        );
        setSupplier(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch supplier details');
        setLoading(false);
      }
    };

    fetchSupplier();
  }, [id]);

  const handleSaveReview = async () => {
    if (!supplier.rating) {
      alert('Please provide a rating for the supplier.');
      return;
    }

    const newReview = {
      userId: currentUser._id,
      supplierId: supplier._id,
      rating: supplier.rating,
      comment: supplier.review,
    };

    try {
      const response = await axios.post(
        'http://localhost:5000/api/reviews',
        newReview,
        {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        }
      );

      const supplierResponse = await axios.get(
        `http://localhost:5000/api/suppliers/${supplier._id}`,
        {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        }
      );
      setSupplier(supplierResponse.data);
    } catch (error) {
      console.error(
        'Failed to save review:',
        error.response?.data || error.message
      );
      alert(
        `Failed to save review: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <SupplierOverview supplier={supplier} />
      <ProductAssociations supplier={supplier} />
      <ActivityLog supplier={supplier} />
      <PerformanceMetrics metrics={supplier.metrics} />
      <ContractsAndCompliance supplier={supplier} />
      <FinancialInfo supplier={supplier} />
      <ReviewSection
        supplier={supplier}
        handleSaveReview={handleSaveReview}
      />
      <CommunicationAndCollaboration supplier={supplier} />
      <SupplierAnalyticsDashboard analytics={supplier.analytics} />
    </div>
  );
};

export default SupplierDetailsPage;
