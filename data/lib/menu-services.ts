import { CreateMenuItemModel, MenuItemModel } from "../Interfaces/Interfaces";
import { API_BASE_URL } from "./api-config";

const url = API_BASE_URL + "MenuItem/";

export const MENU_CATEGORIES = [
  "Main Dishes",
  "Sides",
  "Drinks",
  "Desserts",
] as const;

export const getMenuItemsByBusinessId = async (
  businessId: number
): Promise<MenuItemModel[]> => {
  const res = await fetch(url + `GetMenuItemsByBusinessId/${businessId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    console.log("Failed to fetch menu items for business:", businessId);
    return [];
  }

  return await res.json();
};

export const createMenuItem = async (
  item: CreateMenuItemModel,
  token: string
): Promise<{ success: boolean; message?: string; data?: MenuItemModel }> => {
  const res = await fetch(url + "CreateMenuItem", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(item),
  });

  const text = await res.text();
  let data: any = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    return {
      success: false,
      message:
        typeof data === "string" ? data : data?.message ?? "Failed to add menu item.",
    };
  }

  return { success: true, data };
};

export const deleteMenuItem = async (
  id: number,
  token: string
): Promise<{ success: boolean; message?: string }> => {
  const res = await fetch(url + `DeleteMenuItem/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    return { success: false, message: text || "Failed to delete menu item." };
  }

  return { success: true };
};
