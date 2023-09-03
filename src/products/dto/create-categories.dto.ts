import { ApiProperty } from "@nestjs/swagger"

export class CreateCategoriesDto {
    account_id: number

    @ApiProperty({
        description: '',
        example: '',
        type: BigInt
    })
    title: number
}
