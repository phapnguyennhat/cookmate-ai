import { Body, Controller, Post } from '@nestjs/common';
import { GuruaiService } from './guruai.service';
import { QueryPromptDto } from '../openai/dto/QueryPrompt.dto';

@Controller('guruai')
export class GuruaiController {
  constructor(private readonly guruaiService: GuruaiService) {}

  @Post('gen-image')
  generateImage (@Body() {prompt}: QueryPromptDto){
    return this.guruaiService.generateImage(prompt)
  }
}
