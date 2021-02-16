import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { Task } from './task.entity';

@Entity()
export class User {
  @Column()
  name: string;

  @PrimaryColumn()
  email: string;

  @OneToMany(() => Task, (task) => task.user)
  user: User;
}
