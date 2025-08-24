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

// in store.ts
interface CardData {
  title: string;
  link: string;
  type: "text" | "URL" | "image" | "video";
}

interface CardPopUpState {
  open: boolean;
  selectedCard: CardData | null;
  openPopUp: (card: CardData) => void;
  closePopUp: () => void;
}

export const useCardPopUpData = create<CardPopUpState>((set) => ({
  open: false,
  selectedCard: null,
  openPopUp: (card) => set({ open: true, selectedCard: card }),
  closePopUp: () => set({ open: false, selectedCard: null }),
}));

interface EditState {
  edit: boolean;
  setEdit: (value: boolean) => void;
  toggleEdit: () => void;
}

export const useEditStore = create<EditState>((set) => ({
  edit: false,
  setEdit: (value) => set({ edit: value }),
  toggleEdit: () => set((state) => ({ edit: !state.edit })),
}));


interface IdState {
  id: string | null;
  setId: (id: string) => void;
  clearId: () => void;
  getId: (title: string, link: string, type: string) => Promise<void>;
}

export const useIdStore = create<IdState>((set) => ({
  id: null,

  setId: (id) => set({ id }),

  clearId: () => set({ id: null }),

  getId: async (title: string, link: string, type: string) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/vi/getId",
        { title, link, type },
        { withCredentials: true }
      );

      const fetchedId = response.data?.content?.[0]?._id;

      if (fetchedId) {
        set({ id: fetchedId });
        console.log("Saved ID:", fetchedId);
      }
    } catch (error) {
      console.error("Error fetching ID:", error);
    }
  },
}));