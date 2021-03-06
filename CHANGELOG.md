## [2.2.2](https://github.com/roborox/focal-react/compare/v2.2.1...v2.2.2) (2020-08-31)


### Bug Fixes

* fix mapLoadingState utility ([5b7c606](https://github.com/roborox/focal-react/commit/5b7c606cb535d031fc0e6569ef97958d8c96419a))

## [2.2.1](https://github.com/roborox/focal-react/compare/v2.2.0...v2.2.1) (2020-08-28)


### Bug Fixes

* fix (revert) Loader component ([68dec15](https://github.com/roborox/focal-react/commit/68dec15cb30dd7f329eee1c78a03456b0cf48c4f))

# [2.2.0](https://github.com/roborox/focal-react/compare/v2.1.3...v2.2.0) (2020-08-28)


### Features

* add 'loadingStateFromPromise' utility ([4dab0b6](https://github.com/roborox/focal-react/commit/4dab0b6b5729c632ebfa271acb8368bb0871f8bb))

## [2.1.3](https://github.com/roborox/focal-react/compare/v2.1.2...v2.1.3) (2020-08-15)


### Bug Fixes

* fix Cache.getMap() ([9dda1a9](https://github.com/roborox/focal-react/commit/9dda1a9d684a018366d5f8f73353e6719eb69749))

## [2.1.2](https://github.com/roborox/focal-react/compare/v2.1.1...v2.1.2) (2020-08-04)


### Bug Fixes

* modifySuccessful for Cache ([a49e70b](https://github.com/roborox/focal-react/commit/a49e70b687968065ed10904e4d27b347c5ef7dea))

## [2.1.1](https://github.com/roborox/focal-react/compare/v2.1.0...v2.1.1) (2020-07-11)


### Bug Fixes

* ListPartLoader supports null continuation if list is finished ([bacd586](https://github.com/roborox/focal-react/commit/bacd586baa926401fbf5c08c8e5d7efd6fde5ac7))

# [2.1.0](https://github.com/roborox/focal-react/compare/v2.0.1...v2.1.0) (2020-06-13)


### Features

* Cacheable error add reload ([227130f](https://github.com/roborox/focal-react/commit/227130f0d7ca5a1686d249454a7b39541a5d9cf5))

## [2.0.1](https://github.com/roborox/focal-react/compare/v2.0.0...v2.0.1) (2020-05-29)


### Bug Fixes

* fix infinite list ([3d56712](https://github.com/roborox/focal-react/commit/3d5671294ea754d2bd29a1eb843a6c565b334607))
* make byIndex exported by module ([2800842](https://github.com/roborox/focal-react/commit/28008425dbfc30b92f16883a3d5206ac6bbf691d))

# [2.0.0](https://github.com/roborox/focal-react/compare/v1.8.6...v2.0.0) (2020-05-24)


### Bug Fixes

* Cache.set ([fef8543](https://github.com/roborox/focal-react/commit/fef8543b97ba04990972aaacba2deafc00ba7198))
* test for Loader ([ba4d767](https://github.com/roborox/focal-react/commit/ba4d7676ea3a2239d1131310e987bf24ebdaaaf9))


### Features

* improved Cacheable ([c0d5b7b](https://github.com/roborox/focal-react/commit/c0d5b7b21ae52b84326879e0a93f1cfceadaea38))
* removed app-state, renamed get to getFinalValue, cacheable, Loadable changed, case-when removed ([cd49fbb](https://github.com/roborox/focal-react/commit/cd49fbb35deba80d9c159a3b4651f3083b402736))
* renamed all rx values, LoadingState simplified ([e8add09](https://github.com/roborox/focal-react/commit/e8add0903393d49cd18c532864a086f40d5fed55))
* reverted and fixed save function ([7c53230](https://github.com/roborox/focal-react/commit/7c532307974c1601880a2a1eb3896ddf0b2a5afe))
* RxIf improved ([b877e31](https://github.com/roborox/focal-react/commit/b877e31162086f06dd62f957d8c9f85c1fcac4ec))


### BREAKING CHANGES

* primitives changed

## [1.8.6](https://github.com/roborox/focal-react/compare/v1.8.5...v1.8.6) (2020-05-16)


### Bug Fixes

* Cache getAtom ([43c4788](https://github.com/roborox/focal-react/commit/43c47880854d2e141cb9b73c9a8461c706b216dc))

## [1.8.5](https://github.com/roborox/focal-react/compare/v1.8.4...v1.8.5) (2020-05-16)


### Bug Fixes

* Cache supports force in get ([c94eabe](https://github.com/roborox/focal-react/commit/c94eabeb79498cce309bbf754007dee1eed5f239))

## [1.8.4](https://github.com/roborox/focal-react/compare/v1.8.3...v1.8.4) (2020-05-16)


### Bug Fixes

* getImmediate, useWithDefault, mapLoadingState ([be4b92f](https://github.com/roborox/focal-react/commit/be4b92f54add314e43fca084d4289415707e967d))

## [1.8.3](https://github.com/roborox/focal-react/compare/v1.8.2...v1.8.3) (2020-05-11)


### Bug Fixes

* initial cache implementation ([9c880e0](https://github.com/roborox/focal-react/commit/9c880e075e02dc7765c66f4b35bcbaf42ced6ed2))

## [1.8.2](https://github.com/roborox/focal-react/compare/v1.8.1...v1.8.2) (2020-05-11)


### Bug Fixes

* get function to get current or future value of LoadingState ([d991ee7](https://github.com/roborox/focal-react/commit/d991ee75823b20da1d22a8f4561d23bd4a69f0f8))
* show children in InfiniteList when loading is not defined ([f8b1535](https://github.com/roborox/focal-react/commit/f8b1535bdda55223135db1e845f653a2b4f4df4d))

## [1.8.1](https://github.com/roborox/focal-react/compare/v1.8.0...v1.8.1) (2020-05-09)


### Bug Fixes

* minor useRx fix ([33c5a5c](https://github.com/roborox/focal-react/commit/33c5a5cb66029b92a7ea6dca3ab4b7b09699b488))

# [1.8.0](https://github.com/roborox/focal-react/compare/v1.7.5...v1.8.0) (2020-05-09)


### Features

* simplified components (because of useRx) ([3088ea9](https://github.com/roborox/focal-react/commit/3088ea9e126b38a2e0a9209856c8b6ad4693d013))

## [1.7.5](https://github.com/roborox/focal-react/compare/v1.7.4...v1.7.5) (2020-05-09)


### Bug Fixes

* simplified useRx, only works with observables which emit values immediately ([e574f54](https://github.com/roborox/focal-react/commit/e574f54b87f6e1d3ed23a4010475a1df957c1714))

## [1.7.4](https://github.com/roborox/focal-react/compare/v1.7.3...v1.7.4) (2020-05-06)


### Bug Fixes

* Loader's children are optional ([14b256d](https://github.com/roborox/focal-react/commit/14b256dd4c94fbb5e0e776b85b307003c857c545))
* Loader's children are optional ([d23e475](https://github.com/roborox/focal-react/commit/d23e4751f08c4fee0eb5050c27bfe55882490bbb))

## [1.7.3](https://github.com/roborox/focal-react/compare/v1.7.2...v1.7.3) (2020-04-29)


### Bug Fixes

* StateLoader can be without children ([6f66893](https://github.com/roborox/focal-react/commit/6f668933d8273e8d981dadf4f03d483cd9e8ada0))

## [1.7.2](https://github.com/roborox/focal-react/compare/v1.7.1...v1.7.2) (2020-04-29)


### Bug Fixes

* Rx can be without children ([f72690f](https://github.com/roborox/focal-react/commit/f72690f765028aeb06058944149f70acab18e0a2))
* toRx returns LoadingState ([dd5791b](https://github.com/roborox/focal-react/commit/dd5791b17bb93a81933d551ba71bd4818c2a0300))

## [1.7.1](https://github.com/roborox/focal-react/compare/v1.7.0...v1.7.1) (2020-04-29)


### Bug Fixes

* fix Rx component ([810a255](https://github.com/roborox/focal-react/commit/810a255c8957015dab19dbdf539babeba28652ff))

# [1.7.0](https://github.com/roborox/focal-react/compare/v1.6.1...v1.7.0) (2020-04-24)


### Bug Fixes

* applied new eslint config, removed unused hook ([5ffc2e1](https://github.com/roborox/focal-react/commit/5ffc2e1683ecf91610c78d84d47fbba916c7babd))


### Features

* StateLoader with render props ([d7e9f8e](https://github.com/roborox/focal-react/commit/d7e9f8e0e84270cf411b5dc7bc8126b935527c2d))

## [1.6.1](https://github.com/roborox/focal-react/compare/v1.6.0...v1.6.1) (2020-04-22)


### Bug Fixes

* fix loading state ([64e3c88](https://github.com/roborox/focal-react/commit/64e3c88bf4b88f9583e5f7c74d05c5301e9e01ba))

# [1.6.0](https://github.com/roborox/focal-react/compare/v1.5.0...v1.6.0) (2020-04-21)


### Features

* add useLoadingState hook, improve DX ([75a70ec](https://github.com/roborox/focal-react/commit/75a70ecb0fd01f024c336bf0b66a00f0fdbf5403))

# [1.5.0](https://github.com/roborox/focal-react/compare/v1.4.0...v1.5.0) (2020-03-27)


### Features

* add byKeyWithDefault lens ([#1](https://github.com/roborox/focal-react/issues/1)) ([add8344](https://github.com/roborox/focal-react/commit/add8344962e8859038bfd425c4ec5aad9cde7c10))

# [1.4.0](https://github.com/roborox/focal-react/compare/v1.3.2...v1.4.0) (2020-03-27)


### Bug Fixes

* useFirstLoadState hook changed to getFirstStatus ([4af198d](https://github.com/roborox/focal-react/commit/4af198d1940923abae2c96454d692f6235363efb))


### Features

* createAppStateProvider to create state provider and hook ([acc0325](https://github.com/roborox/focal-react/commit/acc03257fa3cbcc06f54543237d8f7e41c33becd))

## [1.3.2](https://github.com/roborox/focal-react/compare/v1.3.1...v1.3.2) (2020-03-26)


### Bug Fixes

* fix createLoadNext, add useFirstLoadState ([322a386](https://github.com/roborox/focal-react/commit/322a386ab55cacd3febed06d58ce106e4885b930))

## [1.3.1](https://github.com/roborox/focal-react/compare/v1.3.0...v1.3.1) (2020-03-25)


### Bug Fixes

* fix ts errors ([ecd5009](https://github.com/roborox/focal-react/commit/ecd500961c4aab6c67a2cb715b45e997168ed570))
* mergeStatuses ([e21b01c](https://github.com/roborox/focal-react/commit/e21b01c5125f2f1b070362b7b850a16c0ebc504a))
* useInfiniteList, useSubscription fixed, getFirstLoadStatus ([1d37edd](https://github.com/roborox/focal-react/commit/1d37edda3275ef9335b0ed063af7043d984086ba))

# [1.3.0](https://github.com/roborox/focal-react/compare/v1.2.0...v1.3.0) (2020-03-24)


### Features

* add mergeLoadingStates utility function ([415cdca](https://github.com/roborox/focal-react/commit/415cdcaba63db3c5b74c1da713c55ee5d5a5d8a2))

# [1.2.0](https://github.com/roborox/focal-react/compare/v1.1.1...v1.2.0) (2020-03-24)


### Features

* add useSubscription, useSyncSubject, update InfiniteList ([a7200f0](https://github.com/roborox/focal-react/commit/a7200f0b4f93523c3bc82847113f9638ece6d125))

## [1.1.1](https://github.com/roborox/focal-react/compare/v1.1.0...v1.1.1) (2020-03-20)


### Bug Fixes

* fix Loader test, getInitialState implemented ([1040a1d](https://github.com/roborox/focal-react/commit/1040a1dd967527ab5af64450e79873c2fd98be70))

# [1.1.0](https://github.com/roborox/focal-react/compare/v1.0.1...v1.1.0) (2020-03-19)


### Features

* add new props for infinite list ([6f03585](https://github.com/roborox/focal-react/commit/6f03585c9b00a5132cac4ad2514289d1f633195d))

## [1.0.1](https://github.com/roborox/focal-react/compare/v1.0.0...v1.0.1) (2020-03-18)


### Bug Fixes

* *bump version* ([6124f0a](https://github.com/roborox/focal-react/commit/6124f0ae5fb95ea93110924c54532b538459b046))

# 1.0.0 (2020-03-18)


### Features

* Initial commit ([6516586](https://github.com/roborox/focal-react/commit/6516586c416df445b8216184532bfd7407301d27))
