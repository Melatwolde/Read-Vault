import React from 'react';
import Card_Data from '@/UI_presentations/Card_Data';
import { LoanTrends_table } from '@/UI_presentations/LoanTrends_table';
import { CustomPieChart } from '@/UI_presentations/PieChart';
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
const Dashboard  =()=>{
    return(
        
        <div className='fixed flex flex-col gap-1 h-auto'>
            <h1 className='text-[30px] font-bold text-neutral-800'>Dashboard</h1>
            <Card_Data/>
            <div className='flex flex-row gap-4 mt-8'>
                <LoanTrends_table/>
                <CustomPieChart/>
            </div>
        </div>
    )
}
export default Dashboard;