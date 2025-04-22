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
//import { deletedelivery } from "@/app/action/delivery/dbOperation";
import { deliveryType } from "@/lib/types/deliveryType";
import { deletedelivery } from "@/app/action/delivery/dbOperation";
//import { deletedelivery } from "@/app/action/deliverys/dbOperation";
//import { useRouter  } from "next/navigation";
function TableRows({ delivery }:{delivery:deliveryType}){

//const router = useRouter();

 async function handleDelete(delivery:deliveryType) {
    // confirm("Do you want to delete Delivery!\n If yes click OK \n If not click Cancel.");
 
 
    if (confirm("Möchten Sie die Lieferung löschen?\n Falls ja, klicken Sie auf OK. \n Falls nicht, klicken Sie auf Cancel.")) {
      await deletedelivery(delivery.id!)
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
    <TableRow key={delivery.id} className="whitespace-nowrap bg-slate-50 rounded-lg p-1 my-1">
      <TableCell>{delivery.name}</TableCell>
      <TableCell> &#8364;{delivery.price}</TableCell>
      {/* <TableCell>
        <div className=" px-3 py-1 text-center ">
          {delivery?.image&&
          <Image
            className="h-12 w-12 object-cover rounded-md border p-1"
            src={delivery?.image}
            width={100}
            height={100}
            alt={delivery.name}
          />}
        </div>
      </TableCell> */}
 <TableCell>&#8364;{delivery.minSpend}</TableCell>
      {/* <TableCell>{delivery.productCat}</TableCell> */}
      <TableCell>{delivery.deliveryDistance}</TableCell>
      <TableCell>{delivery.deliveryDesc}</TableCell>
      {/* <TableCell>       
        {delivery?.deliveryDistance === true && (
          <span className="ml-2 bg-gradient-to-tr from-blue-500 to-indigo-400 text-white text-[10px] rounded-full px-3 py-1">
            Featured
          </span>
        )}
      </TableCell> */}

      <TableCell>
        <p className="flex gap-3">
          <Link
            href={{
           //   pathname: `/admin/deliverys/${delivery.id}`,
             pathname: "/admin/delivery/editform",
              query: {
                id: delivery.id,
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

          <Button onClick={()=>handleDelete(delivery)} size="sm" className="bg-red-600 px-1 py-0 ">
            <MdDeleteForever size={20} className="text-white" />
          </Button>
        </p>
      </TableCell>
    </TableRow>
  );
};

export default TableRows;
