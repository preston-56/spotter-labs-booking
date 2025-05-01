"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Column {
  key: string;
  header: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column[];
  idField: keyof T;
  onDelete?: (id: string) => void;
  actionLabel?: string;
}

export default function DataTable<T>({
  data,
  columns,
  idField,
  onDelete,
  actionLabel = "Delete"
}: DataTableProps<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.key}>{column.header}</TableHead>
          ))}
          {onDelete && <TableHead className="text-right">Actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={String(item[idField])}>
            {columns.map((column) => (
              <TableCell key={`${String(item[idField])}-${column.key}`}>
                {String(item[column.key as keyof T])}
              </TableCell>
            ))}
            {onDelete && (
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  onClick={() => onDelete(String(item[idField]))}
                  aria-label={`${actionLabel} ${String(item['name' as keyof T] || item[idField])}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}