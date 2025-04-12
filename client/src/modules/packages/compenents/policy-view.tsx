"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function PackagePolicies() {
  const [open, setOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-xl font-semibold mb-2">Cancellation Policy</div>
      <p className="mb-4 text-muted-foreground">
        A transparent overview of applicable fees.
      </p>
      <Button variant="tour_button_primary">Explore your options</Button>
    
    </div>
  );
}
