import { Controller, Get, Param, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { ApiTags, ApiOperation, ApiQuery, ApiParam } from '@nestjs/swagger';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('now_playing')
  @ApiOperation({ summary: 'Récupère les films en salle actuellement' })
  @ApiQuery({ name: 'page', required: false, example: 1, description: 'Numéro de page' })
  async getNowPlaying(@Query('page') page?: number) {
    return this.moviesService.getNowPlaying(page);
  }

  @Get('search')
  @ApiOperation({ summary: 'Rechercher un film par titre' })
  @ApiQuery({ name: 'query', required: true, example: 'Batman', description: 'Nom du film' })
  @ApiQuery({ name: 'page', required: false, example: 1, description: 'Numéro de page' })
  async searchMovie(@Query('query') query: string, @Query('page') page?: number) {
    return this.moviesService.searchMovie(query, page);
  }

  @Get(':movieId')
  @ApiOperation({ summary: 'Obtenir les détails d’un film spécifique' })
  @ApiParam({ name: 'movieId', required: true, example: 550, description: 'ID du film' })
  async getMovieDetails(@Param('movieId') movieId: number) {
    return this.moviesService.getMovieDetails(movieId);
  }
  @Get('genre/movie/list')
  @ApiOperation({ summary: 'Obtenir la liste des genres de films' })
  async getMovieGenres() {
    return this.moviesService.getMovieGenres();
  }
}
