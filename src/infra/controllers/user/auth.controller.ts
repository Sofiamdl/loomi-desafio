import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { AuthRequest } from '../../auth/models/AuthRequest';
import { IsPublic } from '../../auth/decorators/is-public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/infra/dtos/login-dto';

@IsPublic()
@ApiTags('auth')
@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login(@Request() req: AuthRequest, @Body() _body: LoginDto) {
    try {
      return this.authService.login(req.user);
    } catch (err) {
      console.log(err);
    }
  }
}
