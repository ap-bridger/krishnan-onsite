"use client";

import { Button, Skeleton } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { Transaction, FilterableDisplayElement } from "./types";
import { FilterableDropdown } from "./FilterableDropdown";
import { useMutation } from "@apollo/client";
import { UPDATE_TRANSACTION } from "./AddButton.api";
import { GET_TRANSACTIONS } from "./TransactionTable.api";

const vendorOptions: FilterableDisplayElement<string>[] = [
  { key: "staples", displayName: "Staples", label: "", value: "Staples" },
  { key: "capital-grille", displayName: "The Capital Grille", label: "", value: "The Capital Grille" },
  { key: "adobe", displayName: "Adobe", label: "", value: "Adobe" },
  { key: "shell", displayName: "Shell", label: "", value: "Shell" },
  { key: "marriott", displayName: "Marriott", label: "", value: "Marriott" },
  { key: "comcast", displayName: "Comcast", label: "", value: "Comcast" },
  { key: "chipotle", displayName: "Chipotle", label: "", value: "Chipotle" },
  { key: "best-buy", displayName: "Best Buy", label: "", value: "Best Buy" },
  { key: "uber", displayName: "Uber", label: "", value: "Uber" },
  { key: "dropbox", displayName: "Dropbox", label: "", value: "Dropbox" },
  { key: "amazon", displayName: "Amazon", label: "", value: "Amazon" },
  { key: "walmart", displayName: "Walmart", label: "", value: "Walmart" },
];

const categoryOptions: FilterableDisplayElement<string>[] = [
  { key: "office-supplies", displayName: "Office Supplies", label: "", value: "Office Supplies" },
  { key: "meals", displayName: "Meals & Entertainment", label: "", value: "Meals & Entertainment" },
  { key: "software", displayName: "Software", label: "", value: "Software" },
  { key: "transportation", displayName: "Transportation", label: "", value: "Transportation" },
  { key: "travel", displayName: "Travel", label: "", value: "Travel" },
  { key: "utilities", displayName: "Utilities", label: "", value: "Utilities" },
  { key: "equipment", displayName: "Equipment", label: "", value: "Equipment" },
  { key: "professional-services", displayName: "Professional Services", label: "", value: "Professional Services" },
  { key: "advertising", displayName: "Advertising", label: "", value: "Advertising" },
  { key: "insurance", displayName: "Insurance", label: "", value: "Insurance" },
];


export const TransactionTable = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(dummyTransactions);

  const handleVendorChange = (transactionId: string, vendor: string) => {
    alert(`Vendor changed for transaction ${transactionId}: ${vendor}`);
  };

  const handleCategoryChange = (transactionId: string, category: string) => {
    alert(`Category changed for transaction ${transactionId}: ${category}`);
  };

  const handleAdd = (transactionId: string) => {
    const transaction = transactions.find(t => t.id === transactionId);
    console.log("Adding transaction:", transaction);
  };

  if (error) return <div>Error loading transactions: {error.message}</div>;

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
              Date
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
              Details
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
              Amount
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
              Predicted Vendor
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b" style={{ minWidth: '220px' }}>
              Picked Vendor
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
              Predicted Category
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b" style={{ minWidth: '220px' }}>
              Picked Category
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {loading ? (
            // Show skeleton rows while loading
            [...Array(10)].map((_, i) => (
              <tr key={i}>
                {[...Array(8)].map((_, j) => (
                  <td key={j} className="px-4 py-3">
                    <Skeleton height="20px" />
                  </td>
                ))}
              </tr>
            ))
          ) : (
            // Show actual data
            data?.transactions.map((transaction: Transaction) => (
            <tr key={transaction.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                {transaction.date}
              </td>
              <td className="px-4 py-3 text-sm text-gray-900">
                {transaction.details}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                ${transaction.amount.toFixed(2)}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                {transaction.predictedVendor}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm" style={{ minWidth: '220px' }}>
                <FilterableDropdown
                  label=""
                  placeholderText="Select vendor"
                  selectedText={transaction.pickedVendor}
                  options={vendorOptions}
                  onSelect={(vendor) => handleVendorChange(transaction.id, vendor)}
                  maxHeight="300px"
                />
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                {transaction.predictedCategory}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm" style={{ minWidth: '220px' }}>
                <FilterableDropdown
                  label=""
                  placeholderText="Select category"
                  selectedText={transaction.pickedCategory}
                  options={categoryOptions}
                  onSelect={(category) => handleCategoryChange(transaction.id, category)}
                  maxHeight="300px"
                />
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm">
                <Button
                  variant="solid"
                  size="sm"
                  onClick={() => handleAdd(transaction.id)}
                >
                  Add
                </Button>
              </td>
            </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};