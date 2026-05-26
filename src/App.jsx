import React, { useEffect, useMemo, useState } from "react";
import { BatteryCharging, CheckCircle2, Coffee, Zap } from "@/components/icons";
import { CaffeineLogPanel } from "@/components/CaffeineLogPanel";
import { IntroGate } from "@/components/IntroGate";
import { StatCard } from "@/components/StatCard";
import { TodoPanel } from "@/components/TodoPanel";
import { UserLoginPanel } from "@/components/UserLoginPanel";
import { WeeklyLineChart } from "@/components/WeeklyLineChart";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { drinks, drinkImageByName } from "@/data/drinks";
import { getDateLabel, isSameLocalDate, shiftDateKey, toDateKey } from "@/lib/dateUtils";
import {
  getDashboardData,
  getOrCreateUser,
  insertCaffeineLog,
  insertTodo,
  updateTodoStatus,
} from "@/lib/supabase";

const savedUsernameKey = "morning-dashboard-username";

function hydrateLog(log) {
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

function buildWeeklyIntake(logs) {
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

function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [user, setUser] = useState(null);
  const [logs, setLogs] = useState([]);
  const [todos, setTodos] = useState([]);
  const [username, setUsername] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [selectedLogDate, setSelectedLogDate] = useState(() => toDateKey());
  const [selectedDrinkName, setSelectedDrinkName] = useState(drinks[0].drink_name);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [dbError, setDbError] = useState("");

  const selectedDrink = drinks.find((drink) => drink.drink_name === selectedDrinkName) || drinks[0];
  const todayKey = toDateKey();
  const hydratedLogs = useMemo(() => logs.map(hydrateLog), [logs]);
  const visibleLogs = useMemo(
    () => hydratedLogs.filter((log) => isSameLocalDate(log.created_at, selectedLogDate)),
    [hydratedLogs, selectedLogDate],
  );
  const todayLogs = useMemo(
    () => logs.filter((log) => isSameLocalDate(log.created_at, todayKey)),
    [logs, todayKey],
  );
  const weeklyIntake = useMemo(() => buildWeeklyIntake(logs), [logs]);
  const totalCaffeine = todayLogs.reduce((sum, item) => sum + item.caffeine_mg, 0);
  const completedCount = todos.filter((item) => item.is_completed).length;
  const taskRate = Math.round((completedCount / Math.max(todos.length, 1)) * 100);
  const energy = Math.min(100, Math.round(38 + totalCaffeine / 8 + taskRate / 6));
  const selectedDateLabel = getDateLabel(selectedLogDate, todayKey);

  async function loginWithUsername(nextUsername) {
    const normalizedUsername = nextUsername.trim();
    if (!normalizedUsername) return;
    setIsLoading(true);
    setDbError("");
    try {
      const activeUser = await getOrCreateUser(normalizedUsername);
      const data = await getDashboardData(activeUser.id);
      setUser(activeUser);
      setUsername(activeUser.username);
      setLogs(data.logs);
      setTodos(data.todos);
      setSelectedLogDate(toDateKey());
      window.localStorage.setItem(savedUsernameKey, activeUser.username);
    } catch (error) {
      setDbError(error.message || "用户同步失败");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const savedUsername = window.localStorage.getItem(savedUsernameKey);
    if (savedUsername) {
      setUsername(savedUsername);
      loginWithUsername(savedUsername);
    }
  }, []);

  function handleLogin(event) {
    event.preventDefault();
    loginWithUsername(username);
  }

  function handleLogout() {
    window.localStorage.removeItem(savedUsernameKey);
    setUser(null);
    setLogs([]);
    setTodos([]);
    setTaskTitle("");
    setUsername("");
    setSelectedLogDate(toDateKey());
    setDbError("");
  }

  async function addDrink() {
    if (!user) {
      setDbError("请先输入用户名登录，再记录补给。");
      return;
    }
    setIsSaving(true);
    setDbError("");
    try {
      const created = await insertCaffeineLog(user.id, selectedDrink);
      setLogs((current) => [created, ...current]);
      setSelectedLogDate(toDateKey());
    } catch (error) {
      setDbError(error.message || "写入 caffeine_logs 失败");
    } finally {
      setIsSaving(false);
    }
  }

  async function addTodo(event) {
    event.preventDefault();
    const title = taskTitle.trim();
    if (!title) return;
    if (!user) {
      setDbError("请先输入用户名登录，再同步任务。");
      return;
    }
    setIsSaving(true);
    setDbError("");
    try {
      const created = await insertTodo(user.id, title);
      setTodos((current) => [created, ...current]);
      setTaskTitle("");
    } catch (error) {
      setDbError(error.message || "写入 todos 失败");
    } finally {
      setIsSaving(false);
    }
  }

  async function toggleTodo(item) {
    setIsSaving(true);
    setDbError("");
    try {
      const updated = await updateTodoStatus(item.id, !item.is_completed);
      setTodos((current) => current.map((todo) => (todo.id === updated.id ? updated : todo)));
    } catch (error) {
      setDbError(error.message || "更新 todos 失败");
    } finally {
      setIsSaving(false);
    }
  }

  function shiftLogDate(offsetDays) {
    setSelectedLogDate((current) => shiftDateKey(current, offsetDays));
  }

  return (
    <>
      {!hasEntered ? <IntroGate onEnter={() => setHasEntered(true)} /> : null}
      <main className="noise-layer grid-surface min-h-screen overflow-hidden px-4 py-6 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5">
        <header className="flex flex-col justify-between gap-4 border-b border-white/10 pb-5 md:flex-row md:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-md border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Zap className="h-3.5 w-3.5" />
              MORNING SURVIVAL DECK
            </div>
            <h1 className="font-display text-4xl font-semibold tracking-normal sm:text-5xl">
              早八续命中枢
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
              把昏沉、咖啡因和待办事项都收进一块夜航仪表盘，先让今天亮起来。
            </p>
          </div>
          <UserLoginPanel
            user={user}
            username={username}
            setUsername={setUsername}
            onLogin={handleLogin}
            onLogout={handleLogout}
            isLoading={isLoading}
          />
        </header>

        {dbError ? (
          <Card className="border-red-400/30 bg-red-500/10">
            <CardContent className="pt-5 text-sm text-red-100">
              Supabase 提示：{dbError}。如果是首次连接，请先在 Supabase SQL Editor 执行项目里的
              <span className="font-semibold"> supabase_schema.sql</span>。
            </CardContent>
          </Card>
        ) : null}

        <section className="grid gap-4 md:grid-cols-3">
          <StatCard icon={BatteryCharging} title="精神电量" value={`${energy}%`} sub="咖啡因、进度与一点点意志力正在并联供电">
            <Progress value={energy} />
          </StatCard>
          <StatCard
            icon={Coffee}
            title="今日燃料"
            value={`${totalCaffeine}mg`}
            sub={user ? `今天已点亮 ${todayLogs.length} 次补给，待命饮品：${selectedDrink.drink_name}` : "登录后同步你的个人补给记录"}
            accent="text-sky-300"
          >
            <div className="h-2.5 rounded-full bg-sky-400/15">
              <div
                className="h-full rounded-full bg-sky-300 shadow-[0_0_24px_rgba(125,211,252,0.28)]"
                style={{ width: `${Math.min(100, (totalCaffeine / 600) * 100)}%` }}
              />
            </div>
          </StatCard>
          <StatCard
            icon={CheckCircle2}
            title="战线推进"
            value={`${taskRate}%`}
            sub={user ? `${completedCount}/${todos.length} 个节点已经解除警报` : "登录后接入你的战术清单"}
          >
            <Progress value={taskRate} />
          </StatCard>
        </section>

        <WeeklyLineChart data={weeklyIntake} />

        <section className="grid gap-4 lg:grid-cols-2">
          <CaffeineLogPanel
            drinks={drinks}
            logs={visibleLogs}
            selectedDrinkName={selectedDrinkName}
            onSelectedDrinkNameChange={setSelectedDrinkName}
            onAddDrink={addDrink}
            selectedDate={selectedLogDate}
            selectedDateLabel={selectedDateLabel}
            onSelectedDateChange={setSelectedLogDate}
            onShiftDate={shiftLogDate}
            visibleLogCount={visibleLogs.length}
            isSaving={isSaving || isLoading || !user}
          />
          <TodoPanel
            todos={todos}
            taskTitle={taskTitle}
            setTaskTitle={setTaskTitle}
            onAddTodo={addTodo}
            onToggleTodo={toggleTodo}
            isSaving={isSaving || isLoading || !user}
          />
        </section>
      </div>
      </main>
    </>
  );
}

export default App;
