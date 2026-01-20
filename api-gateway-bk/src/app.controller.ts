import { Controller, Post, Body, Inject, Get, Req, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Public } from './common/guards/public.decorator';

@Controller('auth')
export class AppController {
  constructor(@Inject('AUTH_SERVICE') private readonly authService: ClientProxy) {}

  @Public()
  @Post('register')
  register(@Body() registerDto: any) {
    return this.authService.send({ cmd: 'register' }, registerDto);
  }

  @Public()
  @Post('login')
  login(@Body() loginDto: any) {
    return this.authService.send({ cmd: 'login' }, loginDto);
  }

  @Get('me')
  getProfile(@Req() req) {
    return this.authService.send({ cmd: 'me' }, req.user);
  }

  @Get('admin/ping')
  pingAdmin(){
    return this.authService.send({cmd: 'admin_ping'}, {});
  }

  @Get('orders/ping')
  pingOrders(){
      return this.authService.send({cmd: 'orders_ping'}, {});
  }
}
