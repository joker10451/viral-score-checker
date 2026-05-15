import crypto from "crypto";

/**
 * Prodamus Payment Integration
 *
 * Prodamus работает через платёжные формы (payform).
 * Схема:
 * 1. Пользователь нажимает "Upgrade" → редирект на Prodamus payform с параметрами
 * 2. Пользователь оплачивает
 * 3. Prodamus отправляет webhook на наш /api/webhook/prodamus
 * 4. Мы верифицируем подпись и активируем Pro
 *
 * Настройка в Prodamus:
 * - Зарегистрируйся на https://prodamus.ru
 * - Создай платёжную форму
 * - В настройках формы укажи webhook URL: https://your-domain/api/webhook/prodamus
 * - Скопируй секретный ключ для подписи
 */

// Эти значения нужно заменить на реальные из Prodamus
const PRODAMUS_FORM_URL = process.env.NEXT_PUBLIC_PRODAMUS_FORM_URL || "https://your-shop.payform.ru";
const PRODAMUS_SECRET = process.env.PRODAMUS_SECRET || "";

export interface PaymentParams {
  orderId: string;
  customerEmail: string;
  amount: number; // в рублях
  productName: string;
  successUrl: string;
  failUrl: string;
}

/**
 * Генерирует ссылку на оплату через Prodamus payform
 */
export function generatePaymentUrl(params: PaymentParams): string {
  const url = new URL(PRODAMUS_FORM_URL);

  url.searchParams.set("order_id", params.orderId);
  url.searchParams.set("customer_email", params.customerEmail);
  url.searchParams.set("products[0][name]", params.productName);
  url.searchParams.set("products[0][price]", params.amount.toString());
  url.searchParams.set("products[0][quantity]", "1");
  url.searchParams.set("do", "link");
  url.searchParams.set("success_url", params.successUrl);
  url.searchParams.set("fail_url", params.failUrl);

  return url.toString();
}

/**
 * Верифицирует подпись webhook от Prodamus
 * Prodamus подписывает данные HMAC-SHA256 с секретным ключом
 */
export function verifyWebhookSignature(
  body: Record<string, unknown>,
  signature: string
): boolean {
  if (!PRODAMUS_SECRET) return false;

  // Prodamus сортирует ключи и создаёт подпись
  const sortedKeys = Object.keys(body).sort();
  const dataString = sortedKeys
    .map((key) => `${key}=${body[key]}`)
    .join("&");

  const expectedSignature = crypto
    .createHmac("sha256", PRODAMUS_SECRET)
    .update(dataString)
    .digest("hex");

  return signature === expectedSignature;
}

/**
 * Генерирует уникальный order_id
 */
export function generateOrderId(): string {
  return `vsc_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
}
