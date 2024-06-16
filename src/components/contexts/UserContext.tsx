import React, { createContext, useState, ReactNode, useContext } from 'react';
interface User {
  username: string;
  password: string;
  birthday: string;
  email: string;
  subjects: string[];
  gender: string;
}
interface UserContextType {
  users: User[];
  addUser: (user: User) => void;
}
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);

    const addUser = (user: User) => {
      setUsers((prevUsers) => [...prevUsers, user]);
    };

  console.log({users})

  return (
    <UserContext.Provider value={{ users, addUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
}

