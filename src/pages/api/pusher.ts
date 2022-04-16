import { NextApiRequest, NextApiResponse } from "next";
import Pusher from "pusher";
import process from "node:process";

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse<{ socket: string }>
) {
	const event_ = request.body.event as string;
	const channel = request.body.channel as string;
	const data = request.body.data as string;
	const pusher = new Pusher({
		appId: process.env.PUSHER_APPID,
		key: process.env.NEXT_PUBLIC_PUSHER_KEY,
		secret: process.env.PUSHER_SECRET,
		cluster: "eu",
		useTLS: true,
	});

	await pusher.trigger(channel, event_, data);
	response.end();
}
