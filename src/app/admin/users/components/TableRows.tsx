import { deleteUser } from "@/app/action/user/dbOperation";
import { Button } from "@/components/ui/button";
import {
  // Table,
  // TableBody,
  TableCell,
  // TableHead,
  // TableHeader,
  TableRow,
  //  TableCaption,
} from "@/components/ui/table";
//import { deleteProduct } from "@/app/action/products/dbOperation";
import { userType } from "@/lib/types/userType";

import { MdDeleteForever } from "react-icons/md";
//import { useRouter  } from "next/navigation";
function TableRows({ user }: { user: userType }) {
  async function handleDelete(user: userType) {
    // confirm("Do you want to delete user!\n If yes click OK \n If not click Cancel.");
   if(confirm(
      "Möchten Sie den Benutzer löschen?\n Falls ja, klicken Sie auf OK. \n Falls nicht, klicken Sie auf Cancel."
    )){

    const result = await deleteUser(user.id, "user.image");
    if (result.message.success === "ok") {
      location.reload();
    } else {
      alert("Failed");
    }

  }else{
    return false;
  }



    
  }

  return (
    <TableRow
      key={user.id}
      className="whitespace-nowrap bg-slate-50 rounded-lg p-1 my-1"
    >
      <TableCell>{user.id}</TableCell>
      <TableCell>{user.username}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.role}</TableCell>
      <TableCell>
        <p className="flex gap-3">
          {/* <Link
            href={{
              pathname: `/admin/users/editform`,
              //  pathname: "/admin/products/editform",
              query: {
                id: user.id,
              },
            }}
          >
            <Button size="sm" className="bg-red-500 px-1 py-0">
              <CiEdit size={20} className="text-white" />
            </Button>
          </Link> */}
          {/* <Button onClick={async () => {await deleteItem("foobar")}} className="p-1">  <CiEdit /></Button> */}

          <Button
            onClick={() => handleDelete(user)}
            size="sm"
            className="bg-red-600 px-1 py-0 "
          >
            <MdDeleteForever size={20} className="text-white" />
          </Button>
        </p>
      </TableCell>
      <TableCell>{user.time!}</TableCell>
    </TableRow>
  );
}

export default TableRows;
