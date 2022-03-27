import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from './base.entity';

@Entity()
export class Link extends Base{
    @Column()
    title:string

    @Column()
    path:string
}