import { MongoClient } from "mongodb";

async function handler(req, res) {
	if (req.method === "POST") {
		const { email, name, message } = req.body;

		if (
			!email ||
			!email.includes("@") ||
			!name ||
			!message ||
			name.trim() === "" ||
			message.trim() === ""
		) {
			res.status(422).json({ message: "Invalid input." });
			return;
		}

		//store in database
		const newMessage = {
			email,
			name,
			message,
		};

		let client;

		try {
			client = await MongoClient.connect(process.env.mongodbServer, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			});
		} catch (error) {
			res.status(500).json({ message: "Could not connect to Database" });
			return;
		}

		const db = client.db();
		try {
			const result = await db.collection("messages").insertOne(newMessage);
			newMessage.id = result.insertedId;
		} catch (error) {
			client.close();
			res.status(500).json({ message: "Storing message failed" });
			return;
		}

		client.close();

		res.status(201).json({ message: "Succesfully sent" });
	}
}

export default handler;
