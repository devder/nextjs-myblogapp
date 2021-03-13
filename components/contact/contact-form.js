import { useState, useEffect } from "react";
import classes from "./contact-form.module.css";
import Notification from "../ui/notification";

const sendContactData = async (contactDetails) => {
	const response = await fetch("/api/contact", {
		method: "POST",
		body: JSON.stringify(contactDetails),
		headers: { "Content-Type": "application/json" },
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || "Something went wrong");
	}
};

function ContactForm() {
	const [enteredEmail, setEnteredEmail] = useState("");
	const [enteredName, setEnteredName] = useState("");
	const [enteredMessage, setEnteredMessage] = useState("");
	const [requestStatus, setRequestStatus] = useState();

	let errMessage, notification;

	useEffect(() => {
		if (requestStatus === "success" || requestStatus === "error") {
			const timer = setTimeout(() => {
				setRequestStatus(null);
				errMessage = null;
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [requestStatus]);

	const sendMessageHandler = async (evt) => {
		evt.preventDefault();
		try {
			setRequestStatus("pending");
			await sendContactData({
				email: enteredEmail,
				name: enteredName,
				message: enteredMessage,
			});
			setRequestStatus("success");
		} catch (error) {
			errMessage = error.message;
			setRequestStatus("error");
		}

		setEnteredEmail("");
		setEnteredMessage("");
		setEnteredName("");
	};

	if (requestStatus === "pending") {
		notification = {
			status: "pending",
			title: "Sending Message",
			message: "your message is on its way...",
		};
	}
	if (requestStatus === "success") {
		notification = {
			status: "success",
			title: "Success",
			message: "Message sent successfully!",
		};
	}
	if (requestStatus === "error") {
		notification = {
			status: "error",
			title: "Error!",
			message: errMessage,
		};
	}

	return (
		<section className={classes.contact}>
			<h1>How can I help you?</h1>
			<form className={classes.form} onSubmit={sendMessageHandler}>
				<div className={classes.controls}>
					<div className={classes.control}>
						<label htmlFor="email">Your Email</label>
						<input
							type="email"
							id="email"
							required
							value={enteredEmail}
							onChange={(evt) => setEnteredEmail(evt.target.value)}
						/>
					</div>
					<div className={classes.control}>
						<label htmlFor="name">Your Name</label>
						<input
							type="text"
							id="name"
							required
							value={enteredName}
							onChange={(evt) => setEnteredName(evt.target.value)}
						/>
					</div>
				</div>
				<div className={classes.control}>
					<label htmlFor="message">Your Message</label>
					<textarea
						id="message"
						rows="5"
						required
						value={enteredMessage}
						onChange={(evt) => setEnteredMessage(evt.target.value)}
					/>
				</div>
				<div className={classes.actions}>
					<button>Send Message</button>
				</div>
			</form>
			{notification && (
				<Notification
					status={notification.status}
					title={notification.title}
					message={notification.message}
				/>
			)}
		</section>
	);
}

export default ContactForm;
