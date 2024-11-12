import React from 'react';
import './EventDetails.css';

function EventDetails({ date, location }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="event-details">
      <p className="date" aria-label={`Event date: ${formatDate(date)}`}>
        📅 {formatDate(date)}
      </p>
      <p className="location" aria-label={`Location: ${location}`}>
        📍 {location}
      </p>
    </div>
  );
}

export default EventDetails;