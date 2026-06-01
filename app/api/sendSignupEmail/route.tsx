import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email, username } = await req.json();

 
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,      
        pass: process.env.GMAIL_APP_PASS, 
      },
    });

    const mailOptions = {
      from: `"Online Library" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Account Created Successfully",
      text: `Hello ${username},\n\nYour account has been successfully created in the Online Library Management System.\n\nWelcome!`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email Error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
