"use client"

import { useState } from "react"
import { 
  Building2, 
  MapPin, 
  User, 
  BarChart3, 
  Box, 
  AlertCircle, 
  MoreVertical, 
  Search, 
  Plus,
  Warehouse,
  Package,
  Activity,
  ArrowUpRight
} from "lucide-react"

import { ContentLayout } from "@/components/admin-panel/content-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

type Store = {
  id: string
  name: string
  location: string
  manager: string
  capacity: number
  status: "Active" | "Maintenance" | "Full"
  itemsCount: number
}

const MOCK_STORES: Store[] = [
  {
    id: "STR-001",
    name: "Main Warehouse",
    location: "Sector 82, Mohali",
    manager: "Ravi Kumar",
    capacity: 85,
    status: "Active",
    itemsCount: 1250
  },
  {
    id: "STR-002",
    name: "Site Storage A",
    location: "Sector 70, Mohali",
    manager: "Anita Singh",
    capacity: 42,
    status: "Active",
    itemsCount: 450
  },
  {
    id: "STR-003",
    name: "Raw Material Depot",
    location: "Industrial Area, Ph 7",
    manager: "Vikram Mehta",
    capacity: 98,
    status: "Full",
    itemsCount: 3200
  },
  {
    id: "STR-004",
    name: "Secondary Hub",
    location: "Zirakpur, Punjab",
    manager: "Sonia Sharma",
    capacity: 15,
    status: "Maintenance",
    itemsCount: 120
  }
]

export default function StoresPage() {
  const [data, setData] = useState<Store[]>(MOCK_STORES)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const columns: ColumnDef<Store>[] = [
    {
      accessorKey: "name",
      header: "Store Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-zinc-900 flex items-center justify-center text-white shadow-lg shadow-zinc-900/20">
            <Warehouse className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-zinc-900 text-sm tracking-tight">{row.getValue("name")}</span>
            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest leading-none mt-1">ID: {row.original.id}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5 text-zinc-400" />
          <span className="text-zinc-600 font-medium text-xs">{row.getValue("location")}</span>
        </div>
      ),
    },
    // {
    //   accessorKey: "manager",
    //   header: "Manager",
    //   cell: ({ row }) => (
    //     <div className="flex items-center gap-2">
    //       <div className="h-6 w-6 rounded-full bg-zinc-100 flex items-center justify-center">
    //         <User className="h-3 w-3 text-zinc-500" />
    //       </div>
    //       <span className="text-zinc-900 font-bold text-xs">{row.getValue("manager")}</span>
    //     </div>
    //   ),
    // },
    // {
    //   accessorKey: "capacity",
    //   header: "Utilization",
    //   cell: ({ row }) => {
    //     const value = row.getValue("capacity") as number
    //     return (
    //       <div className="flex flex-col gap-1.5 w-[100px]">
    //         <div className="flex items-center justify-between">
    //            <span className="text-[10px] font-black text-zinc-900">{value}%</span>
    //         </div>
    //         <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
    //            <div 
    //              className={cn(
    //                "h-full rounded-full transition-all duration-500",
    //                value > 90 ? "bg-rose-500" : value > 70 ? "bg-amber-500" : "bg-emerald-500"
    //              )} 
    //              style={{ width: `${value}%` }}
    //            />
    //         </div>
    //       </div>
    //     )
    //   },
    // },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge className={cn(
            "rounded-lg px-3 py-1 font-black text-[9px] border shadow-sm uppercase tracking-wider",
            status === "Active" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
            status === "Full" ? "bg-rose-50 text-rose-600 border-rose-100" :
            "bg-amber-50 text-amber-600 border-amber-100"
          )}>
            {status}
          </Badge>
        )
      },
    },
    {
      id: "actions",
      header: "",
      cell: () => (
        <div className="flex justify-end pr-4">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-zinc-100">
            <MoreVertical className="h-4 w-4 text-zinc-400" />
          </Button>
        </div>
      ),
    },
  ]

  const handleAddStore = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("New store added to the network")
    setIsDialogOpen(false)
  }

  return (
    <ContentLayout title="Store Management">
      <div className="flex flex-col gap-10 p-6 sm:p-12 max-w-[1700px] mx-auto min-h-screen">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
           <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-black text-zinc-900 tracking-tighter">Store Management</h1>
              <div className="flex items-center gap-3">
                 <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]" />
                 <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em]">Network Asset Inventory</p>
              </div>
           </div>
           
           <div className="flex items-center gap-4">
              <div className="relative w-72">
                 <Input placeholder="Search stores..." className="h-12 rounded-2xl bg-white border-zinc-100 pl-11 font-bold shadow-sm focus:ring-primary" />
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-300" />
              </div>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="h-12 rounded-2xl px-8 bg-zinc-900 text-white font-black shadow-2xl shadow-zinc-900/20 gap-3 hover:scale-[1.02] active:scale-95 transition-all">
                    <Plus className="h-5 w-5" /> Add Store
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px] rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden">
                  <DialogHeader className="p-10 bg-zinc-900 text-white pb-12">
                    <DialogTitle className="text-3xl font-black tracking-tight">Register New Store</DialogTitle>
                    <DialogDescription className="text-zinc-400 font-bold text-[10px] uppercase tracking-[0.2em] mt-3">
                      Asset Expansion Protocol
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddStore} className="p-10 bg-white space-y-8">
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest pl-1">Store Name</Label>
                        <Input placeholder="e.g. West Wing Storage" className="h-14 rounded-2xl bg-zinc-50 border-none font-bold text-sm focus:ring-1 focus:ring-primary" />
                      </div>
                      {/* <div className="space-y-3">
                        <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest pl-1">Manager</Label>
                        <Input placeholder="Assign manager" className="h-14 rounded-2xl bg-zinc-50 border-none font-bold text-sm focus:ring-1 focus:ring-primary" />
                      </div> */}
                    </div>

                    <div className="space-y-3">
                      <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest pl-1">Location Details</Label>
                      <Input placeholder="Street address or Sector" className="h-14 rounded-2xl bg-zinc-50 border-none font-bold text-sm focus:ring-1 focus:ring-primary" />
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest pl-1">Initial Status</Label>
                        <Select defaultValue="Active">
                          <SelectTrigger className="h-14 rounded-2xl bg-zinc-50 border-none font-bold text-sm focus:ring-1 focus:ring-primary">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-2xl border-zinc-100 shadow-2xl">
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Maintenance">Maintenance</SelectItem>
                            <SelectItem value="Full">Full</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {/* <div className="space-y-3">
                        <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest pl-1">Capacity (%)</Label>
                        <Input type="number" placeholder="0" className="h-14 rounded-2xl bg-zinc-50 border-none font-bold text-sm focus:ring-1 focus:ring-primary" />
                      </div> */}
                    </div>

                    <div className="pt-6 flex items-center gap-4">
                      <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="h-14 flex-1 rounded-2xl font-black text-zinc-400 hover:text-zinc-900 transition-colors">Cancel</Button>
                      <Button type="submit" className="h-14 flex-1 rounded-2xl bg-zinc-900 font-black shadow-2xl shadow-zinc-900/10 hover:bg-zinc-800 transition-all">Register Store</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
           </div>
        </div>

        {/* Metrics Grid
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
           {[
             { label: "Total Stores", val: "12", icon: Building2, color: "text-zinc-900", bg: "bg-zinc-100", trend: "+2 New this month" },
             { label: "Inventory Count", val: "14,250", icon: Package, color: "text-blue-500", bg: "bg-blue-50", trend: "Across all locations" },
             { label: "Avg Utilization", val: "68%", icon: BarChart3, color: "text-emerald-500", bg: "bg-emerald-50", trend: "Healthy threshold" },
             { label: "Alerts", val: "03", icon: AlertCircle, color: "text-rose-500", bg: "bg-rose-50", trend: "Requires attention" },
           ].map((stat, i) => (
             <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-zinc-100 shadow-sm group hover:shadow-2xl transition-all cursor-pointer relative overflow-hidden">
                <div className="flex items-start justify-between relative z-10">
                   <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-none mb-1">{stat.label}</span>
                      <span className="text-3xl font-black text-zinc-900 tracking-tighter leading-none">{stat.val}</span>
                      <div className="flex items-center gap-1.5 mt-4 text-zinc-400">
                        <Activity className="h-3 w-3" />
                        <span className="text-[9px] font-bold uppercase tracking-wider">{stat.trend}</span>
                      </div>
                   </div>
                   <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center", stat.bg)}>
                      <stat.icon className={cn("h-7 w-7", stat.color)} />
                   </div>
                </div>
                {/* Micro-animation background icon */}
                {/* <div className="absolute -bottom-6 -right-6 opacity-[0.03] rotate-12 group-hover:scale-110 transition-transform duration-500"> */}
                   {/* <stat.icon className="h-36 w-36" /> */}
                {/* </div> */}
             {/* </div> */}
           {/* )) */}
        {/* </div> */}

        {/* Inventory Ledger Card */}
        {/* <div className="bg-white rounded-[3rem] p-10 border border-zinc-100 shadow-sm relative overflow-hidden">
           <div className="absolute top-0 left-0 w-2 h-full bg-zinc-900" />
           <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-6">
              <div className="flex items-center gap-4">
                 <div className="h-11 w-11 rounded-2xl bg-zinc-900 flex items-center justify-center text-white shadow-xl shadow-zinc-900/20">
                    <Box className="h-6 w-6" />
                 </div>
                 <div className="flex flex-col">
                    <h3 className="text-xl font-black text-zinc-900 tracking-tight leading-none">Global Asset Ledger</h3>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mt-1.5">Network-wide distribution</p>
                 </div>
              </div>
              <div className="flex items-center gap-3">
                 <Button variant="ghost" className="h-10 rounded-xl font-bold text-[10px] uppercase tracking-widest text-zinc-400 hover:text-zinc-900 gap-2">
                   Download Report <ArrowUpRight className="h-3.5 w-3.5" />
                 </Button>
              </div>
           </div> */}
           
           <DataTable 
             columns={columns} 
             data={data} 
           />
        </div>
      {/* </div> */}
    </ContentLayout>
  )
}