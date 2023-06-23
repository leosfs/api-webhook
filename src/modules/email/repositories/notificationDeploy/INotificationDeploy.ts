
export interface NotificationDeploySevice {
  sendEmail(to:string): Promise<void>;
}