import { useMemo } from "react"
import { createLoadNext, ListPartLoader } from "./create-load-next"
import { Atom } from "@grammarly/focal"
import { InfiniteListState } from "./domain"
import { useSubscription } from "../use-subscription"

export function useInfiniteList<T, C>(
	state: Atom<InfiniteListState<T, C>>,
	loader: ListPartLoader<T, C>,
) {
	const load = useMemo(() => createLoadNext(loader, state), [loader, state])
	useSubscription(state, ({ items, status: { status } }) => {
		if (status === "idle" && items.length === 0) {
			load().then()
		}
	}, [load])

	return load
}
