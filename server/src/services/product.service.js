import prisma from "../config/prisma.js";

export const getProducts = async () => {
  return await prisma.product.findMany();
};

export const getProductById = async (id) => {
  return await prisma.product.findUnique({ where: { id } });
};
