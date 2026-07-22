import { transporter } from "../../lib/mail";

export const mailService = {
  async send(options: {
    to: string;
    subject: string;
    html: string;
  }) {
    await transporter.sendMail({
      from: `"Portfolio" <${process.env.SMTP_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
  },
};