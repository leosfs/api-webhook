
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
        this.usersNotification = ["leonardoferreira.henrique1210@gmail.com", "leonardo.silva@escolamobile.com.br"]
    }

    async sendNotification(dateMessageDeply:MessageDeploy){

      this.usersNotification.map((content:any) => {
        this.notificationNodeMiler.handle(content, dateMessageDeply)
      })
    }

    async execute(commit:string, environment:string, author:string, project:string){
   
    exec(this.command + `/c ${this.pathName}`, async (error: Error, stdout: any, stderr: any) => {
      const date = new Date();
      const options = { timeZone: "America/Sao_Paulo" };
      const brazilDate = date.toLocaleString("en-US", options);

        const data:MessageDeploy = {
          title:"Um novo deploy foi realizado...", 
          commit:commit, 
          date:brazilDate, 
          message:"Deploy finalizado com sucesso!!",
          environment:environment, 
          author:author, 
          project:project
        };

        if (error) {
          console.error(`Erro ao executar o script: ${error}`);
         
          data.message = `Erro ao executar o script: ${error}`;
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


