import { NodeMailerNotificationDeploy } from "../../repositories/notificationDeploy/implementation/NodeMailerNotificationDeploy"
import { NotificationDeployUseCase } from "./NotificationDeployUseCase"
import { NotificationController } from "./NotificationDeployController";

const nodemailer = new NodeMailerNotificationDeploy()

const notificationUseCase = new NotificationDeployUseCase(nodemailer);

const notificationController = new NotificationController(notificationUseCase);

export { notificationUseCase, notificationController }