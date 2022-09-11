/*
 * User Model
 */
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ default: "User" })
  privilege!: "Student" | "Staff" | "Admin" | "User";

  @Column()
  email?: string;

  @Column()
  password!: string;

  @Column()
  phoneNumber!: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: Date;

  @DeleteDateColumn({ type: "timestamp", nullable: true })
  deleteAt!: Date;
}
