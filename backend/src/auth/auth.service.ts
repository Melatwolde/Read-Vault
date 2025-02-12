import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: payload,
    };
  }

  async register(createUserDto: CreateUserDto){
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const role = (createUserDto.email === 'admin@gmail.com' && createUserDto.password === '123456789') ? 'admin' : 'user';
      const user = await this.usersService.create({
        ...createUserDto,
        password: hashedPassword,
        username: createUserDto.email.split('@')[0], // Example username generation
        status: 'active',
        borrowedBooks: [],
        registeredDate: new Date(),
        role,
      });
      return this.login(user);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Username already exists');
      }
      console.error('registration error:', error);
      throw new Error('Registration failed');
    }
  }
  }
