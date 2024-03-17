import { HttpStatus, Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ApiResponse } from './utils/api-response';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'research',
            entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
            synchronize: true,
        };
    }

    async handleConnectionError(error: any): Promise<ApiResponse> {
        if (error.code === 'ETIMEDOUT') {
            return new ApiResponse(HttpStatus.SERVICE_UNAVAILABLE, false, 'Error de conexión temporal a la base de datos', null);
        } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
            return new ApiResponse(HttpStatus.UNAUTHORIZED, false, 'Error de credenciales de la base de datos', null);
        } else {
            return new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, false, 'Error interno de la base de datos', null);
        }
    }
}
