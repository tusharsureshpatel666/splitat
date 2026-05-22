// types/store.ts
export interface Store {
  id: string;
  title: string;
  desc: string;
  country: string;
  state: string;
  city: string;
  pin: string;

  priceInr: number;
  bannerImageUrl: string | null;
  businessType: string;
}
