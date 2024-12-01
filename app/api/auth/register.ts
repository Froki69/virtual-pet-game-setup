export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("Request Method:", req.method);
    console.log("Request Body:", req.body);
  
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }
  
    const { fullName, email, password, dateOfBirth, gender, nationality } = req.body;
  
    if (!fullName || !email || !password || !dateOfBirth || !gender || !nationality) {
      console.error("Validation failed. Missing fields:", req.body);
      return res.status(400).json({ message: "All fields are required" });
    }
  
    try {
      console.log("Checking if user exists...");
      const existingUser = await prisma.user.findUnique({ where: { email } });
  
      if (existingUser) {
        console.warn("User already exists:", email);
        return res.status(400).json({ message: "Email is already registered" });
      }
  
      console.log("Hashing password...");
      const hashedPassword = bcrypt.hashSync(password, 10);
  
      console.log("Creating new user...");
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
  
      console.log("User created successfully:", newUser);
      return res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      console.error("Error during registration:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  