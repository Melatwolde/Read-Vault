import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/interfaces/role.enum';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('total-books')
  async getTotalBooks() {
    return this.adminService.getTotalBooks();
  }

  @Get('most-borrowed-books')
  async getMostBorrowedBooks() {
    return this.adminService.getMostBorrowedBooks();
  }

  @Get('loan-trends')
  async getLoanTrends() {
    return this.adminService.getLoanTrends();
  }

  @Get('overdue-vs-returned')
  async getOverdueVsReturned() {
    return this.adminService.getOverdueVsReturned();
  }

  @Get('active-members-per-month')
  async getActiveMembersPerMonth() {
    return this.adminService.getActiveMembersPerMonth();
  }

  @Get('loan-count-per-month')
  async getLoanCountPerMonth() {
    return this.adminService.getLoanCountPerMonth();
  }

  @Get('most-popular-genres')
  async getMostPopularGenres() {
    return this.adminService.getMostPopularGenres();
  }

  @Get('average-loan-duration')
  async getAverageLoanDuration() {
    return this.adminService.getAverageLoanDuration();
  }

  @Get('late-returns-per-member')
  async getLateReturnsPerMember() {
    return this.adminService.getLateReturnsPerMember();
  }
}