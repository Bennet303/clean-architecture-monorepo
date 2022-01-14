import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { metaInformation } from '../meta.information';

@Controller('/info')
@ApiTags('info')
export class AppController {
  // https://opensource.zalando.com/restful-api-guidelines/index.html#meta-information

  @Get('/title')
  getTitle(): string {
    return metaInformation.title;
  }

  @Get('/version')
  getVersion(): string {
    return metaInformation.version;
  }

  @Get('description')
  getDescription(): string {
    return metaInformation.description;
  }

  @Get('/x-audience')
  getAudience(): string {
    // https://opensource.zalando.com/restful-api-guidelines/index.html#219
    return metaInformation.audience;
  }
}
