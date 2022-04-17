import { StyledAbsoluteVideo, StyledVideoWrapper } from "@/atoms/video/styled";
import { useStore } from "@/ions/store";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PresentToAllIcon from "@mui/icons-material/PresentToAll";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import Slider from "@mui/material/Slider";
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
	const height = useStore(state => state.height);
	const width = useStore(state => state.width);

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
					gap={2}
					sx={{ overflow: "hidden", width: "100%" }}
				>
					<Box sx={{ flex: 1, width: "calc(100% - 64px)" }}>
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
						size="large"
						aria-label={t("common:copyLink")}
						onClick={() => {
							copyToClipboard(`${window.location.origin}/${path}`);
						}}
					>
						<ContentCopyIcon />
					</IconButton>
				</Stack>
				<Stack gap={2}>
					<Stack direction="row" gap={3}>
						<Slider
							value={width}
							min={1080}
							max={3240}
							onChange={(event_, value) => {
								useStore.getState().setWidth(value as number);
							}}
						/>
						<Input
							value={width}
							type="number"
							sx={{ width: 80 }}
							onChange={event_ => {
								useStore
									.getState()
									.setWidth(Number.parseInt(event_.target.value, 10));
							}}
						/>
					</Stack>
					<Stack direction="row" gap={3}>
						<Slider
							value={height}
							min={720}
							max={2160}
							onChange={(event_, value) => {
								useStore.getState().setHeight(value as number);
							}}
						/>
						<Input
							value={height}
							type="number"
							sx={{ width: 80 }}
							onChange={event_ => {
								useStore
									.getState()
									.setHeight(Number.parseInt(event_.target.value, 10));
							}}
						/>
					</Stack>
				</Stack>
			</CardContent>
			<CardActions>
				<Stack direction="row" justifyContent="center" gap={2} sx={{ width: "100%" }}>
					<IconButton
						size="large"
						aria-label={t("common:shareScreen")}
						onClick={onShareScreen}
					>
						<PresentToAllIcon />
					</IconButton>
					<IconButton
						size="large"
						aria-label={t("common:shareCamera")}
						onClick={onShareCamera}
					>
						<VideoCameraFrontIcon />
					</IconButton>
				</Stack>
			</CardActions>
		</Card>
	);
}
