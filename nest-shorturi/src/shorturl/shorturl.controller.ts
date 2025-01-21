import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
  Delete,
} from '@nestjs/common';
import { ShortUrlService } from './shorturl.service';
import { ShortUrlDto } from './dto/shorturl.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('shorturl')
@Controller('')
export class ShortUrlController {
  constructor(private readonly shortUrlService: ShortUrlService) {}

  @ApiOperation({ summary: 'Shorten a URL' })
  @ApiResponse({
    status: 201,
    description: 'The URL has been successfully shortened.',
  })
  @Post('shorten')
  async shortenUrl(@Body() body: ShortUrlDto): Promise<{ shortUrl: string }> {
    const shortUrl = this.shortUrlService.shortenUrl(body.originalUrl);
    return { shortUrl };
  }

  @ApiOperation({ summary: 'Get list of short URLs' })
  @ApiResponse({ status: 200, description: 'Return list of short URLs.' })
  @Get('list')
  async getShortUrls(): Promise<{ shortUrls: string[] }> {
    const shortUrls = this.shortUrlService.getShortUrls();
    return { shortUrls };
  }

  @ApiOperation({ summary: 'Get the original URL' })
  @ApiResponse({ status: 200, description: 'Return the original URL.' })
  @ApiResponse({ status: 404, description: 'URL not found.' })
  @Get(':shortUrl')
  async getOriginalUrl(
    @Param('shortUrl') shortUrl: string,
  ): Promise<{ originalUrl: string }> {
    const originalUrl = this.shortUrlService.getOriginalUrl(shortUrl);
    if (!originalUrl) {
      throw new NotFoundException('URL not found');
    }
    return { originalUrl };
  }

  @ApiOperation({ summary: 'Get information about the short URL' })
  @ApiResponse({
    status: 200,
    description: 'Return information about the short URL.',
  })
  @ApiResponse({ status: 404, description: 'URL not found.' })
  @Get('info/:shortUrl')
  async getUrlInfo(
    @Param('shortUrl') shortUrl: string,
  ): Promise<{ originalUrl: string; createdAt: Date; clickCount: number }> {
    const urlInfo = this.shortUrlService.getUrlInfo(shortUrl);
    if (!urlInfo) {
      throw new NotFoundException('URL not found');
    }
    return urlInfo;
  }

  @ApiOperation({ summary: 'Delete a short URL' })
  @ApiResponse({
    status: 200,
    description: 'The URL has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'URL not found.' })
  @Delete('delete/:shortUrl')
  async deleteShortUrl(
    @Param('shortUrl') shortUrl: string,
  ): Promise<{ message: string }> {
    const deleted = this.shortUrlService.deleteShortUrl(shortUrl);
    if (!deleted) {
      throw new NotFoundException('URL not found');
    }
    return { message: 'URL deleted successfully' };
  }
}
