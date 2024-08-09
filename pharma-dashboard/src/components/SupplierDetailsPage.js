import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  fetchSupplierById,
  fetchSupplierReviews,
} from '../utils/utilities';
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
    const fetchSupplierData = async () => {
      try {
        const fetchedSupplier = await fetchSupplierById(id);
        const reviews = await fetchSupplierReviews(id);
        setSupplier({ ...fetchedSupplier, reviews });
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch supplier details');
        setLoading(false);
      }
    };

    fetchSupplierData();
  }, [id]);

  const handleSaveReview = async () => {
    if (!supplier.rating || !supplier.review) {
      alert('Please provide both a rating and a review.');
      return;
    }

    const newReview = {
      userId: currentUser._id,
      supplierId: supplier._id,
      rating: supplier.rating,
      comment: supplier.review,
    };

    try {
      await axios.post(
        'http://localhost:5000/api/reviews',
        newReview,
        {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        }
      );

      // Re-fetch updated reviews
      const updatedReviews = await fetchSupplierReviews(supplier._id);
      setSupplier({ ...supplier, reviews: updatedReviews });
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
      <SupplierOverview
        supplier={supplier}
        setSupplier={setSupplier}
      />
      <ProductAssociations
        supplier={supplier}
        setSupplier={setSupplier}
      />
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
