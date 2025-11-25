import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req:NextRequest){
    const token=req.cookies.get("token")?.value;

    console.log("token= ", token)
    const publicRoutes= ["/auth/signin","/auth/signup"];

    if(publicRoutes.includes(req.nextUrl.pathname)){
        if(token){
            return NextResponse.redirect(new URL("/",req.url));

        }

        return  NextResponse.next();
    }

    if(!token){
        return NextResponse.redirect(new URL("/auth/signin", req.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: ["/", "/call/:path*","/auth/:path*"],
};
