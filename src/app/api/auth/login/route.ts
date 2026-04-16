// import { NextRequest, NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import { signToken } from "@/lib/auth";

// const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
// const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH!;

// export async function POST(req: NextRequest) {
//   try {
//     const { email, password } = await req.json();

//     if (!email || !password) {
//       return NextResponse.json(
//         { success: false, error: "Email and password are required" },
//         { status: 400 }
//       );
//     }

//     // Check admin credentials
//     if (email !== ADMIN_EMAIL) {
//       return NextResponse.json(
//         { success: false, error: "Invalid credentials" },
//         { status: 401 }
//       );
//     }

//     const isPasswordValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
//     if (!isPasswordValid) {
//       return NextResponse.json(
//         { success: false, error: "Invalid credentials" },
//         { status: 401 }
//       );
//     }

//     // Generate JWT token
//     const token = signToken({ email, role: "admin" });

//     // Set token in HTTP-only cookie
//     const response = NextResponse.json(
//       {
//         success: true,
//         data: { email, role: "admin" },
//         message: "Login successful",
//       },
//       { status: 200 }
//     );

//     response.cookies.set("luxe_admin_token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: 60 * 60 * 24 * 7, // 7 days
//       path: "/",
//     });

//     return response;
//   } catch (error) {
//     console.error("Login error:", error);
//     return NextResponse.json(
//       { success: false, error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }





import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";



// console.log("ENV RAW:", process.env.ADMIN_PASSWORD_HASH);
// console.log("LENGTH:", process.env.ADMIN_PASSWORD_HASH?.length);

export async function POST(req: NextRequest) {
  try {
    // ✅ Load ENV inside function (fixes TS issue)
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;

    if (!ADMIN_EMAIL || !ADMIN_PASSWORD_HASH) {
      throw new Error("Missing admin credentials in .env.local");
    }

    // ✅ Proper typing
    const body = await req.json() as {
      email: string;
      password: string;
    };

    const { email, password } = body;

    // ✅ Validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    // ✅ Debug logs (remove later)
    // console.log("Entered Email:", email);
    // console.log("ENV Email:", ADMIN_EMAIL);
    // console.log("Entered Password:", password);
    // console.log("Hash:", ADMIN_PASSWORD_HASH);

    // ✅ Email check
    if (email !== ADMIN_EMAIL) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // ✅ Password check (NO red underline now)
    const isPasswordValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);

    console.log("Match:", isPasswordValid);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // ✅ Generate token
    const token = signToken({ email, role: "admin" });

    const response = NextResponse.json(
      {
        success: true,
        data: { email, role: "admin" },
        message: "Login successful",
      },
      { status: 200 }
    );

    // ✅ Set cookie
    response.cookies.set("luxe_admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;

  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}