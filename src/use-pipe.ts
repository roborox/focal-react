import { useMemo } from "react"
import { Observable, OperatorFunction } from "rxjs"

export function usePipe<T>(observable: Observable<T>): Observable<T>
export function usePipe<T, A>(observable: Observable<T>, op1: OperatorFunction<T, A>): Observable<A>
export function usePipe<T, A, B>(
	observable: Observable<T>, op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>,
): Observable<B>
export function usePipe<T, A, B, C>(
	observable: Observable<T>, op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>,
): Observable<C>
export function usePipe<T, A, B, C, D>(
	observable: Observable<T>, op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>,
	op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>,
): Observable<D>
export function usePipe<T, A, B, C, D, E>(
	observable: Observable<T>, op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>,
	op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>,
): Observable<E>
export function usePipe<T, A, B, C, D, E, F>(
	observable: Observable<T>, op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>,
	op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>,
): Observable<F>
export function usePipe<T, A, B, C, D, E, F, G>(
	observable: Observable<T>, op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>,
	op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>,
	op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>,
): Observable<G>
export function usePipe<T, A, B, C, D, E, F, G, H>(
	observable: Observable<T>, op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>,
	op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>,
	op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>,
): Observable<H>
export function usePipe<T, A, B, C, D, E, F, G, H, I>(
	observable: Observable<T>, op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>,
	op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>,
	op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>, op9: OperatorFunction<H, I>,
): Observable<I>
export function usePipe<T, A, B, C, D, E, F, G, H, I>(
	observable: Observable<T>, op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>,
	op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>,
	op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>,
	op9: OperatorFunction<H, I>, ...operations: OperatorFunction<any, any>[]
): Observable<{}>
export function usePipe(observable: Observable<any>, ...args: any[]): any {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	return useMemo(() => (observable.pipe as any)(...args), [observable, ...args])
}
