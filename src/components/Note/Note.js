import { useState } from 'react';
import './Note.css';
import { AiFillCheckCircle, AiFillEdit } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import { GiCancel } from 'react-icons/gi';
import Input from '../Input/Input';
import { db } from '../../config/firebase-config';
import {
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from '@firebase/firestore';

export default function Note({ refNote, title, body, timestamp, userUid }) {
  const [newTitle, setNewTitle] = useState(title);
  const [newBody, setNewBody] = useState(body);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingTextArea, setIsEditingTextArea] = useState(false);

  const noteDocRef = `/users/${userUid}/notes/${refNote}`;

  // ÷console.log(timestamp.toDate());

  const deleteNote = async () => {
    if (
      window.confirm(
        'Estas seguro que quieres eliminar la nota: ' + title + ' ?'
      )
    ) {
      await deleteDoc(doc(db, noteDocRef));
      alert('Has eliminado la nota: ' + title);
    }
  };

  // This function is to save note (update a document Note)
  const saveNote = async (e) => {
    e.preventDefault();
    if (window.confirm('Estas seguro de guardar cambios? ')) {
      await updateDoc(doc(db, noteDocRef), {
        title: newTitle,
        body: newBody,
        timestamp: serverTimestamp(),
      });
      alert('Cambios guardados');
      setIsEditingTextArea(false);
    }
    setNewTitle(newTitle);
    setIsEditingTitle(false);
  };

  // handle changes in text area
  const handleChangeTextArea = (e) => {
    setNewBody(e.target.value);
  };

  // handle changes in input title
  const handleChangeTitle = (e) => {
    setNewTitle(e.target.value);
  };

  // Cancel editing title
  const cancelEditTitle = () => {
    setIsEditingTitle(false);
    setNewTitle(title);
  };

  return (
    <div className="Note-box">
      <div className="Note-header">
        {isEditingTitle ? (
          <>
            <div>
              <Input
                type="text"
                value={newTitle}
                onChange={(e) => handleChangeTitle(e)}
              />
            </div>
            <div>
              <i>
                <GiCancel
                  color="var(--alert)"
                  size="25px"
                  onClick={() => cancelEditTitle()}
                />
              </i>
              <i>
                <AiFillCheckCircle
                  color="var(--success)"
                  size="25px"
                  onClick={(e) => saveNote(e)}
                />
              </i>
            </div>
          </>
        ) : (
          <>
            <small>{newTitle}</small>
            <i>
              <AiFillEdit
                color="var(--warning)"
                size="25px"
                onClick={() => setIsEditingTitle(true)}
              />
            </i>
          </>
        )}
      </div>

      <textarea
        cols="30"
        rows="10"
        onClick={() => setIsEditingTextArea(true)}
        value={isEditingTextArea ? newBody : body}
        onChange={(e) => handleChangeTextArea(e)}
      ></textarea>

      <div className="Note-options">
        <div>
          <small></small>
        </div>
        <div>
          <i onClick={() => deleteNote()}>
            <BsFillTrashFill color="var(--alert)" size="25px" />
          </i>

          <i>
            <AiFillCheckCircle
              color="var(--success)"
              size="25px"
              onClick={(e) => saveNote(e)}
            />
          </i>
        </div>
      </div>
    </div>
  );
}
