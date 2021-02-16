import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { State } from '../database/model/state.entity';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(State)
    private stateRepository: Repository<State>,
  ) { }

  async insert(state: State): Promise<void> {
    await this.stateRepository.save(state);
  }

  findAll(): Promise<State[]> {
    return this.stateRepository.find();
  }

  findOne(id: number): Promise<State> {
    return this.stateRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.stateRepository.delete(id);
  }
}
