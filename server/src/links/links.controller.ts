import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { LinksService } from './links.service';

@Controller('links')
export class LinksController {
  constructor(private  readonly linkService:LinksService){}
    
  @Get()
  async findAll(@Query() query) {
    return await this.linkService.findAll(query);
  }

  @Post()
  async create(@Body() body) {
    return await this.linkService.create(body);
  }

  @Post("/update")
  async update(@Body() body) {
    return await this.linkService.update(body);
  }

  @Post('/delete/:id')
  async delete(@Param('id') id){
    return await this.linkService.delete(id)
  }
}
