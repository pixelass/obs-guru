import { StyledAbsoluteVideo, StyledVideoWrapper } from "@/atoms/video/styled";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PresentToAllIcon from "@mui/icons-material/PresentToAll";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import copyToClipboard from "copy-to-clipboard";
import { useTranslation } from "next-i18next";
import React, { useEffect, useRef } from "react";

interface StreamCardProps {
	stream: MediaStream;
	id: string;
	onShareScreen(): void;
	onShareCamera(): void;
}
export default function StreamCard({ stream, id, onShareCamera, onShareScreen }: StreamCardProps) {
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

	const path = `stream/${id}`;
	const origin = "https://www.obs.guru";

	return (
		<Card sx={{ width: "100%" }}>
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
				<Stack
					direction="row"
					alignItems="center"
					sx={{ overflow: "hidden", width: "100%" }}
				>
					<Box sx={{ flex: 1, width: "calc(100% - 40px)" }}>
						<Typography
							variant="caption"
							component="div"
							sx={{
								width: "100%",
								overflow: "hidden",
								textOverflow: "ellipsis",
								whiteSpace: "nowrap",
							}}
						>
							{origin}/{path}
						</Typography>
					</Box>
					<IconButton
						aria-label={t("common:copyLink")}
						onClick={() => {
							copyToClipboard(`${window.location.origin}/${path}`);
						}}
					>
						<ContentCopyIcon />
					</IconButton>
				</Stack>
			</CardContent>
			<CardActions>
				<Stack direction="row" justifyContent="center" sx={{ width: "100%" }}>
					<IconButton aria-label={t("common:shareScreen")} onClick={onShareScreen}>
						<PresentToAllIcon />
					</IconButton>
					<IconButton aria-label={t("common:shareCamera")} onClick={onShareCamera}>
						<VideoCameraFrontIcon />
					</IconButton>
				</Stack>
			</CardActions>
		</Card>
	);
}
