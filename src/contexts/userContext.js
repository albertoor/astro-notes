import { useContext } from 'react';
import { onAuthStateChanged } from '@firebase/auth';
import { createContext, useState, useEffect } from 'react';
import { auth, db } from '../config/firebase-config';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from '@firebase/auth';
import { doc, setDoc } from '@firebase/firestore';

const UserContext = createContext();

const useAuth = () => {
  return useContext(UserContext);
};

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);

    const unsubscribe = onAuthStateChanged(auth, (res) => {
      if (res) {
        setUser(res);
      } else {
        setUser(null);
      }
      setError('');
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signInUser = (email, password) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => setError(err.code))
      .finally(() => setLoading(false));
  };

  const signUpUser = (email, password) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        console.log(res);
        // first we are created a doc collcectio
        setDoc(doc(db, 'users', res.user.uid), {
          emailUser: res.user.email,
        });
        alert('Usuario  ' + res.user.email + ' ha sido registrado');
      })
      .catch((err) => setError(''))
      .finally(() => setLoading(false));
  };

  const signOutUser = () => {
    signOut(auth);
  };

  const contextValue = {
    user,
    loading,
    error,
    signInUser,
    signOutUser,
    signUpUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export { UserContext, useAuth, UserContextProvider };
