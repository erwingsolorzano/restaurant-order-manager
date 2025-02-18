import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUserState] = useState(null);
  const setUser = (userData) => {
    if (userData) {
      localStorage.setItem('token', userData.token);
      setUserState(userData.decodedUser);
    } else {
      localStorage.removeItem('token');
      setUserState(null);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        console.log('Token detectado:', token);

      try {
        const decodedUser = JSON.parse(atob(token.split('.')[1]));
        setUserState(decodedUser);
        console.log('Usuario cargado desde token:', decodedUser);

      } catch (error) {
        console.error('Token inválido:', error);
        setUser(null);
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
