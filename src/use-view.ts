import { useMemo } from "react"
import { Atom, ReadOnlyAtom, Lens, Prism, Option } from "@grammarly/focal"

export function useView<T>(atom: Atom<T>): ReadOnlyAtom<T>
export function useView<T, U>(atom: Atom<T>, getter: (x: T) => U): ReadOnlyAtom<U>
export function useView<T, U>(atom: Atom<T>, lens: Lens<T, U>): ReadOnlyAtom<U>
export function useView<T, U>(atom: Atom<T>, prism: Prism<T, U>): ReadOnlyAtom<Option<U>>
export function useView(atom: Atom<any>, arg?: any): any {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	return useMemo(() => (atom.view as any)(arg), [atom, arg])
}

export function useViewKey<T, K extends keyof T>(atom: Atom<T>, k: K): ReadOnlyAtom<T[K]>
export function useViewKey<
	T, K1 extends keyof T, K2 extends keyof T[K1],
>(atom: Atom<T>, k1: K1, k2: K2): ReadOnlyAtom<T[K1][K2]>
export function useViewKey<
	T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2],
>(atom: Atom<T>, k1: K1, k2: K2, k3: K3): ReadOnlyAtom<T[K1][K2][K3]>
export function useViewKey<
	T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], K4 extends keyof T[K1][K2][K3],
>(atom: Atom<T>, k1: K1, k2: K2, k3: K3, k4: K4): ReadOnlyAtom<T[K1][K2][K3][K4]>
export function useViewKey<
	T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2],
	K4 extends keyof T[K1][K2][K3], K5 extends keyof T[K1][K2][K3][K4],
>(atom: Atom<T>, k1: K1, k2: K2, k3: K3, k4: K4, k5: K5): ReadOnlyAtom<T[K1][K2][K3][K4][K5]>
export function useViewKey(atom: Atom<any>, ...args: any[]): any {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	return useMemo(() => (atom.view as any)(...args), [atom, ...args])
}
