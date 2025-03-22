import { Module } from '@nestjs/common';
import { GuruaiService } from './guruai.service';
import { GuruaiController } from './guruai.controller';

@Module({
  controllers: [GuruaiController],
  providers: [GuruaiService],
})
export class GuruaiModule {}
