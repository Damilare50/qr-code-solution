import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './movie/movie.module';
import { QrCodeModule } from './qr-code/qr-code.module';

@Module({
  imports: [MovieModule, QrCodeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
