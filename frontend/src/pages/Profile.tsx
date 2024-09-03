import { useAppContext } from "@/components";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

const Profile = () => {
  const { user, userData, navigate } = useAppContext();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    userData();
    setLoading(false);
  }, [userData]);

  if (!user) navigate("/");
  else if (loading) {
    return (
      <Card className="w-[90vw] p-4 bg-white shadow-md rounded-lg">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          <div className="space-y-4">
            <div className="flex items-center">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-6 w-2/3 ml-4" />
            </div>
            <div className="flex items-center">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-6 w-2/3 ml-4" />
            </div>
            <div className="flex items-center">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-6 w-2/3 ml-4" />
            </div>
            <div className="flex items-center">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-6 w-2/3 ml-4" />
            </div>
            <div className="flex items-center">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-6 w-2/3 ml-4" />
            </div>
            <div className="flex flex-col">
              <Skeleton className="h-6 w-1/3" />
              <div className="mt-2 space-y-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>{/* Additional footer content if needed */}</CardFooter>
      </Card>
    );
  } else {
    return (
      <Card className="w-[90vw] p-4 bg-white shadow-md rounded-lg">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="font-bold w-1/3">Nama:</span>
              <span>{user.name}</span>
            </div>
            <div className="flex items-center">
              <span className="font-bold w-1/3">Jenis Kelamin:</span>
              <span>{user.gender}</span>
            </div>
            <div className="flex items-center">
              <span className="font-bold w-1/3">Email:</span>
              <span>{user.emailDomain}</span>
            </div>
            <div className="flex items-center">
              <span className="font-bold w-1/3">Tanggal Daftar:</span>
              <span>{new Date(user.joinAt).toDateString()}</span>
            </div>
            <div className="flex items-center">
              <span className="font-bold w-1/3">Terakhir Update:</span>
              <span>
                {user.lastUpdated
                  ? new Date(user.lastUpdated).toDateString()
                  : null}
              </span>
            </div>
            <div className="flex overflow-y-scroll">
              <span className="font-bold w-1/3">Terakhir Login:</span>
              <ul>
                {user.lastLogin
                  .map((date) => new Date(date)) // Ubah string ke objek Date
                  .sort((a, b) => b.getTime() - a.getTime()) // Urutkan dari terbaru
                  .map((date, index) => (
                    <li key={index}>{date.toDateString()}</li>
                  ))}
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter>{/* Additional footer content if needed */}</CardFooter>
      </Card>
    );
  }
};

export default Profile;
