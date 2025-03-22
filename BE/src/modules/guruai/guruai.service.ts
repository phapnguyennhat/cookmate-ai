import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { GURU_MODEL_AI, GURUAI_BASE_URL } from 'src/common/constant';

@Injectable()
export class GuruaiService {
  constructor(private readonly configService: ConfigService){}
  async generateImage(prompt: string) {
    const result = await axios.post(GURUAI_BASE_URL+'/api/generate-image',
      {
          width: 1024,
          height: 1024,
          input: prompt,
          model: 'sdxl',//'flux'
          aspectRatio:"1:1"//Applicable to Flux model only
      },
      {
        headers: {
              'x-api-key': this.configService.get('GURUAI_API_KEY'), // Your API Key
              'Content-Type': 'application/json', // Content Type
          },
      })
      return {url: result.data.image}
  }
}
