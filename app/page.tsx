'use client';

import { useState } from 'react';
import BankEntryForm from '@/components/bank-entry-form';
import OptimizationSuggestions from '@/components/optimization-suggestions';
import PortfolioSummary from '@/components/portfolio-summary';
import RiskAnalysisTable from '@/components/risk-analysis-table';

export default function Home() {
  const DICGC_LIMIT = 500000;
  const [userBanks, setUserBanks] = useState([
    { id: 'b1', bankName: 'SBI', savings: 0, fd: 0, rd: 0 }
  ]);
  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState<string[]>([]);

  const banksData = [
    { name: 'SBI', savingsRate: 2.7, fdRate: 6.8, rdRate: 6.5 },
    { name: 'HDFC Bank', savingsRate: 3.0, fdRate: 7.1, rdRate: 7.0 },
    { name: 'ICICI Bank', savingsRate: 3.0, fdRate: 7.0, rdRate: 6.9 },
    { name: 'Axis Bank', savingsRate: 3.5, fdRate: 7.2, rdRate: 7.1 },
    { name: 'Kotak Mahindra Bank', savingsRate: 3.5, fdRate: 7.3, rdRate: 7.2 },
    { name: 'IDFC First Bank', savingsRate: 7.0, fdRate: 8.0, rdRate: 7.75 },
    { name: 'AU Small Finance Bank', savingsRate: 7.25, fdRate: 8.5, rdRate: 8.25 },
    { name: 'Punjab National Bank', savingsRate: 2.7, fdRate: 6.8, rdRate: 6.5 },
    { name: 'Bank of Baroda', savingsRate: 2.75, fdRate: 6.85, rdRate: 6.5 },
    { name: 'Canara Bank', savingsRate: 2.9, fdRate: 6.7, rdRate: 6.5 },
    { name: 'Union Bank of India', savingsRate: 2.75, fdRate: 6.7, rdRate: 6.5 },
    { name: 'Indian Bank', savingsRate: 2.75, fdRate: 6.75, rdRate: 6.5 },
    { name: 'Bank of India', savingsRate: 2.75, fdRate: 6.8, rdRate: 6.5 },
    { name: 'Central Bank of India', savingsRate: 2.75, fdRate: 6.7, rdRate: 6.5 },
    { name: 'Indian Overseas Bank', savingsRate: 2.7, fdRate: 6.6, rdRate: 6.3 },
    { name: 'UCO Bank', savingsRate: 2.75, fdRate: 6.6, rdRate: 6.3 },
    { name: 'Punjab & Sind Bank', savingsRate: 2.7, fdRate: 6.5, rdRate: 6.25 },
    { name: 'Yes Bank', savingsRate: 4.0, fdRate: 7.25, rdRate: 7.0 },
    { name: 'IndusInd Bank', savingsRate: 4.0, fdRate: 7.5, rdRate: 7.25 },
    { name: 'Federal Bank', savingsRate: 3.05, fdRate: 7.1, rdRate: 7.0 },
    { name: 'South Indian Bank', savingsRate: 2.75, fdRate: 7.0, rdRate: 6.75 },
    { name: 'RBL Bank', savingsRate: 5.5, fdRate: 7.6, rdRate: 7.3 },
    { name: 'Bandhan Bank', savingsRate: 5.0, fdRate: 7.65, rdRate: 7.4 },
    { name: 'IDBI Bank', savingsRate: 3.0, fdRate: 6.75, rdRate: 6.5 },
    { name: 'DCB Bank', savingsRate: 4.0, fdRate: 7.5, rdRate: 7.2 },
    { name: 'Karur Vysya Bank', savingsRate: 3.25, fdRate: 7.1, rdRate: 6.9 },
    { name: 'City Union Bank', savingsRate: 2.75, fdRate: 7.0, rdRate: 6.75 },
    { name: 'Tamilnad Mercantile Bank', savingsRate: 3.0, fdRate: 7.15, rdRate: 7.0 },
    { name: 'Ujjivan Small Finance Bank', savingsRate: 7.0, fdRate: 8.25, rdRate: 8.0 },
    { name: 'Equitas Small Finance Bank', savingsRate: 7.0, fdRate: 8.25, rdRate: 8.0 },
    { name: 'Jana Small Finance Bank', savingsRate: 5.5, fdRate: 8.0, rdRate: 7.75 },
    { name: 'Suryoday Small Finance Bank', savingsRate: 7.0, fdRate: 8.6, rdRate: 8.25 },
    { name: 'Utkarsh Small Finance Bank', savingsRate: 5.5, fdRate: 8.25, rdRate: 8.0 },
    { name: 'ESAF Small Finance Bank', savingsRate: 5.0, fdRate: 8.25, rdRate: 8.0 },
    { name: 'North East Small Finance Bank', savingsRate: 6.0, fdRate: 8.0, rdRate: 7.75 },
    { name: 'Fincare Small Finance Bank', savingsRate: 6.0, fdRate: 8.11, rdRate: 7.85 },
    { name: 'Unity Small Finance Bank', savingsRate: 5.5, fdRate: 8.5, rdRate: 8.25 },
    { name: 'Shivalik Small Finance Bank', savingsRate: 5.0, fdRate: 7.75, rdRate: 7.5 }
  ];

  const formatCurrency = (n: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(n);
  };

  const handleAddBank = () => {
    const newId = 'b' + (Math.max(...userBanks.map(b => parseInt(b.id.slice(1))), 0) + 1);
    setUserBanks([...userBanks, { id: newId, bankName: banksData[0].name, savings: 0, fd: 0, rd: 0 }]);
    setErrors([]);
  };

  const handleRemoveBank = (id: string) => {
    if (userBanks.length > 1) {
      setUserBanks(userBanks.filter(b => b.id !== id));
    }
  };

  const handleUpdateBank = (id: string, field: string, value: number | string) => {
    setUserBanks(
      userBanks.map(b =>
        b.id === id ? { ...b, [field]: value } : b
      )
    );
  };

  const handleAnalyze = () => {
    const newErrors: string[] = [];

    userBanks.forEach((bank, idx) => {
      if (!bank.bankName) newErrors.push(`Bank ${idx + 1}: Please select a bank`);
      const total = bank.savings + bank.fd + bank.rd;
      if (total === 0) newErrors.push(`Bank ${idx + 1}: Please enter at least one deposit amount`);
    });

    setErrors(newErrors);

    if (newErrors.length === 0) {
      const analysisResults = {
        banks: userBanks,
        dicgcLimit: DICGC_LIMIT,
        totalDeposits: userBanks.reduce((sum, b) => sum + b.savings + b.fd + b.rd, 0),
        riskStatus: 'calculating',
        suggestions: []
      };

      userBanks.forEach((bank, idx) => {
        const total = bank.savings + bank.fd + bank.rd;
        const bankData = banksData.find(b => b.name === bank.bankName);

        if (total > DICGC_LIMIT) {
          analysisResults.suggestions.push({
            type: 'risk',
            bank: bank.bankName,
            amount: total - DICGC_LIMIT,
            message: `Deposits at ${bank.bankName} exceed DICGC limit by ${formatCurrency(total - DICGC_LIMIT)}`
          });
        }
      });

      analysisResults.riskStatus = analysisResults.suggestions.length > 0 ? 'at-risk' : 'safe';

      setResults(analysisResults);
    }
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      {/* Info Callout */}
      <div className="flex gap-3 rounded-lg border border-green-200 bg-green-50 p-4 mb-6">
        <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
        <p className="text-sm text-slate-700">
          DICGC insures up to <strong>₹5,00,000</strong> per depositor per bank, covering savings, fixed deposits, current accounts, and recurring deposits.
        </p>
      </div>

      {/* Bank Cards */}
      <div className="space-y-4 mb-6">
        {userBanks.map((bank, idx) => (
          <BankEntryForm
            key={bank.id}
            bank={bank}
            banksData={banksData}
            index={idx}
            onUpdate={handleUpdateBank}
            onRemove={handleRemoveBank}
            canRemove={userBanks.length > 1}
          />
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6 sm:items-center sm:justify-between">
        <button
          onClick={handleAddBank}
          className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 rounded-md bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium transition"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Bank
        </button>
        <button
          onClick={handleAnalyze}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition sm:text-base"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <polyline points="9 12 11 14 15 10" />
          </svg>
          Check My DICGC Risk
        </button>
      </div>

      {/* Errors */}
      {errors.length > 0 && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 mb-6">
          <p className="text-sm font-medium text-red-600 mb-2">Please fix the following:</p>
          <ul className="space-y-1">
            {errors.map((error, idx) => (
              <li key={idx} className="text-sm text-red-600 flex gap-2">
                <span className="flex-shrink-0">•</span>
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Results */}
      {results && (
        <div className="space-y-6">
          <hr className="my-8" />
          
          <PortfolioSummary results={results} formatCurrency={formatCurrency} dicgcLimit={DICGC_LIMIT} />
          
          <RiskAnalysisTable results={results} formatCurrency={formatCurrency} dicgcLimit={DICGC_LIMIT} />
          
          {results.suggestions.length > 0 && (
            <OptimizationSuggestions suggestions={results.suggestions} formatCurrency={formatCurrency} />
          )}
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-8 text-center text-xs text-slate-500">
        <p>Disclaimer: This tool is for informational purposes only. For accurate DICGC coverage details, consult your bank or visit the official DICGC website.</p>
      </div>
    </main>
  );
}
