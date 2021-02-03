import {
  Get,
  Param,
  Post,
  Delete,
  Controller,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { from, Observable, of } from 'rxjs';
import { catchError, map, mapTo, mergeAll, mergeMap } from 'rxjs/operators';

import {
  methods,
  handleErrorRequest,
  handleSuccessRequest,
} from 'src/database/gateways/mongodb';
import { googleServiece } from 'src/services';
import { Googleservice } from 'src/services/googleSevices';
import { Image, ImageMessage } from './image.model';
import { ImagesService } from './image.service';

@Controller('image')
export class ImageController {
  constructor(
    private readonly appService: ImagesService,
    private readonly googleService: Googleservice
  ) { }

  @Get()
  getAll(): Observable<Array<Image> | any> {
    return this.appService.getAll().pipe(
      map(res => handleSuccessRequest(res)),
      catchError(err => of(handleErrorRequest(err)))
    )
  }

  @Get(':id')
  getById(@Param() params): Observable<Array<Image> | any> {
    return this.appService.getById(params.id).pipe(
      map(res => handleSuccessRequest(res)),
      catchError(err => of(handleErrorRequest(err)))
    )
  }

  @Delete(':id')
  deleteProduct(@Param() params): Observable<Array<Image> | any> {
    return this.appService.delete(params.id).pipe(
      map(res => handleSuccessRequest(res, methods.DELETE)),
      catchError(err => of(handleErrorRequest(err)))
    )
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', { storage: googleServiece.storage }))
  createProduct(@UploadedFile() file): Observable<Image | any> {
    if (file) {
      return from(this.googleService.uploadFile(file))
        .pipe(
          mergeMap(
            res => this.appService.create(res).pipe(
              map(result => handleSuccessRequest(result)),
              catchError(err => of(handleErrorRequest(err)))
            )
          ),
          catchError(err => of(handleErrorRequest(err)))
        );
    } else {
      return of({ message: ImageMessage.messageRequire })
    }
  }
}
