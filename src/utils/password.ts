import bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function comparePassword(
  userPassword: string,
  password: string,
): Promise<boolean> {
  console.log(userPassword, password);
  return await bcrypt.compare(password, userPassword);
}
