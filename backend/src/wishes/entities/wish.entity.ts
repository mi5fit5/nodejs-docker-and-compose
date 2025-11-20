import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsInt, IsNumber, IsString, IsUrl, Length, Min } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Offer } from '../../offers/entities/offer.entity';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ length: 250 })
  @IsString()
  @Length(2, 250)
  name: string;

  @Column()
  @IsUrl()
  link: string;

  @Column()
  @IsUrl()
  image: string;

  @Column('numeric', { precision: 10, scale: 2 })
  @IsNumber()
  @Min(1)
  price: number;

  @Column('numeric', { precision: 10, scale: 2, default: 0 })
  @IsNumber()
  @Min(1)
  raised: number;

  @Column({ length: 1024 })
  @IsString()
  @Length(1, 1024)
  description: string;

  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];

  @ManyToMany(() => Wishlist, (offer) => offer.items)
  wishlists: Wishlist[];

  @Column({ type: 'int', default: 0 })
  @IsInt()
  @Min(0)
  copied: number;
}
