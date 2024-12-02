import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const prisma = new PrismaClient();
  const body = await request.json();

  const { fullName, email, password, dateOfBirth, gender, nationality } = body;

  if (
    !fullName ||
    !email ||
    !password ||
    !dateOfBirth ||
    !gender ||
    !nationality
  ) {
    return new Response(
      JSON.stringify({ message: "All fields are required" }),
      {
        status: 400,
      }
    );
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return new Response(
        JSON.stringify({ message: "Email is already registered" }),
        {
          status: 400,
        }
      );
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        dateOfBirth: new Date(dateOfBirth),
        gender,
        nationality,
      },
    });

    return new Response(
      JSON.stringify({
        message: "User registered successfully",
        user: newUser,
      }),
      {
        status: 201,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}