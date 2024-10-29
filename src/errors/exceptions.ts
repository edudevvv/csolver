'use strict';

import { createLogger, format, Logger, transports } from "winston";

export class Exceptions {
    private logger: Logger;

    constructor() {
        this.logger = createLogger({
            format: format.combine(
                format.timestamp(),
                format.json()
            ),
            transports: [
                new transports.Console()
            ]
        })
    }

    badRequest() {
        return this.logger.error("The request could not be processed due to invalid input, or something else.") && process.exit();
    }

    failedTask() {
        return this.logger.error("Failed to process the task.") && process.exit();
    }
    taskInMaintance() {
        return this.logger.error("The task is currently in maintenance.") && process.exit();
    }

    noSolution() {
        return this.logger.error("No solution found for the given task.") && process.exit();
    }
    noBalance() {
        return this.logger.error("The API key has insufficient balance to process the request.") && process.exit();
    }
    noToken() {
        return this.logger.error("No reCaptcha token was found in the response.") && process.exit();
    }
}