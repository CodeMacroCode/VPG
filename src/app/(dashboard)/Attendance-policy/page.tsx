"use client"

import { useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { 
  ShieldCheck, 
  Clock, 
  AlertTriangle,
  History,
  MoreVertical,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

import { ContentLayout } from "@/components/admin-panel/content-layout"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { PolicyDialog } from "@/components/policy/policy-dialog"
import { cn } from "@/lib/utils"

type Policy = {
  id: string
  name: string
  workHours: string
  workingHours: string
  lateTolerance: string
  status: "Active" | "Inactive"
  createdAt: string
}

const MOCK_POLICIES: Policy[] = [
  {
    id: "1",
    name: "Office Policy B",
    workHours: "10:30 - 18:30",
    workingHours: "1 Hrs/Day",
    lateTolerance: "10 Mins",
    status: "Active",
    createdAt: "27 Feb 2026"
  }
]

export default function PolicyPage() {
  const [data] = useState<Policy[]>(MOCK_POLICIES)

  const columns: ColumnDef<Policy>[] = [
    {
      accessorKey: "name",
      header: "POLICY NAME",
      cell: ({ row }) => <div className="font-bold text-zinc-900 pl-4">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "workHours",
      header: "WORK HOURS",
      cell: ({ row }) => (
        <Badge className="bg-primary/5 text-primary border-none rounded-lg px-3 py-1 font-bold">
          {row.getValue("workHours")}
        </Badge>
      ),
    },
    {
      accessorKey: "workingHours",
      header: "WORKING HOURS",
      cell: ({ row }) => <div className="font-medium text-zinc-600">{row.getValue("workingHours")}</div>,
    },
    {
      accessorKey: "lateTolerance",
      header: "LATE TOLERANCE",
      cell: ({ row }) => <div className="font-medium text-zinc-600">{row.getValue("lateTolerance")}</div>,
    },
    {
      accessorKey: "status",
      header: "STATUS",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge className={cn(
            "rounded-full px-4 py-0.5 font-bold border-none",
            status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
          )}>
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: "createdAt",
      header: "CREATED AT",
      cell: ({ row }) => <div className="font-medium text-zinc-400">{row.getValue("createdAt")}</div>,
    },
  ]

  return (
    <ContentLayout title="Attendance Policy">
      <div className="flex flex-col gap-10 p-6 sm:p-12 max-w-[1700px] mx-auto min-h-screen">
        
        {/* Header Block: Unified Edit Action */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
           <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-black text-zinc-900 tracking-tighter">Attendance Policy</h1>
              <div className="flex items-center gap-3">
                 <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                 <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em]">Global Rules Configuration</p>
              </div>
           </div>
           
           {/* Primary Global Edit Control */}
           <PolicyDialog mode="edit" />
        </div>

        {/* Policy Table Container: Pure Data View */}
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
