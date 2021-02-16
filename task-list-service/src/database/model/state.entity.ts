import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Task } from './task.entity';

@Entity()
export class State {
  @PrimaryColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  isFinalState: boolean;

  @OneToMany(() => Task, (task) => task.state)
  state: State[];
}
