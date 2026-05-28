import React from "react";
import { ChevronLeft, ChevronRight, ListPlus } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export function TodoPanel({
  todos,
  taskTitle,
  setTaskTitle,
  onAddTodo,
  onToggleTodo,
  selectedDate,
  selectedDateLabel,
  onSelectedDateChange,
  onShiftDate,
  visibleTodoCount,
  isSaving,
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>今日战术清单</CardTitle>
        <p className="text-xs text-muted-foreground">把脑内噪音压成一条条可以击破的目标</p>
      </CardHeader>
      <CardContent>
        <div className="mb-3 flex flex-col gap-2 rounded-md border border-white/10 bg-white/[0.035] p-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex items-center rounded-md border border-primary/20 bg-primary/10 px-3 py-2 text-xs">
            <span className="font-semibold text-primary">{selectedDateLabel}</span>
            <span className="mx-2 text-muted-foreground">·</span>
            <span className="text-muted-foreground">{visibleTodoCount} 个目标</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-9 w-9"
              onClick={() => onShiftDate(-1)}
              aria-label="查看前一天目标"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Input
              className="h-9 w-[9.5rem]"
              type="date"
              value={selectedDate}
              onChange={(event) => {
                if (event.target.value) onSelectedDateChange(event.target.value);
              }}
              aria-label="选择目标日期"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-9 w-9"
              onClick={() => onShiftDate(1)}
              aria-label="查看后一天目标"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
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
              这一天还没有部署目标，写下一个目标就能建立新的航线。
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
