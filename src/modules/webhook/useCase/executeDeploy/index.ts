import { WebhookController } from "./WebhookController";
import { WebhookUseCase } from "./WebhookUseCase";
import { notificationController } from "../../../email/useCase/notificationDeploy"

const webhookUseCase = new WebhookUseCase(notificationController)
const webhookController = new WebhookController(webhookUseCase);


export {webhookController, webhookUseCase }