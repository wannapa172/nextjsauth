import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";
interface RequestBody {
  username: string;
  password: string;
}
export async function POST(req: Request) {
  const body: RequestBody = await req.json();
  const user = await prisma.user.findFirst({
    where: {
      email: body.username,
    },
  });
  if (user && (await bcrypt.compare(body.password, user.password))) {
    const { password, ...noPassword } = user;
    return new Response(JSON.stringify(noPassword));
  }
  return new Response(JSON.stringify(null));
}
