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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

type FormValues = {
  name: string;
  description: string;
};

const Category = ({ defaultValue }: { defaultValue: string }) => {
  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  function onSubmit(values: FormValues) {
    const errors: Record<string, string> = {};

    if (values.name.trim() === "") {
      errors.name = "Nama Harus Diisi";
    }
    if (values.description.trim() === "") {
      errors.description = "Deskripsi Harus Diisi";
    }
    if (Object.keys(errors).length > 0) {
      console.error(errors);
      return;
    }

    const userId = 123; // Simpan User ID di sini
    console.log({ ...values, userId });
  }

  return (
    <Tabs defaultValue={defaultValue} className="w-[400px] flex flex-col">
      <TabsList className="w-full flex justify-around">
        <TabsTrigger value="create" asChild>
          <Link to="/category/add">Tambah Kategori</Link>
        </TabsTrigger>
        <TabsTrigger value="see">
          <Link to="/category">Lihat Kategori</Link>
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} placeholder="Nama Kategori" />
                  </FormControl>
                  <FormDescription>Masukkan Nama Kategori</FormDescription>
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
                    <Textarea placeholder="Deskripsi Kategori" {...field} />
                  </FormControl>
                  <FormDescription>Masukkan Deskripsi Kategori</FormDescription>
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

export default Category;
