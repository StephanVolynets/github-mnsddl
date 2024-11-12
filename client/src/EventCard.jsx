import React, { useState } from 'react';
import EventDetails from './components/EventDetails/EventDetails';
import RSVPButton from './components/RSVPButton/RSVPButton';
import FeedbackMessage from './components/FeedbackMessage/FeedbackMessage';
import './EventCard.css';

function EventCard({ event, onRSVPToggle }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', type: 'success' });

  const handleRSVP = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setFeedback({ message: '', type: 'success' });
    
    try {
      await onRSVPToggle(event._id);
      setFeedback({
        message: event.headCount > 0 ? 'Successfully un-RSVPed!' : 'Successfully RSVPed!',
        type: 'success'
      });
    } catch (error) {
      setFeedback({
        message: 'Failed to update RSVP. Please try again.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setFeedback({ message: '', type: 'success' }), 3000);
    }
  };

  return (
    <div className="event-card" role="article">
      <div className="event-header">
        <h2 tabIndex="0">{event.name}</h2>
        <span className="head-count" aria-label={`${event.headCount} attendees`}>
          👥 {event.headCount}
        </span>
      </div>
      
      <p className="description" tabIndex="0">{event.description}</p>
      
      <EventDetails date={event.date} location={event.location} />

      <div className="action-area">
        <RSVPButton 
          isSubmitting={isSubmitting}
          onClick={handleRSVP}
          headCount={event.headCount}
        />
        
        <FeedbackMessage 
          message={feedback.message}
          type={feedback.type}
        />
      </div>
    </div>
  );
}

export default EventCard;