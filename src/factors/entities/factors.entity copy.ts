import { Accounts } from "src/accounts/entities/account.entity";
import { Column, ManyToOne, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Factor_items } from "./factor_item.entity";

@Entity({ name: 'factor_fill' })
export class factor_fill {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    shoper_name: string

    @Column()
    shoper_mobile:string

    @Column()
    province:string

    @Column()
    city:string

    @Column()
    postal_code:string

    @Column()
    tracking_code:string

    @Column()
    payment_type:string

    @Column()
    image:string

    @Column()
    final_price:number

}
