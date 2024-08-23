import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Comment} from "./entities/comment.entity";
import {Product} from "../products/entities/product.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Product])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
