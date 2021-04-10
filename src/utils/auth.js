export function getCurrentAuthority() {
  return ["admin"];
}

export function check(authority) {
  // authority为当前需要的权限
  const currentAuthority = getCurrentAuthority(); // 用户的权限
  return currentAuthority.some((item) => authority.includes(item));
}

export function isLogin() {
  const currentAuthority = getCurrentAuthority(); // 用户的权限
  return currentAuthority && currentAuthority[0] !== "guess";
}
