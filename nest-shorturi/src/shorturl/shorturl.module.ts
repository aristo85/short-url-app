import { Module } from '@nestjs/common';
import { ShortUrlService } from './shorturl.service';
import { ShortUrlController } from './shorturl.controller';

@Module({
  providers: [ShortUrlService],
  controllers: [ShortUrlController],
})
export class ShortUrlModule {}
