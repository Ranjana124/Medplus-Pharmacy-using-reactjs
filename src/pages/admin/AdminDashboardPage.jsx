import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ArrowUpRight, ArrowDownRight, IndianRupee } from 'lucide-react';

const AdminDashboardPage = () => {
  // Get data from localStorage
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  const users = JSON.parse(localStorage.getItem('users_db') || '[]');

  // Dummy revenue data in INR
  const revenueData = [
    { name: 'Jan 24', revenue: 156000, orders: 124 },
    { name: 'Feb 24', revenue: 189000, orders: 145 },
    { name: 'Mar 24', revenue: 243000, orders: 178 },
    { name: 'Apr 24', revenue: 278000, orders: 198 },
    { name: 'May 24', revenue: 312000, orders: 234 },
    { name: 'Jun 24', revenue: 345000, orders: 256 }
  ];

  // Calculate total revenue
  const totalRevenue = revenueData[revenueData.length - 1].revenue;

  // Calculate revenue growth
  const lastMonthRevenue = revenueData[revenueData.length - 1]?.revenue || 0;
  const prevMonthRevenue = revenueData[revenueData.length - 2]?.revenue || 0;
  const revenueGrowth = prevMonthRevenue ? ((lastMonthRevenue - prevMonthRevenue) / prevMonthRevenue) * 100 : 0;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow border-l-4 border-primary">
          <h3 className="text-xl font-semibold mb-2">Total Orders</h3>
          <p className="text-3xl font-bold text-primary">{orders.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow border-l-4 border-primary">
          <h3 className="text-xl font-semibold mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-primary">{users.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow border-l-4 border-primary">
          <h3 className="text-xl font-semibold mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-primary">₹{totalRevenue.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Revenue Growth</h3>
          <div className="flex items-center">
            <p className="text-3xl font-bold text-primary">{Math.abs(revenueGrowth).toFixed(1)}%</p>
            {revenueGrowth > 0 ? (
              <ArrowUpRight className="ml-2 text-green-500" />
            ) : (
              <ArrowDownRight className="ml-2 text-red-500" />
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1">vs last month</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Revenue Analytics</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis yAxisId="left" stroke="#666" />
              <YAxis yAxisId="right" orientation="right" stroke="#666" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="revenue" 
                stroke="#0ea5e9" 
                strokeWidth={2}
                name="Revenue (₹)"
                dot={{ stroke: '#0ea5e9', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="orders" 
                stroke="#22c55e" 
                strokeWidth={2}
                name="Orders"
                dot={{ stroke: '#22c55e', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;