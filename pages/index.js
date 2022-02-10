import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Index = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/dashboard');
  }, []);

  return 'index';
};

export default Index;
