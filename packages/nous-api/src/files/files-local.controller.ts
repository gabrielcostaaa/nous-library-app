import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { randomUUID } from 'crypto';
import * as path from 'node:path';

@Controller('nous-files-local')
export class FilesLocalController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: path.resolve(process.cwd(), 'uploads/books'),
        filename: (_, file, cb) => {
          const ext = path.extname(file.originalname);
          cb(null, `${randomUUID()}${ext}`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  upload(@UploadedFile() file: Express.Multer.File) {
    const publicBase = process.env.LOCAL_PUBLIC_BASE_URL || 'http://localhost:3000/static';
    const fileUrl = `${publicBase}/books/${file.filename}`;
    return { fileUrl };
  }
}
