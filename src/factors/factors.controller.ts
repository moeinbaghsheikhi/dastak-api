import { Controller, Get, Post, Body, Put, Param, Delete, HttpStatus, Patch } from '@nestjs/common';
import { FactorsService } from './factors.service';
import { CreateFactoresDto } from './dto/create-factores.dto';
import { UpdateFactoresDto } from './dto/update-factores.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import ResponseFormat from 'src/utils/Addons/response-formats';

@Controller('factors')
@ApiTags('factors')
export class FactorsController {
  constructor(private readonly factorsService: FactorsService) { }

  // ایجاد یک فاکتور جدید
  @Post()
  async create(@Body() createFactorDto: CreateFactoresDto) {
    try {
      const code = await this.factorsService.findByCode(createFactorDto.code)
      console.log(code)
      if (code)
        return ResponseFormat(false, HttpStatus.BAD_REQUEST, "Code Already Exists", null)

      const data = await this.factorsService.create(createFactorDto);
      if (data == null)
        return ResponseFormat(false, HttpStatus.BAD_REQUEST, "Account Not Found", null)

      return ResponseFormat(true, HttpStatus.CREATED, "OK", data)
    } catch (error) {
      return ResponseFormat(false, 500, "SERVER-ERROR", null);
    }
  }

  // بازیابی تمامی فاکتورها
  @Get()
  async findAll() {
    const data = await this.factorsService.findAll();
    
    return ResponseFormat(true, HttpStatus.OK, "OK", data)
  }

  // بازیابی یک فاکتور با شناسه مشخص
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.factorsService.findOne(+id);
    if (!data)
      return ResponseFormat(false, HttpStatus.NOT_FOUND, "NOT-FOUND", null)

    return ResponseFormat(true, HttpStatus.OK, "OK", data)
  }

  // به‌روزرسانی یک فاکتور با شناسه مشخص
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFactorDto: UpdateFactoresDto) {
    try {
      const data = await this.factorsService.update(+id, updateFactorDto);
      return ResponseFormat(true, HttpStatus.OK, "OK", data)
    } catch (error) {
      return ResponseFormat(false, 500, "SERVER-ERROR", null);
    }

  }

  // حذف یک فاکتور با شناسه مشخص
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.factorsService.remove(+id);
    if (data[0] == null)
      return ResponseFormat(false, HttpStatus.NOT_FOUND, "NOT-FOUND", null)

    return ResponseFormat(true, HttpStatus.OK, "OK", data)
  }
}
