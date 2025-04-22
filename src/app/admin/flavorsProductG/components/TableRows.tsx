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
//import Image from "next/image";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { deleteProduct } from "@/app/action/flavorsProductG/dbOperation";
import { flavorsProductGType } from "@/lib/types/flavorsProductGType";
function TableRows({ product }:{product:flavorsProductGType}){

//const router = useRouter();

 async function handleDelete(product:flavorsProductGType) {

 if (confirm("Möchten Sie die flavors löschen?\n Falls ja, klicken Sie auf OK. \n Falls nicht, klicken Sie auf Cancel.")) {
  await deleteProduct(product.id!)
      // if(result.errors){
//   alert(result.errors)
// }else{
  // router.push('/admin/deliverys')
   //   router.refresh()
   location.reload()
   //}
     } else {
       return false;
     }


      

  }

  return (
    <TableRow key={product.id} className="whitespace-nowrap bg-slate-50 rounded-lg p-1 my-1">
      <TableCell>{product.name}</TableCell>
      <TableCell>&#8364; {product.price}</TableCell>
      {/* <TableCell>
        <div className=" px-3 py-1 text-center ">
          {product?.image&&
          <Image
            className="h-12 w-12 object-cover rounded-md border p-1"
            src={product?.image}
            width={100}
            height={100}
            alt={product.name}
          />}
        </div>
      </TableCell> */}

      {/* <TableCell>{product.productCat}</TableCell> */}
      <TableCell>{product.productDesc}</TableCell>
      {/* <TableCell>       
        {product?.isFeatured === true && (
          <span className="ml-2 bg-gradient-to-tr from-blue-500 to-indigo-400 text-white text-[10px] rounded-full px-3 py-1">
            Featured
          </span>
        )}
      </TableCell> */}

      <TableCell>
        <p className="flex gap-3">
          <Link
            href={{
            //  pathname: `/admin/productsauces/editform?id=${product.id}`,
             pathname: "/admin/flavorsProductG/editform",
              query: {
                id: product.id,
               },
            }
          }
          >
            <Button size="sm" className="bg-red-500 px-1 py-0">
              {" "}
              <CiEdit size={20} className="text-white" />
            </Button>
          </Link>
          {/* <Button onClick={async () => {await deleteItem("foobar")}} className="p-1">  <CiEdit /></Button> */}

          <Button onClick={()=>handleDelete(product)} size="sm" className="bg-red-600 px-1 py-0 ">
            <MdDeleteForever size={20} className="text-white" />
          </Button>
        </p>
      </TableCell>
    </TableRow>
  );
};

export default TableRows;
