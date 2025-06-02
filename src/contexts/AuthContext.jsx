
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user'); 
        setUser(null);
      }
    }
    setIsLoading(false);
  }, []);

  const loginAsAdmin = async (email, password) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (email === 'admin@medipharm.com' && password === 'admin123') {
      const adminUser = {
        id: 'admin1',
        name: 'Admin User',
        email: email,
        isAdmin: true
      };
      setUser(adminUser);
      localStorage.setItem('user', JSON.stringify(adminUser));
      toast({
        title: "Admin Login Successful",
        description: "Welcome to the admin dashboard!",
      });
      setIsLoading(false);
      return true;
    }

    toast({
      title: "Admin Login Failed",
      description: "Invalid admin credentials.",
      variant: "destructive",
    });
    setIsLoading(false);
    return false;
  };

  const login = (email, password) => {
    if (!email || !password) {
      toast({
        title: "Login failed",
        description: "Please provide both email and password.",
        variant: "destructive",
      });
      return false;
    }

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users_db') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (foundUser) {
      const userData = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        isAdmin: email === 'admin@example.com',
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      toast({
        title: "Login successful",
        description: `Welcome back, ${userData.name}!`,
      });
      return true;
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password.",
        variant: "destructive",
      });
      return false;
    }
  };

  const register = async (name, email, password) => {
    if (!name || !email || !password) {
      toast({
        title: "Registration failed",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return false;
    }

    try {
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('users_db') || '[]');
      const userExists = existingUsers.some(user => user.email === email);
      
      if (userExists) {
        toast({
          title: "Registration failed",
          description: "User with this email already exists",
          variant: "destructive",
        });
        return false;
      }

      // Create new user with complete data
      const userData = {
        id: 'USR' + Date.now(),
        name,
        email,
        password, // In a real app, this should be hashed
        isAdmin: false,
        orders: [],
        prescriptions: [],
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };

      // Update users list in localStorage with complete data
      localStorage.setItem('users_db', JSON.stringify([...existingUsers, userData]));

      // Set current user (without sensitive data)
      const currentUserData = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        isAdmin: userData.isAdmin,
        orders: userData.orders,
        prescriptions: userData.prescriptions,
        lastLogin: userData.lastLogin
      };
      setUser(currentUserData);
      localStorage.setItem('user', JSON.stringify(currentUserData));

      toast({
        title: "Registration successful",
        description: `Welcome to MediPharm, ${name}!`,
      });

      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration failed",
        description: "An error occurred during registration",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const updateUser = (updatedData) => {
    if (user) {
      const newUserData = { ...user, ...updatedData };
      setUser(newUserData);
      localStorage.setItem('user', JSON.stringify(newUserData));
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated.",
      });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      loginAsAdmin,
      register,
      logout,
      isLoading,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}
