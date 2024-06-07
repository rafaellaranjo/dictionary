/* eslint-disable @typescript-eslint/no-unused-vars */
import nodemailer from 'nodemailer';
import HandlebarsMailTemplate from './HandlebarsMailTemplate';

interface IMailContact {
  name: string;
  email: string;
}

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

interface ISendMAil {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

export default class EtherealMail {
  static async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMAil): Promise<void> {
    const account = await nodemailer.createTestAccount();
    const mailTemplate = new HandlebarsMailTemplate();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const message = await transporter.sendMail({
      to: {
        name: to.name,
        address: to.email,
      },
      from: {
        name: from?.name || 'Equipe Timetable Psycho',
        address: from?.email || 'laranjobinoto@gmail.com',
      },
      subject,
      html: await mailTemplate.parse(templateData),
    });
  }
}
