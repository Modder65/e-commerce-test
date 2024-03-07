/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 */
export const publicRoutes = [
  "/",
  "/register"
]

export const authRoutes = [
  "/home",
]

/**
 * The default redirect path after logging in
 */
export const DEFAULT_LOGIN_REDIRECT = "/home";
// Use the one below when testing to finish auth tutorial video
//export const DEFAULT_LOGIN_REDIRECT = "/settings";