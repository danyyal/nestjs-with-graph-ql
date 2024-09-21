import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/UserEntity/user.entity';
import { EventShift } from 'src/entities/EventShiftEntity/eventShift.entity';
import { UserShiftRequest } from 'src/entities/UserShiftRequest/userShiftRequest.entity';
import { UserShifts } from 'src/entities/UserShiftEntity/userShift.entity';
import { UserResolver } from './user.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, EventShift, UserShiftRequest, UserShifts]),
  ],
  controllers: [UserController],

  providers: [UserService, UserResolver],
})
export class UserModule {}
