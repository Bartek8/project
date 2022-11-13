import { Provider } from '@nestjs/common';
import { EmailUniqueCheckerApplicationService } from './email-unique-checker.application-service';

export const applicationServiceIndex: Provider[] = [
  EmailUniqueCheckerApplicationService,
];
