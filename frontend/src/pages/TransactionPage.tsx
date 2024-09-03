import { apiTransaction } from "@/api";
import { useAppContext } from "@/components";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Transaction } from "@/types";
import { Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

type FormValues = {
  transactionValue: string;
  description: string;
  date: string;
  transactionType: "Debit" | "Credit";
  idCategory: number;
};

const TransactionPage = ({ defaultValue }: { defaultValue: string }) => {
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [minValue, setMinValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(0);
  const {
    user,
    formatter,
    categories,
    transactions,
    fetchTransactions,
    fetchCategories,
    navigate,
  } = useAppContext();

  useEffect(() => {
    setMinValue(1000);
    setMaxValue(() => 9 + 5);
    fetchTransactions();
    fetchCategories();
  }, [setMinValue, fetchTransactions, fetchCategories]);

  const form = useForm<FormValues>({
    defaultValues: {
      transactionValue: JSON.stringify(10000),
      description: "",
      date: "2024-08-28",
      transactionType: "Debit",
      idCategory: 0,
    },
  });

  async function onSubmit(values: FormValues) {
    const errors: Record<string, string> = {};

    const parsedValue = parseTransactionValue(values.transactionValue);

    if (parsedValue <= minValue) {
      errors.transactionValue = "Nilai Transaksi Harus Bernilai Positif";
    }
    if (values.description.trim() === "") {
      errors.description = "Deskripsi Harus Diisi";
    }
    if (values.idCategory <= 0) {
      errors.idCategory = "Kategori Harus Dipilih";
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      console.error(errors);
      return;
    }

    const idUser = user?.id as number; // Simpan User ID di sini
    await apiTransaction
      .add({ ...values, transactionValue: parsedValue, idUser })
      .then((res) => console.log(res));
    form.reset();
  }

  function parseTransactionValue(value: string): number {
    const numericValue = parseFloat(value.replace(/Rp\s?|\.|,/g, ""));
    return isNaN(numericValue) ? 0 : numericValue;
  }

  if (!user) navigate("/");
  else
    return (
      <Tabs defaultValue={defaultValue} className="w-[80vw] flex flex-col">
        <TabsList className="w-full flex justify-around">
          <TabsTrigger value="create" asChild>
            <Link to="/transaction/add">Tambah Transaksi</Link>
          </TabsTrigger>
          <TabsTrigger value="see">
            <Link to="/transaction">Lihat Transaksi</Link>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="create" className="dark:text-dark-title">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 min-w-40"
            >
              <FormField
                control={form.control}
                name="transactionValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nilai Transaksi</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        value={formatter.format(
                          parseTransactionValue(field.value)
                        )}
                        minLength={minValue}
                        maxLength={maxValue}
                        onChange={(e) => {
                          const rawValue = e.target.value;
                          field.onChange(rawValue);
                        }}
                      />
                    </FormControl>
                    <FormDescription>Masukkan Nilai Transaksi</FormDescription>
                    {formErrors.transactionValue && (
                      <FormMessage>{formErrors.transactionValue}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Description of the transaction"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Berikan Keterangan Untuk Transaksi.
                    </FormDescription>
                    {formErrors.description && (
                      <FormMessage>{formErrors.description}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormDescription>
                      Pilih Tanggal Transaksi Dilakukan
                    </FormDescription>
                    {formErrors.date && (
                      <FormMessage>{formErrors.date}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="transactionType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipe Transaksi</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex space-x-4"
                      >
                        <FormItem>
                          <FormControl>
                            <RadioGroupItem value="Debit" id="debit" />
                          </FormControl>
                          <FormLabel htmlFor="debit">Debit</FormLabel>
                        </FormItem>
                        <FormItem>
                          <FormControl>
                            <RadioGroupItem value="Credit" id="credit" />
                          </FormControl>
                          <FormLabel htmlFor="credit">Kredit</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    {formErrors.transactionType && (
                      <FormMessage>{formErrors.transactionType}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="idCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategori Transaksi</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(parseInt(value))
                        }
                        value={field.value?.toString() || ""}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories &&
                            categories.map((category) => (
                              <SelectItem
                                key={category.id}
                                value={category.id.toString()}
                              >
                                {category.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      Pilih Kategori/Akun Untuk Transaksi Ini
                    </FormDescription>
                    {formErrors.idCategory && (
                      <FormMessage>{formErrors.idCategory}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </TabsContent>
        <TabsContent value="see">
          <Table className="capitalize dark:text-dark-title">
            <TableHeader>
              <TableRow>
                <TableHead>NO</TableHead>
                <TableHead>Keterangan</TableHead>
                <TableHead>Nilai Transaksi</TableHead>
                <TableHead>Tipe Transaksi</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions &&
                transactions.map((transaction: Transaction, i: number) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>
                      {formatter.format(transaction.transactionValue)}
                    </TableCell>
                    <TableCell>{transaction.transactionType}</TableCell>
                    <TableCell>{transaction.idCategory?.name}</TableCell>
                    <TableCell>
                      {new Date(transaction.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() =>
                          apiTransaction.delete(transaction.id).then((res) => {
                            console.log(res);
                            fetchTransactions();
                          })
                        }
                      >
                        <Trash2Icon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    );
};

export default TransactionPage;
