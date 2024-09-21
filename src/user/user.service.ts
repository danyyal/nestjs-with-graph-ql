import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventShift } from 'src/entities/EventShiftEntity/eventShift.entity';
import { EventShiftCreateDto } from 'src/entities/EventShiftEntity/eventShiftCreateDto';
import { UserCreateDto } from 'src/entities/UserEntity/UserCreateDto';
import { User } from 'src/entities/UserEntity/user.entity';
import { UserShifts } from 'src/entities/UserShiftEntity/userShift.entity';
import { UserShiftRequest } from 'src/entities/UserShiftRequest/userShiftRequest.entity';
import {
  ShiftRequestCreateDto,
  ShiftRequestUpdateDto,
} from 'src/entities/UserShiftRequest/userShiftRequestCreateDto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(EventShift)
    private eventShiftRepo: Repository<EventShift>,
    @InjectRepository(UserShiftRequest)
    private userShiftRequestRepo: Repository<UserShiftRequest>,
    @InjectRepository(UserShifts)
    private userShiftsRepo: Repository<UserShifts>,
  ) {}

  async createUser(payload: UserCreateDto): Promise<User> {
    const user = new User();
    Object.assign(user, payload);
    const res = await this.userRepo.save(user);
    return res;
  }
  async getUsers(): Promise<User[]> {
    return await this.userRepo.find({
      relations: {
        userShifts: true,
        shiftRequests: true,
      },
    });
  }
  async createEventShift(payload: EventShiftCreateDto): Promise<EventShift> {
    const eventShift = new EventShift();
    Object.assign(eventShift, payload);
    const res = await this.eventShiftRepo.save(eventShift);
    return res;
  }
  async getEventShifts(): Promise<EventShift[]> {
    return await this.eventShiftRepo.find({
      relations: {
        shiftRequests: true,
      },
    });
  }

  async createShiftRequest(
    payload: ShiftRequestCreateDto,
  ): Promise<UserShiftRequest> {
    const user = await this.userRepo.findOne({
      where: {
        id: payload.userId,
      },
    });
    if (!user) throw new Error('Invalid user id');

    const eventShit = await this.eventShiftRepo.findOne({
      where: {
        id: payload.eventShiftId,
      },
    });
    if (!eventShit) throw new Error('Invalid event Shift id');

    const shiftRequest = await this.userShiftRequestRepo.findOne({
      where: {
        user: { id: payload.userId },
        eventShift: { id: payload.eventShiftId },
      },
    });
    if (shiftRequest) throw new Error('Shift Request aleady exist');

    const userShiftRequest = new UserShiftRequest();
    Object.assign(userShiftRequest, payload);
    userShiftRequest.user = user;
    userShiftRequest.eventShift = eventShit;
    const res = await this.userShiftRequestRepo.save(userShiftRequest);
    return res;
  }

  async toggleRequestStatus(
    requestId: string,
    payload: ShiftRequestUpdateDto,
  ): Promise<UserShiftRequest> {
    let shiftRequest: UserShiftRequest;

    try {
      // Fetch the shift request with relations
      shiftRequest = await this.userShiftRequestRepo.findOne({
        where: { id: requestId },
        relations: { user: true, eventShift: true },
      });

      if (!shiftRequest) {
        throw new Error(`Shift request with ID ${requestId} not found.`);
      }

      const userShift = await this.userShiftsRepo.findOne({
        where: {
          user: { id: shiftRequest.user.id },
          eventShift: { id: shiftRequest.eventShift.id },
        },
        relations: {
          user: true,
          eventShift: true,
        },
      });

      let res: UserShifts | undefined;

      if (payload.status === 'UNSCHEDULED') {
        if (userShift) {
          res = await this.userShiftsRepo.remove(userShift);
        }
      } else {
        if (userShift) {
          throw new Error('User shift already exists.');
        }

        const userShiftTemp = new UserShifts();
        userShiftTemp.user = shiftRequest.user;
        userShiftTemp.eventShift = shiftRequest.eventShift;

        res = await this.userShiftsRepo.save(userShiftTemp);
      }

      // Ensure the result is valid
      if (!res) {
        throw new Error('Failed to save or remove user shift.');
      }

      // Update shift request status
      shiftRequest.status = payload.status;
      return await this.userShiftRequestRepo.save(shiftRequest);
    } catch (error) {
      // Log the error for debugging purposes (consider using a logging library)
      console.error('Error in toggleRequestStatus:', error);

      // Re-throw the error with a more context-specific message if needed
      throw new Error(
        `Failed to toggle status for request ID ${requestId}: ${error.message}`,
      );
    }
  }

  async getShiftRequests(): Promise<UserShiftRequest[]> {
    return await this.userShiftRequestRepo.find({
      relations: {
        user: true,
        eventShift: true,
      },
    });
  }

  async getUserShifts(): Promise<UserShifts[]> {
    return await this.userShiftsRepo.find({
      relations: {
        user: true,
        eventShift: true,
      },
    });
  }
}
