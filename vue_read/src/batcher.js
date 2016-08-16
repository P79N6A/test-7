import config from './config'
import {
  warn,
  nextTick,
  devtools
} from './util/index'

// we have two separate queues: one for directive updates
// and one for user watcher registered via $watch().
// we want to guarantee directive updates to be called
// before user watchers so that when user watchers are
// triggered, the DOM would have already been in updated
// state.
//:两个watcher队列 指令产生的watcher的队列 和 {watch: {..}} 用户指定的watch选项产生的watcher的队列
var queue = [] //:指令watcher用于数据变化处理dom
var userQueue = [] //:用户watcher用于数据变化处理相关数据逻辑
var has = {}
var circular = {}
var waiting = false

/**
 * Reset the batcher's state.
 */
//:重置批处理器的状态
function resetBatcherState () {
  queue.length = 0
  userQueue.length = 0
  has = {}
  circular = {}
  waiting = false
}

/**
 * Flush both queues and run the watchers.
 */
//:清空并执行批处理器队列
function flushBatcherQueue () {
  runBatcherQueue(queue)
  runBatcherQueue(userQueue)
  // user watchers triggered more watchers,
  // keep flushing until it depletes
  if (queue.length) {//:用户watcher的回调有可能导致其他watcher被触发
    return flushBatcherQueue()
  }
  // dev tool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush') //:开发工具同步更新后的值
  }
  resetBatcherState()
}

/**
 * Run the watchers in a single queue.
 *
 * @param {Array} queue
 */
//:批量执行一个队列里的watchers
function runBatcherQueue (queue) {
  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (let i = 0; i < queue.length; i++) {
    var watcher = queue[i]
    var id = watcher.id
    has[id] = null
    watcher.run() //:检查观察数据是否变化 执行回调
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1
      if (circular[id] > config._maxUpdateCount) {
        warn(
          'You may have an infinite update loop for watcher ' +
          'with expression "' + watcher.expression + '"',
          watcher.vm
        )
        break
      }
    }
  }
  queue.length = 0
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 *
 * @param {Watcher} watcher
 *   properties:
 *   - {Number} id
 *   - {Function} run
 */
//:watcher加入队列
export function pushWatcher (watcher) {
  const id = watcher.id
  if (has[id] == null) {
    // push watcher into appropriate queue
    const q = watcher.user
      ? userQueue
      : queue //:watcher.user指示加入哪个队列
    has[id] = q.length
    q.push(watcher)
    // queue the flush
    if (!waiting) {
      waiting = true
      nextTick(flushBatcherQueue)
    }
  }
}
