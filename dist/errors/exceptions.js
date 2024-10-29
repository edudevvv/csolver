'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exceptions = void 0;
const winston_1 = require("winston");
class Exceptions {
    constructor() {
        this.logger = (0, winston_1.createLogger)({
            format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json()),
            transports: [
                new winston_1.transports.Console()
            ]
        });
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
exports.Exceptions = Exceptions;
