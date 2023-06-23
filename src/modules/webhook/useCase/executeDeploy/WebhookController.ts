
import { Request, Response } from "express";
import { WebhookUseCase } from "./WebhookUseCase";

export class WebhookController {
    constructor(private webhookUseCase: WebhookUseCase){}

    async handle(request:Request, response:Response){

        const responseWebhook = await this.webhookUseCase.execute();
        return response.status(200).json({ error: false, message:responseWebhook});
    }
}