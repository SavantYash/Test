import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}
  
  @Get()
  findAll() {
    return this.service.findAll();
  }
}