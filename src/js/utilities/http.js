/* export async function request(route = '/',obj = {}) {
    var {method,data} = obj,
        atts = {
            method: method || 'GET',
            accept: 'application/vnd.sttv.app+json',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    if (atts.method !== 'GET') atts['body'] = JSON.stringify(data || {})
    const response = await fetch(_st.api+route, atts)
    const d = await response.json()
    return d
}
export async function get(rt,cb) {
    return await request(rt).then(d => typeof cb === 'function' && cb(d)).catch(error => {
        alert('There was an error. Please try again later.')
        console.log(error)
    })
}
export async function post(rt,data,cb) {
    return await request(rt,{method:'POST',data:data}).then(d => typeof cb === 'function' && cb(d)).catch(error => {
        console.log(error)
        alert('There was an error. Please try again later.')
    })
}
export async function put(rt,data,cb) {
    return await request(rt,{method:'PUT',data:data}).then(d => typeof cb === 'function' && cb(d)).catch(error => {
        alert('There was an error. Please try again later.')
        console.log(error)
    })
}
export async function patch(rt,data,cb) {
    return await request(rt,{method:'PATCH',data:data}).then(d => typeof cb === 'function' && cb(d)).catch(error => {
        alert('There was an error. Please try again later.')
        console.log(error)
    })
}
export async function del(rt,data,cb) {
    return await request(rt,{method:'DELETE',data:data}).then(d => typeof cb === 'function' && cb(d)).catch(error => {
        alert('There was an error. Please try again later.')
        console.log(error)
    })
} */

export function http(api) {
    console.log(api)
    return {
        obj: ((t) => {
            return t
        })(this),
        request: async function(route = '/',obj = {}) {
            var {method,data} = obj,
                atts = {
                    method: method || 'GET',
                    accept: 'application/vnd.sttv.app+json,application/octet-stream',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            if (atts.method !== 'GET') atts['body'] = JSON.stringify(data || {})
            const response = await fetch(api+route, atts)
            const d = await response.json()
            return d
        },
        get: (rt,cb) => {
            return this.request(rt)
                .then(d => typeof cb === 'function' && cb(d))
                .catch(error => {
                    alert('There was an error. Please try again later.')
                    console.log(error)
                })
        },
        post: (rt,data,cb) => {
            return this.request(rt,{method:'POST',data:data})
                .then(d => typeof cb === 'function' && cb(d))
                .catch(error => {
                    console.log(error)
                    alert('There was an error. Please try again later.')
                })
        },
        put: (rt,data,cb) => {
            return this.request(rt,{method:'PUT',data:data})
                .then(d => typeof cb === 'function' && cb(d))
                .catch(error => {
                    alert('There was an error. Please try again later.')
                    console.log(error)
                })
        },
        patch: (rt,data,cb) => {
            return this.request(rt,{method:'PATCH',data:data})
                .then(d => typeof cb === 'function' && cb(d))
                .catch(error => {
                    alert('There was an error. Please try again later.')
                    console.log(error)
                })
        },
        del: (rt,data,cb) => {
            return this.request(rt,{method:'DELETE',data:data})
                .then(d => typeof cb === 'function' && cb(d))
                .catch(error => {
                    alert('There was an error. Please try again later.')
                    console.log(error)
                })
        }
    }
}