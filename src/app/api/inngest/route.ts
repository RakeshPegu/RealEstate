import { Inngest } from "inngest";
import { serve } from "inngest/next";
import { sendEmail } from "@/lib/resend";

const emailFrom = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

// Inngest client – use env vars from .env
export const inngest = new Inngest({
  id: "real-estate-app",
});

// Example workflow: when a lead is created, send an email now and follow‑ups over several days.
export const leadCreatedWorkflow = inngest.createFunction(
  {
    id: "lead-created-workflow",
    name: "Lead created workflow",
    triggers: { event: "lead.created" },
  },
  async ({ event, step }: { event: any; step: any }) => {
    // 1️⃣ Immediate email
    await step.run("send-initial", async () => {
      const { email, name } = event.data;
      await sendEmail({
        from: emailFrom,
        to: email,
        subject: "Welcome to Real Estate Platform",
        html: `<p>Hello ${name}, thanks for your interest! We will be in touch shortly.</p>`,
        text: `Hello ${name}, thanks for your interest! We will be in touch shortly.`,
      });
    });

    // 2️⃣ Day‑1 follow‑up
    await step.sleep("wait‑1d", "1d");
    await step.run("send‑followup‑1", async () => {
      const { email, name } = event.data;
      await sendEmail({
        from: emailFrom,
        to: email,
        subject: "Your property interests – Day 1",
        html: `<p>Hi ${name}, here are some properties you might like.</p>`,
        text: `Hi ${name}, here are some properties you might like.`,
      });
    });

    // 3️⃣ Day‑3 follow‑up
    await step.sleep("wait‑3d", "3d");
    await step.run("send‑followup‑3", async () => {
      const { email, name } = event.data;
      await sendEmail({
        from: emailFrom,
        to: email,
        subject: "More listings – Day 3",
        html: `<p>${name}, take another look at these homes.</p>`,
        text: `${name}, take another look at these homes.`,
      });
    });

    // 4️⃣ Day‑7 final follow‑up
    await step.sleep("wait‑7d", "7d");
    await step.run("send‑followup‑7", async () => {
      const { email, name } = event.data;
      await sendEmail({
        from: emailFrom,
        to: email,
        subject: "Final reminder – Day 7",
        html: `<p>${name}, let us know if you have any questions.</p>`,
        text: `${name}, let us know if you have any questions.`,
      });
    });
  }
);

// Next.js API route handler – expose Inngest endpoint
export const { GET, POST } = serve({
  client: inngest,
  functions: [leadCreatedWorkflow],
});

