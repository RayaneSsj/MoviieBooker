import { Controller, Get, Post, Delete, Body, Param, Query, BadRequestException } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ApiTags, ApiOperation, ApiBody, ApiQuery, ApiParam } from '@nestjs/swagger';

@ApiTags('Reservations')
@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une réservation' })
  @ApiBody({ schema: { example: { userId: '67a1fc92373b00ef8d80d8c6', movieId: '456', movieTitle: 'Inception', startTime: '2025-02-06T14:00:00.000Z' } } })
  async create(@Body() body) {
    const { userId, movieId, movieTitle, startTime } = body;
    if (!userId || !movieId || !startTime) {
      throw new BadRequestException('Tous les champs (userId, movieId, startTime) sont requis.');
    }
    return this.reservationService.create(userId, movieId, movieTitle, new Date(startTime));
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les réservations de l’utilisateur' })
  @ApiQuery({ name: 'userId', required: true, example: '67a1fc92373b00ef8d80d8c6', description: 'ID de l’utilisateur' })
  async findAll(@Query('userId') userId: string) {
    return this.reservationService.findAll(userId);
  }
  
  @Delete(':id')
  @ApiOperation({ summary: 'Annuler une réservation' })
  @ApiParam({ name: 'id', required: true, example: '654321', description: 'ID de la réservation' })
  @ApiQuery({ name: 'userId', required: true, example: '67a1fc92373b00ef8d80d8c6', description: 'ID de l’utilisateur' })
  async delete(@Param('id') id: string, @Query('userId') userId: string) {
    return this.reservationService.delete(id, userId);
  }
}
