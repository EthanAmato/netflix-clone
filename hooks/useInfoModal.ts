// //Zustand is a state management library for React applications. It provides a simple and lightweight way to manage state and 
// share data between components in a React application. Zustand uses the concept of stores, which are basically JavaScript objects 
// that represent a piece of state in your application. These stores can be created using the createStore function provided by Zustand, 
// which returns an object with a set of methods to manage the state. The main advantage of Zustand is that it allows you to manage state 
// without having to use complex tools like Redux or MobX. It provides a clean and concise API that makes it easy to create and manage state 
// in your React components. Zustand also provides a way to subscribe to changes in the state, so that you can update your UI whenever the 
// state changes. This makes it easy to create reactive and responsive user interfaces.

import { create } from 'zustand';

export interface ModalStoreInterface {
    movieId?: string;
    isOpen: boolean;
    openModal: (movieId: string) => void;
    closeModal: () => void;
}

// using the create function from zustand to create almost like a reducer that manipulates modal state(s)
const useInfoModal = create<ModalStoreInterface>((set) => ({
    movieId: undefined,
    isOpen: false,
    openModal: (movieId: string) => set({ isOpen: true, movieId: movieId }),
    closeModal: () => set({ isOpen: false, movieId: undefined }),
}))


export default useInfoModal