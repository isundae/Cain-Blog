import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BlogsService } from './blogs.service';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly BlogsService: BlogsService) {}
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Query() query) {
    return await this.BlogsService.findAll(query);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() body) {
    return await this.BlogsService.create(body);
  }

  @Post('/update')
  @UseGuards(AuthGuard('jwt'))
  async update(@Body() body) {
    return await this.BlogsService.update(body);
  }

  @Post('/delete/:id')
  async delete(@Param('id') id) {
    return await this.BlogsService.delete(id);
  }

  @Get('xll')
  async xll(@Query() query) {
    return await this.BlogsService.xll(query);
  }
 
}
