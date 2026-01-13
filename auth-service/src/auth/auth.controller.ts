import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @MessagePattern({ cmd: 'register' })
  register(@Payload() dto: RegisterDto) {
    return this.auth.register(dto.email, dto.password);
  }

  @MessagePattern({ cmd: 'login' })
  login(@Payload() dto: LoginDto) {
    return this.auth.login(dto.email, dto.password);
  }

  @MessagePattern({ cmd: 'me' })
  me(@Payload() user: any) {
    return user;
  }
}
