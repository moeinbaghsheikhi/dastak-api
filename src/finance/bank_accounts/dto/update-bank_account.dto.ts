import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBankAccountDto } from './create-bank_account.dto';

export class UpdateBankAccountDto extends PartialType(CreateBankAccountDto) {
    @ApiProperty()
    title:string

    @ApiProperty()
    card_number: string
    
    @ApiProperty()
    shabab_number: string
}

