import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import ResponseFormat from 'src/utils/Addons/response-formats';
import { JwtTokenGuard } from 'src/jwt-token/jwt-token.guard';
import { UseGuards, Headers } from '@nestjs/common/decorators';

@Controller('wallet')
@ApiTags('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) { }

  @ApiBearerAuth()
  @UseGuards(JwtTokenGuard)
  @Get()
  async findAll() {
    const data = await this.walletService.findAll();
    if (!data)
      return ResponseFormat(false, HttpStatus.NOT_FOUND, "NOT_FOUND", null)

    return ResponseFormat(true, HttpStatus.OK, "OK", data)
  }

  @ApiBearerAuth()
  @UseGuards(JwtTokenGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletService.update(+id, updateWalletDto);
  }
}
// return ResponseFormat(false, HttpStatus.BAD_REQUEST, "Mobile Already Exists", null)
