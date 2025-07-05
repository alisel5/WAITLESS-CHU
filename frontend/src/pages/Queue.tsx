import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// Types (your teammate will define these)
interface QueueTicket {
  id: string;
  ticketNumber: string;
  position: number;
  estimatedWaitTime: number;
  qrCode: string;
  status: string;
}

const Queue: React.FC = () => {
  const { departmentId } = useParams<{ departmentId: string }>();
  const [ticket, setTicket] = useState<QueueTicket | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const joinQueue = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Your teammate will implement this API call
      // const response = await fetch('http://localhost:3001/api/queue/tickets', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ userId: 'user-123', departmentId })
      // });
      // const data = await response.json();
      
      // Mock data for now
      const mockTicket: QueueTicket = {
        id: 'ticket-123',
        ticketNumber: 'DEPT-20231201-0001',
        position: 5,
        estimatedWaitTime: 150,
        qrCode: 'data:image/png;base64,mock-qr-code',
        status: 'waiting'
      };
      
      setTicket(mockTicket);
    } catch (err) {
      setError('Failed to join queue. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Join Queue
        </h1>
        <p className="text-gray-600">
          Department ID: {departmentId}
        </p>
      </div>

      {!ticket ? (
        <div className="max-w-md mx-auto">
          <div className="queue-card">
            <h2 className="text-xl font-semibold mb-4">
              Ready to join the queue?
            </h2>
            <p className="text-gray-600 mb-6">
              You'll receive a ticket with a QR code that you can use to track your position.
            </p>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            <button
              onClick={joinQueue}
              disabled={loading}
              className="button-primary w-full disabled:opacity-50"
            >
              {loading ? 'Joining...' : 'Join Queue'}
            </button>
            
            <Link
              to="/"
              className="block text-center text-blue-500 hover:underline mt-4"
            >
              ← Back to Departments
            </Link>
          </div>
        </div>
      ) : (
        <div className="max-w-lg mx-auto">
          <div className="queue-card">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Your Ticket
              </h2>
              <p className="text-gray-600">
                Ticket #{ticket.ticketNumber}
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                <span className="text-gray-700">Current Position:</span>
                <span className="position-indicator">{ticket.position}</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                <span className="text-gray-700">Estimated Wait:</span>
                <span className="text-xl font-semibold text-green-600">
                  {Math.round(ticket.estimatedWaitTime / 60)} minutes
                </span>
              </div>
            </div>

            <div className="qr-container mb-6">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">Your QR Code</p>
                <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">QR Code will appear here</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                to={`/ticket/${ticket.id}`}
                className="button-secondary w-full block text-center"
              >
                Track My Ticket
              </Link>
              
              <Link
                to="/"
                className="block text-center text-blue-500 hover:underline"
              >
                ← Back to Departments
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Queue; 