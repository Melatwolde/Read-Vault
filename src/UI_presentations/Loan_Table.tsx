'use client';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  // Customize the styles if needed
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // Customize the styles if needed
}));

interface Loan {
  SL_NO: string;
  book: string;
  user: string;
  duration: string;
  lendingMoney: string;
  status: string;
}

const dummyLoanData: Loan[] = [
  { SL_NO: '01.', book: "The Great Gatsby", user: "John Doe", duration: "14 days", lendingMoney: "$5", status: "Returned" },
  { SL_NO: '02.', book: "1984", user: "Jane Smith", duration: "7 days", lendingMoney: "$3", status: "Not Returned" },
  { SL_NO: '03.', book: "To Kill a Mockingbird", user: "Michael Brown", duration: "21 days", lendingMoney: "$7", status: "Returned" },
  { SL_NO: '04.', book: "Moby Dick", user: "Alice Johnson", duration: "10 days", lendingMoney: "$4", status: "Not Returned" },
];

export default function Loan_Table() {
  const [loanData, setLoanData] = useState<Loan[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/loans')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setLoanData(data);
        } else {
          console.warn('No data found, using dummy data');
          setLoanData(dummyLoanData);
        }
      })
      .catch(error => {
        console.error('Error fetching loans:', error);
        setLoanData(dummyLoanData);
      });
  }, []);

  return (
    <div className='rounded-[25px] w-[1070px]'>
      <TableContainer component={Paper} className="p-4">
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow className='text-[#718EBF]'>
              <StyledTableCell className="p-1 text-[#718EBF] md:p-4">SL No</StyledTableCell>
              <StyledTableCell className="p-1 text-[#718EBF] md:p-4">Book</StyledTableCell>
              <StyledTableCell className="p-1 text-[#718EBF] md:p-4">User</StyledTableCell>
              <StyledTableCell className="p-1 text-[#718EBF] md:p-4">Duration</StyledTableCell>
              <StyledTableCell className="p-1 text-[#718EBF] md:p-4">Lending Money</StyledTableCell>
              <StyledTableCell className="p-1 text-[#718EBF] md:p-4">Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loanData.map((loan) => (
              <StyledTableRow key={loan.SL_NO}>
                <StyledTableCell component="th" scope="row" className="p-1 text-start md:p-4">
                  {loan.SL_NO}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" className="p-1 text-start md:p-4">
                  {loan.book}
                </StyledTableCell>
                <StyledTableCell align="center" className='p-1 text-start md:p-4'>{loan.user}</StyledTableCell>
                <StyledTableCell align="center" className='p-1 text-start md:p-4'>{loan.duration}</StyledTableCell>
                <StyledTableCell align="center" className='p-1 text-start md:p-4'>{loan.lendingMoney}</StyledTableCell>
                <StyledTableCell align="center" className={`p-1 text-start md:p-4 font-semibold ${loan.status === "Returned" ? "text-green-600" : "text-red-600"}`}>
                  {loan.status}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}