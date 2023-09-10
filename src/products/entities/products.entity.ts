import { Accounts } from "src/accounts/entities/account.entity";
import { Column, ManyToOne, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categories } from "./categories.entity";
import { Factor_items } from "src/factors/entities/factor_item.entity";

@Entity({ name: 'products' })
export class Products {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 250 })
    title: string

    @Column({ type: "bigint" })
    price: number

    @Column({ type: "bigint", nullable: true })
    stock_count: number

    @ManyToOne(() => Accounts, (account) => account.products)
    account: Accounts;

    @ManyToOne(() => Categories)
    @JoinColumn()
    category: Categories;

    @ManyToOne(() => Factor_items, (factors_item) => factors_item.product)
    factors_items: Factor_items;
}
