/**
 * Created by m2mbob on 2017/4/19.
 */
import './ENV'
import MemoryStats from './MemoryStats'
import Monitor from './Monitor'
import fetch from 'isomorphic-fetch'

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

const srecordBtn = document.createElement('button')
srecordBtn.classList.add('btn', 'btn-primary')
srecordBtn.textContent = 'start record'
document.body.firstChild.appendChild(srecordBtn)

const erecordBtn = document.createElement('button')
erecordBtn.classList.add('btn', 'btn-primary')
erecordBtn.textContent = 'stop record'
document.body.firstChild.appendChild(erecordBtn)

let recordStatus = false
window.recordsCache = []

srecordBtn.addEventListener('click', () => {
    recordStatus = true
    monitor.setRecordStatus(recordStatus)
})

erecordBtn.addEventListener('click', () => {
    recordStatus = false
    monitor.setRecordStatus(recordStatus)
    fetch('/api/monitor.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            type: window.pageName,
            json: JSON.stringify(window.recordsCache),
        })
    }).then(() => {
        window.recordsCache = []
    }).catch(() => {
        alert('post failed')
    })
})

export default {
    memoryStats,
    monitor,
}
