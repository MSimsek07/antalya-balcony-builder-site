import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  imageFile?: File | null;
}

export interface Category {
  id: string;
  name: string;
}

interface GalleryState {
  images: GalleryImage[];
  categories: Category[];
  setImages: (images: GalleryImage[]) => void;
  addImage: (image: GalleryImage) => void;
  updateImage: (id: string, image: GalleryImage) => void;
  deleteImage: (id: string) => void;
  setCategories: (categories: Category[]) => void;
}

// Initial mock data
const initialImages: GalleryImage[] = [
  {
    id: "1",
    src: "/carousel_images/2022-03-22.jpg",
    alt: "Cam Balkon Projesi - Konyaaltı",
    category: "cam-balkon"
  },
  {
    id: "2",
    src: "/carousel_images/2022-03-22 (1).jpg",
    alt: "PVC Pencere Uygulaması - Muratpaşa",
    category: "pvc-pencere"
  },
  {
    id: "3",
    src: "/carousel_images/2022-03-22 (2).jpg",
    alt: "Ofis Bölme Sistemi - Kepez",
    category: "ofis-bolme"
  },
  {
    id: "4",
    src: "/carousel_images/2025-01-28.jpg",
    alt: "Akordiyon Kapı Projesi - Lara",
    category: "akordeon-kapi"
  }
];

const initialCategories: Category[] = [
  { id: "all", name: "Tüm Projeler" },
  { id: "cam-balkon", name: "Cam Balkon" },
  { id: "pvc-pencere", name: "PVC Pencere" },
  { id: "ofis-bolme", name: "Ofis Bölme" },
  { id: "akordeon-kapi", name: "Akordiyon Kapı" }
];

export const useGalleryStore = create<GalleryState>()(
  persist(
    (set) => ({
      images: initialImages,
      categories: initialCategories,
      setImages: (images) => set({ images }),
      addImage: (image) =>
        set((state) => ({
          images: [...state.images, image],
        })),
      updateImage: (id, updatedImage) =>
        set((state) => ({
          images: state.images.map((image) =>
            image.id === id ? { ...image, ...updatedImage } : image
          ),
        })),
      deleteImage: (id) =>
        set((state) => ({
          images: state.images.filter((image) => image.id !== id),
        })),
      setCategories: (categories) => set({ categories }),
    }),
    {
      name: 'gallery-storage',
      partialize: (state) => ({ images: state.images }), // Only persist images
    }
  )
);