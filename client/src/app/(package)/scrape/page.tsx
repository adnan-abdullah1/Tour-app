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
            <Button type="submit" className="w-[200px]" variant={'tour_button_primary'} disabled={isSubmitting}>
              {isSubmitting ? "Scraping..." : "Scrape Package"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

