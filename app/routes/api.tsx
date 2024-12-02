
import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { PrismaClient } from '@prisma/client';
import { prisma } from "../prisma.client";

const app = new Hono()

const schema = z.object({
  name: z.string()
})

const routes = app.get('/echo', zValidator('query', schema), (c) => {
  const { name } = c.req.valid('query')
  return c.json({ message: `Hello, ${name}! from API` })
})

export type AppType = typeof routes

const test_prisma = app.get('/prisma', zValidator('query', schema), async (c) => {
    const { name } = c.req.valid('query')

    const users = await prisma.user.findMany({
        where: {
            name: name
        },
    })
    
    await prisma.$disconnect()
    return c.json(users)
})

export type TestPrismaType = typeof test_prisma

export default app