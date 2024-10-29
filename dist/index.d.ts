import { Task } from "./interfaces/task";
import { IResponseTask } from "./interfaces/responseTask";
export declare class CSolver {
    private apiKey;
    private session;
    private exceptions;
    constructor(apiKey: string);
    /**
     * @name checkBalance
     *
     * @description Check the balance of the key.
     * @author pyvd
    */
    private checkBalance;
    /**
     * @name createTask
     *
     * @description Process the task and return the result.
     * @param {Task} task
     * @returns {string | undefined} result
     *
     * @author pyvd
    */
    createTask(task: Task): Promise<IResponseTask | undefined>;
    /**
     * @name getResultTask
     *
     * @description Process the task and return the result.
     * @param {taskId} taskId
     * @returns {string | undefined} result
     *
     * @author pyvd
    */
    getResultTask(taskId: string): Promise<any>;
}
