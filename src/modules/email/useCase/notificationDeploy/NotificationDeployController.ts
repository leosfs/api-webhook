
import { Request, Response } from "express";
import { NotificationDeployUseCase } from "./NotificationDeployUseCase";

export class NotificationController {
    constructor(private notificationDeploy: NotificationDeployUseCase){}

    async handle(to:string){
        await this.notificationDeploy.execute(to);
    }
}