import { LoadingState } from "./loading-state"
import { useCallback } from "react"
import { save } from "./save"
import { Atom } from "@grammarly/focal"
import { useSubscription } from "./use-subscription"

export function useLoadingState<T>(state: Atom<LoadingState<T>>, load: () => Promise<T>, autoload = true) {
	const loadAndSave = useCallback(() => save(load(), state), [load, state])

	useSubscription(state, ({ status }) => {
		if (autoload && status === "idle") {
			loadAndSave().then()
		}
	}, [autoload, loadAndSave])

	return loadAndSave
}
