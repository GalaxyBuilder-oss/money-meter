import { useAppContext } from "@/components";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Transaction } from "@/types";
import { useEffect, useState } from "react";

const ReportPage = () => {
  const { transactions, fetchTransactions, categories, fetchCategories, formatter } =
    useAppContext();
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [category, setCategory] = useState<string>("");
  const [transactionType, setTransactionType] = useState<string>("");
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
  }, [fetchTransactions, fetchCategories]);

  useEffect(() => {
    let result = transactions;

    if (category) {
      result =
        result &&
        result.filter(
          (transaction) => transaction.idCategory.name === category
        );
    }

    if (transactionType) {
      result =
        result &&
        result.filter(
          (transaction) => transaction.transactionType === transactionType
        );
    }

    if (dateRange) {
      const [startDate, endDate] = dateRange;
      result =
        result &&
        result.filter((transaction) => {
          const transactionDate = new Date(transaction.date);
          return (
            transactionDate >= new Date(startDate) &&
            transactionDate <= new Date(endDate)
          );
        });
    }

    if (search) {
      result =
        result &&
        result.filter((transaction) =>
          transaction.description.toLowerCase().includes(search.toLowerCase())
        );
    }

    setFilteredTransactions(result as Transaction[]);
  }, [transactions, category, transactionType, dateRange, search]);

  const handleExport = () => {
    // Implement export functionality (e.g., to CSV or PDF)
  };

  return (
    <Card className="w-full p-4">
      <CardHeader>
        <CardTitle>Laporan Transaksi</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-4">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Kategori" />
            </SelectTrigger>
            <SelectContent>
              {categories &&
                categories.map((category) => (
                  <SelectItem value={category.name}>{category.name}</SelectItem>
                ))}
            </SelectContent>
          </Select>

          <Select value={transactionType} onValueChange={setTransactionType}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Tipe Transaksi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="debit">Debit</SelectItem>
              <SelectItem value="credit">Kredit</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="date"
            placeholder="Tanggal Mulai"
            onChange={(e) =>
              setDateRange([e.target.value, dateRange?.[1] as string])
            }
            className="w-[160px]"
          />
          <Input
            type="date"
            placeholder="Tanggal Akhir"
            onChange={(e) =>
              setDateRange([dateRange?.[0] as string, e.target.value])
            }
            className="w-[160px]"
          />

          <Input
            placeholder="Cari deskripsi"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[160px]"
          />
        </div>

        <div className="mt-4">
          <table className="min-w-full divide-y divide-gray-200 dark:text-dark-title dark:bg-dark-bg">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Tanggal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Deskripsi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Tipe
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Nilai Transaksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTransactions &&
                filteredTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {transaction.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {transaction.idCategory?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {transaction.transactionType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {formatter.format(transaction.transactionValue)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <Button onClick={handleExport} className="mt-4">
          Export Data
        </Button>
      </CardContent>
    </Card>
  );
};

export default ReportPage;
