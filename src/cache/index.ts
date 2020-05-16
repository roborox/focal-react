import { Atom } from "@grammarly/focal"
import { LoadingState, createLoadingStateIdle, createLoadingStateLoading, createLoadingStateSuccess } from ".."
import { byKeyWithDefault } from "../lenses/by-key"
import { save } from "../save"
import { Map } from "immutable"
import { get } from "../get"

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
	private mapLoader: ListDataLoader<K, V>

	constructor(
		private readonly map: Atom<Map<K, LoadingState<V>>>,
		private readonly loader: DataLoader<K, V>,
		mapLoader?: ListDataLoader<K, V>,
	) {
		this.mapLoader = mapLoader || new DefaultListDataLoader(loader)
	}

	async get(key: K) {
		const state$ = this.map.lens(byKeyWithDefault(key, createLoadingStateIdle<V>()))
		if (state$.get().status.status === "idle") {
			save(this.loader.load(key), state$).then()
		}
		return get(state$)
	}

	async getMap(ids: K[]) {
		const current = this.map.get()
		current.entries()
		const notLoaded = ids.filter(x => {
			const state = current.get(x)
			return !state || state.status.status === "idle"
		})
		//todo do not use reduce. change Map at once
		//todo error handling. should we mark items as errors?
		this.map.modify(map => notLoaded.reduce((map, id) => map.set(id, createLoadingStateLoading()), map))
		const values = await this.mapLoader.loadList(notLoaded)
		this.map.modify(map => values.reduce((map, [id, v]) => map.set(id, createLoadingStateSuccess(v)), map))
		const allValues = await Promise.all(ids.map(id => this.get(id).then(v => [id, v] as [K, V])))
		return Map(allValues)
	}
}