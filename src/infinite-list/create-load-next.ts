import { Atom } from "@grammarly/focal"
import { InfiniteListState } from "./domain"
import { save } from "../save"

export type ListPartLoader<D, C> = (continuation: C | null) => Promise<[D[], C]>

export const createLoadNext = <D, C>(loader: ListPartLoader<D, C>, state: Atom<InfiniteListState<D, C>>) => {
	return async () => {
		const finishedLens = state.lens("finished")

		if (!finishedLens.get()) {
			const promise = loader(state.lens("continuation").get())
			const initialState = {
				status: state.lens("status"),
			}

			await save(promise, initialState);
			(async () => {
				try {
					const [items, continuation] = await promise

					if (items.length === 0) {
						finishedLens.set(true)
					}

					state.lens("items").modify((x) => x.concat(items))
					state.lens("continuation").set(continuation)
				} catch (_) { /** no-op */ }
			})()
		} else {
			console.warn("Loadable list already finished")
		}
	}
}
