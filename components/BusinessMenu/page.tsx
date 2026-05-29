"use client";

import { useEffect, useState } from "react";
import { ImageIcon } from "lucide-react";
import { MenuItemModel } from "@/data/Interfaces/Interfaces";
import {
  getMenuItemsByBusinessId,
  MENU_CATEGORIES,
} from "@/data/lib/menu-services";

type BusinessMenuProps = {
  businessId: number;
  refreshKey?: number;
};

const BusinessMenu = ({ businessId, refreshKey = 0 }: BusinessMenuProps) => {
  const [items, setItems] = useState<MenuItemModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setIsLoading(true);
      try {
        const data = await getMenuItemsByBusinessId(businessId);
        if (!cancelled) setItems(data);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    if (businessId) load();
    return () => {
      cancelled = true;
    };
  }, [businessId, refreshKey]);

  const usedCategories = Array.from(
    new Set(items.map((i) => i.category?.trim() || "Other"))
  );
  const orderedCategories = [
    ...MENU_CATEGORIES.filter((c) => usedCategories.includes(c)),
    ...usedCategories.filter((c) => !MENU_CATEGORIES.includes(c as any)),
  ];

  const formatPrice = (price: number) =>
    `$${Number(price ?? 0).toFixed(2)}`;

  return (
    <section>
      <h2 className="text-[28px] lg:text-[32px] text-white font-bold mb-4">
        Menu
      </h2>

      {isLoading ? (
        <p className="text-[#bbb]">Loading menu...</p>
      ) : items.length === 0 ? (
        <div className="bg-[#2D2D2D] border border-gray-600 rounded-lg p-6 w-full md:w-[85%]">
          <p className="text-white text-lg">
            This business does not have a menu yet. Please come back shortly.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {orderedCategories.map((category) => {
            const categoryItems = items.filter(
              (i) => (i.category?.trim() || "Other") === category
            );
            if (categoryItems.length === 0) return null;

            return (
              <div key={category}>
                <h3 className="text-xl font-bold text-[#C95A23] mb-3 border-b border-[#ffffff22] pb-1">
                  {category}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {categoryItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 bg-[#3a3a3a] rounded-lg p-3"
                    >
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-md overflow-hidden bg-[#2d2d2d] border border-[#555] flex items-center justify-center shrink-0">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon size={26} className="text-[#777]" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2">
                          <p className="font-semibold text-white truncate">
                            {item.name}
                          </p>
                          <span className="text-[#C95A23] font-bold shrink-0">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                        {item.description && (
                          <p className="text-sm text-[#cfcfcf] mt-1 line-clamp-3">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default BusinessMenu;
