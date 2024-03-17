import { AuthDto } from "src/auth/dto/auth.dto";
import { Auth } from "src/auth/entities/auth.entity";

export class Transformations {
    
    static authToDTO(auth: any): AuthDto {
        const authDTO = new AuthDto();
        authDTO.email = auth.username;
        authDTO.password = auth.password;
        authDTO.role = auth.role;
        return authDTO;
    }

    static authDToToEntity(authDTO: any): Auth {
        const auth = new Auth();
        auth.username = authDTO.email;
        auth.password = authDTO.password;
        auth.role = authDTO.role;
        return auth;
    }

}