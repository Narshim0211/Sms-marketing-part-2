export type SmsSendParams = {
  to: string;
  body: string;
  senderId?: string;
};

export type SmsSendResult = {
  ok: boolean;
  id?: string;
  error?: string;
};

export interface SmsProvider {
  send(params: SmsSendParams): Promise<SmsSendResult>;
}
