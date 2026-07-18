import { transporter } from "@/lib/mail";
import { ContactDTO } from "./contact.schema";
import { mailService } from "@/src/services/mail.service";

export const contactService = {
  async send(data: ContactDTO) {
    await mailService.send({
      to: String(process.env.CONTACT_EMAIL),
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
