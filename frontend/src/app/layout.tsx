'use client';
import React, { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from '@/components/app-sidebar';
import Dashboard from '@/Dashboard/page';
import Books from '@/Books/page';
import Users from '@/Users_Managment/page';
import LoanRecords from '@/Loans_Record/page';
import Settings from '@/Settings/page';
import { AuthProvider, useAuth } from '@/context/authContext';
import LoginPage from '@/login/page';
import Signup from '@/Register/page';
import "./globals.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

const componentsMap = {
  Dashboard,
  Books,
  Users,
  LoanRecords,
  Settings,
};

type ComponentKey = keyof typeof componentsMap;

const AuthenticatedApp = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [selectedComponent, setSelectedComponent] = useState<ComponentKey>('Dashboard');

  const filteredComponentsMap: Partial<typeof componentsMap> = user.role === 'admin'
    ? componentsMap
    : {
        Dashboard,
        Books,
        Settings,
      };

  const SelectedComponent = filteredComponentsMap[selectedComponent];

  return (
    <div className="flex h-full bg-white w-full">
      <AppSidebar onSelect={(component: string) => setSelectedComponent(component as ComponentKey)} componentsMap={filteredComponentsMap} />
      <main className="flex-1 p-4">
        {SelectedComponent ? <SelectedComponent /> : <div>Component not found</div>}
        {children}
      </main>
    </div>
  );
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useAuth();
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          {children}
        </SidebarProvider>
      </body>
    </html>
  );
};

const App = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useAuth();

  function setIsRegistered(arg0: boolean): void {
    throw new Error('Function not implemented.');
  }

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup onRegister={() => setIsRegistered(true)} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              user.role === 'admin' ? (
                <AuthenticatedApp>{children}</AuthenticatedApp>
              ) : (
                <AuthenticatedApp>{children}</AuthenticatedApp>
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default function MainApp({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <RootLayout>
        <App>{children}</App>
      </RootLayout>
    </AuthProvider>
  );
}