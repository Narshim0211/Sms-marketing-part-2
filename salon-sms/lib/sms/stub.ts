import type { SmsProvider, SmsSendParams, SmsSendResult } from "./provider";

export function createStubProvider(): SmsProvider {
  return {
    async send(params: SmsSendParams): Promise<SmsSendResult> {
      console.log("[STUB SMS]", params.to, params.body);
      return { ok: true, id: `stub_${Date.now()}` };
    },
  };
}
