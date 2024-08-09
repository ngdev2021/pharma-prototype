// ActivityTypeIcon.js
import React from 'react';
import {
  FaSignInAlt,
  FaUserEdit,
  FaTrashAlt,
  FaInfoCircle,
} from 'react-icons/fa';

const ActivityTypeIcon = ({ type }) => {
  switch (type) {
    case 'login':
      return <FaSignInAlt className="text-success" />;
    case 'edit':
      return <FaUserEdit className="text-warning" />;
    case 'delete':
      return <FaTrashAlt className="text-danger" />;
    default:
      return <FaInfoCircle className="text-primary" />;
  }
};

export default ActivityTypeIcon;
