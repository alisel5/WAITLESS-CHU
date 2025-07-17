import React from 'react';
import { useParams } from 'react-router-dom';

const TicketPage: React.FC = () => {
  const { ticketId } = useParams<{ ticketId: string }>();

  // Mock ticket data
  const mockTicket = {
    id: ticketId,
    queueName: 'General Medicine',
    position: 3,
    estimatedWait: '15 minutes',
    status: 'waiting',
    createdAt: '2024-01-15 14:30:00',
    qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Ticket Details</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Ticket #{mockTicket.id}
          </h2>
          <p className="text-gray-600">{mockTicket.queueName}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="font-medium text-blue-600 capitalize">{mockTicket.status}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Position in Queue:</span>
              <span className="font-medium text-orange-600">#{mockTicket.position}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Estimated Wait:</span>
              <span className="font-medium text-green-600">{mockTicket.estimatedWait}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Created:</span>
              <span className="font-medium text-gray-800">{mockTicket.createdAt}</span>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">QR Code</h3>
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="w-32 h-32 bg-gray-300 mx-auto rounded flex items-center justify-center">
                <span className="text-gray-500">QR Code</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Instructions</h3>
        <ul className="text-blue-700 space-y-1">
          <li>• Keep this ticket handy</li>
          <li>• You will be notified when it's your turn</li>
          <li>• Show the QR code when called</li>
          <li>• Estimated wait times may vary</li>
        </ul>
      </div>
    </div>
  );
};

export default TicketPage; 