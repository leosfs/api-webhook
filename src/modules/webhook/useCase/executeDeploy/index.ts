import { WebhookController } from "./WebhookController";
import { WebhookUseCase } from "./WebhookUseCase";

const webhookUseCase = new WebhookUseCase()
const webhookController = new WebhookController(webhookUseCase);


export {webhookController, webhookUseCase }