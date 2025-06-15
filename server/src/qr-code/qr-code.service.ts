import { Injectable } from '@nestjs/common';
import { config } from 'node-config-ts';
import * as QRCode from 'qrcode';

@Injectable()
export class QrCodeService {
  async generateQrCode(): Promise<string> {
    const frontendUrl: string = `${config.FE_URL}/movies/random`;
    const qrCode = await QRCode.toDataURL(frontendUrl, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      width: 256,
      margin: 2,
      color: {
        dark: '#1F2937',
        light: '#FFFFFF',
      },
    });

    return qrCode;
  }
}
