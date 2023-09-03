import { ApiProperty } from "@nestjs/swagger"

export class CreateProductsDto {

    account_id: number

    categories_id: number

    @ApiProperty({
        description: '',
        example: '',
        maxLength: 250,
    })
    title: string

    @ApiProperty({
        description: '',
        example: '',
        type: BigInt,
    })
    price: number

    @ApiProperty({
        description: '',
        example: '',
        type: BigInt,
        nullable: true
    })
    stock_count: number
}
