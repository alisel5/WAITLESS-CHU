import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Types (your teammate will define these)
interface Department {
  id: string;
  name: string;
  description: string;
  estimatedTimePerPatient: number;
  totalWaiting: number;
  estimatedWaitTime: number;
}

const Home: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Your teammate will implement this to fetch departments from the API
    // For now, using mock data
    const mockDepartments: Department[] = [
      {
        id: '1',
        name: 'Cardiology',
        description: 'Heart and cardiovascular system',
        estimatedTimePerPatient: 45,
        totalWaiting: 8,
        estimatedWaitTime: 360
      },
      {
        id: '2',
        name: 'Dermatology',
        description: 'Skin conditions and treatments',
        estimatedTimePerPatient: 30,
        totalWaiting: 5,
        estimatedWaitTime: 150
      },
      {
        id: '3',
        name: 'Emergency',
        description: 'Urgent care and emergency services',
        estimatedTimePerPatient: 20,
        totalWaiting: 12,
        estimatedWaitTime: 240
      }
    ];

    setDepartments(mockDepartments);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          🏥 WAITLESS-CHU
        </h1>
        <p className="text-xl text-gray-600">
          Smart Queue Management System
        </p>
        <p className="text-lg text-gray-500 mt-2">
          Select a department to join the queue
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((department) => (
          <div key={department.id} className="department-card">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {department.name}
            </h2>
            <p className="text-gray-600 mb-4">
              {department.description}
            </p>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-500">People waiting:</span>
                <span className="font-semibold text-blue-600">
                  {department.totalWaiting}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Est. wait time:</span>
                <span className="font-semibold text-green-600">
                  {Math.round(department.estimatedWaitTime / 60)} min
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Time per patient:</span>
                <span className="font-semibold text-gray-700">
                  {department.estimatedTimePerPatient} min
                </span>
              </div>
            </div>

            <Link
              to={`/queue/${department.id}`}
              className="button-primary w-full block text-center"
            >
              Join Queue
            </Link>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <p className="text-gray-500">
          Staff? <Link to="/staff/1" className="text-blue-500 hover:underline">Access staff interface</Link>
        </p>
      </div>
    </div>
  );
};

export default Home; 