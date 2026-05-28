import { createClient } from "@supabase/supabase-js";

export const supabaseConfig = {
  url: import.meta.env.VITE_SUPABASE_URL,
  publishableKey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
};

if (!supabaseConfig.url || !supabaseConfig.publishableKey) {
  throw new Error("缺少 Supabase 环境变量，请检查 .env 配置。");
}

export const supabase = createClient(
  supabaseConfig.url,
  supabaseConfig.publishableKey,
);

export const tables = {
  users: "users",
  caffeineLogs: "caffeine_logs",
  todos: "todos",
};

export async function getOrCreateUser(username) {
  const normalizedUsername = username.trim();
  const existing = await supabase
    .from(tables.users)
    .select("id, username")
    .eq("username", normalizedUsername)
    .maybeSingle();

  if (existing.error) throw existing.error;
  if (existing.data) return existing.data;

  const created = await supabase
    .from(tables.users)
    .insert({
      username: normalizedUsername,
      password_hash: "username-only-prototype",
    })
    .select("id, username")
    .single();

  if (created.error) throw created.error;
  return created.data;
}

export async function getDashboardData(userId) {
  const [logs, todos] = await Promise.all([
    supabase
      .from(tables.caffeineLogs)
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false }),
    supabase
      .from(tables.todos)
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false }),
  ]);

  if (logs.error) throw logs.error;
  if (todos.error) throw todos.error;
  return { logs: logs.data || [], todos: todos.data || [] };
}

export async function insertCaffeineLog(userId, drink) {
  const result = await supabase
    .from(tables.caffeineLogs)
    .insert({
      user_id: userId,
      drink_name: drink.drink_name,
      caffeine_mg: drink.caffeine_mg,
      sugar_g: drink.sugar_g,
    })
    .select("*")
    .single();

  if (result.error) throw result.error;
  return result.data;
}

export async function insertTodo(userId, title, taskDate) {
  const result = await supabase
    .from(tables.todos)
    .insert({ user_id: userId, title, task_date: taskDate, is_completed: false })
    .select("*")
    .single();

  if (result.error) throw result.error;
  return result.data;
}

export async function updateTodoStatus(id, isCompleted) {
  const result = await supabase
    .from(tables.todos)
    .update({ is_completed: isCompleted })
    .eq("id", id)
    .select("*")
    .single();

  if (result.error) throw result.error;
  return result.data;
}
