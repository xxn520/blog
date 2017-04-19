/**
 * Created by m2mbob on 2017/4/19.
 */
import './ENV'
import MemoryStats from './MemoryStats'
import Monitor from './Monitor'

const memoryStats = new MemoryStats()
document.body.appendChild(memoryStats.$mountEle)
requestAnimationFrame(function rAFloop() {
    memoryStats.syncUi()
    requestAnimationFrame(rAFloop)
})

const monitor = new Monitor()
document.body.appendChild(monitor.$mountEle)

export default {
    memoryStats,
    monitor,
}
