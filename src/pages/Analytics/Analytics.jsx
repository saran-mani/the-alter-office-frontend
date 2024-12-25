import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import api from "../../api";

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/analytics/overall`
        );
        if (response.data.status === "success") {
          setAnalyticsData(response.data.data);
        } else {
          setError("Failed to fetch data");
        }
      } catch (err) {
        setError(err.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  // Loading State
  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Analytics Data</h2>

      {/* Total URLs and Clicks */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total URLs</h5>
              <p className="card-text">{analyticsData.totalUrls}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Clicks</h5>
              <p className="card-text">{analyticsData.totalClicks}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Unique Clicks */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Unique Clicks</h5>
              <p className="card-text">{analyticsData.uniqueClicks}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Clicks by Date */}
      <div className="row mb-4">
        <div className="col-12">
          <h4>Clicks by Date</h4>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Date</th>
                <th>Total Clicks</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.clicksByDate.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.totalClicks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* OS Type Statistics */}
      <div className="row mb-4">
        <div className="col-12">
          <h4>Clicks by OS</h4>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>OS Name</th>
                <th>Unique Clicks</th>
                <th>Unique Users</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.osType.map((item, index) => (
                <tr key={index}>
                  <td>{item.osName}</td>
                  <td>{item.uniqueClicks}</td>
                  <td>{item.uniqueUsers}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Device Type Statistics */}
      <div className="row mb-4">
        <div className="col-12">
          <h4>Clicks by Device</h4>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Device Name</th>
                <th>Unique Clicks</th>
                <th>Unique Users</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.deviceType.map((item, index) => (
                <tr key={index}>
                  <td>{item.deviceName}</td>
                  <td>{item.uniqueClicks}</td>
                  <td>{item.uniqueUsers}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Listing Short URLs */}
      <div className="row mb-4">
        <div className="col-12">
          <h4>Short URLs</h4>
          {analyticsData.shortUrls && analyticsData.shortUrls.length > 0 ? (
            <ul className="list-group">
              {analyticsData.shortUrls.map((urlItem, index) => (
                <li key={index} className="list-group-item">
                  <p>{urlItem.url}</p>
                  <a href={`${urlItem.url}`} target="_blank">
                    <button className="btn btn-primary m-2">Open</button>
                  </a>
                  <Link to={`/analytics/${urlItem.alias}`}>
                    <button className="btn btn-primary">View analytics</button>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No URLs available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
