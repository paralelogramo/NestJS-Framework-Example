import { BadRequestException, CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, catchError, throwError } from "rxjs";
import { ApiResponse } from "../utils/api-response";

@Injectable()
export class ValidationPageableInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const page = request.params.page;
        const size = request.params.size;
        if (isNaN(page) || isNaN(size) || page < 1 || size < 1) {
            return throwError(() => new BadRequestException(new ApiResponse(HttpStatus.BAD_REQUEST, false, 'Invalid page or size', null)));
        }
        return next.handle();
    }
}