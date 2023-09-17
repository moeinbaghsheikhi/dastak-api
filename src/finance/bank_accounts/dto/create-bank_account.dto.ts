import { ApiProperty } from "@nestjs/swagger"

export class CreateBankAccountDto {
    @ApiProperty()
    title:string

    @ApiProperty()
    card_number: string
    
    @ApiProperty()
    shabab_number: string
}
