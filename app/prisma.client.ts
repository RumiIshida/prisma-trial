/**
 * - アプリケーション全体で PrismaClient を共有する
 * - ホットリロードによる新しいインスタンスの作成を防ぐために、開発環境でのみPrismaClientグローバル変数に割り当てる
 * @see https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections#prismaclient-in-long-running-applications
 */

import { PrismaClient } from "@prisma/client";


const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
