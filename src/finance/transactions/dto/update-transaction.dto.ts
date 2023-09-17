import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTransactionDto } from './create-transaction.dto';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
    @ApiProperty()
    credit: number

    @ApiProperty()
    debit: number

    @ApiProperty()
    description: number

    
}
