import { Router, type Request, type Response } from "express";
import Stripe from "stripe";
import { sendOrderNotification } from "../lib/mailer";

const router = Router();

function getStripe(): Stripe | null {
  const key = process.env["STRIPE_SECRET_KEY"];
  if (!key) return null;
  return new Stripe(key, { apiVersion: "2025-02-24.acacia" });
}

// Stripe requires the raw body to verify webhook signatures
router.post("/webhook", async (req: Request, res: Response) => {
  const stripe = getStripe();
  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env["STRIPE_WEBHOOK_SECRET"];

  if (!stripe || !sig || !webhookSecret) {
    console.error("Webhook missing configuration:", { stripe: !!stripe, sig: !!sig, secret: !!webhookSecret });
    res.status(400).send("Webhook Error: Missing configuration");
    return;
  }

  let event: Stripe.Event;

  try {
    // Note: express.raw({type: 'application/json'}) middleware is needed for this route
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(`Webhook Error: ${message}`);
    res.status(400).send(`Webhook Error: ${message}`);
    return;
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    
    const clientEmail = session.customer_details?.email || session.metadata?.clientEmail || "unknown";
    const productName = session.metadata?.productName || "Produit SensEdge";
    const orderNumber = session.metadata?.orderNumber || "SE-UNKNOWN";

    console.log(`Payment confirmed for session ${session.id}. Sending notification...`);

    await sendOrderNotification({
      clientEmail,
      productName,
      orderNumber,
    });
  }

  res.json({ received: true });
});

export default router;
