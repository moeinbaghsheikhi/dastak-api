import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { BankAccountsService } from './bank_accounts.service';
import { CreateBankAccountDto } from './dto/create-bank_account.dto';
import { UpdateBankAccountDto } from './dto/update-bank_account.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtTokenGuard } from 'src/jwt-token/jwt-token.guard';
import { Headers, UseGuards } from '@nestjs/common/decorators';
import ResponseFormat from 'src/utils/Addons/response-formats';

@Controller('bank-accounts')
@ApiTags('bank-accounts')
export class BankAccountsController {
  constructor(private readonly bankAccountsService: BankAccountsService) { }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtTokenGuard)
  async create(@Headers('authorization') token: string, @Body() createBankAccountDto: CreateBankAccountDto) {
    try {
      const data = await this.bankAccountsService.create(token, createBankAccountDto);
      if (!data)
        return ResponseFormat(false, HttpStatus.NOT_FOUND, "NOT_FOUND", null)

      return ResponseFormat(true, HttpStatus.CREATED, "CREATED", data)
    } catch (error) {
      return ResponseFormat(false, HttpStatus.INTERNAL_SERVER_ERROR, "CREATED", null)
    }

  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtTokenGuard)
  async findAll() {
    const data = await this.bankAccountsService.findAll();
    return ResponseFormat(true, HttpStatus.CREATED, "OK", data)
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtTokenGuard)
  async findOne(@Param('id') id: string) {
    const data = await this.bankAccountsService.findOne(+id);
    return ResponseFormat(true, HttpStatus.CREATED, "OK", data)
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtTokenGuard)
  async update(@Param('id') id: string, @Body() updateBankAccountDto: UpdateBankAccountDto) {
    const data = await this.bankAccountsService.update(+id, updateBankAccountDto);
    return ResponseFormat(true, HttpStatus.CREATED, "OK", data)
   }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtTokenGuard)
  async remove(@Param('id') id: string) {
    const data = await this.bankAccountsService.remove(+id);
    return ResponseFormat(true, HttpStatus.CREATED, "OK", data)
  }
}
