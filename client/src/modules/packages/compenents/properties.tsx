import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle } from "lucide-react";

export default function PackageProperties() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card className="shadow-lg rounded-2xl">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">Properties of your tours</h2>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Place</TableHead>
                  <TableHead>Hotel</TableHead>
                  <TableHead>Nights</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>PORT BLAIR</TableCell>
                  <TableCell>HOTEL SEA PRINCESS or Similar</TableCell>
                  <TableCell>1</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>HAVELOCK ISLAND</TableCell>
                  <TableCell>SILVER SAND VILLAGE - HAVELOCK or Similar</TableCell>
                  <TableCell>2</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>NEIL ISLAND</TableCell>
                  <TableCell>SILVER SAND NEIL or Similar</TableCell>
                  <TableCell>1</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>PORT BLAIR</TableCell>
                  <TableCell>SENTINEL or Similar</TableCell>
                  <TableCell>2</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="flex items-start text-sm text-muted-foreground mt-4">
            <AlertCircle className="w-4 h-4 mr-2 mt-0.5" />
            <p>
              <strong>Note:</strong> Under unavoidable circumstances Hotels are subject to change, in such condition
              substitute hotel of similar category is provided.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
