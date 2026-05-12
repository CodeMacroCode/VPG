"use client"

import { ContentLayout } from "@/components/admin-panel/content-layout"
import { CalendarView } from "@/components/calendar/calendar-view"

export default function CalendarPage() {
  return (
    <ContentLayout title="Operational Calendar">
      <div className="flex flex-col gap-10 p-6 sm:p-12 max-w-[1700px] mx-auto">
        <div className="flex flex-col gap-2">
           <h1 className="text-4xl font-black text-zinc-900 tracking-tighter">Calendar</h1>
           <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em]">Operational Strategic Timeline</p>
           </div>
        </div>

        <CalendarView />
      </div>
    </ContentLayout>
  )
}
