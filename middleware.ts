import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  authRoutes,
  publicRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const onDefaultRedirectPage = nextUrl.pathname === DEFAULT_LOGIN_REDIRECT;

  // If the user is accessing an auth route and they are not logged in, redirect them to the login page
  if (isAuthRoute && !isLoggedIn) {
    return Response.redirect(new URL('/', nextUrl));
  }

  // If the user is logged in and trying to access an auth route, but they are already on the default redirect page, do nothing
  if (isLoggedIn && onDefaultRedirectPage) {
    return;
  }

  // If the user is logged in and trying to access an auth route (and not already on the default redirect page), redirect them to the default login redirect
  if (isLoggedIn && isAuthRoute) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  // If the user is not logged in and trying to access a non-public route, redirect them to the login page with a callbackUrl
  if (!isLoggedIn && !isPublicRoute) {
    const callbackUrl = encodeURIComponent(nextUrl.pathname);
    return Response.redirect(new URL(`/?callbackUrl=${callbackUrl}`, nextUrl));
  }

  // By default, allow any other route
  return;
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}