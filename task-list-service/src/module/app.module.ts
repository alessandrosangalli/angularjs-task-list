import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateModule } from './state.module';
import { TaskModule } from './task.module';

@Module({
  imports: [TypeOrmModule.forRoot(), TaskModule, StateModule],
})
export class AppModule { }
