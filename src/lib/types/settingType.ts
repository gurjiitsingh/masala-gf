import { z } from "zod";

export const settingSchema = z.object({
  id: z.string().optional(),
  settingName: z.string().min(2, { message: "Setting name is required" }),
  settingValue: z
    .string().optional(),
    // .refine((value) => /^\d+$/.test(value), "Invalid product price"), // Refinement
    //.refine((value) => /[.,\d]+/.test(value), "Invalid setting value"),
   
});

export type settingSchemaType = z.infer<typeof settingSchema>;


export const editSettingSchema = z.object({
  id: z.string().optional(),
  settingName: z.string().optional(),
  //.min(2, { message: "Setting name is required" }),
  settingValue: z
    .string().optional(),
    // .refine((value) => /^\d+$/.test(value), "Invalid product price"), // Refinement
    //.refine((value) => /[.,\d]+/.test(value), "Invalid setting value"),
   
});

export type editSettingSchemaType = z.infer<typeof editSettingSchema>;