
import React from 'react';
import { Button } from '@/components/ui/button';

const AccountSecurity = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Account Security</h2>
        <Button variant="outline" size="sm">Change Password</Button>
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Password</h3>
          <p>••••••••</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Two-Factor Authentication</h3>
          <p className="text-red-500">Not Enabled</p>
        </div>
      </div>
    </div>
  );
};

export default AccountSecurity;
