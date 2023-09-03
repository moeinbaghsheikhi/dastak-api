import { ApiProperty } from "@nestjs/swagger"

export class UpdateFactoresItemDto{
    @ApiProperty({
        description: 'آیدی فاکتور مربوطه',
        example: '1',
        uniqueItems: true
    })
    factor_id: number

    @ApiProperty({
        description: 'آیدی محصول مربوطه',
        example: '2',
        uniqueItems: true
    })
    product_id: number
}
