import { LoadingState } from "../loading-state"
import { toRx } from "./"

describe("toRx", () => {
	test("should emit 2 states", async () => {
		expect.assertions(3)
		const number = Math.random()
		const promise = Promise.resolve(number)

		let events: LoadingState<number>[] = []
		const state$ = toRx(promise)
		state$.subscribe(next => events.push(next))
		await promise
		expect(events.length).toBe(2)
		expect(events[0].status.status).toBe("loading")
		expect(events[1].status.status).toBe("success")
	})

	test("should emit 2 states when error", async () => {
		expect.assertions(4)
		const number = Math.random()
		const promise = Promise.reject(number)

		let events: LoadingState<number>[] = []
		const state$ = toRx(promise)
		state$.subscribe(next => events.push(next))
		await promise.catch(() => Promise.resolve())
		expect(events.length).toBe(2)
		expect(events[0].status.status).toBe("loading")
		expect(events[1].status.status).toBe("error")
		// @ts-ignore
		expect(events[1].status.error).toBe(number)
	})
})
