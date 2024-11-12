import React from 'react';
import EventCard from './EventCard';

const EventList = ({ events, onRSVPToggle, userRSVPs }) => {
  if (!events.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No events available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {events.map(event => (
        <EventCard
          key={event._id}
          event={event}
          onRSVPToggle={onRSVPToggle}
          isRSVPed={userRSVPs[event._id]}
        />
      ))}
    </div>
  );
};