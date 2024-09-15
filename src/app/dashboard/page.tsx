"use client";

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { verifyAuth } from '@/services/auth.service';

export default function Home() {
  const { setAuth, user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await verifyAuth();
        console.log('====================================');
        console.log("response", response);
        console.log('====================================');
        if (response.authorized) {
          const user = response.user; 
          setAuth(user);
        } else { 
          router.push('/');
        }
      } catch (error) {
        console.error('Error verifying authentication:', error);
        router.push('/');
      }
    };
    console.log('====================================');
    console.log(isAuthenticated);
    console.log('====================================');
    if (!isAuthenticated) {
      checkAuth();
    }
  }, [isAuthenticated, setAuth, router]);

  return (
    <div>
      <p>This is your dashboard.</p>
      {isAuthenticated && user && (
        <div>
          <p>Welcome, {user.name}!</p>
        </div>
      )}
    </div>
  );
}
