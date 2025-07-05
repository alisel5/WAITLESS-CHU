import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// Types (your teammate will define these)
interface QueueStats {
  totalWaiting: number;
  currentPosition: number;
  estimatedWaitTime: number;
}

interface CurrentTicket {
  id: string;
  ticketNumber: string;
  position: number;
  userId: string;
  userName: string;
  status: string;
}

const Staff: React.FC = () => {
  const { departmentId } = useParams<{ departmentId: string }>();
  const [stats, setStats] = useState<QueueStats | null>(null);
  const [currentTicket, setCurrentTicket] = useState<CurrentTicket | null>(null);
  const [loading, setLoading] = useState(true);
  const [calling, setCalling] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Your teammate will implement this API call
        // const response = await fetch(`http://localhost:3001/api/queue/departments/${departmentId}/stats`);
        // const data = await response.json();
        
        // Mock data for now
        const mockStats: QueueStats = {
          totalWaiting: 8,
          currentPosition: 3,
          estimatedWaitTime: 240
        };
        
        setStats(mockStats);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch stats:', err);
        setLoading(false);
      }
    };

    fetchStats();
  }, [departmentId]);

  const callNextPatient = async () => {
    setCalling(true);
    try {
      // Your teammate will implement this API call
      // const response = await fetch(`http://localhost:3001/api/queue/departments/${departmentId}/call-next`, {
      //   method: 'POST'
      // });
      // const data = await response.json();
      
      // Mock data for now
      const mockTicket: CurrentTicket = {
        id: 'ticket-123',
        ticketNumber: 'DEPT-20231201-0003',
        position: 3,
        userId: 'user-123',
        userName: 'John Doe',
        status: 'called'
      };
      
      setCurrentTicket(mockTicket);
    } catch (err) {
      console.error('Failed to call next patient:', err);
    } finally {
      setCalling(false);
    }
  };

  const completeCurrentTicket = async () => {
    if (!currentTicket) return;
    
    try {
      // Your teammate will implement this API call
      // await fetch(`http://localhost:3001/api/queue/tickets/${currentTicket.id}/complete`, {
      //   method: 'POST'
      // });
      
      setCurrentTicket(null);
      // Refresh stats
      window.location.reload();
    } catch (err) {
      console.error('Failed to complete ticket:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Staff Interface
          </h1>
          <p className="text-gray-600">
            Department ID: {departmentId}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Queue Statistics */}
          <div className="queue-card">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Queue Statistics
            </h2>
            
            {stats && (
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <span className="text-gray-700">Total Waiting:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    {stats.totalWaiting}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <span className="text-gray-700">Current Position:</span>
                  <span className="text-2xl font-bold text-green-600">
                    {stats.currentPosition}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                  <span className="text-gray-700">Est. Wait Time:</span>
                  <span className="text-2xl font-bold text-orange-600">
                    {Math.round(stats.estimatedWaitTime / 60)} min
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Current Patient */}
          <div className="queue-card">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Current Patient
            </h2>
            
            {currentTicket ? (
              <div className="space-y-4">
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Ticket Number</p>
                  <p className="text-xl font-bold text-yellow-600">
                    {currentTicket.ticketNumber}
                  </p>
                </div>
                
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Patient Name</p>
                  <p className="text-lg font-semibold text-blue-600">
                    {currentTicket.userName}
                  </p>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Position</p>
                  <p className="text-lg font-semibold text-green-600">
                    {currentTicket.position}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <button
                    onClick={completeCurrentTicket}
                    className="button-secondary w-full"
                  >
                    Complete Appointment
                  </button>
                  
                  <button
                    onClick={() => setCurrentTicket(null)}
                    className="button-danger w-full"
                  >
                    Patient No Show
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">
                  No patient currently called
                </p>
                <button
                  onClick={callNextPatient}
                  disabled={calling || (stats?.totalWaiting === 0)}
                  className="button-primary disabled:opacity-50"
                >
                  {calling ? 'Calling...' : 'Call Next Patient'}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
            to="/"
            className="text-blue-500 hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Staff; 