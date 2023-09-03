import { Accounts } from "src/accounts/entities/account.entity";
import { Column, ManyToOne, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./products.entity";

@Entity({ name: 'categories' })
export class Categories {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @ManyToOne(() => Accounts, (accounts) => accounts.categories)
    @JoinColumn()
    account: Accounts;

    @OneToMany(() => Products, (product) => product.category)
    products: Products;
}
