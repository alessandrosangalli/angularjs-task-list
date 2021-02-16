import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { State } from 'src/database/model/state.entity';
import { Repository } from 'typeorm';
import { Task } from '../database/model/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) { }

  async save(task: Task): Promise<void> {
    await this.taskRepository.save(task);
  }

  async findAll(): Promise<any[]> {
    const repositoryResult = await this.taskRepository
      .createQueryBuilder('task')
      .select(['task.id id', 'description', 'userEmail', 'task.stateId'])
      .addSelect('user.name', 'userName')
      .innerJoin('user', 'user', 'user.email = userEmail')
      .getRawMany();

    return repositoryResult;
  }

  findOne(id: number): Promise<Task> {
    return this.taskRepository.findOne(id, {
      relations: ['state'],
    });
  }

  async remove(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
