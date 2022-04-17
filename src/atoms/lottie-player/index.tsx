import lottieJson from "@/ions/lottie/sloth.json";
import React from "react";
import Lottie from "react-lottie-player";

export default function LottiePlayer() {
	return <Lottie loop play animationData={lottieJson} />;
}
