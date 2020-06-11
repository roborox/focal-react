import { useMemo } from "react"
import { Atom, Lens } from "@grammarly/focal"

export function useLensKey<T, K extends keyof T>(atom: Atom<T>, k: K): Atom<T[K]>
export function useLensKey<
	T, K1 extends keyof T, K2 extends keyof T[K1],
>(atom: Atom<T>, k1: K1, k2: K2): Atom<T[K1][K2]>
export function useLensKey<
	T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2],
>(atom: Atom<T>, k1: K1, k2: K2, k3: K3): Atom<T[K1][K2][K3]>
export function useLensKey<
	T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2],
	K4 extends keyof T[K1][K2][K3],
>(atom: Atom<T>, k1: K1, k2: K2, k3: K3, k4: K4): Atom<T[K1][K2][K3][K4]>
export function useLensKey<
	T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2],
	K4 extends keyof T[K1][K2][K3], K5 extends keyof T[K1][K2][K3][K4],
>(atom: Atom<T>, k1: K1, k2: K2, k3: K3, k4: K4, k5: K5): Atom<T[K1][K2][K3][K4][K5]>
export function useLensKey<T>(atom: Atom<any>, ...args: any[]): any {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	return useMemo(() => (atom.lens as any)(...args), [atom, ...args])
}

export function useLens<T, U>(atom: Atom<T>, lens: Lens<T, U>): Atom<U> {
	return useMemo(() => atom.lens(lens), [atom, lens])
}
