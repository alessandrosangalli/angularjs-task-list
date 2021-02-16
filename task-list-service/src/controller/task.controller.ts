import { Controller, Get, Post, Patch, Body } from '@nestjs/common';
import { StateService } from 'src/service/state.service';
import { UserService } from 'src/service/user.service';
import { TaskService } from '../service/task.service';

@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly stateService: StateService,
    private readonly userService: UserService,
  ) { }

  @Get()
  getTasks(): any {
    return this.taskService.findAll();
  }

  @Post()
  async newTask(@Body() task: any): Promise<void> {
    const stateId = 0;
    task.state = await this.stateService.findOne(stateId);
    task.user = await this.userService.findOne(task.userEmail);
    await this.taskService.save(task);
  }

  @Patch()
  async changeTaskStatus(@Body() body): Promise<any> {
    const taskId: number = body.taskId;
    const moveTo: 'next' | 'previous' = body.moveTo;
    const task = await this.taskService.findOne(taskId);
    const currentStateId = task.state.id;
    const nextStateId =
      moveTo === 'next' ? currentStateId + 1 : currentStateId - 1;
    const newState = await this.stateService.findOne(nextStateId);
    task.state = newState;
    await this.taskService.save(task);
  }
}
