export abstract class MovieRepository {
  abstract getRandomMovies(count: number): Promise<any[]>;
}
