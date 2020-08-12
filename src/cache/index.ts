import { Atom } from "@grammarly/focal"
import { Map } from "immutable"
import { createLoadingStateIdle, createLoadingStateLoading, createLoadingStateSuccess, getFinalValue, LoadingState, createLoadingStateError } from "../loading-state"
import { byKeyWithDefault } from "../lenses/by-key"
import { save } from "../save"

export interface DataLoader<K, V> {
	load(key: K): Promise<V>
}

export interface ListDataLoader<K, V> {
	loadList(keys: K[]): Promise<[K, V][]>
}

class DefaultListDataLoader<K, V> implements ListDataLoader<K, V> {
	constructor(private readonly loader: DataLoader<K, V>) { }

	loadList(ids: K[]) {
		return Promise.all(
			ids.map(id => this.loader.load(id).then(v => [id, v] as [K, V])),
		)
	}
}

export class Cache<K, V> {
	readonly mapLoader: ListDataLoader<K, V>

	constructor(
		private readonly map: Atom<Map<K, LoadingState<V>>>,
		public readonly loader: DataLoader<K, V>,
		listLoader?: ListDataLoader<K, V>,
	) {
		this.mapLoader = listLoader || new DefaultListDataLoader(loader)
	}

	getStateAtom(key: K) {
		return this.map.lens(byKeyWithDefault(key, createLoadingStateIdle<V>()))
	}

	getAtom(key: K, force: boolean = false) {
		const state$ = this.getStateAtom(key)
		if (force || ["idle", "error"].indexOf(state$.get().status) !== -1) {
			save(this.loader.load(key), state$).then()
		}
		return state$
	}

	get(key: K, force: boolean = false) {
		return getFinalValue(this.getAtom(key, force))
	}

	set(key: K, value: V) {
		this.map.modify(map => map.set(key, createLoadingStateSuccess(value)))
	}

	modifySuccessful(key: K, updateFn: (value: V) => V) {
		this.map.modify(map => {
			const value = map.get(key)
			if (value !== undefined && value.status === "success") {
				const newValue = updateFn(value.value)
				return map.set(key, createLoadingStateSuccess(newValue))
			} else {
				return map
			}
		})
	}

	async getMap(ids: K[]) {
		const current = this.map.get()
		const idsToLoad = ids.filter(x => {
			const state = current.get(x)
			return !state || state.status === "idle"
		})

		this.map.modify(map => idsToLoad.reduce((m, x) => m.set(x, createLoadingStateLoading()), map))
		const values = await this.mapLoader.loadList(idsToLoad)
		this.map.modify(map => idsToLoad.reduce((m, id) => {
			const loaded = values.find(x => x[0] === id)
			if (loaded) {
				return m.set(id, createLoadingStateSuccess(loaded[1]))
			} else {
				return m.set(id, createLoadingStateError(new Error("Can't load")))
			}
		}, map))

		const mapped = await Promise.all(ids.map(id => {
			return this.get(id)
				.then(x => [id, x] as [K, V])
				.catch(error => {
					this.map.modify(map => map.set(id, createLoadingStateError(error)))
					return null
				})
		}))
		return Map(mapped.filter(x => x !== null) as [K, V][])
	}
}
