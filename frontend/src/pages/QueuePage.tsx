import React, { useState } from 'react';

const QueuePage: React.FC = () => {
  const [selectedQueue, setSelectedQueue] = useState<string>('');

  const mockQueues = [
    { id: '1', name: 'General Medicine', waitTime: '15 min', peopleAhead: 3 },
    { id: '2', name: 'Cardiology', waitTime: '30 min', peopleAhead: 7 },
    { id: '3', name: 'Dermatology', waitTime: '20 min', peopleAhead: 5 },
    { id: '4', name: 'Orthopedics', waitTime: '45 min', peopleAhead: 12 },
  ];

  const handleJoinQueue = (queueId: string) => {
    setSelectedQueue(queueId);
    // TODO: Implement join queue logic
    console.log(`Joining queue: ${queueId}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Available Queues</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockQueues.map((queue) => (
          <div key={queue.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{queue.name}</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Wait:</span>
                <span className="font-medium text-blue-600">{queue.waitTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">People Ahead:</span>
                <span className="font-medium text-orange-600">{queue.peopleAhead}</span>
              </div>
            </div>
            
            <button
              onClick={() => handleJoinQueue(queue.id)}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
              Join Queue
            </button>
          </div>
        ))}
      </div>

      {selectedQueue && (
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-green-800 mb-2">Queue Joined Successfully!</h2>
          <p className="text-green-700">
            You have joined the queue. You will receive notifications about your position.
          </p>
        </div>
      )}
    </div>
  );
};

export default QueuePage; 