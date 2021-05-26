
let wasm;

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function getObject(idx) { return heap[idx]; }

let WASM_VECTOR_LEN = 0;

let cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory0;
}

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachegetFloat64Memory0 = null;
function getFloat64Memory0() {
    if (cachegetFloat64Memory0 === null || cachegetFloat64Memory0.buffer !== wasm.memory.buffer) {
        cachegetFloat64Memory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachegetFloat64Memory0;
}
/**
*/
export function main() {
    wasm.main();
}

let stack_pointer = 32;

function addBorrowedObject(obj) {
    if (stack_pointer == 1) throw new Error('out of js stack');
    heap[--stack_pointer] = obj;
    return stack_pointer;
}
/**
* @param {any} config
* @returns {any}
*/
export function load_game(config) {
    try {
        var ret = wasm.load_game(addBorrowedObject(config));
        return takeObject(ret);
    } finally {
        heap[stack_pointer++] = undefined;
    }
}

/**
* @param {any} config
* @returns {any}
*/
export function get_name(config) {
    try {
        var ret = wasm.get_name(addBorrowedObject(config));
        return takeObject(ret);
    } finally {
        heap[stack_pointer++] = undefined;
    }
}

/**
* @param {any} config
* @returns {any}
*/
export function get_author(config) {
    try {
        var ret = wasm.get_author(addBorrowedObject(config));
        return takeObject(ret);
    } finally {
        heap[stack_pointer++] = undefined;
    }
}

/**
* @param {any} config
* @returns {any}
*/
export function get_slug(config) {
    try {
        var ret = wasm.get_slug(addBorrowedObject(config));
        return takeObject(ret);
    } finally {
        heap[stack_pointer++] = undefined;
    }
}

/**
* @param {any} config
* @param {any} path
* @returns {any}
*/
export function check_path(config, path) {
    try {
        var ret = wasm.check_path(addBorrowedObject(config), addBorrowedObject(path));
        return takeObject(ret);
    } finally {
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
* @param {any} config
* @param {number} path
* @returns {any}
*/
export function jump(config, path) {
    var ret = wasm.jump(addHeapObject(config), path);
    return takeObject(ret);
}

/**
* @param {any} config
* @returns {any}
*/
export function get_path(config) {
    try {
        var ret = wasm.get_path(addBorrowedObject(config));
        return takeObject(ret);
    } finally {
        heap[stack_pointer++] = undefined;
    }
}

/**
* @param {any} config
* @returns {any}
*/
export function get_path_id(config) {
    try {
        var ret = wasm.get_path_id(addBorrowedObject(config));
        return takeObject(ret);
    } finally {
        heap[stack_pointer++] = undefined;
    }
}

/**
* @param {any} path
* @returns {any}
*/
export function path_get_text(path) {
    try {
        var ret = wasm.path_get_text(addBorrowedObject(path));
        return takeObject(ret);
    } finally {
        heap[stack_pointer++] = undefined;
    }
}

/**
* @param {any} path
* @returns {any}
*/
export function path_get_option_len(path) {
    try {
        var ret = wasm.path_get_option_len(addBorrowedObject(path));
        return takeObject(ret);
    } finally {
        heap[stack_pointer++] = undefined;
    }
}

/**
* @param {any} path
* @param {number} item
* @returns {any}
*/
export function path_get_option(path, item) {
    try {
        var ret = wasm.path_get_option(addBorrowedObject(path), item);
        return takeObject(ret);
    } finally {
        heap[stack_pointer++] = undefined;
    }
}

/**
* @param {any} option
* @returns {any}
*/
export function option_get_text(option) {
    try {
        var ret = wasm.option_get_text(addBorrowedObject(option));
        return takeObject(ret);
    } finally {
        heap[stack_pointer++] = undefined;
    }
}

/**
* @param {any} option
* @returns {any}
*/
export function option_get_jump(option) {
    try {
        var ret = wasm.option_get_jump(addBorrowedObject(option));
        return takeObject(ret);
    } finally {
        heap[stack_pointer++] = undefined;
    }
}

/**
* @param {any} config
* @returns {any}
*/
export function get_path_len(config) {
    try {
        var ret = wasm.get_path_len(addBorrowedObject(config));
        return takeObject(ret);
    } finally {
        heap[stack_pointer++] = undefined;
    }
}

/**
* @param {any} config
* @returns {any}
*/
export function export_history(config) {
    try {
        var ret = wasm.export_history(addBorrowedObject(config));
        return takeObject(ret);
    } finally {
        heap[stack_pointer++] = undefined;
    }
}

/**
* @param {any} config
* @param {any} history_v
* @returns {any}
*/
export function import_history(config, history_v) {
    try {
        var ret = wasm.import_history(addBorrowedObject(config), addBorrowedObject(history_v));
        return takeObject(ret);
    } finally {
        heap[stack_pointer++] = undefined;
        heap[stack_pointer++] = undefined;
    }
}

/**
*/
export function init_panic_hook() {
    wasm.init_panic_hook();
}

async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

async function init(input) {
    if (typeof input === 'undefined') {
        input = new URL('cyoa_crime_and_punishment_bg.wasm', import.meta.url);
    }
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_json_parse = function(arg0, arg1) {
        var ret = JSON.parse(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_json_serialize = function(arg0, arg1) {
        const obj = getObject(arg1);
        var ret = JSON.stringify(obj === undefined ? null : obj);
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        var ret = getStringFromWasm0(arg0, arg1);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbindgen_number_new = function(arg0) {
        var ret = arg0;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_59cb74e423758ede = function() {
        var ret = new Error();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_stack_558ba5917b466edd = function(arg0, arg1) {
        var ret = getObject(arg1).stack;
        var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_error_4bb6c2a97407129a = function(arg0, arg1) {
        try {
            console.error(getStringFromWasm0(arg0, arg1));
        } finally {
            wasm.__wbindgen_free(arg0, arg1);
        }
    };
    imports.wbg.__wbindgen_number_get = function(arg0, arg1) {
        const obj = getObject(arg1);
        var ret = typeof(obj) === 'number' ? obj : undefined;
        getFloat64Memory0()[arg0 / 8 + 1] = isLikeNone(ret) ? 0 : ret;
        getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
    };
    imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
        const obj = getObject(arg1);
        var ret = typeof(obj) === 'string' ? obj : undefined;
        var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }



    const { instance, module } = await load(await input, imports);

    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;
    wasm.__wbindgen_start();
    return wasm;
}

export default init;

