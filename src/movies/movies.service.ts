import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MoviesService {
  private readonly baseUrl: string = 'https://api.themoviedb.org/3';
  private readonly apiKey: string = '6006bd49d2c32c29c03b2cbe4d7889a2'; //Pareil pour la base de l'url et la clé d'api je suis obligé de les mettre en dur car mon fichier .env n'est pas lu je ne sais pas pourquoi

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getNowPlaying(page = 1) {
    const url = `${this.baseUrl}/movie/now_playing?api_key=${this.apiKey}&page=${page}`;
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }

  async searchMovie(query: string, page = 1) {
    const url = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${query}&page=${page}`;
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }

  async getMovieDetails(movieId: number) {
    const url = `${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}`;
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }

  async getMovieGenres() {
    const url = `${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}`;
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }
}
