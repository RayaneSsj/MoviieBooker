import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation, ReservationDocument } from './reservation.schema';

@Injectable()
export class ReservationService {
  constructor(@InjectModel(Reservation.name) private reservationModel: Model<ReservationDocument>) {}

  async create(userId: string, movieId: string, movieTitle: string, startTime: Date): Promise<Reservation> {
    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + 2); 

    const conflict = await this.reservationModel.findOne({
      userId,
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } }, 
      ],
    });

    if (conflict) {
      throw new ConflictException('Vous avez déjà une réservation sur ce créneau.');
    }

    const reservation = new this.reservationModel({ userId, movieId, movieTitle, startTime, endTime });
    return reservation.save();
  }

  async findAll(userId: string): Promise<Reservation[]> {
    return this.reservationModel.find({ userId }).exec();
  }

  async delete(id: string, userId: string): Promise<void> {
    const reservation = await this.reservationModel.findOne({ _id: id, userId });

    if (!reservation) {
      throw new NotFoundException('Réservation introuvable ou non autorisée.');
    }

    await this.reservationModel.deleteOne({ _id: id });
  }
}
