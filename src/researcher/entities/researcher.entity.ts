import { Author } from "../../author/entities/author.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity({ name: 'researcher' })
export class Researcher {

    @Column({ name: 'id', type: 'int', primary: true , generated: 'increment'})
    id: number;
    
    @Column({ name: 'name', type: 'varchar', length: 64 })
    name: string;

    @Column({ name: 'surname', type: 'varchar', length: 64 })
    surname: string;

    @Column({ name: 'sec_surname', type: 'varchar', length: 64 })
    secSurname: string;

    @Column({ name: 'university', type: 'varchar', length: 64 })
    university: string;

    @OneToMany(() => Author, author => author.researcher)
    authors: Author[];
}