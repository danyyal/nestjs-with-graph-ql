import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserShiftRequest } from "../UserShiftRequest/userShiftRequest.entity";
import { EventShift } from "../EventShiftEntity/eventShift.entity";
import { User } from "../UserEntity/user.entity";


@Entity()
export class UserShifts {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    createTime: Date;

    @ManyToOne(() => User, (user) => user.userShifts)
    user: User;

    @ManyToOne(() => EventShift, (eventShift) => eventShift.shiftRequests)
    eventShift: EventShift;
}
