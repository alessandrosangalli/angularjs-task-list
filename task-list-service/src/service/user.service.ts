import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs/internal/Observable';
import { Repository } from 'typeorm';
import { User } from '../database/model/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private httpService: HttpService
  ) { }

  async insert(user: User): Promise<void> {
    await this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async mailValidator(email): Promise<any> {
    const result = await this.httpService.get('http://apilayer.net/api/check?access_key=' + process.env.API_LAYER_KEY + '&email=' + email).toPromise();
    return {
      valid: result.data.format_valid,
      sugestion: result.data.did_you_mean
    }
  }
}
