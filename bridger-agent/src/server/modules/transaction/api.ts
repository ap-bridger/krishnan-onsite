import { prisma } from "@/lib/db";

export const transactions = async () => {
  const dbTransactions = await prisma.transaction.findMany({
    orderBy: { date: 'desc' }
  });
  
  return dbTransactions.map(t => ({
    id: t.id.toString(),
    date: t.date.toISOString().split('T')[0], // Format as YYYY-MM-DD
    details: t.bankDetails,
    amount: t.amountCents / 100, // Convert cents to dollars
    predictedVendor: t.predVendor || "",
    pickedVendor: t.pickedVendor || t.predVendor || "", // Default to predicted if not set
    predictedCategory: t.predCategory || "",
    pickedCategory: t.pickedCategory || t.predCategory || "", // Default to predicted if not set
  }));
};