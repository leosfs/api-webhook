
import { Request, Response } from "express";
import { WebhookUseCase } from "./WebhookUseCase";

export class WebhookController {
    constructor(private webhookUseCase: WebhookUseCase){}

    async handle(request:Request, response:Response){
        const {commit, environment, author, project, commands} = request.body

        const responseWebhook = await this.webhookUseCase.execute(commit, environment, author, project, commands);
        return response.status(200).json({ error: false, message:responseWebhook});
    }
}