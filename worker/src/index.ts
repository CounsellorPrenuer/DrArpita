
export interface Env {
    RAZORPAY_KEY_ID: string;
    RAZORPAY_KEY_SECRET: string;
    RAZORPAY_WEBHOOK_SECRET: string;
}

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        const corsHeaders = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        };

        if (request.method === "OPTIONS") {
            return new Response(null, { headers: corsHeaders });
        }

        const url = new URL(request.url);

        if (request.method === "POST" && url.pathname === "/api/create-order") {
            try {
                const { amount, currency, receipt, couponCode } = await request.json() as any;

                let finalAmount = amount;
                let discount = 0;

                // Simple Coupon Logic (Can be expanded or fetched from KV)
                // Example: "WELCOME500" gives 500 flat off
                if (couponCode && typeof couponCode === 'string') {
                    const code = couponCode.toUpperCase();
                    if (code === "WELCOME500") {
                        discount = 50000; // in paise
                    } else if (code === "PROMO20") {
                        discount = finalAmount * 0.20; // 20% off
                    }
                    // Add more coupons here
                }

                if (discount > 0) {
                    finalAmount = Math.max(0, finalAmount - discount);
                }

                // Razorpay Basic Auth
                const auth = btoa(`${env.RAZORPAY_KEY_ID}:${env.RAZORPAY_KEY_SECRET}`);

                const response = await fetch("https://api.razorpay.com/v1/orders", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Basic ${auth}`
                    },
                    body: JSON.stringify({
                        amount: finalAmount,
                        currency: currency || "INR",
                        receipt: receipt,
                        notes: { coupon: couponCode || "NONE" }
                    })
                });

                const order = await response.json();

                if (!response.ok) {
                    return new Response(JSON.stringify(order), { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
                }

                return new Response(JSON.stringify({ ...order, key_id: env.RAZORPAY_KEY_ID }), {
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                });

            } catch (err: any) {
                return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
            }
        }

        return new Response("Not Found", { status: 404, headers: corsHeaders });
    },
};
