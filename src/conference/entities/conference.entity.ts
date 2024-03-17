import { Edition } from "src/edition/entities/edition.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity({ name: 'conference' })
export class Conference {

    @Column({ name: 'id', type: 'int', primary: true , generated: 'increment'})
    id: number;
    @Column({ name: 'name', type: 'varchar', length: 128 })
    name: string;
    @OneToMany(() => Edition, edition => edition.conference)
    editions: Edition[];
}
