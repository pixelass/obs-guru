import { StyledAbsoluteVideo, StyledVideoWrapper } from "@/atoms/video/styled";
import { useStore } from "@/ions/store";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import PresentToAllIcon from "@mui/icons-material/PresentToAll";
import StopIcon from "@mui/icons-material/Stop";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import { InputLabel } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Toolbar from "@mui/material/Toolbar";
import copyToClipboard from "copy-to-clipboard";
import { useTranslation } from "next-i18next";
import React, { useEffect, useRef, useState } from "react";

interface StreamCardProps {
	stream: MediaStream;
	id: string;
	onShareScreen(): void;
	onShareCamera(): void;
	onStop(): void;
}
export default function StreamCard({
	stream,
	id,
	onShareCamera,
	onShareScreen,
	onStop,
}: StreamCardProps) {
	const video = useRef<HTMLVideoElement>(null);
	const { t } = useTranslation(["common"]);
	const [checked, setChecked] = useState(false);
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
			<CardHeader
				subheader={`${origin}/${path}`}
				subheaderTypographyProps={{
					sx: { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
				}}
				sx={{ ".MuiCardHeader-content": { maxWidth: "calc(100% - 48px)" } }}
				action={
					<IconButton
						size="large"
						aria-label={t("common:copyLink")}
						onClick={() => {
							copyToClipboard(`${window.location.origin}/${path}`);
						}}
					>
						<ContentCopyIcon />
					</IconButton>
				}
			/>
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
				<AppBar
					elevation={0}
					position="absolute"
					color="transparent"
					sx={{ top: "auto", bottom: 0 }}
				>
					<Toolbar sx={{ display: "flex", justifyContent: "center" }}>
						<Fab
							color="primary"
							aria-label={t("common:start")}
							onClick={stream ? onStop : checked ? onShareCamera : onShareScreen}
						>
							{stream ? <StopIcon /> : <FiberManualRecordIcon />}
						</Fab>
					</Toolbar>
				</AppBar>
			</StyledVideoWrapper>
			<CardActions>
				<Stack
					direction="row"
					justifyContent="center"
					alignItems="center"
					gap={2}
					sx={{ width: "100%" }}
				>
					<PresentToAllIcon color={checked ? "inherit" : "secondary"} />
					<Switch
						checked={checked}
						color="secondary"
						aria-label={checked ? t("common:shareScreen") : t("common:shareCamera")}
						sx={theme => ({
							"& .MuiSwitch-switchBase": {
								"+ .MuiSwitch-track": {
									backgroundColor: theme.palette.secondary.main,
									opacity: 1,
									border: 0,
								},
								"&.Mui-checked": {
									"+ .MuiSwitch-track": {
										backgroundColor: theme.palette.secondary.main,
									},
								},
								"&.Mui-focusVisible .MuiSwitch-thumb": {
									color: theme.palette.secondary.dark,
								},
								".MuiSwitch-thumb": {
									color: theme.palette.secondary.dark,
								},
							},
						})}
						onChange={event_ => {
							setChecked(event_.target.checked);
						}}
					/>
					<VideoCameraFrontIcon color={checked ? "secondary" : "inherit"} />
				</Stack>
			</CardActions>
			<CardContent>
				<Stack gap={2}>
					<Stack direction="row" gap={3}>
						<InputLabel sx={{ flexShrink: 0 }} htmlFor="range:width">
							<>{t("common:width")}</>
						</InputLabel>
						<Slider
							disabled={checked}
							value={width}
							min={1080}
							max={3240}
							color="secondary"
							aria-labelledby="range:width"
							onChange={(event_, value) => {
								useStore.getState().setWidth(value as number);
							}}
						/>
						<Input
							disabled={checked}
							value={width}
							type="number"
							color="secondary"
							id="range:width"
							sx={{ width: 80 }}
							onChange={event_ => {
								useStore
									.getState()
									.setWidth(Number.parseInt(event_.target.value, 10));
							}}
						/>
					</Stack>
					<Stack direction="row" gap={3}>
						<InputLabel sx={{ flexShrink: 0 }} htmlFor="range:height">
							<>{t("common:height")}</>
						</InputLabel>
						<Slider
							disabled={checked}
							value={height}
							min={720}
							max={2160}
							color="secondary"
							aria-labelledby="range:height"
							onChange={(event_, value) => {
								useStore.getState().setHeight(value as number);
							}}
						/>
						<Input
							disabled={checked}
							value={height}
							type="number"
							color="secondary"
							id="range:height"
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
		</Card>
	);
}
