import React from 'react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800">Total Queues</h3>
          <p className="text-3xl font-bold text-blue-600">12</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800">Active Users</h3>
          <p className="text-3xl font-bold text-green-600">45</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800">Pending Tickets</h3>
          <p className="text-3xl font-bold text-yellow-600">8</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800">Completed Today</h3>
          <p className="text-3xl font-bold text-purple-600">23</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Queue Management</h2>
          <p className="text-gray-600 mb-4">Manage all queues and departments</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2">
            View Queues
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Add Queue
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">User Management</h2>
          <p className="text-gray-600 mb-4">Manage users and permissions</p>
          <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 mr-2">
            View Users
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Add User
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 