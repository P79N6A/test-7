/**
 * A doubly linked list-based Least Recently Used (LRU)
 * cache. Will keep most recently used items while
 * discarding least recently used items when its limit is
 * reached. This is a bare-bone version of
 * Rasmus Andersson's js-lru:
 *
 *   https://github.com/rsms/js-lru
 *
 * @param {Number} limit
 * @constructor
 */
//:应用LRU机制的缓存类
export default function Cache (limit) {
  this.size = 0
  this.limit = limit
  this.head = this.tail = undefined
  this._keymap = Object.create(null)
}

var p = Cache.prototype

/**
 * Put <value> into the cache associated with <key>.
 * Returns the entry which was removed to make room for
 * the new entry. Otherwise undefined is returned.
 * (i.e. if there was enough room already).
 *
 * @param {String} key
 * @param {*} value
 * @return {Entry|undefined}
 */
//:键值对存入缓存 若达到上限 则返回被移除项
p.put = function (key, value) {
  var removed
  if (this.size === this.limit) {//:达到上限 cache.shift() 移除最旧项
    removed = this.shift()
  }

  var entry = this.get(key, true)
  if (!entry) {//:不存在对应缓存项 则加入
    entry = {
      key: key
    }
    this._keymap[key] = entry
    if (this.tail) {//:更新链表节点的前后指向
      this.tail.newer = entry
      entry.older = this.tail
    } else {
      this.head = entry
    }
    this.tail = entry
    this.size++
  }
  entry.value = value //: cache._keymap{key: {key:.., value:..}}

  return removed
}

/**
 * Purge the least recently used (oldest) entry from the
 * cache. Returns the removed entry or undefined if the
 * cache was empty.
 */
//:移除最旧项
p.shift = function () {
  var entry = this.head
  if (entry) {//:链表头节点为最旧项
    this.head = this.head.newer
    this.head.older = undefined
    entry.newer = entry.older = undefined
    this._keymap[entry.key] = undefined
    this.size--
  }
  return entry
}

/**
 * Get and register recent use of <key>. Returns the value
 * associated with <key> or undefined if not in cache.
 *
 * @param {String} key
 * @param {Boolean} returnEntry
 * @return {Entry|*}
 */
//:获取缓存项
p.get = function (key, returnEntry) {
  var entry = this._keymap[key]
  if (entry === undefined) return
  if (entry === this.tail) {//:若刚好是获取链接尾节点 直接返回该节点
    return returnEntry
      ? entry
      : entry.value
  }
  // HEAD--------------TAIL
  //   <.older   .newer>
  //  <--- add direction --
  //   A  B  C  <D>  E
  if (entry.newer) {//:被访问的节点移到最后 调整前后节点的指针
    if (entry === this.head) {
      this.head = entry.newer
    }
    entry.newer.older = entry.older // C <-- E.
  }
  if (entry.older) {
    entry.older.newer = entry.newer // C. --> E
  }
  entry.newer = undefined // D --x
  entry.older = this.tail // D. --> E
  if (this.tail) {
    this.tail.newer = entry // E. <-- D
  }
  this.tail = entry
  return returnEntry
    ? entry
    : entry.value
}
