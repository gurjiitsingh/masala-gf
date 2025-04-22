import { deleteOrderMasterRec } from "@/app/action/orders/dbOperations";
import {
 // Table,
  // TableBody,
  TableCell,
 // TableHead,
 // TableHeader,
  TableRow,
//  TableCaption,
} from "@/components/ui/table";
import { orderMasterDataT } from "@/lib/types/orderMasterType";

import Link from "next/link";
import { MdDeleteForever } from "react-icons/md";
function TableRows({ order }:{order:orderMasterDataT}){

  async function handleDelete(id:string){
   
    if (confirm("Do you want delete order.")) {
      deleteOrderMasterRec(id)
   } else {
     return false;
   }

   
  }

  return (
    <TableRow className="whitespace-nowrap bg-slate-50 rounded-lg p-1 my-1">
       <TableCell>
       <Link className="p-1 rounded-2xl bg-amber-400 " href={
        {
           pathname: `/admin/orders/order-detail`,
         query: { masterId: order.id, userId: order.userId,addressId:order.addressId 

         } }}> #{order.srno}</Link>
        
       </TableCell>
       <TableCell>{order.customerName}</TableCell>
      <TableCell>{order.time}</TableCell>
      <TableCell>{order.status}</TableCell>
        <TableCell>&#8364;{order.endTotalG}</TableCell>
        <TableCell>{order.paymentType}</TableCell>
        <TableCell>{order.totalDiscountG}%</TableCell>
        <TableCell>&#8364;{order.flatDiscount}</TableCell>
      <TableCell className="flex  gap-2 items-center">
      
         
             <button onClick={()=>handleDelete(order.id)}  className="bg-red-600 px-1 py-0 text-sm rounded-md">
            <MdDeleteForever size={20} className="text-white" />
          </button>
         
         </TableCell>
     </TableRow>
  );
};

export default TableRows;
