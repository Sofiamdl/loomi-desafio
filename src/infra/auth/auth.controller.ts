import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { IsPublic } from './decorators/is-public.decorator';
import { Roles, RolesGuard } from 'src/infra/auth/guards/permission.guard';
import { UserType } from '@prisma/client';

@IsPublic()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Roles(UserType.CLIENT)
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard, RolesGuard)
  login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }
  ß;
}
