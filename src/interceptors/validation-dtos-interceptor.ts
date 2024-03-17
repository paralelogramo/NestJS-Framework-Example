import { BadRequestException, CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, catchError, throwError } from "rxjs";
import { ApiResponse } from "../utils/api-response";

@Injectable()
export class ValidationDTOInterceptor implements NestInterceptor{
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    console.log('entro')
      return next.handle().pipe(
        catchError((err:any) => {
            if (err instanceof BadRequestException){
                const response = err.getResponse();
                const message = 'Validation failed';
              return throwError(() => new BadRequestException(new ApiResponse(HttpStatus.BAD_REQUEST, false, message, {"errors": response['message']})));
            }
          return throwError(() => err);
        })
      );
  }
}