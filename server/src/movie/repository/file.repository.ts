import { Injectable, OnModuleInit } from '@nestjs/common';
import { MovieRepository } from '../interface/movie.repository';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileMovieRepository
  extends MovieRepository
  implements OnModuleInit
{
  private movies: any[];

  onModuleInit() {
    const filePath = path.join(__dirname, '../../../data', 'film.json');
    try {
      const jsonData = fs.readFileSync(filePath, 'utf-8');
      this.movies = JSON.parse(jsonData);
    } catch (error) {
      console.error('Failed to load movie list:', error);
    }
  }

  async getRandomMovies(count: number): Promise<any[]> {
    if (!this.movies || this.movies.length === 0) {
      return [];
    }
    const shuffled = this.movies.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
}
