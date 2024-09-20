import { IsDateString, IsEmail, IsString } from "class-validator";

export class EventShiftCreateDto {
    @IsDateString()
    startTime: string;
    @IsDateString()
    endTime: string;
    @IsString()
    name: string;
}