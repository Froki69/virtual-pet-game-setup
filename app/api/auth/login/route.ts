// app/api/auth/login/route.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const prisma = new PrismaClient();
  const { email, password } = await request.json();

  if (!email || !password) {
    return new Response(
      JSON.stringify({ message: "Email and password required" }),
      {
        status: 400,
      }
    );
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return new Response(JSON.stringify({ message: "Invalid credentials" }), {
        status: 401,
      });
    }

    return new Response(JSON.stringify({ message: "Login successful" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}