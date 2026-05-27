import apiClient from "@/lib/api-client"

export type ApiAttendancePolicy = {
  _id?: string
  id?: string
  organizationId: string
  name: string
  description?: string | null
  checkInTime: string
  checkOutTime: string
  graceMinutes: number
  halfDayAfterMinutes: number
  fullDayMinutes: number
  allowLateCheckIn: boolean
  allowEarlyCheckOut: boolean
  requireGeofence: boolean
  requireSelfie: boolean
  allowRegularization: boolean
  weeklyOffs: string[]
  isActive: boolean
  createdAt?: string
  updatedAt?: string
}

export type GetAttendancePoliciesResponse = {
  success: boolean
  message: string
  data: ApiAttendancePolicy[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export type CreateAttendancePolicyPayload = {
  name: string
  description?: string
  checkInTime?: string
  checkOutTime?: string
  graceMinutes?: number
  halfDayAfterMinutes?: number
  fullDayMinutes?: number
  allowLateCheckIn?: boolean
  allowEarlyCheckOut?: boolean
  requireGeofence?: boolean
  requireSelfie?: boolean
  allowRegularization?: boolean
  weeklyOffs?: string[]
  isActive?: boolean
}

export const attendancePolicyService = {
  async getPolicies(params?: { search?: string; page?: number; limit?: number }): Promise<GetAttendancePoliciesResponse> {
    const response = await apiClient.get<any, any>("/attendancepolicy", { params })
    return response
  },

  async getPolicyById(id: string): Promise<ApiAttendancePolicy> {
    const response = await apiClient.get<any, any>(`/attendancepolicy/${id}`)
    return response?.data || response
  },

  async createPolicy(payload: CreateAttendancePolicyPayload): Promise<ApiAttendancePolicy> {
    const response = await apiClient.post<any, any>("/attendancepolicy", payload)
    return response?.data || response
  },

  async updatePolicy(id: string, payload: Partial<CreateAttendancePolicyPayload>): Promise<ApiAttendancePolicy> {
    const response = await apiClient.patch<any, any>(`/attendancepolicy/${id}`, payload)
    return response?.data || response
  },

  async deletePolicy(id: string): Promise<void> {
    await apiClient.delete(`/attendancepolicy/${id}`)
  },
}
