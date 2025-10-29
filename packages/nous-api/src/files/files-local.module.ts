import { Module } from '@nestjs/common';
import { FilesLocalController } from './files-local.controller';

@Module({
  controllers: [FilesLocalController],
})
export class FilesLocalModule { }
