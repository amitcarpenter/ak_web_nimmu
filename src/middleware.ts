import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Public routes that don't need authentication (user-facing pages)
  const publicRoutes = ['/about', '/features', '/pricing', '/contact', '/stores'];
  
  // User panel routes (public, no auth required for browsing)
  const userRoutes = [
    '/categories', '/products', '/search', '/cart', '/checkout', 
    '/offers', '/wishlist', '/support', '/terms', '/privacy', 
    '/delivery-policy', '/refund-policy', '/store-locator', '/vendors'
  ];
  
  // Auth routes (login, signup, forgot password, etc.)
  const authRoutes = [
    '/auth/admin/login', '/auth/super-admin/login', '/auth/forgot-password', 
    '/auth/sign-in', '/auth/sign-up', '/auth/login', '/auth/signup'
  ];

  // Check if route is public, user route, or auth route
  const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith('/stores/'));
  const isUserRoute = userRoutes.some(route => pathname.startsWith(route)) || pathname === '/';
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  // Base URL (/) - user home page, allow access
  if (pathname === '/') {
    return NextResponse.next();
  }

  // Allow all routes - no authentication required
  // If it's a public, user, or auth route, allow access
  if (isPublicRoute || isUserRoute || isAuthRoute) {
    return NextResponse.next();
  }

  // For any other routes (including admin routes), allow access without authentication
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

