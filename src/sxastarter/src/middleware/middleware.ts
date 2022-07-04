//import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const basePath = request.nextUrl.pathname;
  console.log(basePath);
  if (process.env.EDITING_HOST == "true" && !basePath.startsWith("/api") && !basePath.startsWith("/_next")){
    //return NextResponse.rewrite(new URL('/editinghost', request.url));
  }
}

// See "Matching Paths" below to learn more