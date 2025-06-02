import React, { useState, useEffect } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Pencil, Trash, X } from 'lucide-react';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    const fetchUsers = () => {
      try {
        const storedUsers = JSON.parse(localStorage.getItem('users_db') || '[]');
        setUsers(storedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
        setUsers([]);
      }
    };
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: currentUser ? currentUser.id : 'USR' + Date.now(),
      ...formData,
      isAdmin: false,
      orders: [],
      prescriptions: []
    };

    if (currentUser) {
      setUsers(users.map(u => u.id === currentUser.id ? newUser : u));
    } else {
      setUsers([...users, newUser]);
    }

    // Update localStorage
    localStorage.setItem('users_db', JSON.stringify(currentUser ? 
      users.map(u => u.id === currentUser.id ? newUser : u) : 
      [...users, newUser]
    ));

    closeModal();
  };

  const handleDelete = (userId) => {
    const updatedUsers = users.filter(u => u.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem('users_db', JSON.stringify(updatedUsers));
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: ''
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Users</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Orders</th>
              <th className="p-4 text-left">Prescriptions</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b">
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.orders?.length || 0}</td>
                <td className="p-4">
                  <div className="flex -space-x-2">
                    {user.prescriptions && user.prescriptions.length > 0 ? (
                      user.prescriptions.map((prescription, index) => (
                        <div key={prescription.id} className="relative hover:z-10 transition-transform hover:scale-150">
                          <img
                            src={prescription.imageUrl}
                            alt={`Prescription ${index + 1}`}
                            className="h-10 w-10 rounded-lg border-2 border-white object-cover shadow-md"
                            title={`${prescription.fileName}\nUploaded on ${new Date(prescription.date).toLocaleDateString()}`}
                          />
                        </div>
                      ))
                    ) : (
                      <span className="text-gray-400 text-sm italic">No prescriptions</span>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <Button variant="ghost" onClick={() => handleEdit(user)} className="mr-2">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" className="text-red-600" onClick={() => handleDelete(user.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {currentUser ? 'Edit User' : 'Add New User'}
              </h2>
              <Button variant="ghost" onClick={closeModal}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required={!currentUser}
                />
              </div>
              <Button type="submit" className="w-full">
                {currentUser ? 'Update User' : 'Add User'}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;