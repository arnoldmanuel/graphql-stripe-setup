import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  fullName: string;

  @Column("text", { nullable: true })
  stripeId: string;

  @Column("text", { default: "free-trial" })
  type: string;

  @Column("text")
  email: string;

  @Column("text")
  password: string;
}
