"use client"

import { useState } from "react"
import { 
  Building2, 
  Factory, 
  Banknote, 
  ShieldCheck, 
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Mail,
  Globe,
  Plus,
  X,
  Building,
  Briefcase,
  Phone,
  User,
  Zap,
  FileText,
  UploadCloud,
  Calendar,
  Lock,
  ArrowRight
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

type Step = "profile" | "operations" | "financials" | "governance" | "finalize"

const STEPS: { id: Step; label: string; icon: any }[] = [
  { id: "profile", label: "PROFILE", icon: Building2 },
  { id: "operations", label: "OPERATIONS", icon: Factory },
  { id: "financials", label: "FINANCIALS", icon: Banknote },
  { id: "governance", label: "GOVERNANCE", icon: ShieldCheck },
  { id: "finalize", label: "FINALIZE", icon: CheckCircle2 },
]

function DocumentRow({ label }: { label: string }) {
  const [isActive, setIsActive] = useState(false)
  return (
    <div 
      onClick={() => setIsActive(!isActive)}
      className={cn(
        "flex items-center justify-between px-6 py-8 rounded-2xl border transition-all cursor-pointer my-3",
        isActive ? "bg-emerald-50/40 border-emerald-200 shadow-sm" : "bg-white border-zinc-100 hover:border-zinc-200"
      )}
    >
       <div className="flex items-center gap-4">
          <div className={cn(
            "h-6 w-6 rounded-lg border-2 flex items-center justify-center transition-all",
            isActive ? "bg-emerald-500 border-emerald-500 text-white" : "border-zinc-200"
          )}>
             {isActive && <CheckCircle2 className="h-4 w-4" />}
          </div>
          <span className={cn("text-xs font-black transition-colors", isActive ? "text-emerald-900" : "text-zinc-400")}>{label}</span>
       </div>
       {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Button className="h-8 px-4 bg-primary text-[8px] font-black rounded-lg gap-2 hover:bg-primary/90 shadow-lg shadow-primary/20">
               <UploadCloud className="h-3 w-3" /> UPLOAD
            </Button>
          </motion.div>
       )}
    </div>
  )
}

export function VendorDialog() {
  const [open, setOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState<Step>("profile")
  const currentStepIdx = STEPS.findIndex(s => s.id === currentStep)

  const nextStep = () => {
    if (currentStepIdx < STEPS.length - 1) {
      setCurrentStep(STEPS[currentStepIdx + 1].id)
    }
  }

  const prevStep = () => {
    if (currentStepIdx > 0) {
      setCurrentStep(STEPS[currentStepIdx - 1].id)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-12 px-8 rounded-2xl bg-primary font-black shadow-xl shadow-primary/20 gap-2">
           <Plus className="h-5 w-5" /> Add Strategic Vendor
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] w-[95vw] max-h-[90vh] p-0 overflow-hidden border-none shadow-2xl rounded-[2rem] flex flex-col">
        
        {/* Header Block */}
        <div className="flex items-center justify-between p-5 bg-zinc-900 text-white shrink-0">
           <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center text-primary">
                 <Building2 className="h-4 w-4" />
              </div>
              <div>
                 <DialogTitle className="text-lg font-black tracking-tight">Add Strategic Vendor</DialogTitle>
                 <p className="text-white/40 text-[8px] font-bold uppercase tracking-widest leading-none">Partner Deployment</p>
              </div>
           </div>
        </div>

        {/* Compact Stepper */}
        <div className="px-8 py-6 bg-white border-b border-zinc-50 shrink-0">
           <div className="relative flex justify-between max-w-2xl mx-auto">
              <div className="absolute top-5 left-0 w-full h-[2px] bg-zinc-100 -z-10" />
              <div 
                className="absolute top-5 left-0 h-[2px] bg-primary transition-all duration-500 -z-10" 
                style={{ width: `${(currentStepIdx / (STEPS.length - 1)) * 100}%` }}
              />

              {STEPS.map((step, idx) => {
                const isCompleted = idx < currentStepIdx
                const isActive = step.id === currentStep
                return (
                  <div key={step.id} className="flex flex-col items-center gap-1.5">
                     <div className={cn(
                       "h-9 w-9 rounded-full flex items-center justify-center transition-all duration-300",
                       isCompleted ? "bg-primary text-white" : 
                       isActive ? "bg-primary text-white shadow-lg shadow-primary/30 scale-110" : 
                       "bg-white border-2 border-zinc-100 text-zinc-300"
                     )}>
                        {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : <step.icon className="h-3.5 w-3.5" />}
                     </div>
                     <span className={cn(
                       "text-[7px] font-black tracking-widest uppercase transition-all",
                       isActive ? "text-primary" : "text-zinc-400"
                     )}>
                        {step.label}
                     </span>
                  </div>
                )
              })}
           </div>
        </div>

        {/* Main Content Area: Fixed Height for Stability */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-white p-8">
           <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-12"
              >
                 {currentStep === "profile" && (
                   <div className="space-y-12">
                      {/* Section 1 & 2: Business Profile */}
                      <div className="space-y-8">
                         <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                               <Building2 className="h-5 w-5" />
                            </div>
                            <h2 className="text-sm font-black text-zinc-900 uppercase tracking-widest">Section 1 & 2: Business Profile</h2>
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                               <Label className="text-[11px] font-black text-zinc-900 uppercase tracking-tight">Legal Company Name</Label>
                               <Input placeholder="Enter registered name" className="h-14 rounded-2xl bg-white border border-zinc-100 shadow-sm font-bold" />
                            </div>
                            <div className="space-y-3">
                               <Label className="text-[11px] font-black text-zinc-900 uppercase tracking-tight">Trading Name (If Different)</Label>
                               <Input placeholder="Enter trading name" className="h-14 rounded-2xl bg-white border border-zinc-100 shadow-sm font-bold" />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                               <div className="space-y-3">
                                  <Label className="text-[11px] font-black text-zinc-900 uppercase tracking-tight">Year Established</Label>
                                  <Input placeholder="YYYY" className="h-14 rounded-2xl bg-white border border-zinc-100 shadow-sm font-bold" />
                               </div>
                               <div className="space-y-3">
                                  <Label className="text-[11px] font-black text-zinc-900 uppercase tracking-tight">Registration No.</Label>
                                  <Input placeholder="Enter number" className="h-14 rounded-2xl bg-white border border-zinc-100 shadow-sm font-bold" />
                               </div>
                            </div>
                            <div className="space-y-3">
                               <Label className="text-[11px] font-black text-zinc-900 uppercase tracking-tight">Primary Email Address</Label>
                               <div className="relative">
                                  <Input placeholder="contact@company.com" className="h-14 rounded-2xl bg-white border border-zinc-100 shadow-sm font-bold pr-12" />
                                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-500" />
                               </div>
                            </div>
                         </div>
                      </div>

                      {/* Section 3: Contact Details */}
                      <div className="space-y-8 pt-10 border-t border-zinc-100">
                         <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-400">
                               <User className="h-5 w-5" />
                            </div>
                            <h2 className="text-sm font-black text-zinc-900 uppercase tracking-widest">Section 3: Contact Details</h2>
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                               <Label className="text-[11px] font-black text-zinc-900 uppercase tracking-tight">Primary Contact Name</Label>
                               <Input placeholder="Full name" className="h-14 rounded-2xl bg-white border border-zinc-100 shadow-sm font-bold" />
                            </div>
                            <div className="space-y-3">
                               <Label className="text-[11px] font-black text-zinc-900 uppercase tracking-tight">Position / Title</Label>
                               <Input placeholder="Enter role" className="h-14 rounded-2xl bg-white border border-zinc-100 shadow-sm font-bold" />
                            </div>
                         </div>
                      </div>
                   </div>
                 )}

                 {currentStep === "operations" && (
                    <div className="space-y-12">
                       <div className="space-y-8">
                          <div className="flex items-center gap-3">
                             <div className="h-10 w-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-400">
                                <Briefcase className="h-5 w-5" />
                             </div>
                             <h2 className="text-sm font-black text-zinc-900 uppercase tracking-widest">Section 4: Offerings & Operations</h2>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                             <div className="space-y-3">
                                <Label className="text-[11px] font-black text-zinc-900 uppercase tracking-tight">Category</Label>
                                <Select>
                                   <SelectTrigger className="h-14 rounded-2xl bg-white border border-zinc-100 shadow-sm font-bold">
                                      <SelectValue placeholder="Select" />
                                   </SelectTrigger>
                                   <SelectContent className="rounded-xl">
                                      <SelectItem value="raw">Raw Materials</SelectItem>
                                      <SelectItem value="logistics">Logistics</SelectItem>
                                   </SelectContent>
                                </Select>
                             </div>
                             <div className="space-y-3">
                                <Label className="text-[11px] font-black text-zinc-900 uppercase tracking-tight">Supply Item</Label>
                                <Select>
                                   <SelectTrigger className="h-14 rounded-2xl bg-white border border-zinc-100 shadow-sm font-bold">
                                      <SelectValue placeholder="Select" />
                                   </SelectTrigger>
                                   <SelectContent className="rounded-xl">
                                      <SelectItem value="item1">Item A</SelectItem>
                                   </SelectContent>
                                </Select>
                             </div>
                             <div className="space-y-3">
                                <Label className="text-[11px] font-black text-zinc-900 uppercase tracking-tight">Lead Time</Label>
                                <Select defaultValue="1-2-weeks">
                                   <SelectTrigger className="h-14 rounded-2xl bg-white border border-zinc-100 shadow-sm font-bold">
                                      <SelectValue />
                                   </SelectTrigger>
                                   <SelectContent className="rounded-xl">
                                      <SelectItem value="1-2-weeks">1-2 weeks</SelectItem>
                                   </SelectContent>
                                </Select>
                             </div>
                          </div>
                       </div>

                       <div className="space-y-8 pt-10 border-t border-zinc-100">
                          <div className="flex items-center gap-3">
                             <div className="h-10 w-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-400">
                                <Factory className="h-5 w-5" />
                             </div>
                             <h2 className="text-sm font-black text-zinc-900 uppercase tracking-widest">Manufacturing Capabilities</h2>
                          </div>
                          <div className="space-y-3">
                             <Label className="text-[11px] font-black text-zinc-900 uppercase tracking-tight">Facility Address</Label>
                             <Input className="h-14 rounded-2xl bg-white border border-zinc-100 shadow-sm font-bold" />
                          </div>
                       </div>
                    </div>
                 )}

                 {currentStep === "financials" && (
                    <div className="space-y-12">
                       <div className="space-y-8">
                          <div className="flex items-center gap-3">
                             <div className="h-10 w-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-400">
                                <Banknote className="h-5 w-5" />
                             </div>
                             <h2 className="text-sm font-black text-zinc-900 uppercase tracking-widest">Section 5: Financial Information</h2>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             <div className="space-y-3">
                                <Label className="text-[11px] font-black text-zinc-900 uppercase tracking-tight">Bank Name</Label>
                                <Input className="h-14 rounded-2xl bg-white border border-zinc-100 shadow-sm font-bold" />
                             </div>
                             <div className="space-y-3">
                                <Label className="text-[11px] font-black text-zinc-900 uppercase tracking-tight">Account Number</Label>
                                <Input className="h-14 rounded-2xl bg-white border border-zinc-100 shadow-sm font-bold" />
                             </div>
                          </div>
                       </div>

                       {/* Section 7: Business References */}
                       <div className="space-y-8 pt-10 border-t border-zinc-100">
                          <div className="flex items-center gap-3">
                             <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
                                <User className="h-5 w-5" />
                             </div>
                             <h2 className="text-sm font-black text-zinc-900 uppercase tracking-widest">Section 7: Business References</h2>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             {[1, 2].map(ref => (
                               <div key={ref} className="bg-white p-8 rounded-[2rem] border border-zinc-100 shadow-sm space-y-6">
                                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Reference 0{ref}</span>
                                  <div className="space-y-4">
                                     <Input placeholder="Company Name" className="h-14 rounded-2xl bg-zinc-50/50 border-none font-bold" />
                                     <Input placeholder="Contact Person" className="h-14 rounded-2xl bg-zinc-50/50 border-none font-bold" />
                                     <div className="grid grid-cols-2 gap-4">
                                        <div className="relative">
                                           <Input placeholder="Email" className="h-14 rounded-2xl bg-zinc-50/50 border-none font-bold pr-10" />
                                           <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-500" />
                                        </div>
                                        <Input placeholder="Phone" className="h-14 rounded-2xl bg-zinc-50/50 border-none font-bold" />
                                     </div>
                                  </div>
                               </div>
                             ))}
                          </div>
                       </div>
                    </div>
                 )}

                 {currentStep === "governance" && (
                    <div className="space-y-12">
                       <div className="space-y-8">
                          <div className="flex items-center gap-3">
                             <div className="h-10 w-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-400">
                                <ShieldCheck className="h-5 w-5" />
                             </div>
                             <h2 className="text-sm font-black text-zinc-900 uppercase tracking-widest">Section 6: Compliance & HSE</h2>
                          </div>
                          <div className="space-y-4">
                             {[
                               "Do you have a formal Health, Safety & Environmental (HSE) policy?",
                               "Are you compliant with local environmental regulations?",
                               "Have you had any major HSE incidents in the last 3 years?"
                             ].map((q, i) => (
                                <div key={i} className="flex items-center justify-between p-6 bg-white rounded-2xl border border-zinc-50">
                                   <span className="text-sm font-bold text-zinc-700">{q}</span>
                                   <div className="flex items-center gap-6">
                                      <div className="flex items-center gap-2 cursor-pointer group">
                                         <div className="h-6 w-6 rounded-full border-2 border-zinc-200 flex items-center justify-center transition-all group-hover:border-primary">
                                            <div className="h-2.5 w-2.5 rounded-full bg-primary scale-0 group-hover:scale-100 transition-all" />
                                         </div>
                                         <span className="text-[9px] font-black uppercase text-zinc-400 group-hover:text-primary">YES</span>
                                      </div>
                                      <div className="flex items-center gap-2 cursor-pointer group">
                                         <div className="h-6 w-6 rounded-full border-2 border-primary flex items-center justify-center">
                                            <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                                         </div>
                                         <span className="text-[9px] font-black uppercase text-primary">NO</span>
                                      </div>
                                   </div>
                                </div>
                             ))}
                          </div>
                       </div>
                    </div>
                 )}

                 {currentStep === "finalize" && (
                    <div className="space-y-12 pb-10">
                       {/* Section 8: Required Documents Checklist */}
                       <div className="space-y-8">
                          <div className="flex items-center gap-3">
                             <div className="h-10 w-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-400">
                                <FileText className="h-5 w-5" />
                             </div>
                             <h2 className="text-sm font-black text-zinc-900 uppercase tracking-widest">Section 8: Required Documents Checklist</h2>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                             {[
                               { label: "Trade License" },
                               { label: "VAT Registration Certificate" },
                               { label: "Certificate of Incorporation" },
                               { label: "Bank Account Details / Cancelled Cheque" },
                               { label: "HSE Policy Document" },
                               { label: "Product Catalog / Brochure" },
                               { label: "List of Major Customers" },
                               { label: "Signed Vendor Code of Conduct" },
                             ].map((doc, i) => (
                               <DocumentRow key={i} label={doc.label} />
                             ))}
                          </div>
                       </div>

                       {/* Section 9: Declaration & Authorization */}
                       <div className="bg-zinc-900 rounded-[2.5rem] p-10 space-y-8 text-white shadow-2xl overflow-hidden relative">
                          <div className="absolute top-0 right-0 p-8 opacity-10">
                             <Lock className="h-32 w-32" />
                          </div>
                          <div className="flex items-center gap-3">
                             <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-primary">
                                <ShieldCheck className="h-5 w-5" />
                             </div>
                             <h2 className="text-sm font-black uppercase tracking-widest">Section 9: Declaration & Authorization</h2>
                          </div>
                          <p className="text-sm text-zinc-400 leading-relaxed font-medium">
                             I/We, the undersigned, hereby declare and confirm that all information provided is true, accurate, and complete. I/We understand that any misrepresentation may result in disqualification or termination. I/We agree to comply with the company's Vendor Code of Conduct and applicable policies.
                          </p>
                          <div className="grid grid-cols-2 gap-8">
                             <div className="space-y-3">
                                <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-tight">Authorized Signatory Name</Label>
                                <Input className="h-14 rounded-2xl bg-white/5 border-none font-bold text-white focus:ring-1 focus:ring-primary" />
                             </div>
                             <div className="space-y-3">
                                <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-tight">Designation / Title</Label>
                                <Input className="h-14 rounded-2xl bg-white/5 border-none font-bold text-white focus:ring-1 focus:ring-primary" />
                             </div>
                             <div className="space-y-3">
                                <Label className="text-[10px] font-black text-zinc-500 uppercase tracking-tight">Date</Label>
                                <div className="relative">
                                   <Input defaultValue="12/05/2026" className="h-14 rounded-2xl bg-white/5 border-none font-bold text-white pr-12" />
                                   <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>
                 )}
              </motion.div>
           </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className="p-8 bg-white border-t border-zinc-100 flex items-center justify-between shrink-0">
           <Button 
             variant="ghost" 
             className={cn("h-14 px-8 rounded-2xl font-bold gap-2 text-zinc-400", currentStepIdx === 0 && "opacity-0 pointer-events-none")}
             onClick={prevStep}
           >
              <ChevronLeft className="h-5 w-5" /> Previous
           </Button>
           <div className="flex items-center gap-6">
              {currentStep !== "finalize" ? (
                 <Button className="h-14 px-10 rounded-2xl bg-primary font-black shadow-xl shadow-primary/20 gap-3 group" onClick={nextStep}>
                    Next Step <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                 </Button>
              ) : (
                 <Button className="h-14 px-12 rounded-2xl bg-primary font-black shadow-2xl shadow-primary/20 text-white">
                    Deploy Vendor
                 </Button>
              )}
           </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
