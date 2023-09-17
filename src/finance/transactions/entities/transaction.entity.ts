import { Wallet } from "src/finance/wallet/entities/wallet.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";


@Entity({ name: 'transaction' })
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    credit: number

    @Column()
    debit: number

    @Column()
    description: number
}
