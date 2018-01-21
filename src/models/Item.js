// import Helper from './../helpers/miscHelpers'
import { ItemModelsByType } from 'constants/itemsTypes'

import Base from './Base'

class Item extends Base {
    constructor({
        _owner = '',
        _id = '',
        _ipfs = '',
        _type,
        img = { url: null, ipfs: null, type: null, type_id: null }, // TODO: fix img props
        _description = '',
        _meta = {},
        _modifiedOn,
        _syncedIpfs,
        _deleted,
        _archived
        } = {}) {
        super({
            _ipfs: _ipfs,
            _meta: _meta,
            _syncedIpfs: _syncedIpfs,
            _modifiedOn: _modifiedOn,
            _deleted: _deleted,
            _archived: _archived
        })

        this.owner = _owner
        this.type = _type
        this.img = _meta.img || img

        this.id = _id
        this.items = _meta.items || []
        this.description = _description
    }

    // Meta (ipfs) props (can NOT be changed)
    get owner() { return this._meta.owner }
    set owner(value) { this._meta.owner = value }

    get type() { return this._meta.type }
    set type(value) { this._meta.type = value }

    get img() { return this._meta.img }
    set img(value) { this._meta.img = value }

    // Dapp/adex-node fields (can be changed)
    get id() { return this._id }
    set id(value) { this._id = value }

    // Description only visible for the owner
    get description() { return this._meta.description }
    set description(value) { this._meta.description = value }

    get collections() { return this._collections }
    set collections(value) { this._collections = value }

    // UI props    
    get imgUrl() {
        this.imgUrlStr(this.img)
    }

    // TODO: change it to work with the new models
    // TODO: item type when add/remove ?
    static addItem(item, toAdd) {
        if (toAdd._id) toAdd = toAdd._id

        let itemIndex = item._meta.items.indexOf(toAdd)
        if (itemIndex > -1) return

        let newItem = { ...item }
        let newMeta = { ...newItem._meta }
        let newItems = [...newItem._meta.items]
        newItems.push(toAdd)
        newMeta.items = newItems
        newMeta.modifiedOn = Date.now()
        newItem._meta = newMeta

        return newItem
    }

    static removeItem(item, toRemove) {
        if (toRemove._id) toRemove = toRemove._id

        let itemIndex = item._meta.items.indexOf(toRemove)
        if (itemIndex < 0) return

        let newItem = { ...item }
        let newMeta = { ...newItem._meta }
        let newItems = [...newItem._meta.items]
        newItems.splice(itemIndex, 1)
        newMeta.items = newItems
        newMeta.modifiedOn = Date.now()
        newItem._meta = newMeta

        return newItem
    }
}

export default Item
