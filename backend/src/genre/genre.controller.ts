import { Controller, Get } from '@nestjs/common';
import { GenreService } from './genre.service';

@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  async getAllGenres() {
    return this.genreService.getAllGenres();
  }
}
