import { Atom } from "@grammarly/focal"
import { createLoadingStatusError, LoadingState, LoadingStatus } from "../loading-state"

export interface LoadAtoms<T> {
	value?: Atom<T | undefined>
	status?: Atom<LoadingStatus>,
}

export async function save<T>(
	promise: Promise<T>,
	value: LoadAtoms<T> | Atom<LoadingState<T>>,
): Promise<void> {
	const atoms: LoadAtoms<T> = "get" in value ? stateToAtoms(value) : value
	atoms.status?.lens("status")?.set("loading")

	try {
		const result = await promise
		atoms.value?.set(result)
		atoms.status?.lens("status")?.set("success")
	} catch (e) {
		atoms.status?.modify(x => ({...x, ...createLoadingStatusError(e)}))
	}
}

export const stateToAtoms = <T>(state: Atom<LoadingState<T>>): LoadAtoms<T> => ({
	value: state.lens("value"),
	status: state,
})
