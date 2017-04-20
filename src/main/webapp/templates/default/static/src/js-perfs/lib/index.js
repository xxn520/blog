/**
 * Created by m2mbob on 2017/4/19.
 */
import './ENV'
import MemoryStats from './MemoryStats'
import Monitor from './Monitor'

const memoryStats = new MemoryStats()
memoryStats.domElement.style.position = 'fixed'
memoryStats.domElement.style.right = '0px'
memoryStats.domElement.style.bottom = '0px'
document.body.appendChild( memoryStats.domElement )
requestAnimationFrame(function rAFloop(){
    memoryStats.update()
    requestAnimationFrame(rAFloop)
})

const monitor = new Monitor()
document.body.appendChild(monitor.$mountEle)

export default {
    memoryStats,
    monitor,
}
