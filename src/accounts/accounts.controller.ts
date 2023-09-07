import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import ResponseFormat from 'src/utils/Addons/response-formats';

@Controller('accounts')
@ApiTags('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) { }

  @Post()
  async create(@Body() createAccountDto: CreateAccountDto) {
    try {
      const mobile = await this.accountsService.findByMobile(createAccountDto.mobile)
      if (mobile)
        return ResponseFormat(false, HttpStatus.BAD_REQUEST, "Mobile Already Exists", null)

      const data = await this.accountsService.create(createAccountDto);
      return ResponseFormat(true, HttpStatus.CREATED, "CREATED", data)
    }
    catch (error) {
      return ResponseFormat(false, 500, "SERVER-ERROR", null);
    }
  }

  @Get()
  async findAll() {
    const data = await this.accountsService.findAll()
    if (!data)
      return ResponseFormat(false, HttpStatus.NOT_FOUND, "NOT-FOUND", null)

    return ResponseFormat(true, HttpStatus.OK, "OK", data)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.accountsService.findOne(+id);
    if (!data)
      return ResponseFormat(false, HttpStatus.NOT_FOUND, "NOT-FOUND", null)
    return ResponseFormat(true, HttpStatus.OK, "OK", data)

  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    try {
      const data = await this.accountsService.update(+id, updateAccountDto);
      return ResponseFormat(true, HttpStatus.OK, "OK", data)
    } catch (error) {
      return ResponseFormat(false, 500, "SERVER-ERROR", null);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.accountsService.remove(+id);
    if (!data)
      return ResponseFormat(false, HttpStatus.NOT_FOUND, "NOT-FOUND", null)
    return ResponseFormat(true, HttpStatus.OK, "OK", data)
  }
}
