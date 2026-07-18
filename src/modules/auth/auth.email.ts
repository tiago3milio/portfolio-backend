export function resetPasswordTemplate(resetLink: string) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px;">
      <h2>Recuperação de Palavra-passe</h2>

      <p>Recebemos um pedido para redefinir a tua palavra-passe.</p>

      <p>
        Clica no botão abaixo para continuar:
      </p>

      <a
        href="${resetLink}"
        style="
          display:inline-block;
          padding:12px 20px;
          background:#2563eb;
          color:white;
          text-decoration:none;
          border-radius:8px;
        "
      >
        Redefinir Palavra-passe
      </a>

      <p style="margin-top:20px;">
        Este link expira em <strong>15 minutos</strong>.
      </p>

      <p>
        Se não foste tu que pediste esta alteração, ignora este e-mail.
      </p>
    </div>
  `;
}
