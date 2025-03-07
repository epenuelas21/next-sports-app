import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Protected routes that require authentication
const protectedRoutes = ['/profile', '/projections', '/settings']

export async function middleware(request: NextRequest) {
  try {
    // Create response that we'll modify and return
    const res = NextResponse.next()
    
    // Create supabase client
    const supabase = createMiddlewareClient({ req: request, res })
    
    // Refresh session
    await supabase.auth.getSession()
    
    // Check auth status (separate call to avoid the cookie warning)
    const { data } = await supabase.auth.getUser()
    const user = data?.user
    
    console.log('Middleware called for path:', request.nextUrl.pathname)
    console.log('Session status:', user ? 'Authenticated' : 'Not authenticated')
    
    const isProtectedRoute = protectedRoutes.some(route => 
      request.nextUrl.pathname.startsWith(route)
    )
    
    console.log('Is protected route:', isProtectedRoute)
    
    // If the route is protected and there's no session, redirect to login
    if (isProtectedRoute && !user) {
      const redirectUrl = new URL('/login', request.url)
      redirectUrl.searchParams.set('redirectedFrom', request.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }
    
    return res
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.next()
  }
}

// Only run middleware on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
} 