/**
 * Created by m2mbob on 2017/4/19.
 */
export default class MemoryStats {
    constructor() {
        this.msMin = 100
        this.msMax = 0
        this.perf = window.performance || {};
        // polyfill usedJSHeapSize
        if (!this.perf && !this.perf.memory){
            this.perf.memory = { usedJSHeapSize : 0 }
        }
        if (this.perf && !this.perf.memory){
            this.perf.memory = { usedJSHeapSize : 0 }
        }

        // support of the API?
        if(this.perf.memory.totalJSHeapSize === 0){
            console.warn('totalJSHeapSize === 0... performance.memory is only available in Chrome .')
        }

        this.lastTime	= Date.now()
        this.lastUsedHeap= this.perf.memory.usedJSHeapSize

        this.render()
    }

    static syncUiGraph(dom, height, color) {
        const child = dom.appendChild(dom.firstChild)
        child.style.height = height + 'px'
        if (color) child.style.backgroundColor = color
    }

    static bytesToSize(bytes, nFractDigit){
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
        if (bytes === 0) return 'n/a'
        nFractDigit = nFractDigit !== undefined ? nFractDigit : 0
        const precision = Math.pow(10, nFractDigit)
        const i = Math.floor(Math.log(bytes) / Math.log(1024))
        return Math.round(bytes*precision / Math.pow(1024, i))/precision + ' ' + sizes[i]
    }

    syncUi() {
        // refresh only 30time per second
        if (Date.now() - this.lastTime < 1000/30) return
        this.lastTime	= Date.now()

        const delta	= this.perf.memory.usedJSHeapSize - this.lastUsedHeap
        this.lastUsedHeap	= this.perf.memory.usedJSHeapSize
        const color = delta < 0 ? '#830' : '#131'

        const ms	= this.perf.memory.usedJSHeapSize
        this.msMin = Math.min(this.msMin, ms)
        this.msMax = Math.max(this.msMax, ms)
        this.$memoryStatsText.textContent = "Mem: " + MemoryStats.bytesToSize(ms, 2)

        const normValue = ms / (30*1024*1024)
        const height = Math.min(30, 30 - normValue * 30)
        MemoryStats.syncUiGraph(this.$memoryStatsGraph, height, color)
    }

    render() {
        const container = document.createElement('div')
        container.id	= 'memory-stats'
        container.style.cssText = 'position:fixed;right:0;bottom:0;width:80px;opacity:0.9;cursor:pointer;'

        const memoryStatsDiv = document.createElement('div')
        memoryStatsDiv.id	= 'memory-stats-div'
        memoryStatsDiv.style.cssText = 'padding:0 0 3px 3px;text-align:left;background-color:#020;'
        container.appendChild(memoryStatsDiv)

        const memoryStatsText	= document.createElement('div')
        memoryStatsText.id = 'msText'
        memoryStatsText.style.cssText = 'color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px'
        memoryStatsText.innerHTML= 'Memory'
        memoryStatsDiv.appendChild(memoryStatsText)

        const memoryStatsGraph = document.createElement('div')
        memoryStatsGraph.id = 'memory-stats-graph';
        memoryStatsGraph.style.cssText = 'position:relative;width:74px;height:30px;background-color:#0f0'
        memoryStatsDiv.appendChild(memoryStatsGraph)

        while (memoryStatsGraph.children.length < 74) {
            const bar = document.createElement('span')
            bar.style.cssText = 'width:1px;height:30px;float:left;background-color:#131'
            memoryStatsGraph.appendChild(bar)
        }

        this.$mountEle = container
        this.$memoryStatsDiv = memoryStatsDiv
        this.$memoryStatsText = memoryStatsText
        this.$memoryStatsGraph = memoryStatsGraph
    }
}
