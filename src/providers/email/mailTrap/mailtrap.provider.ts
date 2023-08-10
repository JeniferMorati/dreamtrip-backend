import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

import { IMessage } from "./mailtrap.provider.dto";
import { provide } from "inversify-binding-decorators";
import ENV from "env";

enum EmailType {
  Welcome = 0,
  RecoveryPassword,
  ChangePassword,
  CreateUser,
}

@provide(MailTrapProvider)
class MailTrapProvider {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: ENV.Mailtrap.HOST,
      port: ENV.Mailtrap.PORT,
      auth: {
        user: ENV.Mailtrap.USERNAME,
        pass: ENV.Mailtrap.PASSWORD,
      },
    });
  }

  private async MailSender(message: IMessage): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email,
      },
      from: {
        name: message.from.name,
        address: message.from.email,
      },
      subject: message.subject,
      html: message.body,
    });
  }

  public async SendEmail(
    emailType: EmailType,
    userEmail: string,
    userName?: string,
  ): Promise<void> {
    switch (emailType) {
      case EmailType.Welcome:
        break;
      case EmailType.RecoveryPassword:
        break;
      case EmailType.ChangePassword:
        break;
      case EmailType.CreateUser:
        this.MailSender({
          to: {
            name: userName || "User",
            email: userEmail,
          },
          from: {
            name: ENV.Mailtrap.AGENCY_NAME,
            email: ENV.Mailtrap.AGENCY_EMAIL,
          },
          subject: "Your account was created successfully!",
          body: "<h1>Account created successfully!</h1>",
        });
        break;
    }
  }
}

export { MailTrapProvider, EmailType };
