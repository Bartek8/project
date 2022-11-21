import { HttpStatus, Logger } from '@nestjs/common';
import { ProblemDetails } from '@presentation/error-handling/problem-details';

export const handleLogging = (
  logger: Logger,
  status: HttpStatus,
  problemDetails: ProblemDetails,
) => {
  if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
    logger.error(JSON.stringify(problemDetails));
  } else {
    logger.warn(JSON.stringify(problemDetails));
  }
};
