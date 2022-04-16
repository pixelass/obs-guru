import { StyledAbsoluteVideo, StyledVideoWrapper } from "@/atoms/video/styled";
import IosShareIcon from "@mui/icons-material/IosShare";
import PresentToAllIcon from "@mui/icons-material/PresentToAll";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import copyToClipboard from "copy-to-clipboard";
import { useTranslation } from "next-i18next";
import React, { useEffect, useRef } from "react";

interface StreamCardProps {
	stream: MediaStream;
	id: string;
	onStart(): void;
}
export default function StreamCard({ stream, id, onStart }: StreamCardProps) {
	const video = useRef<HTMLVideoElement>(null);
	const { t } = useTranslation(["common"]);

	useEffect(() => {
		const element = video.current;
		if (element && stream) {
			element.srcObject = stream;
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

	const url = `/stream/${id}`;

	return (
		<Card sx={{ width: 300 }}>
			<StyledVideoWrapper>
				<StyledAbsoluteVideo
					ref={video}
					muted
					height={720}
					width={1080}
					onLoadedMetadata={() => {
						void video.current.play();
					}}
				/>
			</StyledVideoWrapper>
			<CardContent>
				<Typography>{url}</Typography>
			</CardContent>
			<CardActions>
				<IconButton aria-label={t("common:shareScreen")} onClick={onStart}>
					<ScreenShareIcon />
				</IconButton>
				<IconButton aria-label={t("common:shareCamera")} onClick={onStart}>
					<PresentToAllIcon />
				</IconButton>
				<IconButton
					aria-label={t("common:copyLink")}
					onClick={() => {
						copyToClipboard(`${window.location.origin}${url}`);
					}}
				>
					<IosShareIcon />
				</IconButton>
			</CardActions>
		</Card>
	);
}
