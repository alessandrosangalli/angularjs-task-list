import { Controller, Get } from '@nestjs/common';
import { StateService } from 'src/service/state.service';

@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) { }

  @Get()
  getStates(): any {
    return this.stateService.findAll();
  }
}
