import { usePusher } from "@/ions/hooks/pusher";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useTranslation } from "next-i18next";
import React, { useMemo, useState } from "react";

const channel = "obs-guru";

export default function Template() {
	const { t } = useTranslation(["common"]);

	const [message, setMessage] = useState("");
	usePusher(
		channel,
		useMemo(
			() => ({
				hello(data: { stream: MediaStream }) {
					console.log(data);
				},
			}),
			[]
		)
	);

	return (
		<Stack gap={2}>
			<TextField
				value={message}
				onChange={event_ => {
					setMessage(event_.target.value);
				}}
			/>
			<Button
				onClick={() => {
					const event_ = "hello";
					void axios.post("/api/chat", {
						channel,
						data: { message },
						event: event_,
					});
				}}
			>
				<>{t("common:send")}</>
			</Button>
		</Stack>
	);
}
