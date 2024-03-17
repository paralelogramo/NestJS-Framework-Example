import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../utils/api-response';

@Injectable()
export class ApiResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map(data => {
                const response = context.switchToHttp().getResponse();
                if (data instanceof ApiResponse) {
                    response.status(data.status);
                } else {
                    // Si data no es una instancia de ApiResponse, se usa HttpStatus.OK
                    response.status(HttpStatus.OK);
                }
                return data;
            }),
        );
    }
}