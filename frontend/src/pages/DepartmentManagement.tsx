import React, { useState } from 'react';

interface Department {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  queueCount: number;
}

const DepartmentManagement: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([
    { id: '1', name: 'General Medicine', description: 'General medical consultations', isActive: true, queueCount: 3 },
    { id: '2', name: 'Cardiology', description: 'Heart and cardiovascular care', isActive: true, queueCount: 2 },
    { id: '3', name: 'Dermatology', description: 'Skin and dermatological treatments', isActive: true, queueCount: 1 },
    { id: '4', name: 'Orthopedics', description: 'Bone and joint care', isActive: false, queueCount: 0 },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newDepartment, setNewDepartment] = useState({ name: '', description: '' });

  const handleAddDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    const department: Department = {
      id: Date.now().toString(),
      name: newDepartment.name,
      description: newDepartment.description,
      isActive: true,
      queueCount: 0
    };
    setDepartments([...departments, department]);
    setNewDepartment({ name: '', description: '' });
    setShowAddForm(false);
  };

  const toggleDepartmentStatus = (id: string) => {
    setDepartments(departments.map(dept => 
      dept.id === id ? { ...dept, isActive: !dept.isActive } : dept
    ));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Department Management</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Department
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Department</h2>
          <form onSubmit={handleAddDepartment} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department Name
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newDepartment.name}
                onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                value={newDepartment.description}
                onChange={(e) => setNewDepartment({ ...newDepartment, description: e.target.value })}
              />
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Add Department
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((department) => (
          <div key={department.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-gray-800">{department.name}</h2>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                department.isActive 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {department.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            
            <p className="text-gray-600 mb-4">{department.description}</p>
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">Active Queues:</span>
              <span className="font-medium text-blue-600">{department.queueCount}</span>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => toggleDepartmentStatus(department.id)}
                className={`flex-1 py-2 px-4 rounded text-sm font-medium ${
                  department.isActive
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                {department.isActive ? 'Deactivate' : 'Activate'}
              </button>
              <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded text-sm font-medium hover:bg-blue-600">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentManagement; 