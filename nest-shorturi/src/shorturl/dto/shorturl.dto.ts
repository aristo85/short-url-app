import { IsNotEmpty } from "class-validator";
import { IsUrl } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class ShortUrlDto {
    @ApiProperty({
        description: 'The original URL to be shortened.',
        example: 'https://example.com',
        required: true,
    })
    @IsNotEmpty()
    @IsUrl({ protocols: ['http', 'https'], require_protocol: true })
    readonly originalUrl: string;
}