import { create } from 'zustand';
import axios from 'axios';

// Define the shape of an Unsplash image (the parts we need)
export interface UnsplashImage {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
  user: {
    name: string;
  };
}

interface SearchState {
  results: UnsplashImage[] | null;
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  selectedImages: Set<UnsplashImage>; // For the multi-select feature
  searchImages: (term: string) => Promise<void>;
  toggleImageSelection: (image: UnsplashImage) => void;
  clearSelection: () => void;
}

const useSearchStore = create<SearchState>((set) => ({
  results: null,
  isLoading: false,
  error: null,
  searchTerm: '',
  selectedImages: new Set(),

  // --- ACTION: Search for images ---
  searchImages: async (term: string) => {
    set({ isLoading: true, error: null, searchTerm: term, results: null });
    try {
      // Our Vite proxy will send this to http://localhost:8000/api/search
      const res = await axios.post<{ results: UnsplashImage[] }>('/api/search', { term });
      set({ results: res.data.results, isLoading: false });
    } catch (error) {
      console.error("Error searching images", error);
      set({ error: 'Failed to fetch images.', isLoading: false });
    }
  },

  // --- ACTION: Toggle an image's selection state ---
  toggleImageSelection: (image: UnsplashImage) => {
    set((state) => {
      const newSelection = new Set(state.selectedImages);
      // Check if the image (by id) is already in the set
      const imageInSet = [...newSelection].find(img => img.id === image.id);
      
      if (imageInSet) {
        newSelection.delete(imageInSet);
      } else {
        newSelection.add(image);
      }
      return { selectedImages: newSelection };
    });
  },

  // --- ACTION: Clear all selected images ---
  clearSelection: () => {
    set({ selectedImages: new Set() });
  },
}));

export default useSearchStore;