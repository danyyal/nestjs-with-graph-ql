import { IsEmail, IsEnum, IsString, IsUUID } from "class-validator";
import { ShiftStatus } from "./userShiftRequest.entity";

export class ShiftRequestCreateDto {
    @IsUUID()
    @IsString()
    userId: string;

    @IsUUID()
    @IsString()
    eventShiftId: string;

    @IsString()
    @IsEnum(
        ShiftStatus,
    )
    status: string;
}

export class ShiftRequestUpdateDto {
    @IsString()
    @IsEnum(
        ShiftStatus,
    )
    status: ShiftStatus;
}