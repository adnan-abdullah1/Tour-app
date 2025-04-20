// "use client";

// import React, { useState } from "react";
// import { z } from "zod";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { format } from "date-fns";
// import { Calendar as CalendarIcon } from "lucide-react";

// import {
//     Form,
//     FormField,
//     FormLabel,

// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Calendar } from "@/components/ui/calendar";
// import {
//     Popover,
//     PopoverTrigger,
//     PopoverContent,
// } from "@/components/ui/popover";
// import { cn } from "@/lib/utils";

// // Schema
// const packageSchema = z.object({
//     name: z.string().min(1, "Name is required"),
//     location: z.string().optional(),
//     description: z.string().optional(),
//     redirectUrl: z.string().url("Enter a valid URL").optional(),
//     rating: z.coerce.number().min(0, "Minimum rating is 0").max(5, "Max rating is 5"),
//     price: z.coerce.number().min(0, "Price must be greater than 0"),
//     inclusions: z.string().optional(),
//     exclusions: z.string().optional(),
//     startDate: z.date({
//         required_error: "Start date is required",
//     }),
//     endDate: z.date({
//         required_error: "End date is required",
//     }),
//     daysPlan: z
//         .array(
//             z.object({
//                 day: z.number(),
//                 plan: z.string(),
//                 description: z.string(),
//             })
//         )
//         .optional(),
//     highlights: z
//         .array(
//             z.object({
//                 icon: z.string(),
//                 description: z.string(),
//             })
//         )
//         .optional(),
//     media: z
//         .any()
//         .refine((files) => files?.length >= 4, {
//             message: "At least 4 images are required",
//         }),
// });

// type PackageFormData = z.infer<typeof packageSchema>;

// export default function CreatePackageView() {
//     const form = useForm<PackageFormData>({
//         resolver: zodResolver(packageSchema),
//         defaultValues: {
//             name: "",
//             location: "",
//             description: "",
//             redirectUrl: "",
//             rating: 0,
//             price: 0,
//             inclusions: "",
//             exclusions: "",
//             startDate: undefined,
//             endDate: undefined,
//             media: undefined,
//         },
//     });

//     const [isSubmitting, setIsSubmitting] = useState(false);

//     async function onSubmit(values: PackageFormData) {
//         setIsSubmitting(true);
//         const formData = new FormData();

//         Object.entries(values).forEach(([key, val]) => {
//             if (key === "media" && val instanceof FileList) {
//                 Array.from(val).forEach((file) => formData.append("media", file));
//             } else if (key === "startDate" || key === "endDate") {
//                 if (val) formData.append(key, (val as Date).toISOString());
//             } else {
//                 const isObj = typeof val === "object" && val !== null;
//                 formData.append(key, isObj ? JSON.stringify(val) : String(val));
//             }
//         });

//         try {
//             await axios.post("http://localhost:5000/api/package/scrap", formData, {
//                 headers: { "Content-Type": "multipart/form-data" },
//             });
//             alert("Package created successfully!");
//             form.reset();
//         } catch (error) {
//             alert("Error creating package.");
//             console.error(error);
//         } finally {
//             setIsSubmitting(false);
//         }
//     }

//     return (
//         <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10">
//             <h2 className="text-2xl font-semibold mb-6 text-gray-800">Create New Package</h2>
//             <Form {...form}>
//                 <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         {/* Package Name */}
//                         <FormField
//                             name="name"
//                             control={form.control}
//                             render={({ field, fieldState }) => (
//                                 <div>
//                                     <FormLabel className="pb-2">Package Name</FormLabel>
//                                     <Input placeholder="Eg. Goa Getaway" {...field} />
//                                     {fieldState.error && (
//                                         <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>
//                                     )}
//                                 </div>
//                             )}
//                         />

//                         {/* Location */}
//                         <FormField
//                             name="location"
//                             control={form.control}
//                             render={({ field }) => (
//                                 <div>
//                                     <FormLabel className="pb-2">Location</FormLabel>
//                                     <Input placeholder="Eg. Goa, India" {...field} />
//                                 </div>
//                             )}
//                         />
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         {/* Rating */}
//                         <FormField
//                             name="rating"
//                             control={form.control}
//                             render={({ field, fieldState }) => (
//                                 <div>
//                                     <FormLabel className="pb-2">Rating (0 - 5)</FormLabel>
//                                     <Input type="number" min={0} max={5} step="0.1" {...field} />
//                                     {fieldState.error && (
//                                         <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>
//                                     )}
//                                 </div>
//                             )}
//                         />

//                         {/* Price */}
//                         <FormField
//                             name="price"
//                             control={form.control}
//                             render={({ field, fieldState }) => (
//                                 <div>
//                                     <FormLabel className="pb-2">Price (INR)</FormLabel>
//                                     <Input type="number" step="0.01" {...field} />
//                                     {fieldState.error && (
//                                         <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>
//                                     )}
//                                 </div>
//                             )}
//                         />
//                     </div>

//                     {/* Description */}
//                     <FormField
//                         name="description"
//                         control={form.control}
//                         render={({ field }) => (
//                             <div>
//                                 <FormLabel className="pb-2">Description</FormLabel>
//                                 <Textarea rows={4} placeholder="Brief description" {...field} />
//                             </div>
//                         )}
//                     />

//                     {/* Redirect URL */}
//                     <FormField
//                         name="redirectUrl"
//                         control={form.control}
//                         render={({ field, fieldState }) => (
//                             <div>
//                                 <FormLabel className="pb-2">Redirect URL</FormLabel>
//                                 <Input placeholder="https://example.com/package" {...field} />
//                                 {fieldState.error && (
//                                     <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>
//                                 )}
//                             </div>
//                         )}
//                     />

//                     {/* Dates */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         {["startDate", "endDate"].map((key) => (
//                             <FormField
//                                 key={key}
//                                 name={key as "startDate" | "endDate"}
//                                 control={form.control}
//                                 render={({ field, fieldState }) => (
//                                     <div>
//                                         <FormLabel  className= " pb-2 capitalize">{key.replace("Date", " Date")}</FormLabel>
//                                         <Popover>
//                                             <PopoverTrigger asChild>
//                                                 <Button
//                                                     variant="outline"
//                                                     className={cn(
//                                                         "w-full justify-start text-left font-normal",
//                                                         !field.value && "text-muted-foreground"
//                                                     )}
//                                                 >
//                                                     <CalendarIcon className="mr-2 h-4 w-4" />
//                                                     {field.value ? format(field.value, "PPP") : "Pick a date"}
//                                                 </Button>
//                                             </PopoverTrigger>
//                                             <PopoverContent className="w-auto p-0 bg-white shadow-md rounded-md" align="start">
//                                                 <Calendar
//                                                     mode="single"
//                                                     selected={field.value}
//                                                     onSelect={field.onChange}
//                                                     initialFocus
//                                                 />
//                                             </PopoverContent>
//                                         </Popover>
//                                         {fieldState.error && (
//                                             <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>
//                                         )}
//                                     </div>
//                                 )}
//                             />
//                         ))}
//                     </div>


//                     {/* Inclusions */}
//                     <FormField
//                         name="inclusions"
//                         control={form.control}
//                         render={({ field }) => (
//                             <div>
//                                 <FormLabel className="pb-2">Inclusions</FormLabel>
//                                 <Textarea rows={3} placeholder="What's included?" {...field} />
//                             </div>
//                         )}
//                     />

//                     {/* Exclusions */}
//                     <FormField
//                         name="exclusions"
//                         control={form.control}
//                         render={({ field }) => (
//                             <div>
//                                 <FormLabel className="pb-2">Exclusions</FormLabel>
//                                 <Textarea rows={3} placeholder="What's not included?" {...field} />
//                             </div>
//                         )}
//                     />

//                     {/* Media */}
//                     <FormField
//                         name="media"
//                         control={form.control}
//                         render={({ field, fieldState }) => (
//                             <div>
//                                 <FormLabel className="pb-2">Upload Images (Min 4)</FormLabel>
//                                 <Input
//                                     type="file"
//                                     accept="image/*"
//                                     multiple
//                                     onChange={(e) => field.onChange(e.target.files)}
//                                     className="cursor-pointer"
//                                 />
//                                 {fieldState.error && (
//                                     <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>
//                                 )}
//                             </div>
//                         )}
//                     />

//                     {/* Submit */}
//                     <div className="pt-4 flex justify-end">
//                         <Button
//                             variant="tour_button_primary"
//                             type="submit"
//                             className="w-[200px]"
//                             disabled={isSubmitting}
//                         >
//                             {isSubmitting ? "Creating Package..." : "Create Package"}
//                         </Button>
//                     </div>
//                 </form>
//             </Form>
//         </div>
//     );
// }

"use client";

import React, { useState } from "react";
import { z } from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormField, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const scrapSchema = z.object({
  url: z.string().url("Enter a valid URL"),
});

type ScrapFormData = z.infer<typeof scrapSchema>;

export default function ScrapPackageView() {
  const form = useForm<ScrapFormData>({
    resolver: zodResolver(scrapSchema),
    defaultValues: { url: "" },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(values: ScrapFormData) {
    setIsSubmitting(true);
    try {
      await axios.post("http://localhost:5000/api/package/scrap", values);
      alert("Scraping initiated successfully!");
      form.reset();
    } catch (error) {
      alert("Error scraping the URL.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Scrape Package from URL</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            name="url"
            control={form.control}
            render={({ field, fieldState }) => (
              <div>
                <FormLabel className="pb-2">Package URL</FormLabel>
                <Input placeholder="https://example.com/package" {...field} />
                {fieldState.error && (
                  <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />

          <div className="pt-4 flex justify-end">
            <Button type="submit" className="w-[200px]" disabled={isSubmitting}>
              {isSubmitting ? "Scraping..." : "Scrape Package"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

