import { Router } from "express"
import { webhookController } from "./useCase/executeDeploy";

const webhook = Router()

webhook.post(
  '/api/webhook',
  (request, response) => {
    return webhookController.handle(request, response);
  },
);

export { webhook }