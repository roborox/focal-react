import { loadingStatusIdle, LoadingStatus } from "../loading-state"

export type InfiniteListState<D, C> = {
	items: D[],
	status: LoadingStatus,
	continuation: C | null,
	finished: boolean,
}

export const listStateIdle = <D, C>(): InfiniteListState<D, C> => ({
	items: [],
	status: loadingStatusIdle,
	continuation: null,
	finished: false,
})
