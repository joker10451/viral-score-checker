import { NextRequest, NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/prodamus";

/**
 * Webhook endpoint для Prodamus
 *
 * Prodamus отправляет POST запрос сюда после успешной оплаты.
 * URL для настройки в Prodamus: https://your-domain/api/webhook/prodamus
 *
 * Так как у нас нет базы данных, мы используем простую логику:
 * - При успешной оплате возвращаем 200
 * - Клиент проверяет статус через localStorage (order_id)
 *
 * В продакшене: подключить Redis/KV для хранения статусов оплат
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const signature = request.headers.get("x-signature") || "";

    // Верифицируем подпись (если секрет настроен)
    if (process.env.PRODAMUS_SECRET) {
      const isValid = verifyWebhookSignature(body, signature);
      if (!isValid) {
        return NextResponse.json(
          { error: "Invalid signature" },
          { status: 403 }
        );
      }
    }

    const { order_id, payment_status, customer_email } = body;

    if (payment_status === "success") {
      // Оплата успешна
      // В реальном проекте: сохранить в БД/KV что email имеет Pro доступ
      console.log(`✅ Payment success: order=${order_id}, email=${customer_email}`);

      // Можно использовать Cloudflare KV для хранения:
      // await env.PRO_USERS.put(customer_email, JSON.stringify({ orderId: order_id, activatedAt: Date.now() }));
    }

    // Prodamus ожидает 200 OK
    return NextResponse.json({ status: "ok" });
  } catch {
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
