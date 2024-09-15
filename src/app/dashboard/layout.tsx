"use client";
import Aside from "@/components/layout/Aside";
import Header from "@/components/layout/Header";
import Main from "@/components/layout/Main";
import Avvvatars from 'avvvatars-react'
import { useAuthStore } from '@/store/authStore';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuthStore();
  return (
    <section className="flex">
      <Aside />
      <Main>
        <Header />
        {children}
        {
          isAuthenticated && user && (
            <Avvvatars style="shape" value={user.email} />
          )
        }
      </Main>
    </section>
  );
}
