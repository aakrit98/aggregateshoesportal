
//-----------------------------
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '../components/DashboardLayout';

const Users = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No authentication token found');

        const response = await axios.get('http://localhost:8001/api/users', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        console.log("Full API Response:", response);
        console.log("Users Data:", response.data);

        // Check the structure of the response
        const usersData = response.data.users || response.data;
        
        // Ensure users is always an array
        setUsers(Array.isArray(usersData) ? usersData : []);
      } catch (err) {
        setError('Failed to fetch users: ' + err.message);
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle user edit
  const handleEdit = (user) => {
    setEditingUser({ ...user });
    setIsEditModalOpen(true);
  };

  // Handle user delete
  const handleDelete = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  // Save edited user
  const saveUser = async () => {
    try {
      const token = localStorage.getItem('token');  // Get the token from local storage for authorization
  
      // Send a PUT request to the backend to update the user
      await axios.put(
        `http://localhost:8001/api/users/${editingUser.id}`,  // Dynamic URL using the user's ID
        editingUser,  // Data to update (the editingUser object containing name and email)
        {
          headers: { 'Authorization': `Bearer ${token}` }  // Attach the token for authentication
        }
      );
  
      // Update the state of users by modifying the edited user in the list
      setUsers(prevUsers => prevUsers.map(user => 
        user.id === editingUser.id ? editingUser : user  // Replace the edited user in the users list
      ));
  
      // Close the modal and reset the editingUser state
      setIsEditModalOpen(false);
      setEditingUser(null);
    } catch (err) {
      console.error('Error updating user:', err);
      alert('Failed to update user');  // Alert the user if something goes wrong
    }
  };
  

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('token');
  
      if (!token) {
        alert('Session expired. Please log in again.');
        window.location.href = '/login';
        return;
      }
  
      // Updated URL to use the new endpoint with the userId parameter
      const response = await axios.delete(`http://localhost:8001/api/users/${userToDelete.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
  
      console.log('Delete Response:', response);
  
      // Update users list by removing the deleted user
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userToDelete.id));
      
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
      
      alert('User has been deleted successfully.');
  
    } catch (err) {
      console.error('Delete Error Details:', {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
      });
  
      alert(`Failed to delete user: ${err.response?.data?.error || err.message}`);
    }
  };  
  // Ensure users is an array before filtering
  const filteredUsers = users.filter(user => 
    user && 
    (user.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (user.email || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
    new Date(user.createdAt)
    .toLocaleDateString()
    .toLowerCase()
    .includes(searchQuery.toLowerCase())

  );

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6 text-center text-gray-600">Loading users...</div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="p-6 text-center text-red-600">{error}</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Users</h1>
          <div className="mt-4 md:mt-0">
            <input
              type="text"
              placeholder="Search users..."
              className="w-full md:w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap"> {new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => handleEdit(user)} className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                    <button onClick={() => handleDelete(user)} className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Edit User</h2>
              <input
                type="text"
                value={editingUser?.name || ''}
                onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg mb-4"
              />
              <input
                type="email"
                value={editingUser?.email || ''}
                onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg mb-4"
              />
              <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-gray-600 mr-2">Cancel</button>
              <button onClick={saveUser} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Save</button>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
              <p className="mb-6">Are you sure you want to delete {userToDelete?.name}?</p>
              <button onClick={() => setIsDeleteModalOpen(false)} className="px-4 py-2 text-gray-600 mr-2">Cancel</button>
              <button onClick={confirmDelete} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Delete</button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Users;
