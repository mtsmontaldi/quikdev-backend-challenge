export interface DeleteUserRepository {
  delete(userId: string): Promise<boolean>
}
