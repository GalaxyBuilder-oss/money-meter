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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
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

const TransactionAdd = ({ defaultValue }: { defaultValue: string }) => {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [minValue, setMinValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(0);

  useEffect(() => {
    setMinValue(1000);
    setMaxValue(() => 9 + 5);
    setCategories([
      { id: 1, name: "Piutang" },
      { id: 2, name: "Ada" },
    ]);
  }, []);

  const form = useForm<FormValues>({
    defaultValues: {
      transactionValue: JSON.stringify(10000),
      description: "",
      date: "2024-08-28",
      transactionType: "Debit",
      idCategory: 0,
    },
  });

  function onSubmit(values: FormValues) {
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
      console.error(errors);
      return;
    }

    const userId = 123; // Simpan User ID di sini
    console.log({ ...values, transactionValue: parsedValue, userId });
  }

  function parseTransactionValue(value: string): number {
    const numericValue = parseFloat(value.replace(/Rp\s?|\.|,/g, ""));
    return isNaN(numericValue) ? 0 : numericValue;
  }

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <Tabs defaultValue={defaultValue} className="w-[400px] flex flex-col">
      <TabsList className="w-full flex justify-around">
        <TabsTrigger value="create" asChild>
          <Link to="/transaction/add">Tambah Transaksi</Link>
        </TabsTrigger>
        <TabsTrigger value="see">
          <Link to="/transaction">Lihat Transaksi</Link>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="create">
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
                  <FormMessage />
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
                  <FormMessage />
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
                  <FormMessage />
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
                  <FormMessage />
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
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      value={field.value?.toString() || ""}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </TabsContent>
      <TabsContent value="see">Make changes to your account here.</TabsContent>
    </Tabs>
  );
};

export default TransactionAdd;
