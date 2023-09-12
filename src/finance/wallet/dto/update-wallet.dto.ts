import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateWalletDto } from './create-wallet.dto';

export class UpdateWalletDto extends PartialType(CreateWalletDto) {
    @ApiProperty()
    amount: number

}
