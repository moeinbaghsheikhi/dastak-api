import { ApiProperty } from "@nestjs/swagger"

export class CreateFactoresDto {
    account_id: number

    @ApiProperty({
        description: 'کد فاکتور',
        example: '',
        maxLength: 50,
        uniqueItems: true
    })
    code: string

    @ApiProperty({
        description: 'درصد تخفیف (بین 1 تا 99)',
        example: '30',
        type: 'smallint',
        nullable: true
    })
    off_percent: number

    @ApiProperty({
        description: 'وضعیت',
        example: '1',
        type: 'smallint',
    })
    status: number
}
