import TypeofBussiness from "@/app/dashboard/findstore/searchstep/TypeofBussiness";
import { ParticOption, ShareConfig } from "@/type/Partitiontype";
import { Store } from "@/type/store";
import { create } from "zustand";

interface StoreSearchState {
  stores: Store[];
  setStores: (stores: Store[]) => void;
  clearStores: () => void;
}
interface SearchStoreData {
  TypeofStore: string;
  country: string;
  state: string;
  city: string;
  area: string;
  pin: string;
  minprice: number;
  maxprice: number;
  userlat: number;
  userlog: number;
  setUserLat: (value: number) => void;
  setUserLog: (value: number) => void;
  setTypeofBussiness: (value: string) => void;
  setCountry: (value: string) => void;
  setState: (value: string) => void;
  setCity: (value: string) => void;
  setArea: (value: string) => void;
  setPin: (value: string) => void;
  minsetPrice: (value: number) => void;
  maxsetPrice: (value: number) => void;
}

interface StoreStep {
  sStep: number;
  setSStep: (sStep: number) => void;
  nextSStep: () => void;
  prevStep: () => void;
  resetStep: () => void;
}
interface SearchStep {
  sStep: number;
  setSStep: (sStep: number) => void;
  nextSStep: () => void;
  prevStep: () => void;
  resetStep: () => void;
}

type ParticState = {
  share: ShareConfig;
  setMode: (mode: ParticOption) => void;
  updateShare: (data: Partial<ShareConfig>) => void;
};

export const useStoreSearch = create<StoreSearchState>((set) => ({
  stores: [],
  setStores: (stores) => set({ stores }),
  clearStores: () => set({ stores: [] }),
}));

export const useStoreStep = create<StoreStep>((set) => ({
  sStep: 0,
  setSStep: (sStep) => set({ sStep }),
  nextSStep: () => set((state) => ({ sStep: state.sStep + 1 })),
  prevStep: () => set((state) => ({ sStep: state.sStep - 1 })),
  resetStep: () => set({ sStep: 0 }),
}));
export const ComuseStoreStep = create<StoreStep>((set) => ({
  sStep: 1,
  setSStep: (sStep) => set({ sStep }),
  nextSStep: () => set((state) => ({ sStep: state.sStep + 1 })),
  prevStep: () => set((state) => ({ sStep: state.sStep - 1 })),
  resetStep: () => set({ sStep: 0 }),
}));

export const useParticStore = create<ParticState>((set) => ({
  share: { mode: "" },

  setMode: (mode) =>
    set({
      share: { mode }, // reset old data when mode changes
    }),

  updateShare: (data) =>
    set((state) => ({
      share: { ...state.share, ...data },
    })),
}));
export const CommunityuseParticStore = create<ParticState>((set) => ({
  share: { mode: "" },

  setMode: (mode) =>
    set({
      share: { mode }, // reset old data when mode changes
    }),

  updateShare: (data) =>
    set((state) => ({
      share: { ...state.share, ...data },
    })),
}));
export const useSearchState = create<SearchStep>((set) => ({
  sStep: 1,
  setSStep: (sStep) => set({ sStep }),
  nextSStep: () => set((state) => ({ sStep: state.sStep + 1 })),
  prevStep: () => set((state) => ({ sStep: state.sStep - 1 })),
  resetStep: () => set({ sStep: 0 }),
}));

export const useSearchStoreData = create<SearchStoreData>((set) => ({
  TypeofStore: "",
  country: "",
  state: "",
  city: "",
  area: "",
  pin: "",
  minprice: 2000,
  maxprice: 5000,
  userlat: 0,
  userlog: 0,

  setUserLat: (value) => set({ userlat: value }),
  setUserLog: (value) => set({ userlog: value }),

  minsetPrice: (value) => set({ minprice: value }),
  maxsetPrice: (value) => set({ maxprice: value }),

  setTypeofBussiness: (value) => set({ TypeofStore: value }),

  setCountry: (value) => set({ country: value }),

  setState: (value) => set({ state: value }),
  setCity: (value) => set({ city: value }),
  setArea: (value) => set({ area: value }),
  setPin: (value) => set({ pin: value }),
}));
