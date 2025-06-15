import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('random')
  async getRandomMovies(): Promise<any[]> {
    return this.movieService.getRandomMovies(10);
  }
}
