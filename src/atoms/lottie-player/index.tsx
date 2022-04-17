import lottieJson from "@/ions/lottie/obs.json";
import React from "react";
import Lottie from "react-lottie-player";

export default function ObsLottie() {
	return <Lottie loop play animationData={lottieJson} />;
}
