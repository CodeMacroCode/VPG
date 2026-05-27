import { useState, useEffect, useCallback, useRef } from "react"
import { attendancePolicyService, ApiAttendancePolicy, CreateAttendancePolicyPayload } from "@/service/attendancePolicyService"
import { toast } from "sonner"

export function useAttendancePolicies(options?: { skipFetch?: boolean }) {
  const skipFetch = options?.skipFetch ?? false

  const [policies, setPolicies] = useState<ApiAttendancePolicy[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 1,
  })

  const fetchPolicies = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await attendancePolicyService.getPolicies({
        search,
        page,
        limit,
      })
      setPolicies(response?.data || [])
      if (response?.pagination) {
        setPagination({
          total: response.pagination.total,
          totalPages: response.pagination.totalPages,
        })
      }
    } catch (err: any) {
      const msg = err.message || "Failed to fetch attendance policies"
      setError(msg)
      toast.error(msg)
    } finally {
      setIsLoading(false)
    }
  }, [search, page, limit])

  const createPolicy = async (payload: CreateAttendancePolicyPayload) => {
    setIsLoading(true)
    try {
      const newPolicy = await attendancePolicyService.createPolicy(payload)
      await fetchPolicies()
      toast.success(`Attendance policy "${newPolicy.name}" created successfully`)
      return newPolicy
    } catch (err: any) {
      const msg = err.message || "Failed to create attendance policy"
      toast.error(msg)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const updatePolicy = async (id: string, payload: Partial<CreateAttendancePolicyPayload>) => {
    setIsLoading(true)
    try {
      const updatedPolicy = await attendancePolicyService.updatePolicy(id, payload)
      await fetchPolicies()
      toast.success(`Attendance policy "${updatedPolicy.name}" updated successfully`)
      return updatedPolicy
    } catch (err: any) {
      const msg = err.message || "Failed to update attendance policy"
      toast.error(msg)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const deletePolicy = async (id: string) => {
    setIsLoading(true)
    try {
      await attendancePolicyService.deletePolicy(id)
      await fetchPolicies()
      toast.success("Attendance policy deleted successfully")
    } catch (err: any) {
      const msg = err.message || "Failed to delete attendance policy"
      toast.error(msg)
      throw err
    } finally {
      setIsLoading(false)
    }
  }



  return {
    policies,
    isLoading,
    error,
    search,
    setSearch,
    page,
    setPage,
    limit,
    setLimit,
    pagination,
    refetch: fetchPolicies,
    createPolicy,
    updatePolicy,
    deletePolicy,
  }
}
