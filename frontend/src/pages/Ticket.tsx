import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// Types (your teammate will define these)
interface TicketDetails {
  id: string;
  ticketNumber: string;
  position: number;
  estimatedWaitTime: number;
  qrCode: string;
  status: string;
  departmentName: string;
  joinedAt: string;
}

const Ticket: React.FC = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const [ticket, setTicket] = useState<TicketDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        // Your teammate will implement this API call
        // const response = await fetch(`http://localhost:3001/api/queue/tickets/${ticketId}`);
        // const data = await response.json();
        
        // Mock data for now
        const mockTicket: TicketDetails = {
          id: ticketId || 'ticket-123',
          ticketNumber: 'DEPT-20231201-0001',
          position: 3,
          estimatedWaitTime: 90,
          qrCode: 'data:image/png;base64,mock-qr-code',
          status: 'waiting',
          departmentName: 'Cardiology',
          joinedAt: '2023-12-01T10:30:00Z'
        };
        
        setTicket(mockTicket);
      } catch (err) {
        setError('Failed to load ticket details.');
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [ticketId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <div className="queue-card">
            <h2 className="text-xl font-semibold text-red-600 mb-4">
              {error || 'Ticket not found'}
            </h2>
            <Link
              to="/"
              className="button-primary"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-lg mx-auto">
        <div className="queue-card">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Ticket Tracking
            </h1>
            <p className="text-gray-600">
              {ticket.departmentName}
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Ticket Number</p>
              <p className="text-xl font-bold text-blue-600">
                {ticket.ticketNumber}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Position</p>
                <p className="text-2xl font-bold text-green-600">
                  {ticket.position}
                </p>
              </div>
              
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Wait Time</p>
                <p className="text-2xl font-bold text-orange-600">
                  {Math.round(ticket.estimatedWaitTime / 60)}m
                </p>
              </div>
            </div>

            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Status</p>
              <p className="text-lg font-semibold text-gray-700 capitalize">
                {ticket.status}
              </p>
            </div>
          </div>

          <div className="qr-container mb-6">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">Your QR Code</p>
              <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">QR Code will appear here</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Show this to staff when called
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="button-secondary w-full"
            >
              Refresh Status
            </button>
            
            <Link
              to="/"
              className="block text-center text-blue-500 hover:underline"
            >
              ← Back to Departments
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket; 