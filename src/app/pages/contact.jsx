import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import { MagicCard } from "@/components/magicui/magic-card";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { Mail, User, MessageSquare, Send } from "lucide-react";

const ContactSection = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs
      .sendForm(serviceId, templateId, form.current, publicKey)
      .then(
        (result) => {
          console.log(result.text);
          setStatus({ type: "success", text: "Message sent successfully!" });
          e.target.reset();
        },
        (error) => {
          console.error(error.text);
          setStatus({ type: "error", text: "An error occurred. Please try again." });
        }
      )
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="rounded-2xl container bg-black/50 py-10">
      <div className="flex flex-col xl:flex-row justify-center items-center gap-10 w-full px-4 xl:px-8">
        {/* Form Section */}
        <MagicCard
          gradientSize={400}
          gradientFrom="#4a16f4"
          gradientTo="#f42116"
          className="rounded-2xl w-full max-w-2xl text-white p-6 md:p-10"
        >
          <div className="text-center mb-8">
            <p className="text-xs tracking-widest text-orange-400 mb-1">
              GET IN TOUCH
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <SparklesText>Contact Me</SparklesText>
            </h2>
            <p className="text-gray-400 text-sm">
              Feel free to drop me a message using the form below.
            </p>
          </div>

          {status && (
            <div
              className={`mb-6 p-4 rounded-md text-sm text-center ${
                status.type === "success"
                  ? "bg-emerald-900/60 text-emerald-300 border border-emerald-500/30"
                  : "bg-red-900/60 text-red-300 border border-red-500/30"
              }`}
            >
              {status.text}
            </div>
          )}

          <form ref={form} onSubmit={sendEmail} className="space-y-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="flex items-center text-sm font-medium text-gray-300 mb-1"
              >
                <User className="w-4 h-4 mr-2" />
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full rounded-md border border-neutral-700 bg-neutral-900 text-white p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Your name"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="flex items-center text-sm font-medium text-gray-300 mb-1"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full rounded-md border border-neutral-700 bg-neutral-900 text-white p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="you@example.com"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="flex items-center text-sm font-medium text-gray-300 mb-1"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                required
                className="w-full rounded-md border border-neutral-700 bg-neutral-900 text-white p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Your message..."
              ></textarea>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center gap-2 ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-amber-500 hover:bg-amber-600"
              } text-black font-semibold py-3 rounded-md transition`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                    ></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </MagicCard>

        {/* Image Section */}
        <div className="w-full max-w-md flex items-center justify-center">
          <div className="rounded-xl overflow-hidden shadow-lg shadow-stone-600">
            <img
              src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*z76XqGEphiXy522fNjLlTQ.gif"
              alt="Animated Illustration"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
