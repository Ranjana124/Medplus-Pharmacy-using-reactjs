
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield } from 'lucide-react';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginAsAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await loginAsAdmin(email, password);
    if (success) {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500/20 via-teal-100 to-primary/20">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 backdrop-blur-sm bg-white/90 border border-teal-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-400 mb-2">Welcome to</h2>
          <h1 className="text-4xl font-bold mb-2">Medi<span className="text-green-500">Pharm</span></h1>
          <div className="bg-gradient-to-r from-green-500 to-teal-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">Admin Portal</h3>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email" className="text-gray-700">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@medipharm.com"
              required
              className="mt-1 border-teal-200 focus:border-green-500 focus:ring-green-500"
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-gray-700">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="mt-1 border-teal-200 focus:border-green-500 focus:ring-green-500"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
          >
            Login as Admin
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
