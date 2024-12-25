import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import api from '../../api';

const UrlAnalytics = () => {
  const { alias } = useParams();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUrlAnalytics = async () => {
      try {
        const response = await api.get(`${import.meta.env.VITE_API_BASE_URL}/api/analytics/${alias}`);
        if (response.data.status === 'success') {
          setAnalytics(response.data.data);
        } else {
          setError('Failed to fetch URL analytics');
        }
      } catch (err) {
        setError(err.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchUrlAnalytics();
  }, [alias]);

  // Loading State
  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
        <p>Loading URL analytics...</p>
      </div>
    );
  }

  // Error State
  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Analytics for URL: {alias}</h2>

      {/* Total Clicks */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Total Clicks</h5>
          <p className="card-text">{analytics.total_clicks}</p>
        </div>
      </div>

      {/* Unique Clicks */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Unique Clicks</h5>
          <p className="card-text">{analytics.unique_clicks}</p>
        </div>
      </div>

      {/* Clicks by Date */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Clicks by Date</h5>
          <ul className="list-group">
            {analytics.clicksByDate.map((data, index) => (
              <li key={index} className="list-group-item">
                {data.date}: {data.totalClicks} clicks
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* OS Type */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Operating System</h5>
          <ul className="list-group">
            {analytics.osType.map((os, index) => (
              <li key={index} className="list-group-item">
                {os.osName}: {os.uniqueClicks} unique clicks, {os.uniqueUsers} unique users
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Device Type */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Device Type</h5>
          <ul className="list-group">
            {analytics.deviceType.map((device, index) => (
              <li key={index} className="list-group-item">
                {device.deviceName}: {device.uniqueClicks} unique clicks, {device.uniqueUsers} unique users
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UrlAnalytics;
