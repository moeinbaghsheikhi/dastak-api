import { Accounts } from "src/accounts/entities/account.entity";
import { BankAccount } from "src/finance/bank_accounts/entities/bank_account.entity";
import { Transaction } from "src/finance/transactions/entities/transaction.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";


@Entity({ name: 'wallet' })
export class Wallet {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    amount: number

    @Column({ nullable: true })
    accounts_mobile: string

    @OneToMany(() => BankAccount, (bankAccount) => bankAccount.wallets)
    @JoinColumn()
    bankAccounts: BankAccount

    @ManyToOne(() => Accounts,(account)=> account.wallets)
    accounts: Accounts
}
