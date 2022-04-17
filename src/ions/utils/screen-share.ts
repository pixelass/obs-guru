export async function startScreenCapture(constraints: DisplayMediaStreamConstraints) {
	try {
		return await navigator.mediaDevices.getDisplayMedia(constraints);
	} catch (error_: unknown) {
		console.error(error_);
		return null;
	}
}

export async function startCameraCapture(constraints: DisplayMediaStreamConstraints) {
	try {
		return await navigator.mediaDevices.getUserMedia(constraints);
	} catch (error_: unknown) {
		console.error(error_);
		return null;
	}
}
