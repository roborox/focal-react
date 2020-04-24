import React from "react"
import { act, render } from "@testing-library/react"
import { Atom } from "@grammarly/focal"
import { createLoadingStateLoading, createLoadingStateSuccess } from "../loading-state"
import { StateLoader } from "./index"

describe("StateLoader", () => {
	test("should display loading if is loading", async () => {
		expect.assertions(2)
		const state = Atom.create(createLoadingStateLoading<string>())
		const r = render(
			<span data-testid="test">
				<StateLoader value={state} loading={<span>loading</span>}>{v => <span>{v}</span>}</StateLoader>
			</span>,
		)
		await expect(r.getByTestId("test")).toHaveTextContent("loading")
		await expect(r.getByTestId("test")).not.toHaveTextContent("content")
	})

	test("should display content if loaded", async () => {
		expect.assertions(2)
		const state = Atom.create(createLoadingStateLoading<number>())
		const r = render(
			<span data-testid="test">
				<StateLoader value={state} loading={<span>loading</span>}>
					{value => <span>{value}</span>}
				</StateLoader>
			</span>,
		)
		expect(r.getByTestId("test")).toHaveTextContent("loading")
		const number = Math.random()
		act(() => {
			state.set(createLoadingStateSuccess(number))
		})
		expect(r.getByTestId("test")).toHaveTextContent(number.toString())
	})
})
