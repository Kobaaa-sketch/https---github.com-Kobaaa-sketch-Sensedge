import nodemailer from "nodemailer";

export async function sendOrderNotification({
  clientEmail,
  productName,
  orderNumber,
}: {
  clientEmail: string;
  productName: string;
  orderNumber: string;
}) {
  const host = process.env["SMTP_HOST"] || "smtp.gmail.com";
  const port = parseInt(process.env["SMTP_PORT"] || "587");
  const user = process.env["SMTP_USER"];
  const pass = process.env["SMTP_PASS"];

  if (!user || !pass) {
    console.warn("SMTP credentials not configured. Skipping email.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const mailOptions = {
    from: `"SensEdge Store" <${user}>`,
    to: "sensedgeoff@gmail.com",
    subject: `Nouvelle Commande ${orderNumber}`,
    text: `Nouvelle commande reçue !\n\nClient: ${clientEmail}\nProduit: ${productName}\nNuméro de commande: ${orderNumber}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #7c3aed;">Nouvelle Commande ${orderNumber}</h2>
        <p><strong>Client:</strong> ${clientEmail}</p>
        <p><strong>Produit:</strong> ${productName}</p>
        <p><strong>Numéro de commande:</strong> <code style="background: #f4f4f4; padding: 2px 5px; border-radius: 4px;">${orderNumber}</code></p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Notification email sent for ${orderNumber}`);
  } catch (error) {
    console.error("Failed to send notification email:", error);
  }
}
