import type { SmsProvider, SmsSendParams, SmsSendResult } from "./provider";
import Twilio from "twilio";

export function createTwilioProvider(): SmsProvider {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;

  if (!accountSid || !authToken || !messagingServiceSid) {
    return {
      async send(): Promise<SmsSendResult> {
        return { ok: false, error: "Twilio env vars missing" };
      },
    };
  }

  const client = Twilio(accountSid, authToken);

  return {
    async send(params: SmsSendParams): Promise<SmsSendResult> {
      try {
        const msg = await client.messages.create({
          to: params.to,
          messagingServiceSid,
          body: params.body,
        });
        return { ok: true, id: msg.sid };
      } catch (e: any) {
        return { ok: false, error: e?.message ?? "Twilio error" };
      }
    },
  };
}
