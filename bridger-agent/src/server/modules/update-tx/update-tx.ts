import { prisma } from "@/lib/db";

export const updateTx = async () => {
  const transaction = await prisma.transaction.findUniqueOrThrow({
    where: { id: 1 },
  });

  const updatedTransaction = await prisma.transaction.update({
    where: { id: transaction.id },
    data: {
      pickedVendor: "Amazon",
      pickedCategory: "Groceries",
    },
  });

  const response = await fetch("http://localhost:8000/transactions", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
