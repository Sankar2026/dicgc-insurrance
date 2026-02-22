"use client";

import { Wallet, ShieldCheck, ShieldAlert } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, type PortfolioSummary as PortfolioSummaryType } from "@/lib/banks-data";

interface PortfolioSummaryProps {
  summary: PortfolioSummaryType;
}

export function PortfolioSummary({ summary }: PortfolioSummaryProps) {
  const insuredPercent =
    summary.totalDeposits > 0
      ? Math.round((summary.totalInsured / summary.totalDeposits) * 100)
      : 0;

  const cards = [
    {
      label: "Total Deposits",
      value: formatCurrency(summary.totalDeposits),
      icon: Wallet,
      colorClass: "text-primary",
      bgClass: "bg-primary/10",
    },
    {
      label: "Insured Amount",
      value: formatCurrency(summary.totalInsured),
      icon: ShieldCheck,
      colorClass: "text-success",
      bgClass: "bg-success/10",
      subtitle: `${insuredPercent}% covered`,
    },
    {
      label: "Uninsured Amount",
      value: formatCurrency(summary.totalUninsured),
      icon: ShieldAlert,
      colorClass: summary.totalUninsured > 0 ? "text-destructive" : "text-muted-foreground",
      bgClass: summary.totalUninsured > 0 ? "bg-destructive/10" : "bg-muted",
      subtitle: summary.totalUninsured > 0 ? "At risk" : "No risk",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {cards.map((card, i) => (
        <Card
          key={card.label}
          className="animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-sm hover:shadow-md transition-shadow"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className={`rounded-lg p-2.5 ${card.bgClass}`}>
                <card.icon className={`h-5 w-5 ${card.colorClass}`} />
              </div>
              <span className="text-sm text-muted-foreground">{card.label}</span>
            </div>
            <p className="text-2xl font-bold tracking-tight text-foreground">{card.value}</p>
            {card.subtitle && (
              <p className={`text-xs mt-1 ${card.colorClass}`}>{card.subtitle}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
