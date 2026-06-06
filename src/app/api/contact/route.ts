import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, description, budget, call } = body;

    // Basic validation
    if (!name || !email || !description) {
      return Response.json(
        { success: false, error: "Name, email, and description are required fields." },
        { status: 400 }
      );
    }

    // Form summary formatted for SMTP/Resend
    const formSummary = `
==================================================
NEW CONTACT INQUIRY RECEIVED
==================================================
Name:        ${name}
Email:       ${email}
Company:     ${company || "N/A"}
Budget:      ${budget || "Not Specified"}
Intro Call:  ${call ? "Yes (Requested 15m call)" : "No"}

Description:
${description}
==================================================
`;

    // 1. Web3Forms Integration (Preferred Free Solution)
    const web3formsAccessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (web3formsAccessKey) {
      console.log("➡️ Web3Forms Access Key found. Sending via Web3Forms...");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3formsAccessKey,
          name: name,
          email: email,
          subject: `New Portfolio Inquiry from ${name}${company ? ` (${company})` : ""}`,
          from_name: "Portfolio Inquiry Form",
          company: company || "N/A",
          budget: budget || "Not Specified",
          schedule_call: call ? "Yes (15m call requested)" : "No",
          message: description,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        console.error("❌ Web3Forms API Error:", data);
        throw new Error(data.message || "Failed to submit form to Web3Forms.");
      }

      console.log("✅ Form submitted successfully via Web3Forms.");
      return Response.json({
        success: true,
        message: "Your message has been sent successfully via Web3Forms!",
      });
    }

    // 2. Resend API Integration (Alternative Free Solution)
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      console.log("➡️ Resend API Key found. Sending via Resend...");

      const receiverEmail = process.env.NOTIFICATION_RECEIVER || "pintu7414@gmail.com";
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "Portfolio Form <onboarding@resend.dev>",
          to: receiverEmail,
          reply_to: email,
          subject: `New Portfolio Inquiry from ${name}${company ? ` (${company})` : ""}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
              <h2 style="color: #6d28d9; border-bottom: 2px solid #6d28d9; padding-bottom: 8px; margin-top: 0;">New Contact Inquiry Received</h2>
              <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; width: 120px; color: #475569;">Name:</td>
                  <td style="padding: 6px 0; color: #0f172a;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #475569;">Email:</td>
                  <td style="padding: 6px 0; color: #0f172a;"><a href="mailto:${email}">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #475569;">Company:</td>
                  <td style="padding: 6px 0; color: #0f172a;">${company || "N/A"}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #475569;">Budget:</td>
                  <td style="padding: 6px 0; color: #0f172a;">${budget || "Not Specified"}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #475569;">Intro Call:</td>
                  <td style="padding: 6px 0; color: #0f172a;">${call ? "Yes (Requested 15m call)" : "No"}</td>
                </tr>
              </table>
              <h3 style="color: #475569; margin-top: 20px; margin-bottom: 8px; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px;">Project Description</h3>
              <p style="color: #334155; line-height: 1.6; white-space: pre-wrap; background-color: #f8fafc; padding: 12px; border-radius: 6px; border: 1px solid #f1f5f9; margin-top: 0;">${description}</p>
            </div>
          `,
        }),
      });

      const data = await response.json();
      if (!response.ok || data.error) {
        console.error("❌ Resend API Error:", data);
        throw new Error(data.message || "Failed to submit form to Resend.");
      }

      console.log("✅ Email sent successfully via Resend.");
      return Response.json({
        success: true,
        message: "Your message has been sent successfully via Resend!",
      });
    }

    // 3. SMTP (Nodemailer) Fallback
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpHost && smtpUser && smtpPass) {
      console.log("➡️ SMTP credentials found. Sending via SMTP...");

      const notificationReceiver = process.env.NOTIFICATION_RECEIVER || "pintu7414@gmail.com";
      const port = Number(smtpPort) || 465;
      const isSecure = port === 465;

      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: port,
        secure: isSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const mailOptions = {
        from: `"${name}" <${smtpUser}>`,
        to: notificationReceiver,
        replyTo: email,
        subject: `New Portfolio Inquiry from ${name}${company ? ` (${company})` : ""}`,
        text: formSummary,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h2 style="color: #6d28d9; border-bottom: 2px solid #6d28d9; padding-bottom: 8px; margin-top: 0;">New Contact Inquiry Received</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <tr>
                <td style="padding: 6px 0; font-weight: bold; width: 120px; color: #475569;">Name:</td>
                <td style="padding: 6px 0; color: #0f172a;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold; color: #475569;">Email:</td>
                <td style="padding: 6px 0; color: #0f172a;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold; color: #475569;">Company:</td>
                <td style="padding: 6px 0; color: #0f172a;">${company || "N/A"}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold; color: #475569;">Budget:</td>
                <td style="padding: 6px 0; color: #0f172a;">${budget || "Not Specified"}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold; color: #475569;">Intro Call:</td>
                <td style="padding: 6px 0; color: #0f172a;">${call ? "Yes (Requested 15m call)" : "No"}</td>
              </tr>
            </table>
            <h3 style="color: #475569; margin-top: 20px; margin-bottom: 8px; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px;">Project Description</h3>
            <p style="color: #334155; line-height: 1.6; white-space: pre-wrap; background-color: #f8fafc; padding: 12px; border-radius: 6px; border: 1px solid #f1f5f9; margin-top: 0;">${description}</p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log("✅ Email sent successfully via SMTP.");
      return Response.json({
        success: true,
        message: "Your message has been sent successfully via SMTP!",
      });
    }

    // 4. Local Simulation Fallback (If no configuration is set)
    console.warn("⚠️ No email provider keys configured (Web3Forms, Resend, or SMTP).");
    console.log("Form submission details:");
    console.log(formSummary);

    return Response.json({
      success: true,
      mocked: true,
      message: "Form submission simulated! Please configure WEB3FORMS_ACCESS_KEY in .env.local for real emails."
    });

  } catch (error: any) {
    console.error("❌ Error processing contact form submission:", error);
    return Response.json(
      { success: false, error: error.message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
