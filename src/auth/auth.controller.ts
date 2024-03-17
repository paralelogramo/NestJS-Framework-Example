import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { ApiResponse } from 'src/utils/api-response';
import { Response, Request } from 'express';

@Controller('api/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() authCredentials: AuthDto, @Res() res: Response, @Req() req: Request): Promise<void> {
        const response: ApiResponse = await this.authService.login(authCredentials);
        res.status(response.status).json(response);
    }

    @Post('register')
    async register(@Body() authCredentials: AuthDto, @Res() res: Response, @Req() req: Request): Promise<void> {
        const response: ApiResponse = await this.authService.register(authCredentials);
        res.status(response.status).json(response);
    }
}
