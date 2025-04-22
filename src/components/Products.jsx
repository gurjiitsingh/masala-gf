
import Link from "next/link";
// import FavoriteButton from "./FavoriteButton";
// import AuthContextProvider from "@/contexts/AuthContext";
// import AddToCartButton from "./AddToCartButton";
//import { getProductReviewCounts } from "@/lib/firestore/products/count/read";
import { Suspense } from "react";
//import MyRating from "./MyRating";






const products = [
  {
    id: '8b1ad2d6-9626-45bb-bd41-94b9af2cea68',
    name: 'Gurjit Singh',
    price: '345',
    brand: 'Samsung',
    category: 'LAPTOP',
    Desc: 'sdfsf',
    image: 'https://res.cloudinary.com/dyhs5oy4s/image/upload/v1730454565/nextjs-course-mutations/klbqwgbva7rcakibywku.jpg',
    isFeatured: false,
    weight: '10',
    dimensions: '1x8x9'
  },
  {
    id: '68484d16-afb2-4c2f-88f7-f56a0bdbac4f',
    name: 'IDEAPAD 678',
    price: '945',
    brand: 'Samsung',
    category: 'LAPTOP',
    Desc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has',        
    image: 'https://res.cloudinary.com/dyhs5oy4s/image/upload/v1730454417/nextjs-course-mutations/zfa3h8i63ilmknq1ro5t.jpg',
    isFeatured: true,
    weight: '1',
    dimensions: '1x8x9'
  },
  {
    id: 'c0f92606-c817-4317-8422-dcad17cc5257',
    name: 'SAMSUNG TV',
    price: '945',
    brand: 'Samsung',
    category: 'LAPTOP',
    Desc: 'it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum',
    image: 'https://res.cloudinary.com/dyhs5oy4s/image/upload/v1730389939/nextjs-course-mutations/x4winbwpi3hmrkgahjql.jpg',
    isFeatured: false,
    weight: '1',
    dimensions: '1x8x9'
  },
  {
    id: '6560482b-659b-4c23-bb42-1b22a1a0131a',
    name: 'IDEAPAD 111',
    price: '945',
    brand: 'Samsung',
    category: 'LCD TV',
    Desc: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour,',
    image: 'https://res.cloudinary.com/dyhs5oy4s/image/upload/v1730390000/nextjs-course-mutations/cyhb7a8c8eijvng85s3h.jpg',
    isFeatured: false,
    weight: '1',
    dimensions: '1x8x9'
  },
  {
    id: '13506810-ef32-4b3a-b7b4-3424ee0f44e9',
    name: 'DEL Computer Desktop',
    price: '945',
    brand: 'Samsung',
    category: 'LAPTOP',
    Desc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using ',
    image: 'https://res.cloudinary.com/dyhs5oy4s/image/upload/v1730390015/nextjs-course-mutations/kvlrwnhmlhnpttqjdssd.jpg',
    isFeatured: false,
    weight: '1',
    dimensions: '1x8x9'
  },
  {
    id: '98e8878f-c221-44ac-9072-4c4ebbce63b6',
    name: 'IDEAPAD 678',
    price: '945',
    brand: 'Samsung',
    category: 'LAPTOP',
    Desc: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual',
    image: 'https://res.cloudinary.com/dyhs5oy4s/image/upload/v1730390030/nextjs-course-mutations/hsydwrh6ios1vbtx4xqp.jpg',
    isFeatured: false,
    weight: '1',
    dimensions: '1x8x9'
  }
]


export default function ProductsGridView() {

 
  return (
    <section className="w-full flex justify-center">
      <div className="flex flex-col gap-5 max-w-[900px] p-5">
        <h1 className="text-center font-semibold text-lg">Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {products?.map((item) => {
            return <ProductCard product={item} key={item?.id} />;
          })}
        </div>
      </div>
    </section>
  );
}

export function ProductCard({ product }) {
  return (
    <div className="flex flex-col gap-3 border p-4 rounded-lg">
      <div className="relative w-full">
        <img
          src={product?.image}
          className="rounded-lg h-48 w-full object-cover"
          alt={product?.title}
        />
        <div className="absolute top-1 right-1">
         
            {/* <FavoriteButton productId={product?.id} /> */}
        
        </div>
      </div>
      <Link href={`/products/${product?.id}`}>
        <h1 className="font-semibold line-clamp-2 text-sm">{product?.name}</h1>
      </Link>
      <div className="">
        <h2 className="text-green-500 text-sm font-semibold">
          $ {product?.salePrice}{" "}
          <span className="line-through text-xs text-gray-600">
            $ {product?.price}
          </span>
        </h2>
      </div>
      <p className="text-xs text-gray-500 line-clamp-2">
        {product?.productDesc}
      </p>
      <Suspense>
        {/* <RatingReview product={product} /> */}
      </Suspense>
      {/* {product?.stock <= (product?.orders ?? 0) && ( */}
        <div className="flex">
          <h3 className="text-red-500 rounded-lg text-xs font-semibold">
            Out Of Stock
          </h3>
        </div>
      {/* )} */}
      <div className="flex items-center gap-4 w-full">
        <div className="w-full">
          <Link href={`/checkout?type=buynow&productId=${product?.id}`}>
            <button className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg text-xs w-full">
              Buy Now
            </button>
          </Link>
        </div>
        {/* <AuthContextProvider>
          <AddToCartButton productId={product?.id} />
        </AuthContextProvider> */}
      </div>
    </div>
  );
}

async function RatingReview({ product }) {
  const counts = await getProductReviewCounts({ productId: product?.id });
  return (
    <div className="flex gap-3 items-center">
      {/* <MyRating value={counts?.averageRating ?? 0} /> */}
      <h1 className="text-xs text-gray-400">
        <span>{counts?.averageRating?.toFixed(1)}</span> ({counts?.totalReviews}
        )
      </h1>
    </div>
  );
}
