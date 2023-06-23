
import { exec } from 'child_process';
import { NotificationController } from '../../../email/useCase/notificationDeploy/NotificationDeployController';
import { Exec } from 'webhook';

export class WebhookUseCase {

    public isWindows: string | undefined | boolean
    public command: string | undefined
    public pathName: string | undefined
    public statusShell: Exec

    constructor(
      private notificationNodeMiler: NotificationController
    ){
        this.isWindows = process.platform === 'win32'
        this.command = this.isWindows ? 'cmd' : 'sh';
        this.pathName = "updateContainer.sh"
        this.statusShell = { stdout: "", stderr: ""}
    }

    async execute(){
   
    exec(this.command + `/c ${this.pathName}`, async (error: Error, stdout: any, stderr: any) => {

        if (error) {
          console.error(`Erro ao executar o script: ${error}`);
          // this.notificationNodeMiler.handle("leonardoferreira.henrique1210@gmail.com")
        }

        const response = {
          stdout: stdout,
          stderr: stderr
        }

        console.log(response);
        // await this.notificationNodeMiler.handle("leonardoferreira.henrique1210@gmail.com")
        this.statusShell = response;
      });

      return await this.statusShell
        
    }
}


