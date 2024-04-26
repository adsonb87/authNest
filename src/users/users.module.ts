import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { config } from '../../ormconfig';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot(config)],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
