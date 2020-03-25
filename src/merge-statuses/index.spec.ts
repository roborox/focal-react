import {
	createLoadingStatusError,
	loadingStatusIdle,
	loadingStatusLoading,
	loadingStatusSuccess,
} from "../loading-state"
import { mergeStatusesPlain } from "./index"

describe("mergeStatusesPlain", () => {
	it("it should convert [loading, success] => loading", () => {
		expect(
			mergeStatusesPlain([loadingStatusLoading, loadingStatusSuccess]),
		).toBe(
			loadingStatusLoading,
		)
	})

	it("it should convert [success, error] => error", () => {
		const ERROR = "err"
		expect(
			mergeStatusesPlain([createLoadingStatusError(ERROR), loadingStatusSuccess]),
		).toStrictEqual(
			createLoadingStatusError(ERROR),
		)
	})

	it("it should convert [idle, pending] => pending", () => {
		expect(
			mergeStatusesPlain([loadingStatusIdle, loadingStatusLoading]),
		).toBe(
			loadingStatusLoading,
		)
	})
})
