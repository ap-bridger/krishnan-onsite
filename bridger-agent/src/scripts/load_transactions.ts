import { prisma } from "@/lib/db";
import fs from "fs";
import Papa from "papaparse";

const FILE_PATH = "/Users/joshroy/Downloads/sample_transactions_2.csv";

function loadTransactions() {
  const file = fs.readFileSync(FILE_PATH, "utf8");

  Papa.parse(file, {
    header: true, // Parses first row as column headers
    skipEmptyLines: true,
    complete: (results: any) => {
      results.data.forEach(async (row: any) => {
        await prisma.transaction.create({
          data: {
            date: new Date(row["date"]),
            bankDetails: row["bankDetail"],
            amountCents: Number(row["amountCents"]),
            predVendor: row["vendor"],
            predCategory: row["account"],
          },
        });
      });
    },
  });
}

loadTransactions();
