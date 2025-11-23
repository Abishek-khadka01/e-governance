import { prisma } from '../../app';
import type { users, Prisma } from '../../generated/prisma/client';

export class AuthService {
  static async findByID(id: string): Promise<users | null> {
    return prisma.users.findFirst({
      where: { id },
      include: {
        user_documents_user_documents_user_idTousers: true,
      },
    });
  }

  static async findByCitizenNO(citizenNo: string): Promise<users | null> {
    return prisma.users.findFirst({
      where: { citizenship_no: citizenNo },
      include: {
        user_documents_user_documents_user_idTousers: true,
      },
    });
  }

  static async findByPhoneNumber(phoneNumber: string): Promise<users | null> {
    return prisma.users.findFirst({
      where: { phone_number: phoneNumber },
      include: {
        user_documents_user_documents_user_idTousers: true,
      },
    });
  }

  static async findAll(): Promise<users[]> {
    return prisma.users.findMany();
  }

  static async update(id: string, user: Prisma.usersUpdateInput | Partial<users>): Promise<users> {
    return prisma.users.update({
      where: { id },
      data: user,
    });
  }

  static createUser(data: Prisma.usersCreateInput): Promise<users> {
    return prisma.users.create({
      data,
    });
  }

  static async delete(id: string): Promise<users> {
    return prisma.users.delete({
      where: { id },
    });
  }

  static async findByEmail(email: string): Promise<users | null> {
    return await prisma.users.findUnique({
      where: {
        email,
      },
    });
  }
}

import type { user_documents } from '../../generated/prisma/client';

export class AuthDocumentService {
  static create(data: Prisma.user_documentsCreateInput): Promise<user_documents> {
    return prisma.user_documents.create({ data });
  }

  static findByID(id: string): Promise<user_documents | null> {
    return prisma.user_documents.findUnique({
      where: { id },
    });
  }

  static findByUserID(user_id: string): Promise<user_documents[]> {
    return prisma.user_documents.findMany({
      where: { user_id },
    });
  }

  static update(id: string, data: Prisma.user_documentsUpdateInput): Promise<user_documents> {
    return prisma.user_documents.update({
      where: { id },
      data,
    });
  }

  static delete(id: string): Promise<user_documents> {
    return prisma.user_documents.delete({
      where: { id },
    });
  }
}
