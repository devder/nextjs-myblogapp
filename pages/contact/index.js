import ContactForm from "../../components/contact/contact-form";
import Head from "next/head";

export default function ContactPage() {
	return (
		<>
			<Head>
				<title>Contact Me</title>
				<meta name="description" content="send me your message here" />
			</Head>
			<ContactForm />
		</>
	);
}
