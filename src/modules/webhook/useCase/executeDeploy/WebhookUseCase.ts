
import { exec } from 'child_process';

export class WebhookUseCase {
    public isWindows: string | undefined | boolean
    public command: string | undefined
    public pathName: string | undefined
    
    constructor(){
        this.isWindows = process.platform === 'win32'
        this.command = this.isWindows ? 'cmd' : 'sh';
        this.pathName = "updateContainer.sh"
    }

    async execute(){

        exec(this.command + `/c ${this.pathName}`, (error, stdout, stderr) => {
      
          if (error) {
            console.error(`Erro ao executar o script: ${error}`);
            // return response.send(`Erro ao executar o script: ${error}`);
          }

          if(stderr){
            console.log(`Erro: ${stderr}`);
            // return response.send(`Erro: ${stderr}`);
          }

          console.log(`Saida do script: ${stdout}`);
        //   return response.send(`Saida do script: ${stdout}`);
      
        });
        return 
    }
}