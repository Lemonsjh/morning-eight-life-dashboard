import React from "react";
import { ChevronLeft, ChevronRight, Plus } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function CaffeineLogPanel({
  drinks,
  logs,
  selectedDrinkName,
  onSelectedDrinkNameChange,
  onAddDrink,
  selectedDate,
  selectedDateLabel,
  onSelectedDateChange,
  onShiftDate,
  visibleLogCount,
  isSaving,
}) {
  const selectedDrink = drinks.find((drink) => drink.drink_name === selectedDrinkName);

  return (
    <Card>
      <CardHeader className="!flex-row items-start justify-between gap-3 space-y-0 pb-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle>续命补给站</CardTitle>
            {selectedDrink ? (
              <span className="rounded border border-primary/25 bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                待命：{selectedDrink.drink_name}
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            选择一份清醒弹药，给早八装上推进器
          </p>
        </div>
        <Button className="h-10 shrink-0 px-3" onClick={onAddDrink} disabled={isSaving}>
          <Plus className="mr-2 h-4 w-4" />
          {isSaving ? "补给中" : "注入一杯"}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
          {drinks.map((drink) => {
            const isSelected = selectedDrinkName === drink.drink_name;

            return (
              <button
                key={drink.drink_name}
                type="button"
                onClick={() => onSelectedDrinkNameChange(drink.drink_name)}
                disabled={isSaving}
                className={`group overflow-hidden rounded-lg border bg-white/[0.035] text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  isSelected
                    ? "border-primary/80 shadow-neon"
                    : "border-white/10 hover:border-white/25 hover:bg-white/[0.055]"
                }`}
                aria-pressed={isSelected}
              >
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={drink.image}
                    alt={drink.drink_name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold">{drink.drink_name}</p>
                    <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                      {drink.caffeine_mg}mg
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">糖分 {drink.sugar_g}g</p>
                </div>
              </button>
            );
          })}
        </div>
        {selectedDrink ? (
          <div className="mb-3 grid grid-cols-3 overflow-hidden rounded-md border border-primary/20 bg-primary/10 text-xs">
            <div className="px-3 py-2">
              <span className="text-muted-foreground">补给</span>
              <span className="ml-1 font-semibold text-primary">{selectedDrink.drink_name}</span>
            </div>
            <div className="border-l border-primary/15 px-3 py-2">
              <span className="text-muted-foreground">咖啡因</span>
              <span className="ml-1 font-semibold text-primary">{selectedDrink.caffeine_mg}mg</span>
            </div>
            <div className="border-l border-primary/15 px-3 py-2">
              <span className="text-muted-foreground">糖分</span>
              <span className="ml-1 font-semibold text-primary">{selectedDrink.sugar_g}g</span>
            </div>
          </div>
        ) : null}
        <div className="mb-3 flex flex-col gap-2 rounded-md border border-white/10 bg-white/[0.035] p-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex items-center rounded-md border border-primary/20 bg-primary/10 px-3 py-2 text-xs">
            <span className="font-semibold text-primary">{selectedDateLabel}</span>
            <span className="mx-2 text-muted-foreground">·</span>
            <span className="text-muted-foreground">{visibleLogCount} 次补给</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-9 w-9"
              onClick={() => onShiftDate(-1)}
              aria-label="查看前一天"
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
              aria-label="选择补给日期"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-9 w-9"
              onClick={() => onShiftDate(1)}
              aria-label="查看后一天"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="space-y-3">
          {logs.length === 0 ? (
            <p className="rounded-md border border-white/10 bg-white/[0.035] p-4 text-sm text-muted-foreground">
              这一天补给舱还没有升温，切回今天或注入一杯新的清醒弹药。
            </p>
          ) : null}
          {logs.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-md border border-white/10 bg-white/[0.035] p-3"
            >
              <img
                src={item.image}
                alt=""
                className="h-14 w-14 rounded-md object-cover"
              />
              <div>
                <p className="font-semibold">{item.drink_name}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {item.time_label || item.created_at} · 糖分 {item.sugar_g}g
                </p>
              </div>
              <div className="rounded-md bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                {item.caffeine_mg}mg
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
