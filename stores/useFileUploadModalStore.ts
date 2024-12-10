import { create } from 'zustand'

interface FileUploadModalState {
  modalVisible: boolean
  setModalVisible: (visible: boolean) => void
}

export const useFileUploadModalStore = create<FileUploadModalState>((set) => ({
	modalVisible: false,
	setModalVisible: (modalVisible) => set({ modalVisible }),
}))
