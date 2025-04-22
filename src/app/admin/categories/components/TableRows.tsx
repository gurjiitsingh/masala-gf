import {
  //Table,
  //TableBody,
  TableCell,
  //TableHead,
  //TableHeader,
  TableRow,
  //TableCaption,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
// import Link from "next/link";
import { MdDeleteForever } from "react-icons/md";
// import { CiEdit } from "react-icons/ci";
// import Image from "next/image";

import Image from "next/image";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { categoryType } from "@/lib/types/categoryType";
import { deleteCategory } from "@/app/action/category/dbOperations";
function TableRows({ category }: { category: categoryType }) {
  //const router = useRouter();

  async function handleDelete(category: categoryType) {

 if (confirm("Möchten Sie die Kategorie löschen?\n Falls ja, klicken Sie auf OK. \n Falls nicht, klicken Sie auf Cancel.")) {
  const result = await deleteCategory(category.id!, category.image!);
  if (result.errors) {
    alert(result.errors);
  } else {
    // router.push('/admin/products')
    //   router.refresh()
    location.reload();
  }
   } else {
     return false;
   }


  }

  return (
    <TableRow
      key={category.id}
      className="whitespace-nowrap bg-slate-50 rounded-lg p-1 my-1"
    >
      <TableCell>
        <div className=" px-3 py-1 text-center min-w-[100px]">
          {category?.image && (
            <Image
              className="h-12 w-12 object-cover rounded-md border p-1"
              src={category?.image}
              width={100}
              height={100}
              alt={category.name}
            />
          )}
        </div>
      </TableCell>
      <TableCell>{category.sortOrder}.&nbsp;{category.name}</TableCell>

      <TableCell>{category.isFeatured}</TableCell>
      {/* <TableCell></TableCell> */}
      <TableCell>{category.desc}</TableCell>
      {/* <TableCell>
        {category?.isFeatured === true && (
          <span className="ml-2 bg-gradient-to-tr from-blue-500 to-indigo-400 text-white text-[10px] rounded-full px-3 py-1">
            Featured
          </span>
        )}
      </TableCell> */}
    
      <TableCell>
        <p className="flex gap-3">
          <Link
            href={{
              pathname: `/admin/categories/editform`,
              //  pathname: "/admin/products/editform",
              query: {
                id: category?.id,
              },
            }}
          >
            <Button size="sm" className="bg-red-500 px-1 py-0">
              {" "}
              <CiEdit size={20} className="text-white" />
            </Button>
          </Link>
          {/* <Button onClick={async () => {await deleteItem("foobar")}} className="p-1">  <CiEdit /></Button> */}

          <Button
            onClick={() => handleDelete(category)}
            size="sm"
            className="bg-red-600 px-1 py-0 "
          >
            <MdDeleteForever size={20} className="text-white" />
          </Button>
        </p>
      </TableCell>

      <TableCell>
        <p className="flex gap-3">
          <Link
            href={{
              pathname: `/admin/productsbase`,
              //  pathname: "/admin/products/editform",
              query: {
                id: category?.id,
              },
            }}
          >
            <Button size="sm" className="bg-red-500 px-1 py-0 text-white">
              {" "}
              View Products
            </Button>
          </Link>
        </p>
      </TableCell>
    </TableRow>
  );
}

export default TableRows;
