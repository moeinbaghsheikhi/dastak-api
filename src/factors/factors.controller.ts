import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { FactorsService } from './factors.service';
import { CreateFactoresDto } from './dto/create-factores.dto';
import { UpdateFactoresDto } from './dto/update-factores.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('factors')
@ApiTags('factors')

export class FactorsController {
  constructor(private readonly factorsService: FactorsService) { }

  @Post()
  create(@Body() createFactorDto: CreateFactoresDto) {
    return this.factorsService.create(createFactorDto);
  }

  @Get()
  findAll() {
    return this.factorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.factorsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateFactorDto: UpdateFactoresDto) {
    return this.factorsService.update(+id, updateFactorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.factorsService.remove(+id);
  }
}
