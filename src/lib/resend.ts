import { Resend } from "resend";

type SendEmailOptions = Parameters<Resend["emails"]["send"]>[0];

// Initialize Resend client with the env key (dummy key works for dev)
const resend = new Resend(process.env.RESEND_API_KEY!);

/**
 * Send an email via Resend.
 * @param opts { to, subject, html } – minimal fields for the example workflow.
 */
export async function sendEmail(opts: SendEmailOptions): Promise<void> {
  try {
    await resend.emails.send(opts);
  } catch (err) {
    console.error("Resend email failed", err);
    // In a real app you might retry or log to an error tracker.
  }
}

