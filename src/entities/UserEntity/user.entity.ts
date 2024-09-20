import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserShiftRequest } from "../UserShiftRequest/userShiftRequest.entity";
import { UserShifts } from "../UserShiftEntity/userShift.entity";


@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;


    @Column({
        nullable: false, default: '',
    })
    name: string;

    @Column({
        nullable: false, default: '',
    })
    email: string;
    @Column({
        nullable: false, default: '',
    })
    phone: string;


    @OneToMany(() => UserShiftRequest, (request) => request.user)
    shiftRequests: UserShiftRequest[];

    @OneToMany(() => UserShifts, (shift) => shift.user)
    userShifts: UserShifts[];
}