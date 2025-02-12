import React, { useEffect, useState } from 'react';
import activemembers from '@/../public/icons/activemembers.png';
import loans from '@/../public/icons/loans.png';
import mostborrowed from '@/../public/icons/mostborrowed.png';
import totalbooks from '@/../public/icons/totalbooks.png';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StaticImageData } from 'next/image';

interface Card_DataProps {
  label: string;
  value: string;
  icon: StaticImageData;
}

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};

const Card_Data: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<Card_DataProps[]>([]);

  useEffect(() => {
    const staticData = [
      { label: 'Total Books', value: '1000', icon: totalbooks },
      { label: 'Active Members', value: '500', icon: activemembers },
      { label: 'Ongoing Loans', value: '200', icon: loans },
      { label: 'Most Borrowed Book', value: 'The Great', icon: mostborrowed },
    ];
    setDashboardData(staticData);
  }, []);
  return (
    <div className="flex flex-row gap-4 w-[1110px]">
      {dashboardData.map((data, index) => (
        <Card key={index} className="w-[255px] h-[120px] rounded-[20px] shadow-lg">
          <CardContent className="flex flex-row items-center px-4 py-7">
            <div className="mr-4">
              
              <img src={data.icon.src} alt={data.label} className="w-10 h-10" />
            </div>
            <div className='flex flex-col gap-2'>
              <p className="text-[16px] font-normal " style={{ color: '#718EBF' }}>{data.label}</p>
              <h3 className="font-semibold text-[20px] ">{truncateText(data.value, 40)}</h3>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Card_Data;