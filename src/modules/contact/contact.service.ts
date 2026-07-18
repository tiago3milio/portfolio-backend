import { transporter } from "@/lib/mail";
import { ContactDTO } from "./contact.schema";

export const contactService = {
  async send(data: ContactDTO) {
    await transporter.sendMail({
      from: `"Portfolio API" <${process.env.SMTP_USER}>`,

      to: process.env.CONTACT_EMAIL,

      replyTo: data.email,

      subject: data.subject,

      html: `
        <h2>Nova mensagem do portfólio</h2>

        <p><strong>Nome:</strong> ${data.name}</p>

        <p><strong>Email:</strong> ${data.email}</p>

        <hr />

        <p>${data.message}</p>
      `,
    });
  },
};