import useNotes from '../../hooks/useNotes';
import Note from '../Note/Note';
import Container from '../Container/Container';
import Loader from 'react-loader-spinner';

export default function Notes({ userUid }) {
  const [notes, loading] = useNotes({ userUid });

  console.log(notes);

  return (
    <Container>
      {loading ? (
        <Loader type="Grid" color="var(--success)" height={80} width={80} />
      ) : (
        <>
          {notes.map((note) => (
            <Note
              key={note.id}
              refNote={note.id}
              title={note.title}
              body={note.body}
              timestamp={note.timestamp}
              userUid={userUid}
            />
          ))}
        </>
      )}
    </Container>
  );
}
