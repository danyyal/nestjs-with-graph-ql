import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserCreateDto } from 'src/entities/UserEntity/UserCreateDto';
import { User } from 'src/entities/UserEntity/user.entity';
import { EventShift } from 'src/entities/EventShiftEntity/eventShift.entity';
import { UserShiftRequest } from 'src/entities/UserShiftRequest/userShiftRequest.entity';
import { UserShifts } from 'src/entities/UserShiftEntity/userShift.entity';
import { EventShiftCreateDto } from 'src/entities/EventShiftEntity/eventShiftCreateDto';
import {
  ShiftRequestCreateDto,
  ShiftRequestUpdateDto,
} from 'src/entities/UserShiftRequest/userShiftRequestCreateDto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(
    @Args('userCreateInput') body: UserCreateDto,
  ): Promise<User> {
    return this.userService.createUser(body);
  }

  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Mutation(() => EventShift)
  async createEventShift(
    @Args('eventShiftInput') body: EventShiftCreateDto,
  ): Promise<EventShift> {
    return this.userService.createEventShift(body);
  }

  @Query(() => [EventShift])
  async getAllEventShifts(): Promise<EventShift[]> {
    return this.userService.getEventShifts();
  }

  @Mutation(() => UserShiftRequest)
  async createShiftRequest(
    @Args('shiftRequestInput') body: ShiftRequestCreateDto,
  ): Promise<UserShiftRequest> {
    return this.userService.createShiftRequest(body);
  }

  @Query(() => [UserShiftRequest])
  async getAllShiftRequests(): Promise<UserShiftRequest[]> {
    return this.userService.getShiftRequests();
  }

  @Mutation(() => UserShiftRequest)
  async toggleShiftRequest(
    @Args('id') id: string,
    @Args('shiftRequestUpdateInput') body: ShiftRequestUpdateDto,
  ): Promise<UserShifts> {
    return this.userService.toggleRequestStatus(id, body);
  }

  @Query(() => [UserShifts])
  async getAllUserShifts(): Promise<UserShifts[]> {
    return this.userService.getUserShifts();
  }
}
