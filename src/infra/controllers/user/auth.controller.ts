import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { AuthRequest } from '../../auth/models/AuthRequest';
import { IsPublic } from '../../auth/decorators/is-public.decorator';
import { ApiTags } from '@nestjs/swagger';

@IsPublic()
@ApiTags('auth')
@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }
}
