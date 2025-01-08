import { Injectable } from '@nestjs/common';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Director } from './entity/director.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DirectorService {
    constructor(
        @InjectRepository(Director)
        private readonly directorRepository: Repository<Director>,
    ) {}

    create(createDirectorDto: CreateDirectorDto) {
        return this.directorRepository.save(createDirectorDto);
    }

    findAll() {
        return this.directorRepository.find();
    }

    findOne(id: number) {
        return this.directorRepository.findOne({
            where: { id },
        });
    }

    async update(id: number, updateDirectorDto: UpdateDirectorDto) {
        const director = await this.directorRepository.findOne({
            where: { id },
        });

        if (!director) {
            throw new Error('Director not found');
        }

        await this.directorRepository.update({ id }, { ...updateDirectorDto });

        const newDirector = await this.directorRepository.findOne({
            where: { id },
        });
        return newDirector;
    }

    remove(id: number) {
        return this.directorRepository.delete(id);
    }
}
