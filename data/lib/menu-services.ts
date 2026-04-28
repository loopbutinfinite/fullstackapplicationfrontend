import { CreateMenuItemModel, MenuItemModel } from "../Interfaces/Interfaces";

const url = "https://csa-2526-munchr-a8dbh8ckfddrewh7.westus3-01.azurewebsites.net/MenuItem/";

export const GetMenuItemsByBusinessId = async (
  businessId: number
): Promise<MenuItemModel[]> => {
  const res = await fetch(`${url}GetMenuItemsByBusinessId/${businessId}`);

  if (!res.ok) {
    console.error("Failed to fetch menu items.");
    return [];
  }

  return await res.json();
};

export const CreateMenuItem = async (
  menuItem: CreateMenuItemModel
): Promise<boolean> => {
  const res = await fetch(`${url}CreateMenuItem`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(menuItem),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Failed to create menu item:", errorText);
    return false;
  }

  return await res.json();
};