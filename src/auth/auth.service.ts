import { GatewayTimeoutException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ApiResponse } from '../utils/api-response';
import { AuthDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import * as brcypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { TimeoutError } from 'rxjs';
import { Auth } from './entities/auth.entity';
import { Transformations } from 'src/utils/transformations';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(Auth) private authRepo: Repository<Auth>,
        private jwtService: JwtService
    ) {}

    async login(authDTO: AuthDto): Promise<ApiResponse> {
        let user = null;
        try {
            user = await this.authRepo.findOne({ where: { username: authDTO.email, role: authDTO.role } });
        } catch (error) {
            if (error instanceof QueryFailedError) {
                return new ApiResponse(HttpStatus.BAD_REQUEST, false, 'Error en la consulta a la base de datos', null);
            } else if (error instanceof TimeoutError) {
                return new ApiResponse(HttpStatus.GATEWAY_TIMEOUT, false, 'Error de tiempo de espera en la base de datos', null);
            } else if (error instanceof NotFoundException) {
                return new ApiResponse(HttpStatus.NOT_FOUND, false, 'Usuario no encontrado', null);
            } else {
                console.log(error)
                return new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, false, 'Error interno en la base de datos', null);
            }
        }

        if (user && (await brcypt.compare(authDTO.password, user.password))) {
            const payload = { username: user.username, role: user.role };
            const token = this.jwtService.sign(payload);

            return new ApiResponse(HttpStatus.OK, true, 'Login successful', { token: token });
        }

        return new ApiResponse(HttpStatus.UNAUTHORIZED, false, 'Invalid credentials', null);
    }

    async register(authDTO: AuthDto): Promise<ApiResponse> {
        let checkUser = null;
        try {
            checkUser = await this.authRepo.findOne({ where: { username: authDTO.email , role: authDTO.role} });

            if (checkUser) {
                return new ApiResponse(HttpStatus.BAD_REQUEST, false, 'User already exists', null);
            }

        } catch (error) {
            if (error instanceof QueryFailedError) {
                return new ApiResponse(HttpStatus.BAD_REQUEST, false, 'Error en la consulta a la base de datos', null);
            } else if (error instanceof TimeoutError) {
                return new ApiResponse(HttpStatus.GATEWAY_TIMEOUT, false, 'Error de tiempo de espera en la base de datos', null);
            } else if (error instanceof NotFoundException) {
                return new ApiResponse(HttpStatus.NOT_FOUND, false, 'Usuario no encontrado', null);
            } else {
                console.log(error)
                return new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, false, 'Error interno en la base de datos', null);
            }
        }

        let authEntity = Transformations.authDToToEntity(authDTO);

        const hashedPassword = await brcypt.hash(authDTO.password, 10);

        authEntity.password = hashedPassword;

        const newUser = await this.authRepo.create(authEntity);
        await this.authRepo.save(newUser);

        const token = this.jwtService.sign({ username: newUser.username, role: newUser.role });

        return new ApiResponse(HttpStatus.CREATED, true, 'User created', { token: token });
    }

}
