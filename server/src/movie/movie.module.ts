import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MovieRepository } from './interface/movie.repository';
import { FileMovieRepository } from './repository/file.repository';

@Module({
  providers: [
    MovieService,
    {
      provide: MovieRepository,
      useClass: FileMovieRepository,
    },
  ],
  controllers: [MovieController],
})
export class MovieModule {}
