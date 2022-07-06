import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

async function handler(req, res) {
    if (req.method !== 'POST') {
        return;
    }

    const data = req.body;

    const { name, email, password } = data;

    if (
        !name ||
        !email ||
        !email.includes('@') ||
        !password ||
        password.trim().length < 7
    ) {
        res.status(422).json({
            message:
                'password should also be at least 7 characters long.',
            error: true,
        });
        return;
    }
    const existingUser = await prisma.user.findUnique({
        where: {
            email: email,
        },
        select: {
            email: true, name: true,
        }
    }
    );

    if (existingUser) {
        res.status(422).json({ message: 'User Email already exists!', error: true });
        return;
    }

    const result = { id: 1, name: name, email: email }

    if (result) {
        res.status(201).json({ message: 'Created user!', error: false });
    } else {
        res.status(422).json({ message: 'Prisma error occured', error: true })
    }
}

export default handler;