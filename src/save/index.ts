import { Atom } from "@grammarly/focal"
import { LoadingState } from "../loading-state"


export async function save<T>(
	promise: Promise<T>,
	state$: Atom<LoadingState<T>>,
): Promise<void> {
	state$.lens("status").set("loading")

	try {
		const result = await promise
		state$.lens("value").set(result)
		state$.lens("status").set("success")
	} catch (e) {
		state$.modify(s => ({ ...s, status: "error", error: e }))
	}
}
