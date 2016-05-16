export function keyMirror(obj) {
	if (typeof obj !== "object" || Array.isArray(obj))
		throw new Error("argument must be an object");

	for (var k in obj) {
		if (obj.hasOwnProperty(k))
			obj[k] = k;
	}

	return obj;
}

export function formatTime(val) {
	return val < 10 ? "0" + val : val;
}

export function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}