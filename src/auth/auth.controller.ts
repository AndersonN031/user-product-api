import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(
        @Body('email') email: string,
        @Body('password') password: string
    ) {
        return await this.authService.signIn(email, password);
    }
}
