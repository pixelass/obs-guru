import { useCallback } from "react";

export async function startCapture(constraints: DisplayMediaStreamConstraints) {
	try {
		return await navigator.mediaDevices.getDisplayMedia(constraints);
	} catch (error_: unknown) {
		console.error(error_);
		return null;
	}
}

export function useScreenShare(constraints: DisplayMediaStreamConstraints) {
	return useCallback(async () => startCapture(constraints), [constraints]);
}
