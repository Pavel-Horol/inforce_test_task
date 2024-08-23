import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "../../products/entities/product.entity";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => Product, (product) => product.comments)
    product: Product
}
