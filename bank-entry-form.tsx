"use client";

import { useState, useMemo } from "react";
import { Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { banksData, formatCurrency, type UserBank } from "@/lib/banks-data";

interface BankEntryFormProps {
  bank: UserBank;
  index: number;
  onUpdate: (id: string, field: keyof UserBank, value: string | number) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
}

export function BankEntryForm({
  bank,
  index,
  onUpdate,
  onRemove,
  canRemove,
}: BankEntryFormProps) {
  const total = bank.savings + bank.fd + bank.rd;
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredBanks = useMemo(() => {
    if (!search) return banksData;
    const q = search.toLowerCase();
    return banksData.filter((b) => b.name.toLowerCase().includes(q));
  }, [search]);

  return (
    <Card className="animate-in fade-in slide-in-from-bottom-4 duration-400 border-border/60 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-primary">
            Bank {index + 1}
          </span>
          {canRemove && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemove(bank.id)}
              className="text-muted-foreground hover:text-destructive h-8 w-8"
              aria-label={`Remove bank ${index + 1}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Bank selector */}
        <div className="space-y-2 mb-4">
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Bank Name
          </Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between bg-background font-normal"
              >
                {bank.bankName || "Select bank..."}
                <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
              <div className="p-2 border-b border-border">
                <Input
                  placeholder="Search banks..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-8 text-sm"
                />
              </div>
              <div className="max-h-60 overflow-y-auto p-1">
                {filteredBanks.length === 0 ? (
                  <p className="text-sm text-muted-foreground p-2 text-center">No bank found.</p>
                ) : (
                  filteredBanks.map((b) => (
                    <button
                      key={b.name}
                      onClick={() => {
                        onUpdate(bank.id, "bankName", b.name);
                        setOpen(false);
                        setSearch("");
                      }}
                      className={`w-full text-left text-sm rounded-md px-3 py-2 cursor-pointer transition-colors hover:bg-accent ${
                        bank.bankName === b.name
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-foreground"
                      }`}
                    >
                      {b.name}
                    </button>
                  ))
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Amount inputs */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor={`savings-${bank.id}`} className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {"Savings (₹)"}
            </Label>
            <Input
              id={`savings-${bank.id}`}
              type="number"
              min={0}
              placeholder="0"
              value={bank.savings || ""}
              onChange={(e) =>
                onUpdate(
                  bank.id,
                  "savings",
                  Math.max(0, Number(e.target.value))
                )
              }
              className="bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`fd-${bank.id}`} className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {"Fixed Deposit (₹)"}
            </Label>
            <Input
              id={`fd-${bank.id}`}
              type="number"
              min={0}
              placeholder="0"
              value={bank.fd || ""}
              onChange={(e) =>
                onUpdate(
                  bank.id,
                  "fd",
                  Math.max(0, Number(e.target.value))
                )
              }
              className="bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`rd-${bank.id}`} className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {"Recurring Deposit (₹)"}
            </Label>
            <Input
              id={`rd-${bank.id}`}
              type="number"
              min={0}
              placeholder="0"
              value={bank.rd || ""}
              onChange={(e) =>
                onUpdate(
                  bank.id,
                  "rd",
                  Math.max(0, Number(e.target.value))
                )
              }
              className="bg-background"
            />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between rounded-lg bg-muted/50 px-4 py-2.5">
          <span className="text-sm text-muted-foreground">Total at this bank</span>
          <span className="text-sm font-semibold text-foreground">
            {formatCurrency(total)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
