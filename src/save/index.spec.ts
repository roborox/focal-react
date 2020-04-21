import { Atom } from "@grammarly/focal"
import { api, ApiData } from "../../test/fixtures/api"
import { loadingStatusIdle, LoadingState } from "../loading-state"
import { save } from "."

describe("save", () => {
	test("should save data to atom", async () => {
		expect.assertions(1)
		const state = Atom.create<LoadingState<ApiData[]>>({
			status: loadingStatusIdle,
		})
		await save(api.loadPage(0, 5), state)
		expect(state.get().value).toBeTruthy()
	})

	test("should save to separate atoms", async () => {
		expect.assertions(1)
		const state = Atom.create<LoadingState<ApiData[]>>({
			status: loadingStatusIdle,
		})
		await save(api.loadPage(0, 5), {
			value: state.lens("value"),
			status: state.lens("status"),
		})
		expect(state.get().value).toBeTruthy()
	})
})
