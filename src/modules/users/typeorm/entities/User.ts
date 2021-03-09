import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  last_name: string

  @Column({ nullable: true })
  id_lol: number

  @Column({ nullable: true })
  id_valorant: number

  @Column()
  email: string

  @Column()
  password: string

  @Column({ nullable: true })
  reputation: number

  @Column()
  birth_date: Date

  @Column()
  genre: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
