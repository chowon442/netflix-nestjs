import { Version } from "@nestjs/common";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { BaseTable } from "../../common/entity/base-table.entity";
import { MovieDetail } from "./movie-detail.entity";
import { Director } from "src/director/entity/director.entity";

/// N-1. Director -> 감독은 여러 개의 영화를 만들 수 있음.
/// 1-1. Movie Detail -> 영화는 하나의 상세 내용을 가질 수 있음.
/// N-N. Genre -> 영화는 여러 개의 장르를 가질 수 있고, 장르는 여러 개의 영화에 속할 수 있음.

@Entity()
export class Movie extends BaseTable {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    genre: string;

    @OneToOne(
        () => MovieDetail,
        movieDeatail => movieDeatail.id,
        {
            cascade: true,
        }
    )
    @JoinColumn()
    detail: MovieDetail;

    @ManyToOne(
        () => Director,
        director => director.id,
    )
    director: Director;
}