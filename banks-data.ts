export const DICGC_LIMIT = 500000;

export interface BankInfo {
  name: string;
  savingsRate: number;
  fdRate: number;
  rdRate: number;
}

export const banksData: BankInfo[] = [
  { name: "SBI", savingsRate: 2.7, fdRate: 6.8, rdRate: 6.5 },
  { name: "HDFC Bank", savingsRate: 3.0, fdRate: 7.1, rdRate: 7.0 },
  { name: "ICICI Bank", savingsRate: 3.0, fdRate: 7.0, rdRate: 6.9 },
  { name: "Axis Bank", savingsRate: 3.5, fdRate: 7.2, rdRate: 7.1 },
  { name: "Kotak Mahindra Bank", savingsRate: 3.5, fdRate: 7.3, rdRate: 7.2 },
  { name: "IDFC First Bank", savingsRate: 7.0, fdRate: 8.0, rdRate: 7.75 },
  { name: "AU Small Finance Bank", savingsRate: 7.25, fdRate: 8.5, rdRate: 8.25 },
  { name: "Punjab National Bank", savingsRate: 2.7, fdRate: 6.8, rdRate: 6.5 },
  { name: "Bank of Baroda", savingsRate: 2.75, fdRate: 6.85, rdRate: 6.5 },
  { name: "Canara Bank", savingsRate: 2.9, fdRate: 6.7, rdRate: 6.5 },
  { name: "Union Bank of India", savingsRate: 2.75, fdRate: 6.7, rdRate: 6.5 },
  { name: "Indian Bank", savingsRate: 2.75, fdRate: 6.75, rdRate: 6.5 },
  { name: "Bank of India", savingsRate: 2.75, fdRate: 6.8, rdRate: 6.5 },
  { name: "Central Bank of India", savingsRate: 2.75, fdRate: 6.7, rdRate: 6.5 },
  { name: "Indian Overseas Bank", savingsRate: 2.7, fdRate: 6.6, rdRate: 6.3 },
  { name: "UCO Bank", savingsRate: 2.75, fdRate: 6.6, rdRate: 6.3 },
  { name: "Punjab & Sind Bank", savingsRate: 2.7, fdRate: 6.5, rdRate: 6.25 },
  { name: "Yes Bank", savingsRate: 4.0, fdRate: 7.25, rdRate: 7.0 },
  { name: "IndusInd Bank", savingsRate: 4.0, fdRate: 7.5, rdRate: 7.25 },
  { name: "Federal Bank", savingsRate: 3.05, fdRate: 7.1, rdRate: 7.0 },
  { name: "South Indian Bank", savingsRate: 2.75, fdRate: 7.0, rdRate: 6.75 },
  { name: "RBL Bank", savingsRate: 5.5, fdRate: 7.6, rdRate: 7.3 },
  { name: "Bandhan Bank", savingsRate: 5.0, fdRate: 7.65, rdRate: 7.4 },
  { name: "IDBI Bank", savingsRate: 3.0, fdRate: 6.75, rdRate: 6.5 },
  { name: "DCB Bank", savingsRate: 4.0, fdRate: 7.5, rdRate: 7.2 },
  { name: "Karur Vysya Bank", savingsRate: 3.25, fdRate: 7.1, rdRate: 6.9 },
  { name: "City Union Bank", savingsRate: 2.75, fdRate: 7.0, rdRate: 6.75 },
  { name: "Tamilnad Mercantile Bank", savingsRate: 3.0, fdRate: 7.15, rdRate: 7.0 },
  { name: "Ujjivan Small Finance Bank", savingsRate: 7.0, fdRate: 8.25, rdRate: 8.0 },
  { name: "Equitas Small Finance Bank", savingsRate: 7.0, fdRate: 8.25, rdRate: 8.0 },
  { name: "Jana Small Finance Bank", savingsRate: 5.5, fdRate: 8.0, rdRate: 7.75 },
  { name: "Suryoday Small Finance Bank", savingsRate: 7.0, fdRate: 8.6, rdRate: 8.25 },
  { name: "Utkarsh Small Finance Bank", savingsRate: 5.5, fdRate: 8.25, rdRate: 8.0 },
  { name: "ESAF Small Finance Bank", savingsRate: 5.0, fdRate: 8.25, rdRate: 8.0 },
  { name: "North East Small Finance Bank", savingsRate: 6.0, fdRate: 8.0, rdRate: 7.75 },
  { name: "Fincare Small Finance Bank", savingsRate: 6.0, fdRate: 8.11, rdRate: 7.85 },
  { name: "Unity Small Finance Bank", savingsRate: 5.5, fdRate: 8.5, rdRate: 8.25 },
  { name: "Shivalik Small Finance Bank", savingsRate: 5.0, fdRate: 7.75, rdRate: 7.5 },
];

export interface UserBank {
  id: string;
  bankName: string;
  savings: number;
  fd: number;
  rd: number;
}

export interface RiskResult {
  bankName: string;
  total: number;
  insured: number;
  uninsured: number;
  status: "safe" | "at-risk";
}

export interface PortfolioSummary {
  totalDeposits: number;
  totalInsured: number;
  totalUninsured: number;
}

export interface OptimizationSuggestion {
  message: string;
  fromBank: string;
  toBank: string;
  amount: number;
  benefit: string;
}

export function analyzeRisk(banks: UserBank[]): RiskResult[] {
  return banks.map((bank) => {
    const total = bank.savings + bank.fd + bank.rd;
    const insured = Math.min(total, DICGC_LIMIT);
    const uninsured = Math.max(total - DICGC_LIMIT, 0);
    return {
      bankName: bank.bankName,
      total,
      insured,
      uninsured,
      status: uninsured > 0 ? "at-risk" : "safe",
    };
  });
}

export function getPortfolioSummary(results: RiskResult[]): PortfolioSummary {
  return results.reduce(
    (acc, r) => ({
      totalDeposits: acc.totalDeposits + r.total,
      totalInsured: acc.totalInsured + r.insured,
      totalUninsured: acc.totalUninsured + r.uninsured,
    }),
    { totalDeposits: 0, totalInsured: 0, totalUninsured: 0 }
  );
}

export function getOptimizationSuggestions(
  banks: UserBank[],
  results: RiskResult[]
): OptimizationSuggestion[] {
  const suggestions: OptimizationSuggestion[] = [];
  const userBankNames = banks.map((b) => b.bankName);

  const sortedByFd = [...banksData].sort((a, b) => b.fdRate - a.fdRate);
  const sortedBySavings = [...banksData].sort(
    (a, b) => b.savingsRate - a.savingsRate
  );

  for (const result of results) {
    if (result.uninsured <= 0) continue;

    let remaining = result.uninsured;

    for (const targetBank of sortedByFd) {
      if (remaining <= 0) break;
      if (targetBank.name === result.bankName) continue;

      const existingEntry = results.find(
        (r) => r.bankName === targetBank.name
      );
      const existingTotal = existingEntry ? existingEntry.total : 0;
      const availableRoom = DICGC_LIMIT - existingTotal;

      if (availableRoom <= 0) continue;

      const moveAmount = Math.min(remaining, availableRoom);
      remaining -= moveAmount;

      suggestions.push({
        message: `Move ${formatCurrency(moveAmount)} from ${result.bankName} to ${targetBank.name} to maximize insurance coverage and earn ${targetBank.fdRate}% FD rate.`,
        fromBank: result.bankName,
        toBank: targetBank.name,
        amount: moveAmount,
        benefit: `${targetBank.fdRate}% FD rate`,
      });
    }

    if (remaining > 0) {
      for (const targetBank of sortedBySavings) {
        if (remaining <= 0) break;
        if (
          userBankNames.includes(targetBank.name) ||
          targetBank.name === result.bankName
        )
          continue;

        const moveAmount = Math.min(remaining, DICGC_LIMIT);
        remaining -= moveAmount;

        suggestions.push({
          message: `Open a new account at ${targetBank.name} and move ${formatCurrency(moveAmount)} from ${result.bankName} to get ${targetBank.savingsRate}% savings rate with full insurance.`,
          fromBank: result.bankName,
          toBank: targetBank.name,
          amount: moveAmount,
          benefit: `${targetBank.savingsRate}% savings rate`,
        });
      }
    }
  }

  return suggestions;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
