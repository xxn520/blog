/**
 * Created by m2mbob on 2017/4/14.
 */
function warn(error) {
    console.warn(error.message || error);
    throw error; // To let the caller handle the rejection
}

export default promise = store => next => action =>
    typeof action.then === 'function'
        ? Promise.resolve(action).then(next, warn)
        : next(action);
