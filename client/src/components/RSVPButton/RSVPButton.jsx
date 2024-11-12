import React from 'react';
import './RSVPButton.css';

function RSVPButton({ isSubmitting, onClick, headCount }) {
  return (
    <button 
      onClick={onClick}
      disabled={isSubmitting}
      aria-busy={isSubmitting}
      className={`rsvp-button ${isSubmitting ? 'loading' : ''} ${headCount > 0 ? 'active' : ''}`}
    >
      {isSubmitting ? 'Updating...' : headCount > 0 ? 'Cancel RSVP' : 'RSVP'}
    </button>
  );
}

export default RSVPButton;