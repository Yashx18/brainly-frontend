import { create } from "zustand";
import axios from "axios";

// Define the type for your content items (adjust to DB schema)
interface ContentItem {
  id: string;
  type: string;
  [key: string]: any;
}


interface ContentStore {
  content: ContentItem[];
  filter: string; 
  fetchContent: () => Promise<void>;
  setFilter: (filter: string) => void;
  setContent: (newContent: ContentItem[]) => void;
  addContent: (item: ContentItem) => void;
}



export const useContentStore = create<ContentStore>((set, get) => ({
  content: [],
  filter: "",

  fetchContent: async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/vi/content", {
        withCredentials: true,
      });

      const data: ContentItem[] = res.data.content ?? res.data;

      const { filter } = get();
      const filteredData =
        filter && filter !== "all"
          ? data.filter((item) => item.type === filter)
          : data;

      set({ content: filteredData });
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  },

  setFilter: (filter: string) => {
    set({ filter });
    get().fetchContent(); 
  },


  setContent: (newContent) => set({ content: newContent }),


  addContent: (item) =>
    set((state) => ({
      content: [...state.content, item],
    })),
}));

interface CardPopUp {
  open: boolean,
  setOpen: () =>void
}

export const useCardPopUp = create<CardPopUp>((set) => ({
  open: false,
  setOpen: () => set((state) => ({open: !state.open}))
}));