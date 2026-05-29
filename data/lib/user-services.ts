import { ChangePasswordRequest, UpdateUserProfileRequest, UserAccountInfo, UserInfo, UserModel } from "../Interfaces/Interfaces";
import { API_BASE_URL } from "./api-config";

const url = API_BASE_URL + "User/";

export const createAccount = async (user: UserAccountInfo) => {
  const res = await fetch(url + "CreateAccount", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user)
  })
  if (!res.ok) {
    const data = await res.json();
    const message = data.message;

    console.log(`Account creation faied:${message}`);
    return data.success;
  };

  const data = await res.json();
  console.log(`Account creation successful: ${data.success}`)
  return data.success;
};

export const login = async (user: UserInfo) => {
  const res = await fetch(url + "Login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  let data: any = null;

  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    console.log(data?.message ?? "Login failed");
    return {
      success: false,
      message: data?.message ?? "Login failed",
      token: null,
    };
  }

  return {
    success:
      typeof data === "boolean"
        ? data
        : data?.success ?? !!data?.token,
    message: data?.message ?? "",
    token: data?.token ?? null,
  };
};

export const deleteUser = async (user: UserModel) => {
  const res = await fetch(url + "DeleteUser", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  });

  if (!res.ok) {
    const data = await res.json();
    const message = data.message;

    console.log(message);
    return data.success;
  }

  const data = await res.json();
  return data.success;
}

export const changePassword = async (passwordData: ChangePasswordRequest) => {
  const res = await fetch(url + "ChangePassword", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(passwordData),
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Failed to change password.");
  }

  return await res.json();
};

export const updateUserProfile = async (userId: number, updatedUser: UpdateUserProfileRequest): Promise<boolean> => {
  const res = await fetch(`${url}UpdateUserProfile/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  });

  if (!res.ok) {
    return false;
  }

  return await res.json();
};

export const getAllUsers = async () => {
  const res = await fetch(url + "GetAllUsers")

  if (!res.ok) {
    const data = await res.json();
    const message = data.message;

    console.log(message);
    return data.success;
  }

  const data = await res.json();
  return data.success;
};

export const getUserById = async (id: number) => {
  const res = await fetch(url + `GetUserById/${id}`)

  if (!res.ok) {
    console.log("Failed to fetch user by id:", id);
    return null;
  }

  return await res.json();
};

export const getUserByUsername = async (username: string) => {
  const res = await fetch(url + `GetUserByUsername/${username}`)

  if (!res.ok) {
    const data = await res.json();
    const message = data.message;

    console.log(message);
    return data.message;
  }

  const data = await res.json();
  return data;
};

export const IsTokenValid = (): boolean => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  return token != null;
};

export const GrabToken = (): string => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  return token ?? "";
};

export const LoggedInUser = () => JSON.parse(localStorage.getItem("user")!);