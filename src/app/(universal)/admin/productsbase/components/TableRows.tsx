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
import { deleteProduct } from "@/app/(universal)/action/products/dbOperation";
import { ProductType } from "@/lib/types/productType";
//import { deleteProduct } from "@/app/(universal)/action/products/dbOperation";
//import { useRouter  } from "next/navigation";
function TableRows({ product }:{product:ProductType}){

//const router = useRouter();



async function handleDelete(product: ProductType) {
  const confirmDelete = confirm(
    "Möchten Sie das Produkt löschen?\nFalls ja, klicken Sie auf OK.\nFalls nicht, klicken Sie auf Cancel."
  );

  if (!confirmDelete) return false;

  console.log("Deleting product:", product);

  try {
    const result = await deleteProduct(product.id!, product.image);

    if (result?.errors) {
      alert("Fehler: " + result.errors);
    } else {
    //  alert("Produkt erfolgreich gelöscht.");
      // Option 1: Refresh router (Next.js App Router)
      // router.refresh();

      // Option 2: Full reload
      location.reload();
    }
  } catch (err) {
    console.error("Delete failed:", err);
    alert("Ein unerwarteter Fehler ist aufgetreten beim Löschen.");
  }
}

  
  const price = (product.price.toString()).replace(/\./g, ',') 
  let  discountedPrice = '';
  if(product.discountPrice !== undefined){
   discountedPrice = (product.discountPrice!.toString()).replace(/\./g, ',')
  }
  return (
    <TableRow key={product.id} className="whitespace-nowrap bg-slate-50 rounded-lg p-1 my-1">
       <TableCell>
        <div className=" px-3 py-1 text-center min-w-[100px]">
          {product?.image&&
          <Image
            className="h-12 w-12 object-cover rounded-md border p-1"
            src={product?.image}
            width={100}
            height={100}
            alt={product.name}
          />}
        </div>
      </TableCell>
      <TableCell>{product.sortOrder}.&nbsp;{product.name}</TableCell>
      <TableCell>{price}</TableCell>
      <TableCell>{discountedPrice}</TableCell>
       {/* <TableCell>{product.productCat}</TableCell> */}
      {/* <TableCell></TableCell> */}
      <TableCell>{product.productDesc}</TableCell>
      <TableCell>       
        {product?.isFeatured === true && (
          <span className="ml-2 bg-gradient-to-tr from-blue-500 to-indigo-400 text-white text-[10px] rounded-full px-3 py-1">
            Featured
          </span>
        )}
      </TableCell>

      <TableCell>
        <p className="flex gap-3">
        <Link
            href={{
           //   pathname: `/admin/productsaddon/${product.id}`,
          // pathname: `/admin/${product.id}`,
             pathname: "/admin/productsaddon",
              query: {
                id: product.id,
               },
            }
          }
          >
            <Button size="sm" className="bg-red-600 text-white px-1 py-0">
            Variants
            </Button>
          </Link>



          <Link
            href={{
              pathname: `/admin/productsbase/editform`,
            //  pathname: "/admin/products/editform",
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
