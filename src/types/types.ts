export interface Order {
  'Tracking ID': number;
  'Product Image'?: string;
  'Product Name': string;
  Customer: string;
  Date: string;
  Amount: number;
  'Payment Mode': string;
  Status: OrderStatus;
}

export enum OrderStatus {
  Delivered = 'Delivered',
  Process = 'Process',
  Cancelled = 'Cancelled',
}

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}
