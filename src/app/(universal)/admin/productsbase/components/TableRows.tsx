"use client";

import {
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import Image from "next/image";
import Link from "next/link";
import { deleteProduct } from "@/app/(universal)/action/products/dbOperation";
import { ProductType } from "@/lib/types/productType";
import { formatCurrencyNumber } from '@/utils/formatCurrency';
import { UseSiteContext } from "@/SiteContext/SiteContext";
import { useLanguage } from '@/store/LanguageContext';

function TableRows({ product }: { product: ProductType }) {
  const { settings } = UseSiteContext();
  const { TEXT } = useLanguage();
  
  const price = formatCurrencyNumber(
    Number(product.price) ?? 0,
    (settings.currency || 'EUR') as string,
    (settings.locale || 'de-DE') as string
  );

  let discountedPrice = "";
  if (product.discountPrice !== undefined) {
    discountedPrice = formatCurrencyNumber(
      Number(product.discountPrice) ?? 0,
      (settings.currency || 'EUR') as string,
      (settings.locale || 'de-DE') as string
    );
  }

  const statusLabel = product.status ?? "draft";
  const statusStyles = {
    published: "bg-green-100 text-green-800",
    draft: "bg-yellow-100 text-yellow-800",
    out_of_stock: "bg-red-100 text-red-800",
  };

  async function handleDelete(product: ProductType) {
    const confirmDelete = confirm(TEXT.confirm_delete_product || "Do you want to delete the product?");
    if (!confirmDelete) return;

    try {
      const result = await deleteProduct(product.id!, product.image);
      if (result?.errors) {
        alert(TEXT.error_delete_failed + result.errors);
      } else {
        location.reload();
      }
    } catch (err) {
      console.error("Delete failed:", err);
      alert(TEXT.error_unexpected_delete || "Unexpected error while deleting.");
    }
  }

  return (
    <TableRow key={product.id} className="whitespace-nowrap hover:bg-green-50 dark:hover:bg-zinc-800 transition rounded-xl">
      <TableCell>
        <div className="px-3 py-1 text-center min-w-[100px]">
          {product.image && (
            <Image
              className="h-12 w-12 object-cover rounded-md"
              src={product.image}
              width={100}
              height={100}
              alt={product.name}
            />
          )}
        </div>
      </TableCell>

      <TableCell className="whitespace-normal break-words max-w-[180px]">
        {product.sortOrder}.&nbsp;{product.name}
      </TableCell>

      <TableCell>{price}</TableCell>
      <TableCell>{discountedPrice}</TableCell>

      <TableCell>
        <span
          className={`text-xs px-2 py-1 rounded-full capitalize font-semibold ${
            statusStyles[statusLabel as keyof typeof statusStyles] || "bg-gray-100 text-gray-700"
          }`}
        >
          {statusLabel.replace(/_/g, " ")}
        </span>
      </TableCell>

      <TableCell className="whitespace-normal break-words max-w-[200px]">
        {product.productDesc}
      </TableCell>

      <TableCell>
        {product?.isFeatured === true && (
          <span className="ml-2 bg-gradient-to-tr from-blue-500 to-indigo-400 text-white text-[10px] rounded-full px-3 py-1">
            {TEXT.status_featured || "Featured"}
          </span>
        )}
      </TableCell>

      <TableCell>
        <div className="flex gap-3">
          <Link
            href={{
              pathname: "/admin/productsbase/editform",
              query: { id: product.id },
            }}
          >
            <Button size="sm" className="bg-red-500 px-1 py-0">
              <CiEdit size={20} className="text-white" />
            </Button>
          </Link>

          <Link
            href={{
              pathname: "/admin/productsaddon",
              query: { id: product.id },
            }}
          >
            <Button size="sm" className="bg-red-600 text-white px-1 py-0">
              {TEXT.button_variants || "Variants"}
            </Button>
          </Link>

          <Button
            onClick={() => handleDelete(product)}
            size="sm"
            className="bg-red-600 px-1 py-0"
          >
            <MdDeleteForever size={20} className="text-white" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default TableRows;
