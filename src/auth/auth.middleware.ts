import { HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request, Response } from "express";
import { ApiResponse } from "src/utils/api-response";

@Injectable()
export class AuthMiddleware implements NestMiddleware{

    constructor(
        private readonly jwtService: JwtService
    ) {}

  use(req: Request, res: Response, next: () => void) {
    const authHeader = req.headers['authorization'];
    if (req.originalUrl.startsWith('/api/auth/')) {
      next();
      return;
    }
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = this.jwtService.verify(token);
        req['user'] = decoded;
        next();
      } catch (error) {
        const apiResponse: ApiResponse = {
            status: HttpStatus.UNAUTHORIZED,
            success: false,
            message: 'Invalid token',
            data: null
        }
        res.status(apiResponse.status).json(apiResponse);
      }
    }
    else {
        const apiResponse: ApiResponse = {
            status: HttpStatus.UNAUTHORIZED,
            success: false,
            message: 'Invalid token',
            data: null
        }
        res.status(apiResponse.status).json(apiResponse);
    }
  }
}