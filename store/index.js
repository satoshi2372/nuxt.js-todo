// vuexfireを使えるように記述　必ずindex.jsへ記述する必要あり
import { vuexfireMutations } from 'vuexfire'

export const mutations = {
  ...vuexfireMutations
}
