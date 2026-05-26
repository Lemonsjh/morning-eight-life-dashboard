import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StatCard({ icon: Icon, title, value, sub, accent = "text-primary", children }) {
  return (
    <Card className="min-h-[152px] overflow-hidden">
      <CardHeader className="flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="text-muted-foreground">{title}</CardTitle>
          <div className="mt-3 font-display text-3xl font-semibold">{value}</div>
        </div>
        <div className={`rounded-md border border-white/10 bg-white/[0.04] p-2 ${accent}`}>
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent>
        {children}
        <p className="mt-3 text-xs text-muted-foreground">{sub}</p>
      </CardContent>
    </Card>
  );
}
