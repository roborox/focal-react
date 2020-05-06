import React from "react"
import { act } from "react-dom/test-utils"
import { render } from "@testing-library/react"
import { Atom, F } from "@grammarly/focal"
import { Loader } from "./index"
import { Rx } from "../rx"
import { createLoadingStateLoading, createLoadingStateSuccess, LoadingStatus } from "../loading-state"

describe("Loader", () => {
	test("should display loading if is loading", async () => {
		expect.assertions(2)
		const status = Atom.create<LoadingStatus>({ status: "loading" })
		const r = render(
			<span data-testid="test">
				<Loader status={status} loading={<span>loading</span>}><span>content</span></Loader>
			</span>,
		)
		await expect(r.getByTestId("test")).toHaveTextContent("loading")
		await expect(r.getByTestId("test")).not.toHaveTextContent("content")
	})

	test("should display loading if is loading and children are not set", async () => {
		expect.assertions(2)
		const status = Atom.create<LoadingStatus>({ status: "loading" })
		const r = render(
			<span data-testid="test">
				<Loader status={status} loading={<span>loading</span>}/>
			</span>,
		)
		await expect(r.getByTestId("test")).toHaveTextContent("loading")
		await expect(r.getByTestId("test")).not.toHaveTextContent("content")
	})

	test("should display content if loaded", async () => {
		expect.assertions(2)
		const state$ = Atom.create(createLoadingStateLoading<number>())
		const r = render(
			<span data-testid="test">
				<Loader status={state$.view("status")} loading={<span>loading</span>}>
					<F.span>{state$.view("value")}</F.span>
				</Loader>
			</span>,
		)
		expect(r.getByTestId("test")).toHaveTextContent("loading")
		const number = Math.random()
		act(() => {
			state$.set(createLoadingStateSuccess(number))
		})
		expect(r.getByTestId("test")).toHaveTextContent(number.toString())
	})

	test("should work with <Rx /> component", async () => {
		expect.assertions(3)
		const state$ = Atom.create(createLoadingStateLoading<number>())
		const r = render(
			<span data-testid="test">
				<Loader status={state$.view("status")} loading={<span>loading</span>}>
					<Rx value={state$.view("value")}>
						{renderable => <span data-testid="content">{renderable}</span>}
					</Rx>
				</Loader>
			</span>,
		)
		expect(r.getByTestId("test")).toHaveTextContent("loading")
		const number = Math.random()
		act(() => {
			state$.set(createLoadingStateSuccess(number))
		})
		expect(r.getByTestId("content")).toBeTruthy()
		expect(r.getByTestId("content")).toHaveTextContent(number.toString())
	})
})
