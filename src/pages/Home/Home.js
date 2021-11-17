import Navbar from '../../components/Navbar/Navbar';
import Notes from '../../components/Notes/Notes';
import { useAuth } from '../../contexts/userContext';
import Loader from 'react-loader-spinner';

export default function Home() {
  const { user, loading } = useAuth();

  return (
    <>
      {loading ? (
        <Loader type="Grid" color="var(--success)" height={80} width={80} />
      ) : (
        <>
          <Navbar userEmail={user.email} userUid={user.uid} />
          <Notes userUid={user.uid} />
        </>
      )}
    </>
  );
}
