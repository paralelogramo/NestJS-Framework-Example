import { BadRequestException, CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, catchError, throwError } from "rxjs";
import { ApiResponse } from "../utils/api-response";

@Injectable()
export class ValidationIdentificationInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const id = request.params.id
        if (isNaN(id) || id < 1) {
            return throwError(() => new BadRequestException(new ApiResponse(HttpStatus.BAD_REQUEST, false, 'Invalid ID', {errors: ['Invalid ID']})));
        }
        return next.handle();
    }
}