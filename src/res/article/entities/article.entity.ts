import { ApiProperty } from '@nestjs/swagger';

export class Article {
    @ApiProperty({ description: 'title' })
    title?: String;
}
