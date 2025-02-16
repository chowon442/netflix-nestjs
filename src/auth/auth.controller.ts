import {
    Controller,
    Get,
    Headers,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './strategy/local.strategy';
import { JwtAuthGuard } from './strategy/jwt.strategy';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    registerUser(@Headers('authorization') token: string) {
        return this.authService.register(token);
    }

    @Post('login')
    loginUser(@Headers('authorization') token: string) {
        return this.authService.login(token);
    }

    @Post('token/access')
    async rotateAccessToken(@Headers('authorization') token: string) {
        const payload = await this.authService.parseBearerToken(token, true);
        return {
            accessToken: await this.authService.issueToken(payload, false),
        };
    }

    @UseGuards(LocalAuthGuard)
    @Post('login/passport')
    loginUserPassport(@Request() req) {
        return {
            refreshToken: this.authService.issueToken(req.user, true),
            accessToken: this.authService.issueToken(req.user, false),
        };
    }

    @UseGuards(JwtAuthGuard)
    @Get('private')
    async private(@Request() req) {
        return req.user;
    }
}
