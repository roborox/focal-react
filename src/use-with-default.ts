import { useMemo } from "react"

export function useWithDefault<T>(value: T | undefined, createDefault: () => T, deps: any[] = []) {
	return useMemo(() => {
		if (value) {
			return value
		}
		return createDefault()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value, ...deps])
}
