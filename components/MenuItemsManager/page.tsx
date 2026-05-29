"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, ImageIcon, UtensilsCrossed } from "lucide-react";
import { MenuItemModel } from "@/data/Interfaces/Interfaces";
import {
  getMenuItemsByBusinessId,
  createMenuItem,
  deleteMenuItem,
  MENU_CATEGORIES,
} from "@/data/lib/menu-services";

type MenuItemsManagerProps = {
  businessId: number;
  onChange?: () => void;
  className?: string;
};

const inputClass =
  "w-full bg-[#5a5a5a] border border-[#6a6a6a] rounded-lg px-3 py-2 text-white placeholder-[#999] focus:outline-none focus:border-[#C95A23] focus:ring-1 focus:ring-[#C95A23] transition-colors text-sm";
const labelClass =
  "block text-xs font-semibold text-[#bbb] mb-1 uppercase tracking-wide";

const MenuItemsManager = ({
  businessId,
  onChange,
  className = "",
}: MenuItemsManagerProps) => {
  const [items, setItems] = useState<MenuItemModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // New-item form state
  const [name, setName] = useState("");
  const [category, setCategory] = useState<string>(MENU_CATEGORIES[0]);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const loadItems = async () => {
    setIsLoading(true);
    try {
      const data = await getMenuItemsByBusinessId(businessId);
      setItems(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (businessId) loadItems();
  }, [businessId]);

  const resetForm = () => {
    setName("");
    setCategory(MENU_CATEGORIES[0]);
    setPrice("");
    setDescription("");
    setImageUrl("");
  };

  const handleAdd = async () => {
    setError("");

    if (!name.trim()) {
      setError("Item name is required.");
      return;
    }
    const parsedPrice = Number(price);
    if (price === "" || Number.isNaN(parsedPrice) || parsedPrice < 0) {
      setError("Enter a valid price.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Session expired. Please log in again.");
      return;
    }

    try {
      setIsSaving(true);
      const result = await createMenuItem(
        {
          businessId,
          name: name.trim(),
          description: description.trim(),
          price: parsedPrice,
          category,
          imageUrl: imageUrl.trim() || null,
        },
        token
      );

      if (!result.success) {
        setError(result.message ?? "Could not add the item.");
        return;
      }

      resetForm();
      await loadItems();
      onChange?.();
    } catch {
      setError("Something went wrong adding the item.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Session expired. Please log in again.");
      return;
    }
    try {
      setDeletingId(id);
      const result = await deleteMenuItem(id, token);
      if (result.success) {
        setItems((prev) => prev.filter((i) => i.id !== id));
        onChange?.();
      } else {
        setError(result.message ?? "Could not delete the item.");
      }
    } finally {
      setDeletingId(null);
    }
  };

  const formatPrice = (p: number) => `$${Number(p ?? 0).toFixed(2)}`;

  return (
    <div className={className}>
      <div className="flex items-center gap-2 mb-4">
        <UtensilsCrossed size={18} className="text-[#C95A23]" />
        <h3 className="text-lg font-semibold text-white">Menu Items</h3>
      </div>

      <div className="bg-[#3a3a3a] rounded-lg p-4 space-y-3 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Item Name</label>
            <input
              className={inputClass}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Korean BBQ Tacos"
            />
          </div>
          <div>
            <label className={labelClass}>Category</label>
            <select
              className={inputClass}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {MENU_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Price (USD)</label>
            <input
              className={inputClass}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g. 9.50"
              type="number"
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label className={labelClass}>Image URL (optional)</label>
            <input
              className={inputClass}
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Paste a link — image upload coming soon"
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Description</label>
          <textarea
            className={`${inputClass} resize-none`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description of the item..."
            rows={2}
          />
        </div>

        {error && <p className="text-[#ff6b6b] text-xs">{error}</p>}

        <button
          type="button"
          onClick={handleAdd}
          disabled={isSaving}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#C95A23] hover:bg-[#b34e1f] disabled:opacity-60 text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm"
        >
          <Plus size={16} />
          {isSaving ? "Adding..." : "Add Item"}
        </button>
      </div>

      {isLoading ? (
        <p className="text-[#bbb] text-sm">Loading items...</p>
      ) : items.length === 0 ? (
        <p className="text-[#999] text-sm">
          No menu items yet. Add your first item above.
        </p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-3 bg-[#3a3a3a] rounded-lg p-2.5"
            >
              <div className="w-12 h-12 rounded-md overflow-hidden bg-[#2d2d2d] border border-[#555] flex items-center justify-center shrink-0">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon size={18} className="text-[#777]" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <p className="font-semibold text-white truncate">
                    {item.name}
                  </p>
                  <span className="text-[#C95A23] font-bold text-sm shrink-0">
                    {formatPrice(item.price)}
                  </span>
                </div>
                <p className="text-xs text-[#aaa]">
                  {item.category || "Other"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                disabled={deletingId === item.id}
                className="text-[#ff6b6b] hover:text-[#ff9b9b] disabled:opacity-50 p-2 shrink-0"
                title="Delete item"
                aria-label={`Delete ${item.name}`}
              >
                <Trash2 size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MenuItemsManager;
