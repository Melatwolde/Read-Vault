import { Controller, Get, Put, Delete, Body, Param, UseGuards, Req, Post, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/interfaces/role.enum';
import { UpdateUserRoleDto } from './dto/userRole.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';

@ApiTags('users')
@ApiBearerAuth('access-token') 
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully.',
    type: User,
    schema: {
      example: {
        "_id": "64f9b26b9a3b2f001c8a5678",
        "username": "newuser",
        "name": "New User",
        "email": "newuser@example.com",
        "role": "user",
        "status": "active",
        "borrowedBooks": [],
        "registeredDate": "2025-02-11T00:00:00.000Z"
      }
    }
  })
  async getProfile(@Req() req) {
    return this.usersService.findById(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  @ApiOperation({ summary: 'Update user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile updated successfully.',
    type: User,
    schema: {
      example: {
        "_id": "64f9b26b9a3b2f001c8a5678",
        "username": "updateduser",
        "name": "Updated User",
        "email": "updateduser@example.com",
        "role": "user",
        "status": "active",
        "borrowedBooks": [],
        "registeredDate": "2025-02-11T00:00:00.000Z"
      }
    }
  })
  async updateProfile(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'All users retrieved successfully.',
    isArray: true,
    type: User,
    schema: {
      example: [
        {
          "_id": "64f9b26b9a3b2f001c8a5678",
          "username": "newuser",
          "name": "New User",
          "email": "newuser@example.com",
          "role": "user",
          "status": "active",
          "borrowedBooks": [],
          "registeredDate": "2025-02-11T00:00:00.000Z"
        }
      ]
    }
  })
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully.',
    type: User,
    schema: {
      example: {
        "_id": "64f9b26b9a3b2f001c8a5678",
        "username": "updateduser",
        "name": "Updated User",
        "email": "updateduser@example.com",
        "role": "user",
        "status": "active",
        "borrowedBooks": [],
        "registeredDate": "2025-02-11T00:00:00.000Z"
      }
    }
  })
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully.',
    schema: {
      example: {
        "_id": "64f9b26b9a3b2f001c8a5678",
        "username": "deleteduser",
        "name": "Deleted User",
        "email": "deleteduser@example.com",
        "role": "user",
        "status": "inactive",
        "borrowedBooks": [],
        "registeredDate": "2025-02-11T00:00:00.000Z"
      }
    }
  })
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.usersService.remove(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  @ApiOperation({ summary: 'Add new user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully.',
    type: User,
    schema: {
      example: {
        "_id": "64f9b26b9a3b2f001c8a5678",
        "username": "newuser",
        "name": "New User",
        "email": "newuser@example.com",
        "role": "user",
        "status": "active",
        "borrowedBooks": [],
        "registeredDate": "2025-02-11T00:00:00.000Z"
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized: Invalid or expired token' })
  async addUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Put(':id/status')
  @ApiOperation({ summary: 'Update user status' })
  @ApiResponse({
    status: 200,
    description: 'User status updated successfully.',
    type: User,
    schema: {
      example: {
        "_id": "64f9b26b9a3b2f001c8a5678",
        "username": "updateduser",
        "name": "Updated User",
        "email": "updateduser@example.com",
        "role": "user",
        "status": "inactive",
        "borrowedBooks": [],
        "registeredDate": "2025-02-11T00:00:00.000Z"
      }
    }
  })
  async updateUserStatus(@Param('id') userId: string, @Body('status') status: string) {
    return this.usersService.updateUserStatus(userId, status);
  }

  @Patch(':id/role')
  @ApiOperation({ summary: 'Update user role' })
  @ApiResponse({
    status: 200,
    description: 'User role updated successfully.',
    type: User,
    schema: {
      example: {
        "_id": "64f9b26b9a3b2f001c8a5678",
        "username": "updateduser",
        "name": "Updated User",
        "email": "updateduser@example.com",
        "role": "admin",
        "status": "active",
        "borrowedBooks": [],
        "registeredDate": "2025-02-11T00:00:00.000Z"
      }
    }
  })
  async updateRole(@Param('id') id: string, @Body() updateUserRoleDto: UpdateUserRoleDto) {
    return this.usersService.updateUserRole(id, updateUserRoleDto);
  }
}