import { Module } from '@nestjs/common';
import { GuruaiService } from './guruai.service';

@Module({
  controllers: [],
  providers: [GuruaiService],
  exports: [GuruaiService],
})
export class GuruaiModule {}
