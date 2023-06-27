
import { exec } from 'child_process';
import { NotificationController } from '../../../email/useCase/notificationDeploy/NotificationDeployController';
import { Exec, MessageDeploy } from 'webhook';

export class WebhookUseCase {

    public isWindows: string | undefined | boolean
    public command: string | undefined | string | any
    public winCommand: string[] | undefined
    public shCommand: string[] | undefined
    public soCommand: string | undefined
    public pathName: string | undefined
    public statusShell: Exec
    public usersNotification: string []

    constructor(
      private notificationNodeMiler: NotificationController
    ){
        this.isWindows = process.platform === 'win32'
        this.soCommand = this.isWindows ? 'cmd' : 'sh';
        this.pathName = __dirname
        this.winCommand = ["docker ps", "echo 'teste win'"]
        this.shCommand = ["docker ps", "echo 'teste sh'"]
        this.command = this.soCommand == "cmd" ? this.winCommand.join(" ; ")  : this.shCommand.join(" && ")
        this.statusShell = { stdout: "", stderr: ""}
        this.usersNotification = ["leonardoferreira.henrique1210@gmail.com", "leonardo.silva@escolamobile.com.br"]
    }

    async sendNotification(dateMessageDeply:MessageDeploy){
      this.usersNotification.map((content:any) => {
        this.notificationNodeMiler.handle(content, dateMessageDeply)
      })
    }
    

    async execute(commit:string, environment:string, author:string, project:string){
    console.log(this.command)
    
    exec(this.command, { cwd: this.pathName }, async (error: Error, stdout: any, stderr: any) => {
      
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


