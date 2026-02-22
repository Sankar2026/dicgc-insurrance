"use client";

import { ShieldCheck, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, type RiskResult } from "@/lib/banks-data";

interface RiskAnalysisTableProps {
  results: RiskResult[];
}

export function RiskAnalysisTable({ results }: RiskAnalysisTableProps) {
  return (
    <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <ShieldCheck className="h-5 w-5 text-primary" />
          Risk Analysis per Bank
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto -mx-6 px-6">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs uppercase tracking-wide font-semibold text-muted-foreground">Bank</TableHead>
                <TableHead className="text-right text-xs uppercase tracking-wide font-semibold text-muted-foreground">Total</TableHead>
                <TableHead className="text-right text-xs uppercase tracking-wide font-semibold text-muted-foreground">Insured</TableHead>
                <TableHead className="text-right text-xs uppercase tracking-wide font-semibold text-muted-foreground">Uninsured</TableHead>
                <TableHead className="text-right text-xs uppercase tracking-wide font-semibold text-muted-foreground">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result, i) => (
                <TableRow
                  key={result.bankName}
                  className="animate-in fade-in duration-300"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <TableCell className="font-medium">{result.bankName}</TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {formatCurrency(result.total)}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm text-success">
                    {formatCurrency(result.insured)}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {result.uninsured > 0 ? (
                      <span className="text-destructive">
                        {formatCurrency(result.uninsured)}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">{formatCurrency(0)}</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {result.status === "safe" ? (
                      <Badge className="bg-success/15 text-success border-success/20 hover:bg-success/15">
                        <ShieldCheck className="mr-1 h-3 w-3" />
                        Fully Insured
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="bg-destructive/15 text-destructive border-destructive/20 hover:bg-destructive/15">
                        <ShieldAlert className="mr-1 h-3 w-3" />
                        At Risk
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
