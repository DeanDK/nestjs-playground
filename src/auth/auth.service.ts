import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repostitory';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepostiory: UserRepository,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepostiory.signUp(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto) {
    const username = await this.userRepostiory.validateUserPassword(
      authCredentialsDto,
    );

    if (!username) {
      throw new UnauthorizedException('Unauthorized exception');
    }
  }
}
