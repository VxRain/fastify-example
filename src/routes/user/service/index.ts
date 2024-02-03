import { randomBytes } from "crypto";
import { hashSync, verifySync } from "@node-rs/argon2";

/** 生成盐值(12位) */
export function makeSalt() {
  return randomBytes(6).toString("hex");
}

/** 加密用户密码 */
export function cryptPwd(password: string, salt: string) {
  const saltPassword = `${password}:${salt}`;
  return hashSync(saltPassword, { memoryCost: 1024, timeCost: 1 });
}

/**
 * 判断用户输入的是否是有效密码
 * 如果用户是第三方登录，密码可能为null
 */
export function isValidPwd(
  user: { password: string | null; salt: string | null },
  inputPwd: string
) {
  if (user.password === null) return false;

  const saltPassword = `${inputPwd}:${user.salt}`;
  return verifySync(user.password, saltPassword);
}
