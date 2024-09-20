import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../UserEntity/user.entity";
import { EventShift } from "../EventShiftEntity/eventShift.entity";

export enum ShiftStatus {
    UNSCHEDULED = 'UNSCHEDULED',
    SCHEDULED = 'SCHEDULED'
}
@Entity()
export class UserShiftRequest {
    @PrimaryGeneratedColumn('uuid')
    id: string;


    @CreateDateColumn()
    createTime: Date;

    @Column({
        type: 'enum',
        enum: ShiftStatus,
        default: ShiftStatus.UNSCHEDULED
    })
    status: ShiftStatus;

    @ManyToOne(() => User, (user) => user.shiftRequests)
    user: User;

    @ManyToOne(() => EventShift, (eventShift) => eventShift.shiftRequests)
    eventShift: EventShift;
}