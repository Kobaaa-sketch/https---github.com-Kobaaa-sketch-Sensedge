import express, { Router, type Request, type Response } from "express";
import serverless from "serverless-http";
import Stripe from "stripe";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
const router = Router();

// Helper to get Stripe instance
function getStripe() {
  const key = process.env["STRIPE_SECRET_KEY"];
  if (!key) return null;
  return new Stripe(key, { apiVersion: "2025-02-24.acacia" } as any);
}

// Mailer logic
async function sendOrderNotification({
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

  await transporter.sendMail(mailOptions);
}

// --- Routes ---

// 1. Create Checkout Session
router.post("/checkout/create-session", async (req: Request, res: Response) => {
  const stripe = getStripe();
  if (!stripe) return res.status(503).json({ error: "stripe_not_configured" });

  const { amount, currency = "eur", productName, productId, clientEmail } = req.body;

  const orderNumber = `SE-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{
        price_data: {
          currency,
          product_data: { name: productName, metadata: { productId, orderNumber } },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      }],
      mode: "payment",
      customer_email: clientEmail,
      success_url: `${process.env["URL"] || "http://localhost:5173"}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env["URL"] || "http://localhost:5173"}/#products`,
      metadata: { productName, productId, orderNumber, clientEmail: clientEmail || "unknown" },
    });

    res.json({ url: session.url, id: session.id });
  } catch (err: any) {
    res.status(500).json({ error: "stripe_error", message: err.message });
  }
});

// 2. Webhook
router.post("/webhook", express.raw({ type: "application/json" }), async (req: Request, res: Response) => {
  const stripe = getStripe();
  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env["STRIPE_WEBHOOK_SECRET"];

  if (!stripe || !sig || !webhookSecret) return res.status(400).send("Webhook Error: Missing configuration");

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig as string, webhookSecret);
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const clientEmail = session.customer_details?.email || (session.metadata as any)?.clientEmail || "unknown";
    const productName = (session.metadata as any)?.productName || "Produit SensEdge";
    const orderNumber = (session.metadata as any)?.orderNumber || "SE-UNKNOWN";

    await sendOrderNotification({ clientEmail, productName, orderNumber });
  }

  res.json({ received: true });
});

// 3. Test Email
router.get("/checkout/test-email", async (req, res) => {
  try {
    await sendOrderNotification({
      clientEmail: "test-client@example.com",
      productName: "Article de Test SensEdge (Netlify)",
      orderNumber: "SE-TEST-NETLIFY",
    });
    res.send("<h1>Email de test envoyé via Netlify !</h1>");
  } catch (err: any) {
    res.status(500).send(`<h1>Erreur</h1><p>${err.message}</p>`);
  }
});

app.use(cors());
app.use(express.json());
app.use("/api", router);

export const handler = serverless(app);
