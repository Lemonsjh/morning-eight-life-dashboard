import React from "react";
import { LogOut, UserRound } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function UserLoginPanel({
  user,
  username,
  setUsername,
  onLogin,
  onLogout,
  isLoading,
}) {
  if (user) {
    return (
      <div className="min-w-[18rem] rounded-md border border-primary/20 bg-primary/10 px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">今日档案已同步</p>
            <p className="mt-1 truncate font-display text-xl text-primary">{user.username}</p>
          </div>
          <Button variant="outline" size="icon" onClick={onLogout} aria-label="切换用户">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onLogin}
      className="min-w-[18rem] rounded-md border border-white/10 bg-white/[0.035] p-3"
    >
      <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
        <UserRound className="h-4 w-4 text-primary" />
        输入用户名，进入你的早八工作舱
      </div>
      <div className="flex gap-2">
        <Input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="例如 early-eight-demo"
          disabled={isLoading}
          autoComplete="username"
        />
        <Button type="submit" disabled={isLoading || !username.trim()}>
          {isLoading ? "同步中" : "登录"}
        </Button>
      </div>
    </form>
  );
}
