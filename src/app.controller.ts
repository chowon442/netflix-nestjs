import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('movie')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getMovies() {
    return [
      {
        id: 1,
        name: '해리포터',
        character: ['해리포터'],
      },
      {
        id: 2,
        name: '반지의 제왕',
        character: ['프로도', '사우론', '간달프'],
      },
    ];
  }

  @Get(':id')
  getMovie() {
    return {
      id: 1,
      name: '해리포터',
      character: ['해리포터', '헤르미온느', '론'],
    }
  }

  @Post()
  postMovie() {
    return {
      id: 3,
      name: '스타워즈',
      character: ['루크', '레이어', '레이'],
    }
  }

  @Patch(':id')
  patchMovie() {
    return {
      id: 1,
      name: '해리포터',
      character: ['해리포터', '헤르미온느', '론', '말포이'],
    }
  }

  @Delete(':id')
  deleteMovie() {
    return 3;
  }
}
