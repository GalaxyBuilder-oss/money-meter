import { apiCategory } from "@/api";
import { useAppContext } from "@/components";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

type FormValues = {
  name: string;
  description: string;
};

const CategoryPage = ({ defaultValue }: { defaultValue: string }) => {
  const { user, categories, fetchCategories, navigate } = useAppContext();
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [editingCategory, setEditingCategory] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    await apiCategory.delete(id).then((res) => console.log(res));
    fetchCategories();
  };

  const handleEdit = (id: number) => {
    const categoryToEdit =
      categories && categories.find((category) => category.id === id);
    if (categoryToEdit) {
      form.setValue("name", categoryToEdit.name);
      form.setValue("description", categoryToEdit.description);
      setEditingCategory(id);
    }
  };

  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  async function onSubmit(values: FormValues) {
    const errors: Record<string, string> = {};

    if (values.name.trim() === "") {
      errors.name = "Nama Harus Diisi";
    }
    if (values.description.trim() === "") {
      errors.description = "Deskripsi Harus Diisi";
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      console.error(errors);
      return;
    }

    const userId = user?.id as number;

    if (editingCategory) {
      await apiCategory
        .update(editingCategory, { ...values, userId })
        .then((res) => console.log(res));
      setEditingCategory(null);
    } else {
      await apiCategory
        .add({ ...values, userId })
        .then((res) => console.log(res));
    }

    form.reset();
    fetchCategories();
  }

  if (!user) navigate("/");
  else
    return (
      <Tabs defaultValue={defaultValue} className="w-[400px] flex flex-col">
        <TabsList className="w-full flex justify-around">
          <TabsTrigger value="create" asChild>
            <Link to="/category/add">
              {editingCategory ? "Edit" : "Tambah"} Kategori
            </Link>
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
                      <Input
                        type="text"
                        {...field}
                        placeholder="Nama Kategori"
                      />
                    </FormControl>
                    <FormDescription>Masukkan Nama Kategori</FormDescription>
                    {formErrors.name && (
                      <FormMessage>{formErrors.name}</FormMessage>
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
                      <Textarea placeholder="Deskripsi Kategori" {...field} />
                    </FormControl>
                    <FormDescription>
                      Masukkan Deskripsi Kategori
                    </FormDescription>
                    {formErrors.description && (
                      <FormMessage>{formErrors.description}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <Button type="submit">
                {editingCategory ? "Update Kategori" : "Submit"}
              </Button>
            </form>
          </Form>
        </TabsContent>
        <TabsContent value="see" className="p-4">
          <ul className="flex flex-col list-decimal gap-3">
            {categories &&
              categories
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((category, i) => (
                  <li key={category.id} className="flex justify-between">
                    {i + 1}. {category.name}{" "}
                    <DropdownMenu>
                      <DropdownMenuTrigger className="border rounded-full p-2">
                        Pilih Opsi
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => handleDelete(category?.id)}
                        >
                          Hapus
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleEdit(category?.id)}
                        >
                          Update
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </li>
                ))}
          </ul>
        </TabsContent>
      </Tabs>
    );
};

export default CategoryPage;
