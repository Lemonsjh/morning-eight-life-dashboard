import React from "react";
import { ListPlus } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export function TodoPanel({ todos, taskTitle, setTaskTitle, onAddTodo, onToggleTodo, isSaving }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>今日战术清单</CardTitle>
        <p className="text-xs text-muted-foreground">把脑内噪音压成一条条可以击破的目标</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={onAddTodo} className="mb-4 flex gap-2">
          <Input
            value={taskTitle}
            onChange={(event) => setTaskTitle(event.target.value)}
            placeholder="写下下一个要攻克的目标"
            disabled={isSaving}
          />
          <Button type="submit" size="icon" aria-label="加入战术清单" disabled={isSaving}>
            <ListPlus className="h-4 w-4" />
          </Button>
        </form>
        <div className="space-y-3">
          {todos.length === 0 ? (
            <p className="rounded-md border border-white/10 bg-white/[0.035] p-4 text-sm text-muted-foreground">
              任务雷达暂时安静，先放入一个目标，今天就有了第一道航线。
            </p>
          ) : null}
          {todos.map((item) => (
            <label
              key={item.id}
              className="flex cursor-pointer items-center gap-3 rounded-md border border-white/10 bg-white/[0.035] p-3 transition-colors hover:bg-white/[0.06]"
            >
              <Checkbox
                checked={item.is_completed}
                onCheckedChange={() => onToggleTodo(item)}
                disabled={isSaving}
              />
              <span
                className={`text-sm ${
                  item.is_completed ? "text-muted-foreground line-through" : "text-foreground"
                }`}
              >
                {item.title}
              </span>
            </label>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
