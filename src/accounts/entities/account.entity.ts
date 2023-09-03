import { Factors } from "src/factors/entities/factors.entity";
import { Categories } from "src/products/entities/categories.entity";
import { Products } from "src/products/entities/products.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger/dist";

@Entity({ name: 'accounts' })
export class Accounts {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 250 })
    name: string

    @Column({ unique: true })
    mobile: number

    @OneToMany(() => Products, (products) => products.accounts)
    @JoinColumn()
    products: Products[]

    @OneToMany(() => Categories, (categories) => categories.accounts)
    @JoinColumn()
    categories: Categories[]

    @OneToMany(() => Factors, (factors) => factors.accounts)
    @JoinColumn()
    factors: Factors[]

}
