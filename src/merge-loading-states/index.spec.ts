import { BehaviorSubject } from "rxjs"
import { mergeLoadingStates } from "./index"
import { createLoadingStateIdle, createLoadingStateSuccess, createLoadingStateError } from "../loading-state"

describe("merge-loading-states", () => {
	it("it should convert [loading, success] => loading", () => {
		expect.assertions(1)
		const o1 = new BehaviorSubject(createLoadingStateIdle<string>())
		const o2 = new BehaviorSubject(createLoadingStateSuccess("hello"))

		mergeLoadingStates(o1, o2).subscribe((val) => {
			expect(val).toEqual({
				value: [undefined, "hello"],
				status: {
					status: "loading",
				},
			})
		})
	})

	it("it should convert [success, error] => error", () => {
		expect.assertions(1)
		const ERROR = "err"
		const o1 = new BehaviorSubject(createLoadingStateError<string>(ERROR))
		const o2 = new BehaviorSubject(createLoadingStateSuccess("world"))

		mergeLoadingStates(o1, o2).subscribe((val) => {
			expect(val).toEqual({
				value: [undefined, "world"],
				status: {
					status: "error",
					error: ERROR,
				},
			})
		})
	})

	it("it should convert [idle, pending] => idle", () => {
		expect.assertions(1)
		const o1 = new BehaviorSubject(createLoadingStateSuccess("hello"))
		const o2 = new BehaviorSubject(createLoadingStateSuccess("world"))

		mergeLoadingStates(o1, o2).subscribe((val) => {
			expect(val).toEqual({
				value: ["hello", "world"],
				status: {
					status: "success",
				},
			})
		})
	})
})