import { Body, Controller, Get, HttpException, HttpStatus, Inject, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDto } from 'src/entities/UserEntity/UserCreateDto';
import { User } from 'src/entities/UserEntity/user.entity';
import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { EventShiftCreateDto } from 'src/entities/EventShiftEntity/eventShiftCreateDto';
import { ShiftRequestCreateDto, ShiftRequestUpdateDto } from 'src/entities/UserShiftRequest/userShiftRequestCreateDto';

@Controller('app')
export class UserController {
    constructor(
        private user: UserService,

    ) { }

    // USER CONTROLLER
    @Post('users/create')
    async createUser(@Body() body: UserCreateDto) {
        try {
            return await this.user.createUser(body);
        } catch (error) {
            throw new Error(error?.message ?? "Error while creating user")

        }

    }
    @Get('users')
    async getAllUsers() {
        try {
            return await this.user.getUsers();
        } catch (error) {
            throw new Error(error?.message ?? "Error while fetching user")

        }
    }


    // EventSHIFT CONTROLLER
    @Post('shift/create')
    async createEventShift(@Body() body: EventShiftCreateDto) {
        try {
            return await this.user.createEventShift(body);
        } catch (error) {
            throw new Error(error?.message ?? "Error while creating user")

        }

    }

    @Get('shifts')
    async getAllEventShifts() {
        try {
            return await this.user.getEventShifts();
        } catch (error) {
            throw new Error(error?.message ?? "Error while fetching user")

        }
    }




    // Shift Request CONTROLLER
    @Post('request/create')
    async createShiftRequest(@Body() body: ShiftRequestCreateDto) {
        try {
            return await this.user.createShiftRequest(body);
        } catch (error) {
            throw new HttpException(
                error?.message ?? 'Error while creating request',
                error?.status || HttpStatus.BAD_REQUEST
            );

        }

    }

    @Get('requests')
    async getAllShiftRequests() {
        try {
            return await this.user.getShiftRequests();
        } catch (error) {
            throw new Error(error?.message ?? "Error while fetching user")

        }
    }

    @Patch('request/:id')
    async toggleShiftRequest(@Param('id') id: string, @Body() body: ShiftRequestUpdateDto) {
        try {
            return await this.user.toggleRequestStatus(id, body);
        } catch (error) {
            throw new HttpException(
                error?.message ?? 'Error while updating user shift request',
                error?.status || HttpStatus.BAD_REQUEST
            );

        }

    }

    @Get('user-shifts')
    async getAllUserShifts() {
        try {
            return await this.user.getUserShifts();
        } catch (error) {
            throw new Error(error?.message ?? "Error while fetching user")

        }
    }

}
