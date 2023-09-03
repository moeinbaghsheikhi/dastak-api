import { ApiProperty } from "@nestjs/swagger"

export class CreateFactoresDto {
    account_id: number

    @ApiProperty({
        description: '',
        example: '',
        maxLength: 50,
        uniqueItems: true
    })
    code: string

    @ApiProperty({
        description: '',
        example: '',
        type: 'smallint',
        nullable: true
    })
    off_percent: number

    @ApiProperty({
        description: '',
        example: '',
        type: BigInt,
    })
    status: number
}
