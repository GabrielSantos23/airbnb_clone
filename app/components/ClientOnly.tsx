'use client';
import { useEffect, useState } from 'react';

interface ClientOnlyProps {
  children: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  const [hasMonted, setHasMonted] = useState(false);

  useEffect(() => {
    setHasMonted(true);
  }, []);

  if (!hasMonted) {
    return null;
  }

  return <div>{children}</div>;
};

export default ClientOnly;
