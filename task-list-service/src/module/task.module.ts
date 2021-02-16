import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../database/model/task.entity';
import { TaskService } from '../service/task.service';
import { TaskController } from '../controller/task.controller';
import { StateModule } from './state.module';
import { UserModule } from './user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), StateModule, UserModule],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule { }
