import { createAppStateProvider } from "./index"
import { render } from "@testing-library/react"
import { Atom } from "@grammarly/focal/dist/_cjs/src/atom"
import React from "react"
import { Rx } from "../rx"
import { act } from "react-dom/test-utils"

describe("createAppState", () => {
	test("should create StateProvider and useAppState hook", () => {
		const [StateProvider, useState] = createAppStateProvider<string>()

		const ShowState = () => {
			const state = useState()
			return <Rx value={state}>{value => value}</Rx>
		}

		const state = Atom.create("")
		const r = render(
			<StateProvider atom={state}>
				<span data-testid="value"><ShowState/></span>
			</StateProvider>,
		)

		act(() => state.set("newvalue"))
		expect(r.getByTestId("value")).toHaveTextContent("newvalue")
	})
})
