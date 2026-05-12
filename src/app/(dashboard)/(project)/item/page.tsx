"use client"

import { useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Edit, Plus, Trash } from "lucide-react"

import { ContentLayout } from "@/components/admin-panel/content-layout"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { AppleSwitch } from "@/components/unlumen-ui/apple-switch"
import { Badge } from "@/components/ui/badge"
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog"
import { ItemForm } from "@/components/item-form"

type Item = {
   id: number
   code: string
   name: string
   specification: string
   unit: string
   group: string
   price: number
   isBlocked: boolean
}

const initialData: Item[] = [
   {
      id: 1,
      code: "CM/P/RM/0001",
      name: "Steel Rod 10mm",
      specification: "Grade Fe500, 12m length",
      unit: "PCS",
      group: "Construction Materials",
      price: 450.0,
      isBlocked: false,
   },
   {
      id: 2,
      code: "CM/C/RM/0002",
      name: "Cement 50kg Bag",
      specification: "OPC 43 Grade",
      unit: "BAG",
      group: "Construction Materials",
      price: 380.0,
      isBlocked: false,
   },
   {
      id: 3,
      code: "P/P/RM/0003",
      name: "PVC Pipe 4\"",
      specification: "Heavy Duty, 6m",
      unit: "PCS",
      group: "Plumbing",
      price: 1200.0,
      isBlocked: true,
   },
   {
      id: 4,
      code: "E/W/RM/0004",
      name: "Copper Wire 2.5sqmm",
      specification: "90m Coil, FR LSH",
      unit: "COIL",
      group: "Electricals",
      price: 2150.0,
      isBlocked: false,
   },
]

import { Clock, Tag, Box, Info } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

export default function ItemPage() {
   const [data, setData] = useState<Item[]>(initialData)
   const [isDialogOpen, setIsDialogOpen] = useState(false)
   const [editingItem, setEditingItem] = useState<Item | null>(null)

   const handleStatusToggle = (id: number) => {
      setData((prev) =>
         prev.map((item) =>
            item.id === id
               ? { ...item, isBlocked: !item.isBlocked }
               : item
         )
      )
   }

   const handleEdit = (item: Item) => {
      setEditingItem(item)
      setIsDialogOpen(true)
   }

   const handleAddNew = () => {
      setEditingItem(null)
      setIsDialogOpen(true)
   }

   const columns: ColumnDef<Item>[] = [
      {
         accessorKey: "id",
         header: () => <div className="text-center w-full">S.No</div>,
         cell: ({ row }) => <div className="text-center w-full font-medium text-zinc-500">{row.index + 1}</div>,
      },
      {
         accessorKey: "code",
         header: "Item Code",
         cell: ({ row }) => (
            <div className="flex flex-col">
               <span className="font-mono text-[11px] font-bold text-primary px-2 py-0.5 bg-primary/5 rounded-md border border-primary/10 w-fit">
                  {row.getValue("code")}
               </span>
            </div>
         ),
      },
      {
         accessorKey: "name",
         header: "Item Name",
         cell: ({ row }) => (
            <div className="flex flex-col">
               <span className="font-bold text-zinc-900 leading-none mb-1">{row.getValue("name")}</span>
               <div className="flex items-center gap-1 text-[10px] text-zinc-400 uppercase tracking-tighter font-medium">
                  <Tag className="h-2.5 w-2.5" /> {row.original.group}
               </div>
            </div>
         ),
      },
      {
         accessorKey: "specification",
         header: "Specification",
         cell: ({ row }) => (
            <div className="max-w-[180px] flex items-start gap-1.5 text-zinc-500 font-medium">
               <Info className="h-3 w-3 mt-0.5 shrink-0 text-zinc-300" />
               <span className="text-xs line-clamp-2 leading-tight italic">{row.getValue("specification")}</span>
            </div>
         ),
      },
      {
         accessorKey: "unit",
         header: () => <div className="text-center w-full">Unit</div>,
         cell: ({ row }) => (
            <div className="text-center w-full">
               <span className="text-[10px] font-black bg-zinc-100 text-zinc-600 px-2 py-1 rounded-lg uppercase border border-zinc-200">
                  {row.getValue("unit")}
               </span>
            </div>
         ),
      },
      {
         accessorKey: "price",
         header: () => <div className="text-center w-full">Unit Price</div>,
         cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"))
            const formatted = new Intl.NumberFormat("en-IN", {
               style: "currency",
               currency: "INR",
            }).format(price)
            return (
               <div className="text-center w-full">
                  <span className="font-black text-zinc-900 text-sm tracking-tight">{formatted}</span>
               </div>
            )
         },
      },
      {
         accessorKey: "isBlocked",
         header: () => <div className="text-center w-full">Status</div>,
         cell: ({ row }) => {
            const isBlocked = row.getValue("isBlocked") as boolean
            return (
               <div className="flex items-center justify-center gap-2">
                  <Switch
                     checked={isBlocked}
                     onCheckedChange={() => handleStatusToggle(row.original.id)}
                     className="data-[state=checked]:bg-emerald-600"
                  />
                  <span className={cn(
                     "text-xs font-bold min-w-[65px] px-2 py-0.5 rounded-full transition-colors text-center",
                     isBlocked ? "text-emerald-700 bg-emerald-50" : "text-rose-700 bg-rose-50"
                  )}>
                     {isBlocked ? "Blocked" : "Not Blocked"}
                  </span>
               </div>
            )
         },
      },
      {
         id: "actions",
         header: () => <div className="text-center w-full">Action</div>,
         cell: ({ row }) => {
            return (
               <div className="flex items-center justify-center gap-1">
                  <Button
                     variant="ghost"
                     size="icon"
                     className="h-9 w-9 rounded-xl text-zinc-400 hover:text-primary hover:bg-primary/5 transition-all"
                     onClick={() => handleEdit(row.original)}
                  >
                     <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                     variant="ghost"
                     size="icon"
                     className="h-9 w-9 rounded-xl text-zinc-400 hover:text-destructive hover:bg-destructive/5 transition-all"
                  >
                     <Trash className="h-4 w-4" />
                  </Button>
               </div>
            )
         },
      },
   ]

   return (
      <ContentLayout title="Inventory Management">
         <div className="flex flex-col gap-8 p-4 sm:p-8 bg-zinc-50/50 min-h-[calc(100vh-64px)]">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
               <div className="space-y-1">
                  <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-1">
                     <Box className="h-3 w-3" /> Catalog
                  </div>
                  <h1 className="text-3xl font-black tracking-tight text-zinc-900">Inventory Items</h1>
                  <p className="text-zinc-500 text-sm font-medium">Manage your product catalog, specifications, and regional pricing from this central repository.</p>
               </div>
               <Button
                  onClick={handleAddNew}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground h-11 px-6 rounded-xl shadow-lg shadow-primary/20 flex items-center gap-2 transition-all active:scale-95"
               >
                  <Plus className="h-5 w-5" />
                  <span className="font-bold">Add New Item</span>
               </Button>
            </div>

            {/* Table Section */}
            <div className="bg-white border border-slate-200 rounded-3xl p-2 shadow-sm">
               <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                     <h2 className="font-bold text-zinc-800">Item Master List</h2>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="text-[10px] font-bold text-zinc-400 uppercase bg-zinc-50 px-2 py-1 rounded-md border border-zinc-100">
                        Total Items: {data.length}
                     </div>
                  </div>
               </div>
               <DataTable columns={columns} data={data} searchKey="name" />
            </div>

            {/* Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
               <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto rounded-3xl border-none shadow-2xl">
                  <DialogHeader className="pb-4 border-b border-zinc-100 mb-6">
                     <DialogTitle className="text-2xl font-black">{editingItem ? "Update Item Master" : "Create Catalog Item"}</DialogTitle>
                     <DialogDescription className="font-medium text-zinc-500">
                        {editingItem
                           ? "Modify the technical specifications and pricing for this item."
                           : "Initialize a new item record in the master inventory database."}
                     </DialogDescription>
                  </DialogHeader>
                  <div className="py-2">
                     <ItemForm
                        onSuccess={() => setIsDialogOpen(false)}
                        initialValues={editingItem ? {
                           itemName: editingItem.name,
                           itemCode: editingItem.code,
                           specification: editingItem.specification,
                           unit: editingItem.unit,
                           rate: editingItem.price.toString(),
                           isBlocked: editingItem.isBlocked,
                           groupName: editingItem.group === "Construction Materials" ? "construction" :
                              editingItem.group === "Plumbing" ? "plumbing" :
                                 editingItem.group === "Electrical" ? "electrical" : "",
                        } : undefined}
                     />
                  </div>
               </DialogContent>
            </Dialog>
         </div>
      </ContentLayout>
   )
}