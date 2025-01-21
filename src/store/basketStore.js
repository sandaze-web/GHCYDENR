import {makeAutoObservable} from "mobx";

export default class BasketStore {
    constructor() {
        this._clothes = []
        makeAutoObservable(this)
    }
    setClothes(clothes) {
        this._clothes = [...clothes]
    }
    addCloth(cloth) {
        this._clothes.push(cloth)
    }

    removeCloth(userName, clother_id, size = null) {
        // Используем метод filter для создания нового массива без элемента с этим id
        let newItems = this.clothes.filter(item => item.name !== userName || item.clother_id !== parseInt(clother_id) || item.size !== size);
        this.setClothes(newItems)
    }

    get clothes() {
        return this._clothes
    }
}
