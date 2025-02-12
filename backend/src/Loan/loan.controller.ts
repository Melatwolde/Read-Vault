import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { LoansService } from './loans.service';

@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Get()
  async getAllLoans() {
    return this.loansService.getAllLoans();
  }

  @Post()
  async addLoan(@Body() loanData: any) {
    return this.loansService.addLoan(loanData);
  }

  @Put(':id/status')
  async updateLoanStatus(@Param('id') loanId: string, @Body('status') status: string) {
    return this.loansService.updateLoanStatus(loanId, status);
  }

  @Delete(':id')
  async removeLoan(@Param('id') loanId: string) {
    return this.loansService.removeLoan(loanId);
  }
}