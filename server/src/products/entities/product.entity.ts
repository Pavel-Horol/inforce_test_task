import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Comment} from "../../comments/entities/comment.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    imageUrl: string

    @Column({unique:true})
    name: string

    @Column()
    count: number

    @Column('json')
    size: {
        width: number
        height: number
    }

    @Column()
    weight: string

    @OneToMany(() => Comment, (comment)=> comment.product, {nullable: true})
    comments: Comment[]
}
