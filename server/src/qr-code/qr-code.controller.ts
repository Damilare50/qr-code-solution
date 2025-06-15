import { Controller, Get } from '@nestjs/common';
import { QrCodeService } from './qr-code.service';

@Controller('qr-code')
export class QrCodeController {
  constructor(private readonly qrCodeService: QrCodeService) {}

  @Get('generate')
  async generateQrCode(): Promise<string> {
    return this.qrCodeService.generateQrCode();
  }
}
