import React, { useState } from 'react';
import axios from 'axios';
import api from '../../api';
function Dashboard() {
  const [longUrl, setLongUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [topic, setTopic] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAliasInput, setShowAliasInput] = useState(false); // state to toggle the alias input visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    const data = {
      longUrl,
      customAlias,
      topic,
    };
  
    try {
      const response = await api.post(`${import.meta.env.VITE_API_BASE_URL}/api/shorten`, data);
      if (response.data.status === 'success') {
        setShortUrl(response.data.data.shortUrl);
        setCreatedAt(response.data.data.createdAt);
  
        // Reset the form fields after successful submission
        setLongUrl('');
        setCustomAlias('');
        setTopic('');
        setShowAliasInput(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating short URL');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h1 className="text-center mb-4">Create a Short URL</h1>

          <form onSubmit={handleSubmit}>
            {/* Long URL Input */}
            <div className="mb-3">
              <label htmlFor="longUrl" className="form-label">Long URL:</label>
              <div className="input-group">
                <span className="input-group-text" id="urlIcon"><i className="bi bi-link-45deg"></i></span>
                <input
                  type="url"
                  id="longUrl"
                  className="form-control"
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                  required
                  placeholder="Enter the URL to shorten"
                />
              </div>
            </div>

            {/* Custom Alias Input */}
            <div className="mb-3">
              <label htmlFor="customAlias" className="form-label">Custom Alias (Optional):</label>
              <select
                id="customAlias"
                className="form-select"
                value={showAliasInput ? 'enabled' : 'disabled'}
                onChange={(e) => setShowAliasInput(e.target.value === 'enabled')}
              >
                <option value="disabled">No Custom Alias</option>
                <option value="enabled">Enable Custom Alias</option>
              </select>

              {showAliasInput && (
                <div className="input-group mt-2">
                  <span className="input-group-text" id="aliasIcon"><i className="bi bi-pencil-square"></i></span>
                  <input
                    type="text"
                    id="aliasInput"
                    className="form-control"
                    value={customAlias}
                    onChange={(e) => setCustomAlias(e.target.value)}
                    placeholder="Enter a custom alias"
                  />
                </div>
              )}
            </div>

            {/* Topic Input */}
            <div className="mb-3">
              <label htmlFor="topic" className="form-label">Topic (Optional):</label>
              <input
                type="text"
                id="topic"
                className="form-control"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter a topic (optional)"
              />
            </div>

            {/* Submit Button */}
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Shortening...' : 'Shorten URL'}
              </button>
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div className="alert alert-danger mt-3">
              <strong>Error!</strong> {error}
            </div>
          )}

          {/* Result Section */}
          {shortUrl && (
            <div id="result" className="mt-4 p-3 border rounded shadow-sm">
              <h3>Shortened URL:</h3>
              <p><a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>
              <p><strong>Created At:</strong> {new Date(createdAt).toLocaleString()}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard