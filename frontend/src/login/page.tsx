'use client'
import logo from '@/../public/logo.png'
import Image from 'next/image';
import { LoginForm } from "@/components/login-form";
import { useAuth } from '@/context/authContext';
export default function LoginPage() {
  
  
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10 ml-[35%]">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex  items-center justify-center rounded-md ">
            <Image src={logo} alt=""  width={70} height={75} />
          </div>
          ReadVault.
        </a>
        <LoginForm />
      </div>
    </div>
  )
}
