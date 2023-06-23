import nodemailer from 'nodemailer';
import { NotificationDeploySevice } from '../INotificationDeploy';
import transporter from '../../../../../config/email';
import fs from 'fs';
import handlebars from 'handlebars';

export class NodeMailerNotificationDeploy implements NotificationDeploySevice {
    async sendEmail(to:string): Promise<void> {
     
            const templateHtml = fs.readFileSync('src/modules/email/template/notificationDeploy/index.html', 'utf-8');
            const compiledTemplate = handlebars.compile(templateHtml);
        
            const data = {
                title: `Deploy Realizado com sucesso`,
            };
        
            const html = compiledTemplate(data);
        
            const mailOptions = {
                from: 'mob@mob.com',
                to: to,
                subject: `Mob`,
                html: html,
            };
        
            await transporter.sendMail(mailOptions);
           
    }
}