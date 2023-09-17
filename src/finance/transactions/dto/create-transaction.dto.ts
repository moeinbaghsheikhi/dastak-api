import { ApiProperty } from "@nestjs/swagger"

export class CreateTransactionDto {
    @ApiProperty()
    credit: number

    @ApiProperty()
    debit: number

    @ApiProperty()
    description: number

    
}