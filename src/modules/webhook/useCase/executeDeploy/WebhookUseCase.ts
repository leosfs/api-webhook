
import { exec } from 'child_process';
import { NotificationController } from '../../../email/useCase/notificationDeploy/NotificationDeployController';
import { Exec, MessageDeploy } from 'webhook';

export class WebhookUseCase {

    public isWindows: string | undefined | boolean
    public command: string | undefined
    public pathName: string | undefined
    public statusShell: Exec
    public usersNotification: string []

    constructor(
      private notificationNodeMiler: NotificationController
    ){
        this.isWindows = process.platform === 'win32'
        this.command = this.isWindows ? 'cmd' : 'sh';
        this.pathName = "updateContainer.sh"
        this.statusShell = { stdout: "", stderr: ""}
        this.usersNotification = ["leonardoferreira.henrique1210@gmail.com"]
    }

    async sendNotification(dateMessageDeply:MessageDeploy){

      this.usersNotification.map((content:any) => {
        this.notificationNodeMiler.handle(content, dateMessageDeply)
      })
    }

    async execute(commit:string, environment:string, author:string){
   
    exec(this.command + `/c ${this.pathName}`, async (error: Error, stdout: any, stderr: any) => {
      
        const data:MessageDeploy = {
          title:"Deploy Realizado com sucesso!", 
          commit:commit, 
          date:Date(), 
          message:"",
          messageTypes:"",
          environment:environment, 
          author:author
        };

        if (error) {
          console.error(`Erro ao executar o script: ${error}`);

          await this.sendNotification(data)
        }

        const response = {
          stdout: stdout,
          stderr: stderr
        }

        console.log(response);
        await this.sendNotification(data)
        this.statusShell = response;
      });

      return await this.statusShell
        
    }
}


