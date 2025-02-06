import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(
      process.env.MONGO_URI || 
      'mongodb+srv://rayanerostane91270:mdpnestjs@cluster0.hpyzx.mongodb.net/'
    ), //Je met le lien en dur car nestJS n'arriver pas à trouver mon fichier .env et je ne voulais pas perdre de temps dessus    
    AuthModule, MoviesModule, ReservationModule,
  ],
})
export class AppModule {}
