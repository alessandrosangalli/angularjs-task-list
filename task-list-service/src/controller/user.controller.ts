import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { User } from '../database/model/user.entity';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get(':email')
  async findOne(@Param('email') email: string): Promise<User> {
    return await this.userService.findOne(email);
  }

  @Put(':email')
  async insert(@Param('email') email: string, @Body() body): Promise<void> {
    let user: User = await this.userService.findOne(email);
    const name: string = body.name;

    if (user) {
      user.name = name;
    } else {
      user = new User();
      user.email = email;
      user.name = name;
    }

    console.log(user)

    return this.userService.insert(user);
  }
}
