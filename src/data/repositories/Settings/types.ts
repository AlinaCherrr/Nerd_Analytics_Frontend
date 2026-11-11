export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
}

export interface SettingsRepository {
  changePassword: (req: ChangePasswordRequest) => Promise<void>
}
