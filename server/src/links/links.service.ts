import { Injectable } from '@nestjs/common';
import { Link } from 'libs/db/Entitys/link.entity';
import { getManager } from 'typeorm';
import { Crud } from '../Utils/Crud.Utils';
interface Paging {
    search: any;
    limit: string;
    page: string;
  }
  
@Injectable()
export class LinksService {
    CrudModel = new Crud(Link)
    async findAll(query: Paging) {
        return await this.CrudModel.FindAll(query);
      }
      async create(body: Link) {
        return await this.CrudModel.create(body);
      }
      async update(body: Link) {
        return await this.CrudModel.update(body);
      }
      async delete(id) {
        return await this.CrudModel.delete(id);
      }

}
