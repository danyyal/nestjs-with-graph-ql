import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserShiftRequest } from "../UserShiftRequest/userShiftRequest.entity";

@Entity()
export class EventShift {
    @PrimaryGeneratedColumn('uuid')
    id: string;


    @Column({
        type: 'timestamptz'
    })
    startTime: Date;

    @Column({
        type: 'timestamptz'
    })
    endTime: Date;

    @Column({
        nullable: false, default: '',
    })
    name: string;


    @OneToMany(() => UserShiftRequest, (userShift) => userShift.eventShift)
    shiftRequests: UserShiftRequest[];
}