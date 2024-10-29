"use strict";

import axios, { Axios } from "axios";
import { Exceptions } from "./errors/exceptions";

import { Task } from "./interfaces/task";
import { IResponseTask } from "./interfaces/responseTask";

export class CSolver {
    private session: Axios;
    private exceptions: Exceptions;

    constructor(
        private apiKey: string
    ) {
        this.session = axios.create({
            baseURL: "https://api.csolver.xyz/",
            headers: {
                "API-Key": this.apiKey,
                "Content-Type": "application/json"
            }
        });

        this.exceptions = new Exceptions();
        this.checkBalance();
    }

    /**
     * @name checkBalance
     * 
     * @description Check the balance of the key.
     * @author pyvd
    */
    private async checkBalance() {
        try {
            const { data: responseData } = await this.session.post("getbal", { api_key: this.apiKey });

            if (responseData['bal'] < 0.0005) return this.exceptions.noBalance();
        } catch (error: unknown) {
            return this.exceptions.badRequest();
        }
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
    public async createTask(task: Task): Promise<IResponseTask | undefined> {

        switch (task["type"]) {
            case "hCaptcha": {
                const { siteKey, siteUrl, proxy, rqData } = task.payload;
                const { data: responseTask } = await this.session.post("solve", { task: task['type'], sitekey: siteKey, site: siteUrl, proxy, "rqdata": rqData });

                if (responseTask["message"] && responseTask["message"] === "Task is being processed") return responseTask;
                else return this.exceptions.badRequest();
            }

            case "reCaptcha V3": return this.exceptions.taskInMaintance();
            default: return this.exceptions.badRequest();
        }
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
    public async getResultTask(taskId: string) {
        try {
            while (true) {
                const { data: respTaskWhile } = await this.session.get("result/" + taskId);

                if (respTaskWhile["status"] === "failed") return this.exceptions.failedTask();
                if (respTaskWhile["status"] === "completed") return respTaskWhile["solution"];

                continue;
            }
        } catch (error: unknown) {
            return this.exceptions.badRequest();
        }
    }
}