import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtTokenGuard } from 'src/jwt-token/jwt-token.guard';
import { Headers, UseGuards } from '@nestjs/common/decorators';
import ResponseFormat from 'src/utils/Addons/response-formats';

@Controller('transactions')
@ApiTags('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) { }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtTokenGuard)
  async create(@Headers('authorization') token: string, @Body() createTransactionDto: CreateTransactionDto) {
    try {
      const data = await this.transactionsService.create(token, createTransactionDto);
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
    const data = await this.transactionsService.findAll();
    return ResponseFormat(true, HttpStatus.CREATED, "OK", data)
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtTokenGuard)
  async findOne(@Param('id') id: string) {
    const data = await this.transactionsService.findOne(+id);
    return ResponseFormat(true, HttpStatus.CREATED, "OK", data)
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtTokenGuard)
  async update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    const data = await this.transactionsService.update(+id, updateTransactionDto);
    return ResponseFormat(true, HttpStatus.CREATED, "OK", data)
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtTokenGuard)
  async remove(@Param('id') id: string) {
    const data = await this.transactionsService.remove(+id);
    return ResponseFormat(true, HttpStatus.CREATED, "OK", data)
}
}
