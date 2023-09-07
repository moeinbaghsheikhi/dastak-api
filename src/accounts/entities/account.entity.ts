import { Factors } from "src/factors/entities/factors.entity";
import { Categories } from "src/products/entities/categories.entity";
import { Products } from "src/products/entities/products.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger/dist";

@Entity({ name: 'accounts' })
export class Accounts {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 250 })
    name: string

    @Column({ unique: true })
    mobile: string

    @Column({nullable: true})
    password: string

    @OneToMany(() => Products, (products) => products.account)
    products: Products[]

    @OneToMany(() => Categories, (categories) => categories.account)
    categories: Categories[]

    @OneToMany(() => Factors, (factors) => factors.account)
    factors: Factors[]

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
