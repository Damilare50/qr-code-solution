import { Injectable, OnModuleInit } from '@nestjs/common';
import { MovieRepository } from './interface/movie.repository';

@Injectable()
export class MovieService {
  constructor(private readonly movieRepository: MovieRepository) {}

  async getRandomMovies(count: number = 10): Promise<any[]> {
    return this.movieRepository.getRandomMovies(count);
  }
}
