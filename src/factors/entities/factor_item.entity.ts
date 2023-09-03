import { Products } from "src/products/entities/products.entity";
import { Column, Entity, JoinColumn, OneToMany,ManyToOne , OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Factors } from "./factors.entity";

@Entity({ name: 'factor_items' })
export class Factor_items {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Products)
    @JoinColumn()
    products: Products

    @ManyToOne(() => Factors, (factors) => factors.Factor_items)
    factors: Factors;
}
