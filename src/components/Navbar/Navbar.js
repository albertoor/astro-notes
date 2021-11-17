import React from 'react';
import './Navbar.css';
import Button from '../Button/Button';
import { useAuth } from '../../contexts/userContext';
import { AiOutlinePlus } from 'react-icons/ai';
import { addDoc, collection, serverTimestamp, doc } from '@firebase/firestore';
import { db } from '../../config/firebase-config';

export default function Navbar({ userEmail, userUid }) {
  const { signOutUser } = useAuth();

  const userRef = doc(db, `/users/${userUid}`);

  const addNote = async (e) => {
    e.preventDefault();
    let noteTitle = prompt('Ingresa el titulo de la nota: ');

    const doc = await addDoc(collection(userRef, 'notes'), {
      title: noteTitle.toString(),
      body: '--- texto por defecto ---',
      timestamp: serverTimestamp(),
    });
    alert(doc.id + ' ha sido creada');
    // window.location.reload();
  };

  return (
    <nav className="nav">
      <section>
        <img src="/img/astronauta.png" alt="logo" />
        Astro Notes
        <Button
          style={{ marginLeft: '10px' }}
          className="success-btn"
          onClick={(e) => addNote(e)}
        >
          <AiOutlinePlus size="15px" color="var(--white)" />
          Agregar Nota
        </Button>
      </section>
      <section>
        <p>{userEmail}</p>
        <Button
          style={{ marginLeft: '10px' }}
          className="alert-btn"
          onClick={signOutUser}
        >
          Cerrar Sesion
        </Button>
      </section>
    </nav>
  );
}
