import { Body, Controller, Get, HttpException, HttpStatus, Param, Put } from '@nestjs/common';
import { User } from '../database/model/user.entity';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get(':email')
  async findOne(@Param('email') email: string): Promise<User> {
    //duplicated code#1
    const mailValidate = await this.userService.mailValidator(email);

    if(mailValidate.valid !== true) {
      throw new HttpException(mailValidate.sugestion, HttpStatus.BAD_REQUEST);
    }

    return await this.userService.findOne(email);
  }

  @Put(':email')
  async insert(@Param('email') email: string, @Body() body): Promise<void> {
    //duplicated code#1
    const mailValidate = await this.userService.mailValidator(email);

    if(mailValidate.valid !== true) {
      throw new HttpException(mailValidate.sugestion, HttpStatus.BAD_REQUEST);
    }

    let user: User = await this.userService.findOne(email);
    const name: string = body.name;

    if (user) {
      user.name = name;
    } else {
      user = new User();
      user.email = email;
      user.name = name;
    }

    return this.userService.insert(user);
  }
}
