"use client"

import { useEffect, useRef, useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { 
  Trash,
  Search
} from "lucide-react"

import { ContentLayout } from "@/components/admin-panel/content-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTable } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { PolicyDialog } from "@/components/policy/policy-dialog"
import { cn } from "@/lib/utils"
import { useAttendancePolicies } from "@/hooks/use-attendance-policies"
import { ApiAttendancePolicy } from "@/service/attendancePolicyService"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function PolicyPage() {
  const { policies, isLoading, deletePolicy, refetch, updatePolicy, search, setSearch } = useAttendancePolicies()
  useEffect(() => {
    let active = true

    const delayDebounceFn = setTimeout(() => {
      if (active) {
        refetch()
      }
    }, search ? 300 : 0)

    return () => {
      active = false
      clearTimeout(delayDebounceFn)
    }
  }, [search, refetch])

  const columns: ColumnDef<ApiAttendancePolicy>[] = [
    {
      accessorKey: "name",
      header: "POLICY NAME",
      cell: ({ row }) => <div className="font-bold text-zinc-900 pl-4">{row.original.name}</div>,
    },
    {
      accessorKey: "description",
      header: "DESCRIPTION",
      cell: ({ row }) => <div className="font-medium text-zinc-500 max-w-[300px] whitespace-normal break-words text-justify">{row.original.description || "-"}</div>,
    },
    {
      accessorKey: "checkInTime",
      header: "CHECK IN TIME",
      cell: ({ row }) => <div className="font-bold text-zinc-900">{row.original.checkInTime || "09:00"}</div>,
    },
    {
      accessorKey: "checkOutTime",
      header: "CHECK OUT TIME",
      cell: ({ row }) => <div className="font-bold text-zinc-900">{row.original.checkOutTime || "18:00"}</div>,
    },
    {
      accessorKey: "graceMinutes",
      header: "LATE TOLERANCE",
      cell: ({ row }) => <div className="font-medium text-zinc-600">{row.original.graceMinutes || 0} Mins</div>,
    },
    {
      accessorKey: "halfDayAfterMinutes",
      header: "HALF DAY AFTER",
      cell: ({ row }) => <div className="font-medium text-zinc-600">{row.original.halfDayAfterMinutes || 0} Mins</div>,
    },
    {
      accessorKey: "fullDayMinutes",
      header: "FULL DAY DURATION",
      cell: ({ row }) => <div className="font-medium text-zinc-600">{row.original.fullDayMinutes || 0} Mins</div>,
    },
    {
      accessorKey: "allowLateCheckIn",
      header: "ALLOW LATE CHECK-IN",
      cell: ({ row }) => (
        <div>
          {row.original.allowLateCheckIn ? "Allowed" : "Blocked"}
        </div>
      ),
    },
    {
      accessorKey: "allowEarlyCheckOut",
      header: "ALLOW EARLY CHECK-OUT",
      cell: ({ row }) => (
        <div>
          {row.original.allowEarlyCheckOut ? "Allowed" : "Blocked"}
       </div>
      ),
    },
    {
      accessorKey: "weeklyOffs",
      header: "WEEKLY OFFS",
      cell: ({ row }) => {
        const offs = row.original.weeklyOffs || []
        if (offs.length === 0) return <span className="text-xs text-zinc-400 font-medium pl-2">-</span>

        return (
          <div onClick={(e) => e.stopPropagation()} className="pl-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 rounded-lg font-bold border-zinc-100 bg-zinc-50 hover:bg-zinc-100 flex gap-1 items-center shadow-none text-zinc-600 text-xs">
                  <span>{offs.length} Days</span>
                  <span className="text-[10px] text-zinc-400">▼</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-40 rounded-xl shadow-lg border-zinc-100 p-1.5 bg-white">
                {offs.map((day) => (
                  <DropdownMenuItem key={day} className="rounded-lg font-bold text-xs py-2 capitalize text-zinc-700 focus:bg-zinc-50 focus:text-zinc-900 cursor-pointer">
                    {day}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
    },
    {
      accessorKey: "requireGeofence",
      header: "GEOFENCE CHECK",
      cell: ({ row }) => (
        <div>
          {row.original.requireGeofence ? "Required" : "Disabled"}
        </div>
      ),
    },
    {
      accessorKey: "requireSelfie",
      header: "SELFIE VERIFICATION",
      cell: ({ row }) => (
        <div>
          {row.original.requireSelfie ? "Required" : "Disabled"}
        </div>
      ),
    },
    {
      accessorKey: "isActive",
      header: "STATUS",
      cell: ({ row }) => {
        const isActive = row.original.isActive
        const id = row.original.id || row.original._id
        return (
          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            <Switch
              checked={isActive}
              onCheckedChange={async () => {
                if (id) {
                  await updatePolicy(id, { isActive: !isActive })
                }
              }}
              className="data-[state=checked]:bg-emerald-600"
            />
            <span className={cn(
              "text-xs font-bold min-w-[65px] px-2 py-0.5 rounded-full transition-colors text-center",
              isActive ? "text-emerald-700 bg-emerald-50" : "text-zinc-500 bg-zinc-100"
            )}>
              {isActive ? "Active" : "Inactive"}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: "createdAt",
      header: "CREATED AT",
      cell: ({ row }) => {
        const dateStr = row.original.createdAt
        const displayDate = dateStr
          ? new Date(dateStr).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          : "-"
        return <div className="font-medium text-zinc-400">{displayDate}</div>
      },
    },
    {
      id: "actions",
      header: () => <div className="text-center w-full uppercase text-[10px] tracking-widest font-black text-zinc-400">Action</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-1">
          <PolicyDialog mode="edit" policy={row.original} onSuccess={refetch} />
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-xl text-zinc-400 hover:text-destructive hover:bg-destructive/5 transition-all"
            onClick={async () => {
              const id = row.original.id || row.original._id
              if (id && confirm(`Are you sure you want to remove the "${row.original.name}" policy?`)) {
                await deletePolicy(id)
              }
            }}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ),
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
           
           <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <Input
                  placeholder="Search policies..."
                  className="pl-10 h-11 bg-white border-none shadow-sm rounded-xl focus-visible:ring-primary font-medium"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* Create Policy Control */}
              <PolicyDialog mode="create" onSuccess={refetch} />
           </div>
        </div>

        {/* Policy Table Container: Pure Data View */}
           {isLoading && policies.length === 0 ? (
             <div className="text-center py-12 text-zinc-400 font-bold">
               Loading policies...
             </div>
           ) : (
             <DataTable 
               columns={columns} 
               data={policies} 
             />
           )}
        </div>
    </ContentLayout>
  )
}
