"use client"

import { useState, useEffect } from "react"
import { 
  ShieldCheck, 
  Clock, 
  Edit3, 
  MapPin, 
  AlertTriangle,
  Workflow,
  Plus,
  AlignLeft,
  CalendarDays,
  Smartphone,
  ShieldAlert
} from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useAttendancePolicies } from "@/hooks/use-attendance-policies"
import { ApiAttendancePolicy } from "@/service/attendancePolicyService"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface PolicyDialogProps {
  mode?: "edit" | "create"
  policy?: ApiAttendancePolicy
  onSuccess?: () => void
}

const DAYS_OF_WEEK = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

export function PolicyDialog({ mode = "create", policy, onSuccess }: PolicyDialogProps) {
  const [open, setOpen] = useState(false)
  const { createPolicy, updatePolicy, isLoading } = useAttendancePolicies({ skipFetch: true })

  // Payload states
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [isActive, setIsActive] = useState(true)
  const [checkInTime, setCheckInTime] = useState("09:00")
  const [checkOutTime, setCheckOutTime] = useState("18:00")
  const [graceMinutes, setGraceMinutes] = useState(10)
  const [halfDayAfterMinutes, setHalfDayAfterMinutes] = useState(240)
  const [fullDayMinutes, setFullDayMinutes] = useState(480)
  const [allowLateCheckIn, setAllowLateCheckIn] = useState(true)
  const [allowEarlyCheckOut, setAllowEarlyCheckOut] = useState(true)
  const [requireGeofence, setRequireGeofence] = useState(false)
  const [requireSelfie, setRequireSelfie] = useState(false)
  const [allowRegularization, setAllowRegularization] = useState(true)
  const [weeklyOffs, setWeeklyOffs] = useState<string[]>(["saturday", "sunday"])

  useEffect(() => {
    if (policy) {
      setName(policy.name || "")
      setDescription(policy.description || "")
      setIsActive(policy.isActive ?? true)
      setCheckInTime(policy.checkInTime || "09:00")
      setCheckOutTime(policy.checkOutTime || "18:00")
      setGraceMinutes(policy.graceMinutes ?? 10)
      setHalfDayAfterMinutes(policy.halfDayAfterMinutes ?? 240)
      setFullDayMinutes(policy.fullDayMinutes ?? 480)
      setAllowLateCheckIn(policy.allowLateCheckIn ?? true)
      setAllowEarlyCheckOut(policy.allowEarlyCheckOut ?? true)
      setRequireGeofence(policy.requireGeofence ?? false)
      setRequireSelfie(policy.requireSelfie ?? false)
      setAllowRegularization(policy.allowRegularization ?? true)
      setWeeklyOffs(policy.weeklyOffs || ["saturday", "sunday"])
    } else {
      setName("")
      setDescription("Default attendance policy for employees")
      setIsActive(true)
      setCheckInTime("09:00")
      setCheckOutTime("18:00")
      setGraceMinutes(10)
      setHalfDayAfterMinutes(240)
      setFullDayMinutes(480)
      setAllowLateCheckIn(true)
      setAllowEarlyCheckOut(true)
      setRequireGeofence(false)
      setRequireSelfie(false)
      setAllowRegularization(true)
      setWeeklyOffs(["saturday", "sunday"])
    }
  }, [policy, open])

  const toggleDay = (day: string) => {
    setWeeklyOffs((prev) => 
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    )
  }

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error("Policy Name is required")
      return
    }

    try {
      const payload = {
        name: name.trim(),
        description: description.trim(),
        checkInTime,
        checkOutTime,
        graceMinutes: Number(graceMinutes) || 0,
        halfDayAfterMinutes: Number(halfDayAfterMinutes) || 0,
        fullDayMinutes: Number(fullDayMinutes) || 0,
        allowLateCheckIn,
        allowEarlyCheckOut,
        requireGeofence,
        requireSelfie,
        allowRegularization,
        weeklyOffs,
        isActive,
      }

      if (mode === "edit" && policy) {
        const id = policy.id || policy._id
        if (id) {
          await updatePolicy(id, payload)
        }
      } else {
        await createPolicy(payload)
      }

      setOpen(false)
      if (onSuccess) onSuccess()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === "edit" ? (
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-zinc-400 hover:text-primary hover:bg-primary/5 transition-all">
            <Edit3 className="h-4 w-4" />
          </Button>
        ) : (
          <Button className="h-11 px-6 rounded-xl font-bold shadow-lg shadow-primary/20 gap-2">
            Create Policy
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px] p-0 overflow-hidden border-none shadow-2xl rounded-[2rem]">
        <DialogHeader className="p-8 border-b border-zinc-50 bg-white">
           <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                 <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                 <DialogTitle className="text-2xl font-black text-zinc-900 tracking-tight">
                   {mode === "edit" ? "Edit Policy" : "Create Policy"}
                 </DialogTitle>
                 <DialogDescription className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Global Attendance Strategy</DialogDescription>
              </div>
           </div>
        </DialogHeader>

        <div className="p-8 space-y-8 bg-white max-h-[65vh] overflow-y-auto custom-scrollbar">
           
           {/* Policy Identity */}
           <div className="space-y-4">
              <div className="flex items-center justify-between">
                 <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Policy Name</Label>
                 <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-zinc-400">Status</span>
                    <Switch checked={isActive} onCheckedChange={setIsActive} />
                 </div>
              </div>
              <Input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Office Policy B" 
                className="h-14 rounded-2xl bg-zinc-50 border-none font-bold text-zinc-900 focus-visible:ring-primary" 
              />
           </div>

           {/* Policy Description */}
           <div className="space-y-3 pt-4 border-t border-zinc-50">
              <Label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                 <AlignLeft className="h-4 w-4 text-zinc-400" /> Description
              </Label>
              <Input 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the policy guidelines..." 
                className="h-14 rounded-2xl bg-zinc-50 border-none font-bold text-zinc-900 focus-visible:ring-primary" 
              />
           </div>

           {/* Work Schedule (Start / End times) */}
           <div className="space-y-4 pt-4 border-t border-zinc-50">
              <div className="flex items-center gap-2 text-zinc-900">
                 <Clock className="h-4 w-4 text-primary" />
                 <span className="text-[10px] font-black uppercase tracking-widest">Work Schedule</span>
              </div>
              <div className="grid grid-cols-2 gap-6">
                 <div className="space-y-3">
                    <Label className="text-[10px] font-bold text-zinc-400 uppercase tracking-tight">Start Time</Label>
                    <Input 
                      type="time" 
                      value={checkInTime}
                      onChange={(e) => setCheckInTime(e.target.value)}
                      className="h-12 rounded-xl bg-zinc-50 border-none font-bold focus-visible:ring-primary" 
                    />
                 </div>
                 <div className="space-y-3">
                    <Label className="text-[10px] font-bold text-zinc-400 uppercase tracking-tight">End Time</Label>
                    <Input 
                      type="time" 
                      value={checkOutTime}
                      onChange={(e) => setCheckOutTime(e.target.value)}
                      className="h-12 rounded-xl bg-zinc-50 border-none font-bold focus-visible:ring-primary" 
                    />
                 </div>
              </div>
           </div>

           {/* Weekly Offs */}
           <div className="space-y-4 pt-4 border-t border-zinc-50">
              <div className="flex items-center gap-2 text-zinc-900">
                 <CalendarDays className="h-4 w-4 text-violet-500" />
                 <span className="text-[10px] font-black uppercase tracking-widest">Weekly Offs</span>
              </div>
              <div className="flex flex-wrap gap-2">
                 {DAYS_OF_WEEK.map((day) => {
                    const isSelected = weeklyOffs.includes(day)
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleDay(day)}
                        className={cn(
                          "px-4 py-2 rounded-xl text-xs font-bold transition-all border",
                          isSelected
                            ? "bg-primary border-primary text-white scale-105 shadow-sm shadow-primary/20"
                            : "bg-zinc-50 border-zinc-100 text-zinc-600 hover:bg-zinc-100"
                        )}
                      >
                        {day}
                      </button>
                    )
                 })}
              </div>
           </div>

           {/* Dynamic Configurations (Grace Period / Deductions) */}
           <div className="space-y-4 pt-4 border-t border-zinc-50">
              <div className="flex items-center gap-2 text-zinc-900">
                 <AlertTriangle className="h-4 w-4 text-amber-500" />
                 <span className="text-[10px] font-black uppercase tracking-widest">Thresholds & Tolerance</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                 <div className="space-y-3">
                    <Label className="text-[10px] font-bold text-zinc-400 uppercase tracking-tight">Grace Period</Label>
                    <div className="relative">
                       <Input 
                         type="number"
                         value={graceMinutes}
                         onChange={(e) => setGraceMinutes(Number(e.target.value))}
                         className="h-12 rounded-xl bg-zinc-50 border-none font-bold pr-12 focus-visible:ring-primary" 
                       />
                       <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-zinc-300 uppercase">Min</span>
                    </div>
                 </div>
                 <div className="space-y-3">
                    <Label className="text-[10px] font-bold text-zinc-400 uppercase tracking-tight">Half Day After</Label>
                    <div className="relative">
                       <Input 
                         type="number"
                         value={halfDayAfterMinutes}
                         onChange={(e) => setHalfDayAfterMinutes(Number(e.target.value))}
                         className="h-12 rounded-xl bg-zinc-50 border-none font-bold pr-12 focus-visible:ring-primary" 
                       />
                       <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-zinc-300 uppercase">Min</span>
                    </div>
                 </div>
                 <div className="space-y-3">
                    <Label className="text-[10px] font-bold text-zinc-400 uppercase tracking-tight">Full Day After</Label>
                    <div className="relative">
                       <Input 
                         type="number"
                         value={fullDayMinutes}
                         onChange={(e) => setFullDayMinutes(Number(e.target.value))}
                         className="h-12 rounded-xl bg-zinc-50 border-none font-bold pr-12 focus-visible:ring-primary" 
                       />
                       <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-zinc-300 uppercase">Min</span>
                    </div>
                 </div>
              </div>
           </div>

           {/* Hardware/Access Controls */}
           <div className="space-y-4 pt-4 border-t border-zinc-50">
              <div className="flex items-center gap-2 text-zinc-900">
                 <Smartphone className="h-4 w-4 text-sky-500" />
                 <span className="text-[10px] font-black uppercase tracking-widest">Hardware & Security Controls</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50/50 border border-zinc-100">
                    <span className="text-xs font-bold text-zinc-700">Geofence Check</span>
                    <Switch checked={requireGeofence} onCheckedChange={setRequireGeofence} />
                 </div>
                 <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50/50 border border-zinc-100">
                    <span className="text-xs font-bold text-zinc-700">Selfie Verification</span>
                    <Switch checked={requireSelfie} onCheckedChange={setRequireSelfie} />
                 </div>
              </div>
           </div>

           {/* Late checks & Adjustments */}
           <div className="space-y-4 pt-4 border-t border-zinc-50">
              <div className="flex items-center gap-2 text-zinc-900">
                 <ShieldAlert className="h-4 w-4 text-emerald-500" />
                 <span className="text-[10px] font-black uppercase tracking-widest">Flexibility Rules</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                 <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50/50 border border-zinc-100">
                    <span className="text-xs font-bold text-zinc-700">Allow Late Check-In</span>
                    <Switch checked={allowLateCheckIn} onCheckedChange={setAllowLateCheckIn} />
                 </div>
                 <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50/50 border border-zinc-100">
                    <span className="text-xs font-bold text-zinc-700">Allow Early Check-Out</span>
                    <Switch checked={allowEarlyCheckOut} onCheckedChange={setAllowEarlyCheckOut} />
                 </div>
                 <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50/50 border border-zinc-100">
                    <span className="text-xs font-bold text-zinc-700">Allow Regularization</span>
                    <Switch checked={allowRegularization} onCheckedChange={setAllowRegularization} />
                 </div>
              </div>
           </div>

        </div>

        <DialogFooter className="p-8 bg-zinc-50/50 border-t border-zinc-100">
           <Button variant="ghost" className="h-12 px-8 rounded-2xl font-bold text-zinc-400" onClick={() => setOpen(false)} disabled={isLoading}>
              Discard
           </Button>
           <Button 
             onClick={handleSubmit}
             className="h-12 px-10 rounded-2xl bg-primary font-black shadow-xl shadow-primary/20 tracking-wide"
             disabled={isLoading}
           >
              {isLoading ? "Saving..." : (mode === "edit" ? "Update Policy" : "Create Policy")}
           </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
