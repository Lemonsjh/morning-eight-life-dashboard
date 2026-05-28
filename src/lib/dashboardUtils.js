import { drinks, drinkImageByName } from "@/data/drinks";

export function hydrateLog(log) {
  return {
    ...log,
    image: drinkImageByName[log.drink_name] || drinks[0].image,
    time_label: new Date(log.created_at).toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
  };
}

export function buildWeeklyIntake(logs) {
  const labels = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
  const today = new Date();
  const monday = new Date(today);
  const day = today.getDay() || 7;
  monday.setDate(today.getDate() - day + 1);
  monday.setHours(0, 0, 0, 0);

  return labels.map((label, index) => {
    const start = new Date(monday);
    start.setDate(monday.getDate() + index);
    const end = new Date(start);
    end.setDate(start.getDate() + 1);
    const mg = logs
      .filter((log) => {
        const createdAt = new Date(log.created_at);
        return createdAt >= start && createdAt < end;
      })
      .reduce((sum, log) => sum + log.caffeine_mg, 0);
    return { day: label, mg };
  });
}
