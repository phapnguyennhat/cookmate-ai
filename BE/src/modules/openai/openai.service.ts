import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { OPEN_MODEL_AI, OPENAI_BASE_URL } from 'src/common/constant';

@Injectable()
export class OpenaiService {
  private openAI: OpenAI;
  constructor(private readonly configService: ConfigService) {
    this.openAI = new OpenAI({
      baseURL: OPENAI_BASE_URL,
      apiKey:  configService.get('OPENROUTER_API_KEY') ,
    });
  }

  async askAI (prompt: string){
    const completion  = await this.openAI.chat.completions.create({
      model: OPEN_MODEL_AI,
      messages: [
        { role: "user", content: prompt }
      ],
      response_format: {type: 'json_object'}
    })
  
    return completion.choices[0].message.content
  }
}
