import { Atom } from "@grammarly/focal"
import { api, ApiData } from "../../test/fixtures/api"
import { createLoadingStateIdle, LoadingState } from "../loading-state"
import { save } from "."

describe("save", () => {
	test("should save data to atom", async () => {
		expect.assertions(1)
		const state = Atom.create<LoadingState<ApiData[]>>(createLoadingStateIdle())

		await save(api.loadPage(0, 5), state)
		expect(state.get().value).toBeTruthy()
	})
})
