import { apiAuth } from "@/api";
import { LoginData } from "@/types";
import { useForm } from "react-hook-form";
import { useAppContext } from "./auth/useAppContext";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const LoginModal = ({
  isOpen,
  setIsOpen,
  toggleLoginModal,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleLoginModal: () => void;
}) => {
  const { handleLogin } = useAppContext();
  const form = useForm<LoginData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginData) => {

    try {
      const res = await apiAuth.login(values);

      console.log("Login Data: ", res);
      if (res.data.ok) {
        handleLogin(res.data.data.token);
        toggleLoginModal();
      } else throw new Error(JSON.stringify(res));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogOverlay className="fixed bg-black bg-opacity-30 transition-opacity duration-300" />
      <DialogContent
        className="w-1/2 fixed flex flex-col items-center justify-center transition-opacity duration-300 dark:text-dark-title"
        aria-label="Login Modal"
      >
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
