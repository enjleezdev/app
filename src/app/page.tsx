'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Only run the redirect on the client side
    if (typeof window !== 'undefined') {
      router.replace('/warehouses');
    }
  }, [router]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <p>Redirecting to warehouses...</p>
    </div>
  );
}






