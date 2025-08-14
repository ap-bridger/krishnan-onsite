"use client";

import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { Transaction, FilterableDisplayElement } from "./types";
import { FilterableDropdown } from "./FilterableDropdown";

const dummyTransactions: Transaction[] = [
  {
    id: "1",
    date: "2024-11-10",
    details: "Office Supplies Purchase",
    amount: 125.50,
    predictedVendor: "Staples",
    pickedVendor: "Staples",
    predictedCategory: "Office Supplies",
    pickedCategory: "Office Supplies"
  },
  {
    id: "2", 
    date: "2024-11-11",
    details: "Client Lunch Meeting",
    amount: 87.25,
    predictedVendor: "The Capital Grille",
    pickedVendor: "The Capital Grille",
    predictedCategory: "Meals & Entertainment",
    pickedCategory: "Meals & Entertainment"
  },
  {
    id: "3",
    date: "2024-11-12",
    details: "Monthly Software Subscription",
    amount: 299.00,
    predictedVendor: "Adobe",
    pickedVendor: "Adobe",
    predictedCategory: "Software",
    pickedCategory: "Software"
  },
  {
    id: "4",
    date: "2024-11-13",
    details: "Gas Station Fill-up",
    amount: 65.75,
    predictedVendor: "Shell",
    pickedVendor: "Shell",
    predictedCategory: "Transportation",
    pickedCategory: "Transportation"
  },
  {
    id: "5",
    date: "2024-11-14",
    details: "Hotel Accommodation - Conference",
    amount: 450.00,
    predictedVendor: "Marriott",
    pickedVendor: "Marriott",
    predictedCategory: "Travel",
    pickedCategory: "Travel"
  },
  {
    id: "6",
    date: "2024-11-15",
    details: "Internet Service Provider",
    amount: 120.00,
    predictedVendor: "Comcast",
    pickedVendor: "Comcast",
    predictedCategory: "Utilities",
    pickedCategory: "Utilities"
  },
  {
    id: "7",
    date: "2024-11-16",
    details: "Team Lunch",
    amount: 156.80,
    predictedVendor: "Chipotle",
    pickedVendor: "Chipotle",
    predictedCategory: "Meals & Entertainment",
    pickedCategory: "Meals & Entertainment"
  },
  {
    id: "8",
    date: "2024-11-17",
    details: "Printer Ink Cartridges",
    amount: 89.99,
    predictedVendor: "Best Buy",
    pickedVendor: "Best Buy",
    predictedCategory: "Office Supplies",
    pickedCategory: "Office Supplies"
  },
  {
    id: "9",
    date: "2024-11-18",
    details: "Uber to Airport",
    amount: 45.50,
    predictedVendor: "Uber",
    pickedVendor: "Uber",
    predictedCategory: "Transportation",
    pickedCategory: "Transportation"
  },
  {
    id: "10",
    date: "2024-11-19",
    details: "Cloud Storage Monthly",
    amount: 25.00,
    predictedVendor: "Dropbox",
    pickedVendor: "Dropbox",
    predictedCategory: "Software",
    pickedCategory: "Software"
  }
];

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
    setTransactions(prev => 
      prev.map(t => t.id === transactionId ? { ...t, pickedVendor: vendor } : t)
    );
  };

  const handleCategoryChange = (transactionId: string, category: string) => {
    setTransactions(prev =>
      prev.map(t => t.id === transactionId ? { ...t, pickedCategory: category } : t)
    );
  };

  const handleAdd = (transactionId: string) => {
    const transaction = transactions.find(t => t.id === transactionId);
    console.log("Adding transaction:", transaction);
  };

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
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
              Picked Vendor
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
              Predicted Category
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
              Picked Category
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((transaction) => (
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
              <td className="px-4 py-3 whitespace-nowrap text-sm">
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
              <td className="px-4 py-3 whitespace-nowrap text-sm">
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
          ))}
        </tbody>
      </table>
    </div>
  );
};