import { useMemo, useEffect, useRef } from "react"
import { createLoadNext, ListPartLoader } from "./create-load-next"
import { Atom } from "@grammarly/focal"
import { InfiniteListState } from "./domain"

export function useInfiniteList<T, C>(
	state: Atom<InfiniteListState<T, C>>,
	loader: ListPartLoader<T, C>,
) {
	const initialLoad = useRef(true)
	const load = useMemo(() => createLoadNext(loader, state), [loader, state])

	useEffect(() => {
		if (!initialLoad.current) {
			load(true).then()
		} else {
			const { status, items } = state.get()
			if (status.status === "idle" && items.length === 0) {
				load().then()
			}
			initialLoad.current = false
		}
	}, [load, state])

	return load
}
