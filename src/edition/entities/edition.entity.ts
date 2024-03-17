import { Article } from "src/article/entities/article.entity";
import { Conference } from "src/conference/entities/conference.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity({ name: 'edition' })
export class Edition {

    @Column({ name: 'id', type: 'int', primary: true , generated: 'increment'})
    id: number;

    @Column({ name: 'year', type: 'int' })
    year: number;

    @Column({ name: 'date', type: 'date' })
    date: Date;

    @Column({ name: 'city', type: 'varchar', length: 64 })
    city: string;

    @ManyToOne(() => Conference, conference => conference.editions)
    @JoinColumn({ name: 'ref_conference' })
    conference: Conference;

    @OneToMany(() => Article, article => article.edition)
    articles: Article[];
}
