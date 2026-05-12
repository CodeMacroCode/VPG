"use client"

import { useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { 
  Plus,
  MoreVertical,
  Zap,
  Building2,
  Calendar,
  CreditCard
} from "lucide-react"

import { ContentLayout } from "@/components/admin-panel/content-layout"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
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
      header: "Action",
      cell: ({ row }) => (
        <div className="flex justify-end pr-4">
           <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-zinc-100">
              <MoreVertical className="h-4 w-4 text-zinc-400" />
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
              <Button className="h-12 px-8 rounded-2xl bg-primary font-black shadow-lg shadow-primary/20 gap-2">
                 <Plus className="h-5 w-5" /> Create New Order
              </Button>
           </div>
        </div>

        {/* Global Strategy Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           {[
             { label: "Active Orders", val: "24", icon: Zap, color: "text-primary", bg: "bg-primary/10" },
             { label: "Fulfillment Rate", val: "92%", icon: Building2, color: "text-amber-500", bg: "bg-amber-50" },
             { label: "Pending Delivery", val: "08", icon: Calendar, color: "text-emerald-500", bg: "bg-emerald-50" },
             { label: "Total Committed", val: "₹4.8L", icon: CreditCard, color: "text-zinc-600", bg: "bg-zinc-100" },
           ].map((stat, i) => (
             <div key={i} className="bg-white p-6 rounded-[2rem] border border-zinc-100 shadow-sm flex items-center gap-6 group hover:shadow-xl transition-all cursor-pointer">
                <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center", stat.bg)}>
                   <stat.icon className={cn("h-6 w-6", stat.color)} />
                </div>
                <div className="flex flex-col">
                   <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{stat.label}</span>
                   <span className="text-xl font-black text-zinc-900 tracking-tighter">{stat.val}</span>
                </div>
             </div>
           ))}
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
