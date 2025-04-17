import { CurrentUser } from '@/decorators/current-user.decorator';
import { ApiAuth, ApiPublic } from '@/decorators/http.decorators';
import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FirebaseService } from 'src/firebase/firebase/firebase.service';
import { AuthService } from './auth.service';
import { LoginResDto } from './dto/login.res.dto';
import { JwtPayloadType } from './types/jwt-payload.type';

@ApiTags('auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly firebaseService: FirebaseService,
  ) {}

  @ApiPublic({
    type: LoginResDto,
    summary: 'Sign in',
  })
  // @Post('email/login')
  // async signIn(@Body() userLogin: LoginReqDto): Promise<LoginResDto> {
  //   // return await this.authService.signIn(userLogin);
  // }

  // @ApiPublic()
  // @Post('email/register')
  // async register(@Body() dto: RegisterReqDto): Promise<RegisterResDto> {
  //   return await this.authService.register(dto);
  // }
  @ApiAuth({
    summary: 'Logout',
    errorResponses: [400, 401, 403, 500],
  })
  @Post('logout')
  async logout(@CurrentUser() userToken: JwtPayloadType): Promise<void> {
    // await this.authService.logout(userToken);
  }

  // @ApiPublic({
  //   type: RefreshResDto,
  //   summary: 'Refresh token',
  // })
  // @Post('refresh')
  // async refresh(@Body() dto: RefreshReqDto): Promise<RefreshResDto> {
  //   // return await this.authService.refreshToken(dto);
  // }

  @ApiPublic()
  @Post('forgot-password')
  async forgotPassword() {
    return 'forgot-password';
  }

  @ApiPublic()
  @Post('verify/forgot-password')
  async verifyForgotPassword() {
    return 'verify-forgot-password';
  }

  @ApiPublic()
  @Post('reset-password')
  async resetPassword() {
    return 'reset-password';
  }

  @ApiPublic()
  @Get('verify/email')
  async verifyEmail() {
    return 'verify-email';
  }

  @ApiPublic()
  @Post('verify/email/resend')
  async resendVerifyEmail() {
    return 'resend-verify-email';
  }
}
