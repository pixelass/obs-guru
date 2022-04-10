import { useScreenShare } from "@/ions/hooks/screen-share";
import Button from "@mui/material/Button";
import { useTranslation } from "next-i18next";
import React, { useEffect, useRef, useState } from "react";

const constraints = {
	audio: false,
	video: { height: 1080, width: 1620 },
};

export default function Template() {
	const { t } = useTranslation(["common"]);
	const video = useRef<HTMLVideoElement>(null);
	const start = useScreenShare(constraints);
	const [stream, setStream] = useState<MediaStream>(null);

	useEffect(() => {
		const element = video.current;

		if (element && stream) {
			element.srcObject = stream;
			void element.play();
		}

		return () => {
			if (element?.srcObject && "getTracks" in element.srcObject) {
				const tracks = element.srcObject.getTracks();

				for (const track of tracks) {
					track.stop();
				}

				element.srcObject = null;
			}
		};
	}, [stream, video]);

	return (
		<>
			<Button
				onClick={async () => {
					setStream(await start());
				}}
			>
				<>{t("common:start")}</>
			</Button>
			<Button
				onClick={async () => {
					setStream(null);
				}}
			>
				<>{t("common:stop")}</>
			</Button>
			<video ref={video} height={720} width={1080} />
		</>
	);
}
