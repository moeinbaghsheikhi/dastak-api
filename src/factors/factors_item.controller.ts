import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { FactorsService } from './factors.service';
import { CreateFactoresDto } from './dto/create-factores.dto';
import { UpdateFactoresDto } from './dto/update-factores.dto';
import { UpdateFactoresItemDto } from './dto/update-factores_item.dto';
import { CreateFactoresItemDto } from './dto/create-factores_item.dto';
import { FactorsItemService } from './factors_item.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('factors_item')
@ApiTags('factors_item')
export class FactorsItemController {
  constructor(private readonly factorsItemService: FactorsItemService) {}

  @Post()
  create(@Body() createFactorDto: CreateFactoresItemDto) {
    return this.factorsItemService.create(createFactorDto);
  }

  @Get()
  findAll() {
    return this.factorsItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.factorsItemService.findOne(+id);
  }

//   @Put(':id')
//   update(@Param('id') id: string, @Body() updateFactorsItemDto: UpdateFactoresItemDto) {
//     return this.factorsItemService.update(+id, updateFactorsItemDto);
//   }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.factorsItemService.remove(+id);
  }
}
