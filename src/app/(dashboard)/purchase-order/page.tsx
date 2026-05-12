"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ColumnDef } from "@tanstack/react-table"
import { 
  Plus,
  MoreVertical,
  Eye,
  Pencil,
  Printer
} from "lucide-react"

import { ContentLayout } from "@/components/admin-panel/content-layout"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

type PurchaseOrder = {
  id: string
  vendor: {
    name: string
    contact: string
  }
  items: {
    count: number
    preview: string
  }
  amount: string
  status: "SENT" | "DELIVERED"
  date: string
}

const MOCK_POS: PurchaseOrder[] = [
  {
    id: "PO-001",
    vendor: { name: "Supreme Build Tech", contact: "Rajesh Gupta" },
    items: { count: 2, preview: "Cement Bag, Sand" },
    amount: "₹33,000",
    status: "SENT",
    date: "2024-05-02"
  },
  {
    id: "PO-002",
    vendor: { name: "SteelCraft Industries", contact: "Anjali Shah" },
    items: { count: 1, preview: "Steel Rods (12mm)" },
    amount: "₹6,500",
    status: "DELIVERED",
    date: "2024-05-03"
  }
]

export default function PurchaseOrderPage() {
  const router = useRouter()
  const [data] = useState<PurchaseOrder[]>(MOCK_POS)

  const columns: ColumnDef<PurchaseOrder>[] = [
    {
      accessorKey: "id",
      header: "PO ID",
      cell: ({ row }) => <div className="font-bold text-emerald-500">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "vendor",
      header: "Vendor",
      cell: ({ row }) => {
        const ven = row.original.vendor
        return (
          <div className="flex flex-col">
            <span className="font-bold text-zinc-900">{ven.name}</span>
            <span className="text-[10px] text-zinc-400 font-medium">{ven.contact}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "items",
      header: "Items",
      cell: ({ row }) => {
        const items = row.original.items
        return (
          <div className="flex flex-col">
            <span className="font-bold text-zinc-900">{items.count} Items</span>
            <span className="text-[10px] text-zinc-400 font-medium">{items.preview}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => <div className="font-black text-zinc-900">{row.getValue("amount")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge className={cn(
            "rounded-full px-4 py-1 font-black text-[9px] border-none shadow-sm",
            status === "SENT" ? "bg-emerald-50 text-emerald-600" : "bg-zinc-100 text-zinc-600"
          )}>
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => <div className="text-[11px] font-bold text-zinc-500">{row.getValue("date")}</div>,
    },
    {
      id: "actions",
      header: () => <div className="text-right pr-4">Action</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-1 pr-4">
           <Button 
             variant="ghost" 
             size="icon" 
             onClick={() => router.push(`/purchase-order/${row.original.id}`)}
             className="h-8 w-8 rounded-lg hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600 transition-all"
             title="View Details"
           >
              <Eye className="h-4 w-4" />
           </Button>
           <Button 
             variant="ghost" 
             size="icon" 
             onClick={() => router.push(`/purchase-order/${row.original.id}/edit`)}
             className="h-8 w-8 rounded-lg hover:bg-emerald-50 text-zinc-400 hover:text-emerald-600 transition-all"
             title="Edit Order"
           >
              <Pencil className="h-4 w-4" />
           </Button>
           <Button 
             variant="ghost" 
             size="icon" 
             className="h-8 w-8 rounded-lg hover:bg-amber-50 text-zinc-400 hover:text-amber-600 transition-all"
             title="Print PO"
           >
              <Printer className="h-4 w-4" />
           </Button>
        </div>
      ),
    },
  ]

  return (
    <ContentLayout title="Purchase Orders">
      <div className="flex flex-col gap-8 p-6 sm:p-10 max-w-[1600px] mx-auto min-h-screen">
        
        {/* Header Control Hub */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
           <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Purchase Orders</h1>
           
           <div className="flex items-center gap-4">
              <Button 
                onClick={() => router.push("/purchase-order/new")}
                className="h-12 px-8 rounded-2xl bg-primary font-black shadow-lg shadow-primary/20 gap-2"
              >
                 <Plus className="h-5 w-5" /> Create New Order
              </Button>
           </div>
        </div>

        {/* Board */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-zinc-100 shadow-sm">
           <DataTable 
             columns={columns} 
             data={data} 
           />
        </div>
      </div>
    </ContentLayout>
  )
}
