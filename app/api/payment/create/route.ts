import { NextRequest, NextResponse } from "next/server";
import { generatePaymentUrl, generateOrderId } from "@/lib/prodamus";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, plan } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const plans: Record<string, { amount: number; name: string }> = {
      pro: { amount: 490, name: "Viral Score Checker — Pro (1 месяц)" },
      team: { amount: 1490, name: "Viral Score Checker — Team (1 месяц)" },
    };

    const selectedPlan = plans[plan] || plans.pro;
    const orderId = generateOrderId();
    const origin = request.headers.get("origin") || "https://viral-score-checker.pages.dev";

    const paymentUrl = generatePaymentUrl({
      orderId,
      customerEmail: email,
      amount: selectedPlan.amount,
      productName: selectedPlan.name,
      successUrl: `${origin}?payment=success&order=${orderId}`,
      failUrl: `${origin}?payment=failed`,
    });

    return NextResponse.json({ url: paymentUrl, orderId });
  } catch {
    return NextResponse.json(
      { error: "Failed to create payment" },
      { status: 500 }
    );
  }
}
