import { Module } from '@nestjs/common';
import { PrismasService } from './prismas.service';

@Module({
  providers: [PrismasService], 
  exports: [PrismasService]
})
export class PrismasModule {}
