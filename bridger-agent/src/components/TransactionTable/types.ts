export interface Transaction {
  id: string;
  date: string;
  details: string;
  amount: number;
  predictedVendor: string;
  pickedVendor: string;
  predictedCategory: string;
  pickedCategory: string;
}

export interface FilterableDisplayElement<T> {
  key: string;
  displayName: string;
  label: string;
  value: T;
}