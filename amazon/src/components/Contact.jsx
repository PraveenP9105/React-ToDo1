import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const formRef = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_4uugn9j",
        "template_pxyw7sx",
        formRef.current,
        "D12a-mGrqJrSmozx4"
      )
      .then(
        () => {
          setStatus("Message sent successfully!");
          formRef.current.reset();
        },
        (error) => {
          setStatus("Failed to send message. Try again.");
          console.error(error);
        }
      );
  };

  return (
    <div style={styles.container}>
      <h2>Contact Us</h2>

      <form ref={formRef} onSubmit={sendEmail} style={styles.form}>
        <input
          type="text"
          name="from_name"
          placeholder="Your Name"
          required
        />

        <input
          type="email"
          name="from_email"
          placeholder="Your Email"
          required
        />

        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          required
        />

        <button type="submit">Send Message</button>
      </form>

      {status && <p>{status}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "40px auto",
    padding: "20px",
    background: "#fff",
    borderRadius: "8px",
    textAlign: "center"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  }
};

export default Contact;
