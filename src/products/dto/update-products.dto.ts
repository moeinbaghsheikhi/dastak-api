import { ApiProperty } from "@nestjs/swagger"

export class UpdateProductsDto {
       
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
