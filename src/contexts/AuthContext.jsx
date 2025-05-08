
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
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

  const login = (email, password) => {
    if (!email || !password) {
      toast({
        title: "Login failed",
        description: "Please provide both email and password.",
        variant: "destructive",
      });
      return false;
    }
    
    // Demo users for testing
    const demoUsers = [
        { id: '1', name: 'John Doe', email: 'john@example.com', password: 'password123' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', password: 'password456' }
    ];

    const foundUser = demoUsers.find(u => u.email === email && u.password === password);

    if (foundUser) {
      const userData = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
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

  const register = (name, email, password) => {
    if (!name || !email || !password) {
      toast({
        title: "Registration failed",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return false;
    }
    
    // Check if email already exists (simulated)
    const existingUsers = JSON.parse(localStorage.getItem('users_db')) || [];
    if (existingUsers.find(u => u.email === email)) {
        toast({
            title: "Registration failed",
            description: "An account with this email already exists.",
            variant: "destructive",
        });
        return false;
    }

    const userData = {
      id: Date.now().toString(), // Simple unique ID
      name: name,
      email: email,
    };
    
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Save to our simulated DB
    existingUsers.push({ ...userData, password }); // Store password in "DB" for demo login
    localStorage.setItem('users_db', JSON.stringify(existingUsers));

    toast({
      title: "Registration successful",
      description: `Welcome to MediPharm, ${name}!`,
    });
    
    return true;
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
      register,
      logout,
      isLoading,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};
