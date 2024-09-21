import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";
import { i18n } from "./i18n.config";
import { NextRequest, NextResponse } from "next/server";
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

const { auth } = NextAuth(authConfig);

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()

  const locale = matchLocale(languages, locales, i18n.defaultLocale)
  return locale
}

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const pathname = nextUrl.pathname
  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
  const isDashboardRoute = pathname.startsWith('/dashboard');
  const isBoardRoute = pathname.startsWith('/board');
  const isAuthRoute = authRoutes.includes(pathname);
  const isPublicRoute = publicRoutes.includes(pathname); 
  
  const pathnameIsMissingLocale = i18n.locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  ) && !pathname.startsWith('/api') && !pathname.startsWith('/auth') && 
     !pathname.startsWith('/dashboard') && !pathname.startsWith('/board');

  // if the path is missing the locale, redirect to the path with the locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(req);

    if (locale === i18n.defaultLocale) {
      return NextResponse.rewrite(
        new URL(
          `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
          req.url
        )
      );
    }

    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        req.url
      )
    );
  }

  // if the path is api or public, don't do anything
  if (isApiAuthRoute || isPublicRoute) { 
    return null;
  }

  // if the path is auth, redirect to dashboard cause we don't want to show the login page
  if (isAuthRoute || isPublicRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return null;
  }

  // if the path is dashboard or board, redirect to login if not logged in
  if (isDashboardRoute || isBoardRoute) {
    if (!isLoggedIn) {
      let callbackUrl = pathname;
      if (nextUrl.search) {
        callbackUrl += nextUrl.search;
      }

      const encodedCallbackUrl = encodeURIComponent(callbackUrl);

      return Response.redirect(new URL(
        `/auth/login?callbackUrl=${encodedCallbackUrl}`,
        nextUrl
      ));
    }
    return null;
  }

  return null;
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}