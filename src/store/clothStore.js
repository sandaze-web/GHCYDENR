import {makeAutoObservable} from "mobx";

export default class ClothStore {
    constructor() {
        this._clothes = []
        this._page = 1
        this._totalCount = 0
        this._limit = 10
        makeAutoObservable(this)
    }
    setClothes(clothes) {
        this._clothes = [
            ...clothes
        ]
    }

    get clothes() {
        return this._clothes
    }

    setTotalCount(count) {
        this._totalCount = count
    }

    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}
