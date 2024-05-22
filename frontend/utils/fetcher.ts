import { headers } from "next/headers";

export async function GetDataApi(url: string): Promise<any> {
  try {
    const response = await fetch(url, {
      headers: headers(),
      credentials: "include",
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function PostDataApi(url: string, payload: any): Promise<any> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(payload),
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function PatchDataApi(url: string, payload: any): Promise<any> {
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: headers(),
      body: JSON.stringify(payload),
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function DeleteDataApi(url: string): Promise<any> {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: headers(),
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}
