import React from "react";
import Lottie from "react-lottie-player";

import lottieJson from "@/ions/lottie/obs.json";

export default function ObsLottie() {
	return <Lottie loop play animationData={lottieJson} />;
}
