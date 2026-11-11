import { IS_MOCK } from "shared/utils"
import { authMockRepository } from "./mockRepository"
import { authRealRepository } from "./realRepository"
import type { AuthRepository } from "./types"

export const authRepository: AuthRepository = IS_MOCK ? authMockRepository : authRealRepository

export type { AuthRepository, User, LoginRequest, RegisterRequest, UpdateMeData } from "./types"
