"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSolver = void 0;
const axios_1 = __importDefault(require("axios"));
const exceptions_1 = require("./errors/exceptions");
class CSolver {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.session = axios_1.default.create({
            baseURL: "https://api.csolver.xyz/",
            headers: {
                "API-Key": this.apiKey,
                "Content-Type": "application/json"
            }
        });
        this.exceptions = new exceptions_1.Exceptions();
        this.checkBalance();
    }
    /**
     * @name checkBalance
     *
     * @description Check the balance of the key.
     * @author pyvd
    */
    checkBalance() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data: responseData } = yield this.session.post("getbal", { api_key: this.apiKey });
                if (responseData['bal'] < 0.0005)
                    return this.exceptions.noBalance();
            }
            catch (error) {
                return this.exceptions.badRequest();
            }
        });
    }
    /**
     * @name createTask
     *
     * @description Process the task and return the result.
     * @param {Task} task
     * @returns {string | undefined} result
     *
     * @author pyvd
    */
    createTask(task) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (task["type"]) {
                case "hCaptcha": {
                    const { siteKey, siteUrl, proxy, rqData } = task.payload;
                    const { data: responseTask } = yield this.session.post("solve", { task: task['type'], sitekey: siteKey, site: siteUrl, proxy, "rqdata": rqData });
                    if (responseTask["message"] && responseTask["message"] === "Task is being processed")
                        return responseTask;
                    else
                        return this.exceptions.badRequest();
                }
                case "reCaptcha V3": return this.exceptions.taskInMaintance();
                default: return this.exceptions.badRequest();
            }
        });
    }
    /**
     * @name getResultTask
     *
     * @description Process the task and return the result.
     * @param {taskId} taskId
     * @returns {string | undefined} result
     *
     * @author pyvd
    */
    getResultTask(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                while (true) {
                    const { data: respTaskWhile } = yield this.session.get("result/" + taskId);
                    if (respTaskWhile["status"] === "failed")
                        return this.exceptions.failedTask();
                    if (respTaskWhile["status"] === "completed")
                        return respTaskWhile["solution"];
                    continue;
                }
            }
            catch (error) {
                return this.exceptions.badRequest();
            }
        });
    }
}
exports.CSolver = CSolver;
