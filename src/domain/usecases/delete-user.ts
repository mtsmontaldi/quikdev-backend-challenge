export interface DeleteUser {
  delete(userId: string): Promise<boolean>
}
