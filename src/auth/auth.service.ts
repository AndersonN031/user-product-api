import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { AuthResponseDto } from './auth.dto';

@Injectable()
export class AuthService {
    private jwtExpirationTimeInSeconds: number;
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {
        this.jwtExpirationTimeInSeconds = +(this.configService.get<number>('JWT_EXPIRATION_TIME') ?? 3600);
    };

    async signIn(email: string, password: string): Promise<AuthResponseDto> {
        const foundEmail = await this.usersService.findByUserEmail(email);

        if (!foundEmail || !bcryptCompareSync(password, foundEmail.password!)) {
            throw new UnauthorizedException();
        };

        const payload = { sub: foundEmail.id, email: foundEmail.email };

        

        const token = this.jwtService.sign(payload);

        return { token, expiresIn: this.jwtExpirationTimeInSeconds }
    }

}
