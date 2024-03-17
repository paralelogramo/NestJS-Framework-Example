import { Author } from "../../author/entities/author.entity";
import { Edition } from "../../edition/entities/edition.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity({ name: 'article' })
export class Article {

    @Column({ name: 'id', type: 'int', primary: true , generated: 'increment'})
    id: number;

    @Column({ name: 'title', type: 'varchar', length: 256 })
    title: string;

    @ManyToOne(() => Edition, edition => edition.articles)
    @JoinColumn({ name: 'ref_edition' })
    edition: Edition;

    @OneToMany(() => Author, author => author.article)
    authors: Author[];

}
