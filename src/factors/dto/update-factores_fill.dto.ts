import { ApiProperty } from "@nestjs/swagger"

export class UpdateFactoreFillDto {
    @ApiProperty()
    shoper_name: string

    @ApiProperty()
    shoper_mobile: string

    @ApiProperty()
    province: string

    @ApiProperty()
    city: string

    @ApiProperty()
    postal_code: string

    @ApiProperty()
    tracking_code: string

    @ApiProperty()
    payment_type: string

    @ApiProperty()
    image: string

    @ApiProperty()
    final_price: number
}