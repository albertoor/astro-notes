import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase-config';

function useNotes({ userUid }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = () => {
      setLoading(true);
      onSnapshot(collection(db, `/users/${userUid}/notes/`), (data) => {
        setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
      setLoading(false);
    };

    unsubscribe();

    // unmounted component leak memory
    return () => {
      setNotes([]);
    };
  }, [userUid]);

  return [notes, loading];
}

export default useNotes;

// const unsubscribe = async () => {
//   setLoading(true);
//   const data = await getDocs(collection(db, `/users/${userUid}/notes/`));
//   setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//   setLoading(false);
// };
