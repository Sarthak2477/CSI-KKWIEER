import { useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const App = dynamic(() => import('../src/index'), { ssr: false });

export default function AppPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect /app to / within the React Router
    router.replace('/');
  }, [router]);

  return <App />;
}