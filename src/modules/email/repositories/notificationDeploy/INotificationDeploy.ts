import { MessageDeploy } from "webhook";

export interface NotificationDeploySevice {
  sendEmail(to:string, dataMessageDeploy:MessageDeploy): Promise<void>;
}