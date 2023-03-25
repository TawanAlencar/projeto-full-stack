import { hashSync } from "bcryptjs";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  OneToMany,
  UpdateDateColumn,
} from "typeorm";
import { Contacts } from "./contacts.entities";


@Entity("user")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({select:false})
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  hash() {
    this.password = hashSync(this.password, 10);
  }

  @OneToMany(() => Contacts, (contacts) => contacts.user)
  contacts: Contacts[];
}
