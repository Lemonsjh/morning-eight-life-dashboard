const dayMs = 24 * 60 * 60 * 1000;

function pad(value) {
  return String(value).padStart(2, "0");
}

export function toDateKey(value = new Date()) {
  const date = value instanceof Date ? value : new Date(value);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function parseDateKey(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function shiftDateKey(dateKey, offsetDays) {
  const date = parseDateKey(dateKey);
  date.setDate(date.getDate() + offsetDays);
  return toDateKey(date);
}

export function isSameLocalDate(value, dateKey) {
  return toDateKey(value) === dateKey;
}

export function getDateLabel(dateKey, todayKey = toDateKey()) {
  const diffDays = Math.round((parseDateKey(dateKey) - parseDateKey(todayKey)) / dayMs);
  if (diffDays === 0) return "今天";
  if (diffDays === -1) return "昨天";
  if (diffDays === 1) return "明天";

  const date = parseDateKey(dateKey);
  return `${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}
