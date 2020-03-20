import React, { useMemo, useEffect } from "react"
import { Observable } from "rxjs"
import { useRx } from "../use-rx"
import { LoadingStatus } from "../loading-state"
import { caseWhen } from "../case-when"

export interface LoaderProps {
	status: Observable<LoadingStatus>
	idle?: React.ReactNode
	loading?: React.ReactNode
	error?: (error: any) => React.ReactNode
	onError?: (error: any) => void
	children: React.ReactNode
}

export function Loader({ children, status, onError, error, idle, loading }: LoaderProps): React.ReactElement {
	const rx = useMemo(() => caseWhen(status, {
		success: children,
		idle,
		loading,
		error,
	}), [status, children, error, idle, loading])

	useEffect(() => {
		if (onError) {
			const s = status.subscribe((next) => {
				if (next.status === "error") {
					onError(next.error)
				}
			})
			return () => s.unsubscribe()
		}
	}, [onError, status])

	return <>{useRx(rx)}</>
}
