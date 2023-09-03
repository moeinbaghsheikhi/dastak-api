import { ApiProperty } from "@nestjs/swagger";

export class UpdateCategoriesDto {
    @ApiProperty({
        description: '',
        example: '',
        type: BigInt
    })
    title: number
}
