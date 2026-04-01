import { Router } from "express";
import Stripe from "stripe";

const router = Router();

function getStripe(): Stripe | null {
  const key = process.env["STRIPE_SECRET_KEY"];
  if (!key) return null;
  return new Stripe(key, { apiVersion: "2025-02-24.acacia" });
}

router.post("/checkout/create-session", async (req, res) => {
  const stripe = getStripe();

  if (!stripe) {
    res.status(503).json({
      error: "stripe_not_configured",
      message: "Stripe is not yet configured. Please add your STRIPE_SECRET_KEY.",
    });
    return;
  }

  const { amount, currency = "eur", productName, productId, clientEmail } = req.body as {
    amount: number;
    currency?: string;
    productName: string;
    productId: string;
    clientEmail?: string;
  };

  if (!amount || !productName || !productId) {
    res.status(400).json({ error: "missing_fields", message: "amount, productName and productId are required." });
    return;
  }

  // Generate order number in format SE-XXXX-XXXX
  const orderNumber = `SE-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: productName,
              metadata: { productId, orderNumber },
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: clientEmail,
      success_url: `${process.env["CLIENT_URL"] || "http://localhost:5173"}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env["CLIENT_URL"] || "http://localhost:5173"}/#products`,
      metadata: {
        productName,
        productId,
        orderNumber,
        clientEmail: clientEmail || "unknown",
      },
    });

    res.json({ url: session.url, id: session.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "stripe_error", message });
  }
});

// Route de test pour l'email
router.get("/checkout/test-email", async (req, res) => {
  try {
    const { sendOrderNotification } = await import("../lib/mailer");
    await sendOrderNotification({
      clientEmail: "test-client@example.com",
      productName: "Article de Test SensEdge",
      orderNumber: "SE-TEST-1234",
    });
    res.send("<h1>Email de test envoyé !</h1><p>Vérifiez la boîte mail : sensedgeoff@gmail.com</p>");
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    res.status(500).send(`<h1>Erreur lors de l'envoi</h1><p>${message}</p>`);
  }
});

export default router;

