'use client';
import Image from "next/image";
import RootLayout from './layout';

import "./globals.css";
import Loan_Table from "@/UI_presentations/Loan_Table";
import UploadBooks from "@/UI_presentations/UploadBooks";
import Users_data from "@/UI_presentations/Users_data";
import Loans_Record from "@/Loans_Record/page";
import Dashboard from "@/Dashboard/page";
import Users_Managment from '@/Users_Managment/page';
import Settings from "@/Settings/page";
import Signup from '@/Register/page';
import LoginPage from "@/login/page";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
export default function Home() {
  return (
    
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup onRegister={function (): void {
          throw new Error("Function not implemented.");
        } } />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<RootLayout children={undefined} />} />
      </Routes>
    </Router>
    
  );
}
