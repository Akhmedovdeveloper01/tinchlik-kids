export type ApplicationFormData = {
  name: string;
  phone: string;
  age: string;
  time?: string;
  comment?: string;
};

export function isTelegramConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_TG_BOT_TOKEN && process.env.NEXT_PUBLIC_TG_CHAT_ID,
  );
}

export function buildTelegramMessage(data: ApplicationFormData) {
  const lines = [
    "<b>Tinchlik Kids — yangi ariza</b>",
    `Ism: ${escapeHtml(data.name)}`,
    `Telefon: ${escapeHtml(data.phone)}`,
    `Bola yoshi: ${escapeHtml(data.age)}`,
  ];
  if (data.time) lines.push(`Qulay vaqt: ${escapeHtml(data.time)}`);
  if (data.comment) lines.push(`Izoh: ${escapeHtml(data.comment)}`);
  return lines.join("\n");
}

export async function sendTelegramMessage(data: ApplicationFormData) {
  const token = process.env.NEXT_PUBLIC_TG_BOT_TOKEN;
  const chatId = process.env.NEXT_PUBLIC_TG_CHAT_ID;
  if (!token || !chatId) {
    throw new Error("Telegram not configured");
  }

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: buildTelegramMessage(data),
      parse_mode: "HTML",
    }),
  });

  if (!res.ok) {
    throw new Error("Telegram request failed");
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
