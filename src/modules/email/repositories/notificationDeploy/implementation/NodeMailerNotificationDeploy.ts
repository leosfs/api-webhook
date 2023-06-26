import nodemailer from 'nodemailer';
import { NotificationDeploySevice } from '../INotificationDeploy';
import transporter from '../../../../../config/email';
import fs from 'fs';
import handlebars from 'handlebars';
import { MessageDeploy } from 'webhook';

export class NodeMailerNotificationDeploy implements NotificationDeploySevice {
    async sendEmail(to:string, dataMessageDeploy:MessageDeploy): Promise<void> {
     
            const templateHtml = fs.readFileSync('src/modules/email/template/notificationDeploy/index.html', 'utf-8');
            const compiledTemplate = handlebars.compile(templateHtml);
        
        
            const html = compiledTemplate(dataMessageDeploy);
        
            const mailOptions = {
                from: 'mob@mob.com',
                to: to,
                subject: `Mob`,
                html: html,
            };
        
            await transporter.sendMail(mailOptions);
           
    }
}