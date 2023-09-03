import { Products } from "src/products/entities/products.entity";
import { Column, Entity, JoinColumn, OneToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Factors } from "./factors.entity";

@Entity({ name: 'factor_items' })
export class Factor_items {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Products)
    @JoinColumn()
    products: Products

    @ManyToOne(() => Factors, (factors) => factors.Factor_items)
    factors: Factors;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
