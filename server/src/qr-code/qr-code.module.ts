import { Module } from '@nestjs/common';
import { QrCodeController } from './qr-code.controller';
import { QrCodeService } from './qr-code.service';

@Module({
  controllers: [QrCodeController],
  providers: [QrCodeService]
})
export class QrCodeModule {}
