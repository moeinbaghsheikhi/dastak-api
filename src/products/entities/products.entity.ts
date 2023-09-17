import { Accounts } from "src/accounts/entities/account.entity";
import { Column, ManyToOne, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categories } from "./categories.entity";

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
    categories_id: Categories;

}
