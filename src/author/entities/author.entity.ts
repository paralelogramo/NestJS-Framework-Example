import { Researcher } from "../../researcher/entities/researcher.entity";
import { Article } from "../../article/entities/article.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({ name: 'author' })
export class Author {

    @Column({ name: 'id', type: 'int', primary: true , generated: 'increment'})
    id: number;

    @Column({ name: 'ref_article', type: 'int'})
    ref_article: number;

    @Column({ name: 'ref_researcher', type: 'int'})
    ref_researcher: number;

    @ManyToOne(() => Article, article => article.authors)
    @JoinColumn({ name: 'ref_article' })
    article: Article
    
    @ManyToOne(() => Researcher, researcher => researcher.authors)
    @JoinColumn({ name: 'ref_researcher' })
    researcher: Researcher;
}
