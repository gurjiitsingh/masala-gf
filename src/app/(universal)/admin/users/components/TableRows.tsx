import { deleteUser } from "@/app/(universal)/action/user/dbOperation";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { userType } from "@/lib/types/userType";
import { MdDeleteForever } from "react-icons/md";

function TableRows({ user }: { user: userType }) {
  async function handleDelete(user: userType) {
    const confirmDelete = confirm(
      "Möchten Sie den Benutzer löschen?\nFalls ja, klicken Sie auf OK.\nFalls nicht, klicken Sie auf Cancel."
    );
    if (!confirmDelete) return;

    const result = await deleteUser(user.id, "user.image");
    if (result.message.success === "ok") {
      location.reload();
    } else {
      alert("Failed");
    }
  }

  return (
    <TableRow className="whitespace-nowrap hover:bg-green-50 dark:hover:bg-zinc-800 transition rounded-xl">
      {/* <TableCell>{user.id}</TableCell> */}
      <TableCell>{user.username}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.role}</TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button
            onClick={() => handleDelete(user)}
            size="sm"
            className="bg-red-600 hover:bg-red-700 px-2 py-1"
          >
            <MdDeleteForever size={18} className="text-white" />
          </Button>
        </div>
      </TableCell>
      <TableCell>{user.time!}</TableCell>
    </TableRow>
  );
}

export default TableRows;
