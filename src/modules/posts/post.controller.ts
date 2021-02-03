import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { handleErrorRequest, handleSuccessRequest, methods } from 'src/database/gateways/mongodb';

import { Post as PostModel } from './post.model';
import { PostsService } from './post.service';

@Controller('post')
export class PostsController {
  constructor(private readonly appService: PostsService) { }

  @Get()
  getAll(): Observable<Array<PostModel> | any> {
    return this.appService.getAll().pipe(
      map(res => handleSuccessRequest(res)),
      catchError(err => of(handleErrorRequest(err)))
    )
  }

  @Get(':id')
  getById(@Param() params): Observable<Array<PostModel> | any> {
    return this.appService.getById(params.id).pipe(
      map(res => handleSuccessRequest(res)),
      catchError(err => of(handleErrorRequest(err)))
    )
  }

  @Delete(':id')
  deletePost(@Param() params): Observable<Array<PostModel> | any> {
    return this.appService.delete(params.id).pipe(
      map(res => handleSuccessRequest(res, methods.DELETE)),
      catchError(err => of(handleErrorRequest(err)))
    )
  }

  @Post()
  createPost(@Body() Post): Observable<PostModel | any> {
    return this.appService.create(Post).pipe(
      map(res => handleSuccessRequest(res)),
      catchError(err => of(handleErrorRequest(err)))
    )
  }
}
