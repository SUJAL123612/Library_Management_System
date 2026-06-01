import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { phone, message } = await req.json();

    if (!phone || !message) {
      return NextResponse.json({ success: false, message: "Phone and message required" });
    }

    const res = await fetch("https://textbelt.com/text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: phone,          
        message: message,
        key: "textbelt",        
      }),
    });

    const data = await res.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error("SMS Error:", error);
    return NextResponse.json({ success: false, message: "SMS sending failed" });
  }
}
