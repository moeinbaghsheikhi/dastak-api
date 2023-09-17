import { Wallet } from "src/finance/wallet/entities/wallet.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";

@Entity({ name: 'BankAccounts' })
export class BankAccount {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    card_number: string

    @Column()
    shabab_number: string

    @ManyToOne(() => Wallet, (wallet) => wallet.bankAccounts)
    wallets: Wallet


}
