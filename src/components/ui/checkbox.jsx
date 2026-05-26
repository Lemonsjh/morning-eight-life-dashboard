import * as React from "react";
import { Check } from "@/components/icons";
import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef(({ className, checked, onCheckedChange, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    role="checkbox"
    aria-checked={checked}
    data-state={checked ? "checked" : "unchecked"}
    onClick={() => onCheckedChange?.(!checked)}
    className={cn(
      "peer flex h-5 w-5 shrink-0 items-center justify-center rounded border border-white/20 bg-white/[0.03] shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className,
    )}
    {...props}
  >
    {checked ? <Check className="h-3.5 w-3.5" /> : null}
  </button>
));
Checkbox.displayName = "Checkbox";

export { Checkbox };
