
import { Entity, Column } from 'typeorm';
import { ROLES } from '../role-enum';

@Entity({name: 'user'})
export class Auth {

    @Column({ primary: true, type: 'varchar', length: 64 , nullable: false})
    username: string;

    @Column({ type: 'varchar', length: 64 , nullable: false})
    password: string;

    @Column({ type: 'enum', enum: ROLES , nullable: false, default: ROLES.USER})
    role: ROLES;
}