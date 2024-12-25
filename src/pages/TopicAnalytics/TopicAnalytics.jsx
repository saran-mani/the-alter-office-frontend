import React, { useState, useEffect } from "react";
import api from "../../api";
import './TopicAnalytics.css'; // Ensure this file contains the necessary styles

const TopicsAnalytics = () => {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingTopics, setLoadingTopics] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopics = async () => {
      setLoadingTopics(true);
      try {
        const response = await api.get(`${import.meta.env.VITE_API_BASE_URL}/api/shorten/topics`);
        const uniqueTopics = Array.from(new Set(response.data.data.map((item) => item.topic)))
          .map((topic) => ({ topic }));

        setTopics(uniqueTopics);
      } catch (err) {
        setError("Failed to load topics");
      } finally {
        setLoadingTopics(false);
      }
    };
    fetchTopics();
  }, []);

  const fetchAnalytics = async (topic) => {
    setLoading(true);
    setSelectedTopic(topic);
    setError(null);

    try {
      const response = await api.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/analytics/topic/${topic}`
      );
      setAnalyticsData(response.data.data);
    } catch (err) {
      setError("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Select a Topic</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {loadingTopics ? (
        <div>Loading topics...</div>
      ) : (
        <div className="topics-container">
          {topics.length === 0 ? (
            <div>No topics available</div>
          ) : (
            topics.map((item, index) => (
              <button
                key={index}
                className="topic-button"
                onClick={() => fetchAnalytics(item.topic)}
              >
                {item.topic}
              </button>
            ))
          )}
        </div>
      )}

      {loading && <div>Loading analytics...</div>}

      {selectedTopic && analyticsData ? (
        <div>
          <h3>Analytics for {selectedTopic}</h3>

          <div>
            <h4>Total Clicks: {analyticsData.totalClicks || "No data available"}</h4>
            <h4>Unique Clicks: {analyticsData.uniqueClicks || "No data available"}</h4>

            <h5>Clicks By Date:</h5>
            <ul>
              {Array.isArray(analyticsData.clicksByDate) && analyticsData.clicksByDate.length > 0 ? (
                analyticsData.clicksByDate.map((dateData, index) => (
                  <li key={index}>
                    {dateData.date}: {dateData.totalClicks} clicks
                  </li>
                ))
              ) : (
                <li>No click data available</li>
              )}
            </ul>

            <h5>Shortened URLs:</h5>
            <ul>
              {Array.isArray(analyticsData.urls) && analyticsData.urls.length > 0 ? (
                analyticsData.urls.map((urlData, index) => (
                  <li key={index}>
                    <a href={urlData.shortUrl} target="_blank" rel="noopener noreferrer">
                      {urlData.shortUrl}
                    </a>
                    <p>Total Clicks: {urlData.totalClicks}</p>
                    <p>Unique Clicks: {urlData.uniqueClicks}</p>
                  </li>
                ))
              ) : (
                <li>No URLs available</li>
              )}
            </ul>
          </div>
        </div>
      ) : (
        <div>Select a topic to view analytics</div>
      )}
    </div>
  );
};

export default TopicsAnalytics;
