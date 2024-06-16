import {useEffect, useState} from "react";
import Cookies from "js-cookie";

interface User {
  username: string;
  password: string;
  birthday: string;
  email: string;
  subjects: string[];
  gender: string;
}

// Define the UserContext type
interface UserContextType {
  users: User[];
  addUser: (user: User) => void;
}
export const setCookie = (name: string, value:string) => {
  Cookies.set(name, value);
};

export const getCookie = (name:string) => {
  const cookieValue = Cookies.get(name);
  return cookieValue ? JSON.parse(cookieValue) : null;
};

export const removeCookie = (name:string) => {
  Cookies.remove(name);
};

// Utility functions for local storage
export const setLocalStorage = (key: string, value: any): any => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key: string): any => {
  const localStorageValue = localStorage.getItem(key);
  return localStorageValue ? JSON.parse(localStorageValue) : null;
};

export const removeLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};

const useUsers = () => {
  const [users, setUsers] = useState<User[]>(() => {
    const cookiesUsers = getCookie('users');
    const localStorageUsers = getLocalStorage('users');
    return cookiesUsers || localStorageUsers || [];
  });

  useEffect(() => {
    setLocalStorage('users', users);
    setCookie('users', JSON.stringify(users));
  }, [users]);

  const addUser = (user: User) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  return { users, addUser };
};

export default useUsers;