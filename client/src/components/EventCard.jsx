import React from 'react';
import { toast } from 'react-hot-toast';
import { CalendarIcon, MapPinIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const EventCard = ({ event, onRSVPToggle, isRSVPed }) => {
  const handleRSVP = async () => {
    try {
      await onRSVPToggle(event._id);
      toast.success(isRSVPed ? 'Successfully un-RSVPed!' : 'Successfully RSVPed!');
    } catch (error) {
      toast.error('Failed to update RSVP status. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-102 hover:shadow-lg">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">{event.name}</h2>
      <p className="text-gray-600 mb-4">{event.description}</p>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-500">
          <CalendarIcon className="h-5 w-5 mr-2" />
          <span>{new Date(event.date).toLocaleDateString()}</span>
        </div>
        
        <div className="flex items-center text-gray-500">
          <MapPinIcon className="h-5 w-5 mr-2" />
          <span>{event.location}</span>
        </div>
        
        <div className="flex items-center text-gray-500">
          <UserGroupIcon className="h-5 w-5 mr-2" />
          <span>{event.headCount} attending</span>
        </div>
      </div>

      <button
        onClick={handleRSVP}
        className={`w-full py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isRSVPed
            ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white'
            : 'bg-green-600 hover:bg-green-700 focus:ring-green-500 text-white'
        }`}
        aria-label={isRSVPed ? 'Cancel RSVP' : 'RSVP to event'}
      >
        {isRSVPed ? 'Cancel RSVP' : 'RSVP'}
      </button>
    </div>
  );
};

export default EventCard;