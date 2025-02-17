import { useState } from "react";
const ContactForm = () => {
    const [feedback, setFeedback] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const name = e.target.name.value;
      setFeedback(`Thank you ${name}! We have received your message.`);
      e.target.reset();
    };
  
    return (
      <>
        <form id="contactForm" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Enter your name" required />
          <input type="email" name="email" placeholder="Enter your email" required />
          <textarea name="message" placeholder="Enter your message" required></textarea>
          <button type="submit">Submit</button>
        </form>
        <p>{feedback}</p>
      </>
    );
  };

  export default ContactForm