import React from "react"
import { Observable } from "rxjs"
import { useRx } from "../use-rx"

export interface RxIfProps {
	test$: Observable<boolean>,
	else?: React.ReactChild | React.ReactChild[] | (() => React.ReactNode),
	negate?: boolean
	children: React.ReactNode
}

export function RxIf({ test$, children, negate, else: not }: RxIfProps): React.ReactElement | null {
	const bool = useRx(test$)

	if (negate && !bool) {
		return <>{children}</>
	} else if (negate) {
		if (typeof not === "function")
			return <>{not()}</>
		else
			return <>{not}</>
	} else if (bool) {
		return <>{children}</>
	} else {
		if (typeof not === "function")
			return <>{not()}</>
		else
			return <>{not}</>
	}
}
