import { Accounts } from "src/accounts/entities/account.entity";
import { Column, ManyToOne, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Factor_items } from "./factor_item.entity";

@Entity({ name: 'factors' })
export class Factors {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 50, unique: true })
    code: string

    @Column({ type: "smallint", nullable: true })
    off_percent: number

    @Column({ type: "bigint" })
    status: number

    @ManyToOne(() => Accounts, (accounts) => accounts.factors)
    accounts: Accounts;

    @OneToMany(() => Factor_items, (Factor_items) => Factor_items.factors)
    @JoinColumn()
    Factor_items: Factor_items[];

}
