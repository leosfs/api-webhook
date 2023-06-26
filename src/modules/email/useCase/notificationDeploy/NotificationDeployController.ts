
import { Request, Response } from "express";
import { NotificationDeployUseCase } from "./NotificationDeployUseCase";
import { MessageDeploy } from "webhook"

export class NotificationController {
    constructor(private notificationDeploy: NotificationDeployUseCase){}

    async handle(to:string, dateMessageDeply:MessageDeploy){
        await this.notificationDeploy.execute(to, dateMessageDeply);
    }
}