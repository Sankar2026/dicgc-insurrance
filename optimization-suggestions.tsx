"use client";

import { Lightbulb, ArrowRight, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { OptimizationSuggestion } from "@/lib/banks-data";

interface OptimizationSuggestionsProps {
  suggestions: OptimizationSuggestion[];
}

export function OptimizationSuggestions({
  suggestions,
}: OptimizationSuggestionsProps) {
  if (suggestions.length === 0) {
    return (
      <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500 border-success/30 bg-success/5 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-success/15 p-2.5">
              <TrendingUp className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="font-semibold text-foreground">All deposits are fully insured</p>
              <p className="text-sm text-muted-foreground">
                Your deposits are within the DICGC limit at every bank. No action needed.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-in fade-in slide-in-from-bottom-4 duration-600 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Lightbulb className="h-5 w-5 text-warning" />
          Optimization Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {suggestions.map((suggestion, i) => (
          <div
            key={`${suggestion.fromBank}-${suggestion.toBank}-${i}`}
            className="flex items-start gap-3 rounded-lg border border-border/60 bg-muted/30 p-4 animate-in fade-in slide-in-from-left-4 duration-400"
            style={{ animationDelay: `${i * 120}ms` }}
          >
            <div className="mt-0.5 shrink-0 rounded-full bg-warning/15 p-1.5">
              <ArrowRight className="h-3.5 w-3.5 text-warning" />
            </div>
            <div className="min-w-0">
              <p className="text-sm leading-relaxed text-foreground">
                {suggestion.message}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {"Potential benefit: "}
                <span className="font-medium text-primary">{suggestion.benefit}</span>
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
