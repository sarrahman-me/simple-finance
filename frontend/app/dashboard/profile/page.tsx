/* eslint-disable @next/next/no-img-element */
import { LogoutButton } from "@/components/atoms";
import { AppBar } from "@/components/molecules";
import { GetDataApi } from "@/utils/fetcher";

export default async function Page() {
  const {
    data,
  }: {
    data: {
      name: string;
      username: string;
      email: string;
      iat: number;
    };
  } = await GetDataApi(`${process.env.NEXT_PUBLIC_HOST}/api/auth/profile`);

  return (
    <div className="space-y-8">
      <AppBar title="Profile" />
      <div className="flex justify-center items-center">
        <div className="bg-white p-6 rounded shadow-sm max-w-sm w-full">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <img
                  className="h-12 w-12 rounded-full"
                  src={`https://api.dicebear.com/8.x/initials/svg?seed=${data.username}`}
                  alt={data.username}
                />
              </div>
              <div>
                <p className="text-lg font-medium">{data.name}</p>
                <p className="text-sm text-gray-500">{data.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <LogoutButton />
      </div>
    </div>
  );
}
