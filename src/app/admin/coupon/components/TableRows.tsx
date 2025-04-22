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
import { deletecoupon } from "@/app/action/coupon/dbOperation";
import { couponType } from "@/lib/types/couponType";
//import { deletecoupon } from "@/app/action/coupons/dbOperation";
//import { useRouter  } from "next/navigation";
function TableRows({ coupon }:{coupon:couponType}){

//const router = useRouter();
console.log("copoun data------------",coupon)
 async function handleDelete(coupon:couponType) {

   if (confirm("Möchten Sie den Gutschein löschen?\n Falls ja, klicken Sie auf OK. \n Falls nicht, klicken Sie auf Cancel.")) {
    const result = await deletecoupon(coupon.id!)
    location.reload()
   } else {
     return false;
   }

  }

  return (
    <TableRow key={coupon.id} className="whitespace-nowrap bg-slate-50 rounded-lg p-1 my-1">
      <TableCell>{coupon.name}</TableCell>
      <TableCell>{coupon.discountType ==='flate'? <>flate &#8364;{coupon.price}</>:<>%{coupon.price}</>}</TableCell>
      {/* <TableCell>
        <div className=" px-3 py-1 text-center ">
          {coupon?.image&&
          <Image
            className="h-12 w-12 object-cover rounded-md border p-1"
            src={coupon?.image}
            width={100}
            height={100}
            alt={coupon.name}
          />}
        </div>
      </TableCell> */}
 <TableCell>&#8364;{coupon.minSpend}</TableCell>
      {/* <TableCell>{coupon.productCat}</TableCell> */}
 
      <TableCell>{coupon.expiry}</TableCell>
      <TableCell>{coupon.date}</TableCell>
      {/* <TableCell>       
        {coupon?.isFeatured === true && (
          <span className="ml-2 bg-gradient-to-tr from-blue-500 to-indigo-400 text-white text-[10px] rounded-full px-3 py-1">
            Featured
          </span>
        )}
      </TableCell> */}

      <TableCell>
        <p className="flex gap-3">
          <Link
            href={{
             // pathname: `/admin/coupons/${coupon.id}`,
             pathname: "/admin/coupon/editform",
              query: {
                id: coupon.id,
               },
            }
          }
          >
            <Button size="sm" className="bg-red-500 px-1 py-0">
             
              <CiEdit size={20} className="text-white" />
            </Button>
          </Link>
          {/* <Button onClick={async () => {await deleteItem("foobar")}} className="p-1">  <CiEdit /></Button> */}

          <Button onClick={()=>handleDelete(coupon)} size="sm" className="bg-red-600 px-1 py-0 ">
            <MdDeleteForever size={20} className="text-white" />
          </Button>
        </p>
      </TableCell>
      <TableCell>{coupon.couponDesc}</TableCell>
    </TableRow>
  );
};

export default TableRows;
