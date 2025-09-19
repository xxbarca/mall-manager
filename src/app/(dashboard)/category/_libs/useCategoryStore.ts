import { createStore } from "@/lib/createStore";

type State = {
  categoryDialogOpen: boolean
  selectedCategoryId: string
}

type Actions = {
  updateCategoryDialogOpen: (is: State['categoryDialogOpen']) => void
  updateSelectedCategoryId: (id: State['selectedCategoryId']) => void
}

type Store = State & Actions

export const useCategoryStore = createStore<Store>(
  (set) => ({
    categoryDialogOpen: false,
    updateCategoryDialogOpen: (is) =>
      set((state) => {
        state.categoryDialogOpen = is;
      }),
    selectedCategoryId: "",
    updateSelectedCategoryId: (id) => set((state) => {
      state.selectedCategoryId = id;
    })
  })
)