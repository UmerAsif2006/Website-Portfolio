import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Linkedin, Loader2, Mail, MessageCircle, Send, XCircle } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { contactSection, site } from "../data/site";
import { submitContact } from "../services/api";
import styles from "./Contact.module.css";

const EMPTY = { name: "", email: "", subject: "", message: "", company: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(values) {
  const errors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const subject = values.subject.trim();
  const message = values.message.trim();
  if (name.length < 2) errors.name = "Please enter your name (at least 2 characters).";
  else if (name.length > 100) errors.name = "Name must be under 100 characters.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  else if (email.length > 255) errors.email = "Email must be under 255 characters.";
  if (subject.length < 3) errors.subject = "Please add a short subject (at least 3 characters).";
  else if (subject.length > 150) errors.subject = "Subject must be under 150 characters.";
  if (message.length < 10) errors.message = "Please tell me a bit more (at least 10 characters).";
  else if (message.length > 2000) errors.message = "Message must be under 2000 characters.";
  return errors;
}

function openWhatsApp() {
  const url = "https://wa.me/" + site.whatsappParts.join("");
  window.open(url, "_blank", "noopener,noreferrer");
}

function Field({ id, label, error, children }) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            className={styles.fieldError}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const [values, setValues] = useState(EMPTY);
  const [touched, setTouched] = useState({});
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState(null);
  const reduce = useReducedMotion();
  const errors = validateContact(values);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(null), 6000);
    return () => clearTimeout(timer);
  }, [toast]);

  const update = (event) => setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  const blur = (event) => setTouched((prev) => ({ ...prev, [event.target.name]: true }));
  const showError = (name) => (touched[name] ? errors[name] : undefined);

  const onSubmit = async (event) => {
    event.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true });
    if (Object.keys(errors).length > 0) {
      const first = ["name", "email", "subject", "message"].find((key) => errors[key]);
      if (first) document.getElementById(`contact-${first}`)?.focus();
      return;
    }
    // Honeypot: bots fill hidden fields. Pretend success without sending.
    if (values.company) {
      setValues(EMPTY);
      setTouched({});
      setToast({ type: "success", text: "Thanks! Your message has been sent." });
      return;
    }
    setSending(true);
    try {
      await submitContact({
        name: values.name.trim(),
        email: values.email.trim(),
        subject: values.subject.trim(),
        message: values.message.trim(),
      });
      setValues(EMPTY);
      setTouched({});
      setToast({ type: "success", text: "Thanks! Your message has been sent. I'll reply soon." });
    } catch (err) {
      setToast({ type: "error", text: err && err.message ? err.message : "Something went wrong. Please try again." });
    } finally {
      setSending(false);
    }
  };

  const inputProps = (name) => ({
    id: `contact-${name}`,
    name,
    value: values[name],
    onChange: update,
    onBlur: blur,
    disabled: sending,
    "aria-invalid": Boolean(showError(name)),
    "aria-describedby": showError(name) ? `contact-${name}-error` : undefined,
    className: `${styles.input} ${showError(name) ? styles.invalid : ""}`,
  });

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container">
        <SectionHeading id="contact-title" eyebrow={contactSection.eyebrow} title={contactSection.heading} subtitle={contactSection.subtitle} />

        <div className={styles.grid}>
          <motion.form
            className={`glass ${styles.form}`}
            onSubmit={onSubmit}
            noValidate
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.row}>
              <Field id="contact-name" label="Name" error={showError("name")}>
                <input type="text" autoComplete="name" maxLength={100} placeholder="Your name" {...inputProps("name")} />
              </Field>
              <Field id="contact-email" label="Email" error={showError("email")}>
                <input type="email" autoComplete="email" maxLength={255} placeholder="you@company.com" {...inputProps("email")} />
              </Field>
            </div>
            <Field id="contact-subject" label="Subject" error={showError("subject")}>
              <input type="text" maxLength={150} placeholder="What do you want to automate?" {...inputProps("subject")} />
            </Field>
            <Field id="contact-message" label="Message" error={showError("message")}>
              <textarea rows={6} maxLength={2000} placeholder="Describe the task, the tools you use and the outcome you want." {...inputProps("message")} />
            </Field>

            <div className={styles.honeypot} aria-hidden="true">
              <label htmlFor="contact-company">Company</label>
              <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" value={values.company} onChange={update} />
            </div>

            <button type="submit" className={`btn btn-primary ${styles.submit}`} disabled={sending}>
              {sending ? (
                <>
                  <Loader2 size={18} className={styles.spin} aria-hidden="true" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send size={16} aria-hidden="true" />
                </>
              )}
            </button>
          </motion.form>

          <motion.aside
            className={styles.aside}
            aria-label="Other ways to reach me"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: reduce ? 0 : 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className={styles.asideTitle}>Prefer a direct line?</p>
            <a href={`mailto:${site.email}`} className={`glass ${styles.channel}`}>
              <span className={styles.channelIcon} aria-hidden="true">
                <Mail size={20} />
              </span>
              <span>
                <span className={styles.channelLabel}>Email</span>
                <span className={styles.channelValue}>{site.email}</span>
              </span>
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={`glass ${styles.channel}`}>
              <span className={styles.channelIcon} aria-hidden="true">
                <Linkedin size={20} />
              </span>
              <span>
                <span className={styles.channelLabel}>LinkedIn</span>
                <span className={styles.channelValue}>Connect with me</span>
              </span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <button type="button" className={`btn btn-whatsapp ${styles.whatsapp}`} onClick={openWhatsApp}>
              <MessageCircle size={18} aria-hidden="true" />
              Chat on WhatsApp
              <span className="sr-only">(opens in a new tab)</span>
            </button>
          </motion.aside>
        </div>
      </div>

      <div className={styles.toastRegion} role="status" aria-live="polite">
        <AnimatePresence>
          {toast && (
            <motion.div
              key={toast.text}
              className={`${styles.toast} ${toast.type === "success" ? styles.toastSuccess : styles.toastError}`}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            >
              {toast.type === "success" ? <CheckCircle2 size={18} aria-hidden="true" /> : <XCircle size={18} aria-hidden="true" />}
              <span>{toast.text}</span>
              <button type="button" className={styles.toastClose} onClick={() => setToast(null)} aria-label="Dismiss notification">
                ×
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
