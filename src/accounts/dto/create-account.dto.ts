import { ApiProperty } from "@nestjs/swagger/dist/decorators"
import { kMaxLength } from "buffer"

export class CreateAccountDto {
    @ApiProperty({
        description: 'Name Account',
        example: 'Reza',
        maxLength: 250,
    })
    name: string

    @ApiProperty({
        description: 'Number Phone',
        example: '09123456789',
        maximum: 11,
        uniqueItems: true,
    })
    @ApiProperty()
    mobile: number
}
