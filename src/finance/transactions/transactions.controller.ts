import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtTokenGuard } from 'src/jwt-token/jwt-token.guard';
import { Headers, UseGuards } from '@nestjs/common/decorators';

@Controller('transactions')
@ApiTags('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) { }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtTokenGuard)
  create(@Headers('authorization') token: string, @Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(token, createTransactionDto);
  }

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionsService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }
}
