import { useAppContext } from "@/components";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const HomeGuest = () => {
  const { user, navigate } = useAppContext();

  if (user) navigate("/dashboard");
  else
    return (
      <>
        <Card className="m-8 p-6">
          <CardHeader>
            <CardTitle>Selamat Datang di Aplikasi Kami!</CardTitle>
            <CardDescription>
              Aplikasi ini membantu Anda untuk mengelola transaksi debit dan
              kredit dengan mudah dan efisien.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              Beberapa fitur utama yang tersedia dalam aplikasi ini:
            </p>
            <ul className="list-disc ml-6 mt-4">
              <li>Manajemen transaksi debit dan kredit</li>
              <li>Pelaporan keuangan yang lengkap dan akurat</li>
              <li>Analisis data yang mendalam dengan berbagai macam grafik</li>
            </ul>
          </CardContent>
        </Card>
      </>
    );
};

export default HomeGuest;
