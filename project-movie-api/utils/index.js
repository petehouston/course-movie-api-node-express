function isInvalidString(str) {
    return !str || str.trim().length < 1;
}

function paginate (array, size, page) {
    let index = page - 1;
    return array.slice(index * size, (index + 1) * size);
}

function makeResponse(res, statusCode, data) {
    res.statusCode = statusCode;
    return res.json(data);
}

module.exports = {
    paginate: paginate,
    makeResponse: makeResponse,
    isInvalidString: isInvalidString
};