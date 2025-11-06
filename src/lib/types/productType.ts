import { z } from "zod";

export type productT = {
  id: string;
  Desc: string;
  category: string;
  image: string;
  isFeatured: boolean;
  name: string;
  price: string;
};

export type productTArr = {
  id: string;
  Desc: string;
  category: string;
  image: string;
  isFeatured: boolean;
  name: string;
  price: string;
}[];

export type ProductType = {
  id: string | undefined;
  name: string;
  price: number;
  stockQty:number;
  discountPrice: number | undefined;
  categoryId:string;
     productCat:string | undefined;
  baseProductId: string;
  productDesc: string;
  sortOrder: number;
  image: string;
  isFeatured: boolean;
  purchaseSession: string | null;
  quantity: number | null;
  
  flavors: boolean;
  status: 'published' | 'draft' | 'out_of_stock' | undefined;
};

export type ProductTypeArr = {
  name: string;
  price: string;
  sortOrder: string;
  productDesc: string;
  // image?: any; id?: string | undefined;
  image: string;
  isFeatured: boolean;
}[];

export type TproductSchemaArr = TproductSchema[];

export type TnewProductSchemaArr = TnewProductSchema[];

//add for type

const productSchema = z.object({
  // id: z.number().optional(),
  name: z
    .string()
    .trim()
    .min(2, { message: "Product name is very short" })
    .max(30, { message: "Product name is very long" }),
  price: z
    .string()
    .refine((value) => /^\d+$/.test(value), "Invalid product price"), // Refinement
        discountPrice:z.string().optional(),
    stockQty:z.string().optional(),
  sortOrder: z.string().min(1, { message: "Please select category" }),

  productDesc: z.string().min(1, { message: "Please select category" }),
  company: z.string().min(1, { message: "Please select category" }),
  featured: z.string().optional(),
  image: typeof window === "undefined" ? z.any() : z.any(),
  baseProductId: z.string().optional(),
  status: z
    .enum(['published', 'draft', 'out_of_stock'])
    .optional()
    .nullable(),
  // image:z.object({
  //   size: z.number(),
  // type: z.string(),
  // name: z.string(),
  // lastModified: z.number(),
  //  }),
});
export type TproductSchema = z.infer<typeof productSchema>;

// export const newPorductSchema = z.object({
//   id: z.string().optional(),

//   name: z.string().min(4, { message: "Product name is required" }),

//   price: z
//     .union([z.string(), z.number()])
//     .transform((val) => Number(val))
//     .refine((val) => !isNaN(val) && val >= 0, {
//       message: "Invalid product price",
//     }),

// discountPrice: z
//     .union([z.string(), z.number()])
//     .optional()
//     .transform((val) =>
//       val === undefined || val === "" ? undefined : Number(val)
//     )
//     .refine(
//       (val) => val === undefined || (!isNaN(val) && val >= 0),
//       { message: "Invalid discount price" }
//     ),

//   stockQty: z
//     .union([z.string(), z.number()])
//     .optional()
//     .transform((val) =>
//       val === undefined || val === "" ? undefined : Number(val)
//     )
//     .refine((val) => val === undefined || !isNaN(val), {
//       message: "Invalid stock quantity",
//     }),

//   categoryId: z.string().optional(),

//   sortOrder: z
//     .union([z.string(), z.number()])
//     .transform((val) => Number(val))
//     .refine((val) => !isNaN(val), { message: "Invalid sort order" }),

//   productDesc: z.string().optional(),

//   isFeatured: z.boolean().optional(),

//   image: z.any().optional(),

//   baseProductId: z.string().optional(),

//   flavors: z.boolean().optional(),

//   status: z
//     .enum(["published", "draft", "out_of_stock"])
//     .optional()
//     .nullable(),
// });


export const newPorductSchema = z.object({
  id: z.string().optional(),

  // ✅ Mandatory
  name: z.string().min(4, { message: "Product name is required" }),

  // price: z
  //   .string()
  //   .refine((val) => /[.,\d]+/.test(val), { message: "Invalid product price" }),

  // sortOrder: z
  //   .string()
  //   .min(1, { message: "Please add sort order" }),

price: z
  .union([z.string(), z.number()])
  .refine((val) => {
    const num = typeof val === "string" ? parseFloat(val.replace(",", ".")) : val;
    return !isNaN(num) && num >= 0;
  }, { message: "Invalid product price" }),

sortOrder: z.union([z.string(), z.number()]).refine((val) => {
  const num = typeof val === "string" ? parseInt(val) : val;
  return !isNaN(num);
}, { message: "Invalid sort order" }),

  categoryId: z
    .string()
    .min(1, { message: "Please select category" }),

  status: z.enum(["published", "draft", "out_of_stock"]),

  // ✅ Optional fields
  discountPrice: z
    .union([z.string(), z.number()])
    .optional()
    .transform((val) =>
      val === undefined || val === "" ? undefined : Number(val)
    )
    .refine(
      (val) => val === undefined || (!isNaN(val) && val >= 0),
      { message: "Invalid discount price" }
    ),

  stockQty: z
    .union([z.string(), z.number()])
    .optional()
    .transform((val) =>
      val === undefined || val === "" ? undefined : Number(val)
    )
    .refine((val) => val === undefined || !isNaN(val), {
      message: "Invalid stock quantity",
    }),

  productDesc: z.string().optional(),

  isFeatured: z.boolean().optional(),

  image: z.any().optional(),

  baseProductId: z.string().optional(),

  flavors: z.boolean().optional(),
});

export type TnewProductSchema = z.infer<typeof newPorductSchema>;

export type ShowPorductT = {
  id: string;
  name: string;
  price: string;
  sortOrder: string;
  productDesc: string;
  isFeatured: boolean;
  image: string;
};

export const editPorductSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(4, { message: "Product name is required" }),
  price: z
    .string()
    //.refine((value) => /^\d+$/.test(value), "Invalid product price"), // Refinement
    .refine((value) => /^\d*[.,]?\d*$/.test(value), "Invalid product price"), // Refinement
    discountPrice:z.string().optional(),
    stockQty:z.string().optional(),
  //  ^\d*[.,]?\d*$
  // price: z
  //   .string()
  //   .refine((value) => /^\d+$/.test(value), "Invalid product price"), // Refinement
  sortOrder: z.string().min(1, { message: "Please select category" }),
  categoryId:z.string().optional(),
  categoryIdOld:z.string().optional(),
  productDesc: z
    .string().optional(),
   // .min(2, { message: "Product productDescription is required" }),
  // brand: z.string().optional(),
  // dimensions:z.string().optional(),
  // weight:z.string().optional(),
  isFeatured: z.boolean().optional(),

  image: z.any().optional(),
  oldImgageUrl: z.string().optional(),
    status: z
    .enum(['published', 'draft', 'out_of_stock'])
    .optional()
    .nullable(),
  // .refine((file) => file.size < MAX_FILE_SIZE, "Max size is 5MB.")
  // .refine(
  //   (file) => checkFileType(file),
  //   "Only .jpg, .jpeg formats are supported."
  // ),
});

export type TeditProductSchema = z.infer<typeof editPorductSchema>;

export default productSchema;

export type TProduct = {
  product: {
    name: string;
    id: string;
    image: string;
    category: string;
  };
};

export type Timage = {
  size?: number;
  type?: string;
  name?: string;
  lastModified?: number;
};

const ImageSchema = z.object({
  size: z.number().optional(),
  type: z.string().optional(),
  name: z.string().optional(),
  lastModified: z.number().optional(),
});

// Now add this object into an array
const ImagesSchema = z.array(ImageSchema);

const MAX_FILE_SIZE = 1024 * 1024 * 6; // 3MB
// const ACCEPTED_IMAGE_TYPES = ['image/jpg','image/jpg','image/jpeg'];

function checkFileType(file: File) {
  if (file?.name) {
    const fileType = file.name.split(".").pop();
    if (fileType === "jpg" || fileType === "png") return true;
  }
  return false;
}
//image: ImageSchema.optional(),
