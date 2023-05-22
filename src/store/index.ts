import createStore from './createStore'
import order from './order'

const store = () => ({
  order: order()
})

const contextResult = createStore(store)

export const { useModel, StoreProvider, getModel } = contextResult
