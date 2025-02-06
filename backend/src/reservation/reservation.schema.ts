import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReservationDocument = Reservation & Document;

@Schema()
export class Reservation {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  movieId: string;

  @Prop({ required: true })
  movieTitle: string;

  @Prop({ required: true })
  startTime: Date;

  @Prop({ required: true })
  endTime: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
