import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import EventList from './components/EventList';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';

const API_BASE_URL = 'http://localhost:8080/api';

function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRSVPs, setUserRSVPs] = useState({});

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/events`);
      setEvents(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load events. Please try again later.');
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRSVPToggle = async (eventId) => {
    const isRSVPed = userRSVPs[eventId];
    const action = isRSVPed ? 'unrsvp' : 'rsvp';

    try {
      const response = await axios.post(
        `${API_BASE_URL}/events/${eventId}/headCount/${action}`
      );

      setEvents(events.map(event => 
        event._id === eventId ? response.data : event
      ));
      
      setUserRSVPs(prev => ({
        ...prev,
        [eventId]: !isRSVPed
      }));
    } catch (error) {
      throw new Error('Failed to update RSVP status');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Event RSVP</h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {error ? (
            <div className="bg-red-50 p-4 rounded-md">
              <p className="text-red-700">{error}</p>
            </div>
          ) : (
            <EventList
              events={events}
              onRSVPToggle={handleRSVPToggle}
              userRSVPs={userRSVPs}
            />
          )}
        </main>
        <Toaster position="bottom-right" />
      </div>
    </ErrorBoundary>
  );
}