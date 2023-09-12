import { Accounts } from "src/accounts/entities/account.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";


@Entity({ name: 'wallet' })
export class Wallet {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    amount: number

    @Column({ nullable: true })
    accounts_mobile: string

}
