"use client"

import { useState } from "react"
import { 
  Calendar,
  Clock,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MoreVertical,
  Plus,
  Plane,
  Stethoscope,
  Briefcase
} from "lucide-react"

import { ContentLayout } from "@/components/admin-panel/content-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

type Leave = {
  id: string
  member: {
    name: string
    role: string
    avatar?: string
  }
  type: "Annual" | "Sick" | "Casual"
  startDate: string
  endDate: string
  duration: string
  status: "Approved" | "Pending" | "Rejected"
}

const MOCK_LEAVES: Leave[] = [
  {
    id: "1",
    member: { name: "Julian Casablancas", role: "Senior Sales Agent" },
    type: "Annual",
    startDate: "May 20, 2026",
    endDate: "May 25, 2026",
    duration: "5 Days",
    status: "Approved"
  },
  {
    id: "2",
    member: { name: "Sofia Rodriguez", role: "Specialist" },
    type: "Sick",
    startDate: "May 15, 2026",
    endDate: "May 16, 2026",
    duration: "1 Day",
    status: "Pending"
  },
  {
    id: "3",
    member: { name: "Marcus Aurelius", role: "Manager" },
    type: "Casual",
    startDate: "May 28, 2026",
    endDate: "May 28, 2026",
    duration: "1 Day",
    status: "Rejected"
  }
]

export default function LeavePage() {
  const [data] = useState<Leave[]>(MOCK_LEAVES)
  const [date, setDate] = useState<Date | undefined>(new Date())

  const columns: ColumnDef<Leave>[] = [
    {
      accessorKey: "member",
      header: "Team Member",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 rounded-xl border-2 border-white shadow-sm">
            <AvatarImage src={row.original.member.avatar} />
            <AvatarFallback className="rounded-xl bg-zinc-100 text-zinc-900 font-bold text-xs">
              {row.original.member.name[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-bold text-zinc-900 text-sm leading-none mb-1">{row.original.member.name}</span>
            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-tighter">{row.original.member.role}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: "Leave Type",
      cell: ({ row }) => {
        const type = row.getValue("type") as string
        const Icon = type === "Annual" ? Plane : type === "Sick" ? Stethoscope : Briefcase
        return (
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-zinc-50 flex items-center justify-center text-zinc-400 border border-zinc-100">
              <Icon className="h-3.5 w-3.5" />
            </div>
            <span className="font-bold text-zinc-700 text-xs">{type}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "startDate",
      header: "From",
      cell: ({ row }) => <span className="text-zinc-500 font-bold text-xs">{row.getValue("startDate")}</span>,
    },
    {
      accessorKey: "endDate",
      header: "To",
      cell: ({ row }) => <span className="text-zinc-500 font-bold text-xs">{row.getValue("endDate")}</span>,
    },
    {
      accessorKey: "duration",
      header: "Duration",
      cell: ({ row }) => (
        <div className="px-3 py-1 bg-zinc-50 rounded-lg w-fit border border-zinc-100">
          <span className="font-black text-zinc-900 text-[10px]">{row.getValue("duration")}</span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge className={cn(
            "rounded-lg px-3 py-1 font-black text-[9px] border shadow-sm uppercase tracking-wider",
            status === "Approved" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : 
            status === "Pending" ? "bg-amber-50 text-amber-600 border-amber-100" : 
            "bg-rose-50 text-rose-600 border-rose-100"
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

  return (
    <ContentLayout title="Leave Management">
      <div className="flex flex-col gap-8 p-6 sm:p-10 max-w-[1600px] mx-auto min-h-screen">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
           <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Leave Management</h1>
              <div className="flex items-center gap-2">
                 <div className="h-2 w-2 rounded-full bg-blue-500" />
                 <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Absence Lifecycle Hub</p>
              </div>
           </div>
           
           <div className="flex items-center gap-3">
              <div className="relative w-64">
                 <Input placeholder="Search request..." className="h-11 rounded-xl bg-white border-zinc-100 pl-10 font-bold shadow-sm" />
                 <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-300" />
              </div>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "h-11 px-5 rounded-xl border-zinc-100 font-bold gap-2 text-zinc-500 hover:bg-zinc-50",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 rounded-2xl border-zinc-100 shadow-2xl" align="end">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="rounded-2xl"
                  />
                </PopoverContent>
              </Popover>

              {/* <Button className="h-11 rounded-xl px-6 bg-zinc-900 text-white font-black shadow-xl shadow-zinc-900/20 gap-2">
                 <Plus className="h-4 w-4" /> New Request
              </Button> */}
           </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[
             { label: "Approved Leaves", val: "12", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50" },
             { label: "Pending Requests", val: "04", icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
             { label: "Rejected Requests", val: "02", icon: XCircle, color: "text-rose-500", bg: "bg-rose-50" },
           ].map((stat, i) => (
             <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-zinc-100 shadow-sm flex items-center justify-between group hover:shadow-xl transition-all cursor-pointer">
                <div className="flex flex-col gap-2">
                   <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{stat.label}</span>
                   <span className="text-4xl font-black text-zinc-900 tracking-tighter">{stat.val}</span>
                </div>
                <div className={cn("h-16 w-16 rounded-[1.5rem] flex items-center justify-center transition-all group-hover:scale-110", stat.bg)}>
                   <stat.icon className={cn("h-8 w-8", stat.color)} />
                </div>
             </div>
           ))}
        </div>

        {/* Leave Requests Table */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-zinc-100 shadow-sm">
           <div className="flex items-center justify-between mb-8 px-2">
              <div className="flex items-center gap-3">
                 <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                    <Calendar className="h-5 w-5" />
                 </div>
                 <h3 className="text-lg font-black text-zinc-900 tracking-tight">Recent Requests</h3>
              </div>
              <div className="flex items-center gap-2">
                 <Button variant="ghost" className="h-9 rounded-xl font-bold text-[10px] uppercase tracking-widest text-zinc-400 hover:text-zinc-900">All</Button>
                 <Button variant="ghost" className="h-9 rounded-xl font-bold text-[10px] uppercase tracking-widest text-zinc-400 hover:text-zinc-900">Pending</Button>
                 <Button variant="ghost" className="h-9 rounded-xl font-bold text-[10px] uppercase tracking-widest text-zinc-400 hover:text-zinc-900">Approved</Button>
              </div>
           </div>
           <DataTable 
             columns={columns} 
             data={data} 
           />
        </div>
      </div>
    </ContentLayout>
  )
}
