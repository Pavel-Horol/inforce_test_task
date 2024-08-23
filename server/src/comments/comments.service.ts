import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Comment} from "./entities/comment.entity";
import {Repository} from "typeorm";
import {Product} from "../products/entities/product.entity";

@Injectable()
export class CommentsService {
  constructor(
      @InjectRepository(Comment)
      private readonly commentRepository: Repository<Comment>,
      @InjectRepository(Product)
      private readonly productRepository: Repository<Product>

  ) {
  }

  async create(createCommentDto: CreateCommentDto) {
    const product = await this.productRepository.findOne({
      where: {id: createCommentDto.productId},
      relations: ['comments']
    })
    const comment = this.commentRepository.create({
      description: createCommentDto.description,
      product
    })
    return await this.commentRepository.save(comment)
  }

  async findAll(productId: number) {
    const product = await this.productRepository.findOne({
      where: {id: productId},
      relations: ['comments']
    })

    return product.comments
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }

}
