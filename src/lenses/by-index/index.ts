import { Lens } from "@grammarly/focal"

export function byIndex<T>(i: number): Lens<T[], T> {
	return Lens.create(
		xs => xs[i],
		(x, xs) => {
			const copy = [...xs]
			copy[i] = x
			return copy
		},
	)
}
