import {
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import Link from "next/link";
import { deliveryType } from "@/lib/types/deliveryType";
import { deletedelivery } from "@/app/(universal)/action/delivery/dbOperation";

function TableRows({ delivery }: { delivery: deliveryType }) {
  async function handleDelete(delivery: deliveryType) {
    const confirmDelete = confirm(
      "Möchten Sie die Lieferung löschen?\nFalls ja, klicken Sie auf OK.\nFalls nicht, klicken Sie auf Cancel."
    );
    if (confirmDelete) {
      await deletedelivery(delivery.id!);
      location.reload();
    }
  }

  return (
    <TableRow className="whitespace-nowrap hover:bg-green-50 dark:hover:bg-zinc-800 transition rounded-xl">
      <TableCell className="font-medium">{delivery.name}</TableCell>
      <TableCell>€{delivery.price}</TableCell>
      <TableCell>€{delivery.minSpend}</TableCell>
      <TableCell>{delivery.deliveryDistance}</TableCell>
      <TableCell>{delivery.deliveryDesc}</TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Link
            href={{
              pathname: "/admin/delivery/editform",
              query: { id: delivery.id },
            }}
          >
            <Button size="sm" className="bg-blue-500 hover:bg-blue-600 px-2 py-1">
              <CiEdit size={18} className="text-white" />
            </Button>
          </Link>
          <Button
            onClick={() => handleDelete(delivery)}
            size="sm"
            className="bg-red-600 hover:bg-red-700 px-2 py-1"
          >
            <MdDeleteForever size={18} className="text-white" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default TableRows;
