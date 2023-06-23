
import { NotificationDeploySevice } from "../../repositories/notificationDeploy/INotificationDeploy"

export class NotificationDeployUseCase {

    constructor(private notificationDeployService:NotificationDeploySevice ){}

    async execute(to:string): Promise<void>{
        await this.notificationDeployService.sendEmail(to)
    }
}


