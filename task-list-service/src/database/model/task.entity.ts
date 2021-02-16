import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { State } from './state.entity';
import { User } from './user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  description: string;

  @ManyToOne(() => State, (state) => state.id)
  state: State;

  @ManyToOne(() => User, (user) => user.email)
  user: User;
}
