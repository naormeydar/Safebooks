export enum AccountStatus {
  Active = 1,
  Inactive = 2,
  Pending = 3,
  Suspended = 4,
}

export enum VendorType {
  business = 1,
  independent = 2,
}

type Vendor = {
  name: string;
  date: string;
  vendor: string;
  accountStatus: AccountStatus;
  amount: number;
  vendorType: VendorType;
};

export type IndependentVendor = Vendor & {
  vendorType: VendorType.independent;
  comment: string;
  phoneNumber: string;
};

export type BusinessVendor = Vendor & {
  vendorType: VendorType.business;
  accountNumber: string;
  paidBy: string;
  exchangeRate: {
    from: ExchangeRate;
    to: ExchangeRate;
  };
};

type ExchangeRate = { currency: string; value: number };
