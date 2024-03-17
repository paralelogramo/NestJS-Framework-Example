import { HttpStatus } from "@nestjs/common";

export class ApiResponse {
  constructor(
    public status: HttpStatus,
    public success: boolean,
    public message: string,
    public data: any
  ) {}
}