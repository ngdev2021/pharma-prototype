// utilities.js

import axios from 'axios';

export const fetchSupplierById = async (supplierId) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/suppliers/${supplierId}`,
      {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching supplier:', error);
    throw error;
  }
};

export const fetchSupplierReviews = async (supplierId) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/reviews?supplierId=${supplierId}`,
      {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching supplier reviews:', error);
    throw error;
  }
};

export const fetchInventory = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(
      'http://localhost:5000/api/inventory',
      {
        headers: {
          'x-auth-token': token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching inventory:', error);
    throw error;
  }
};

export const fetchOrders = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(
      'http://localhost:5000/api/orders',
      {
        headers: {
          'x-auth-token': token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const fetchUsers = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(
      'http://localhost:5000/api/users',
      {
        headers: {
          'x-auth-token': token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const fetchUserById = async (userId) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/users/${userId}`,
      {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const fetchUserOrders = async (userId) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/orders?userId=${userId}`,
      {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error;
  }
};

export const fetchUserReviews = async (userId) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/reviews?userId=${userId}`,
      {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching user reviews:', error);
    throw error;
  }
};

export const fetchOrderById = async (orderId) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/orders/${orderId}`,
      {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
};

export const fetchOrderItems = async (orderId) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/order-items?orderId=${orderId}`,
      {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching order items:', error);
    throw error;
  }
};

export const fetchOrderReviews = async (orderId) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/reviews?orderId=${orderId}`,
      {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching order reviews:', error);
    throw error;
  }
};

export const fetchUser = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(
      'http://localhost:5000/api/user',
      {
        headers: {
          'x-auth-token': token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const fetchUserNotifications = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(
      'http://localhost:5000/api/notifications',
      {
        headers: {
          'x-auth-token': token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching user notifications:', error);
    throw error;
  }
};
