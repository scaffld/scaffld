import { useId, useState } from "react";
import { contact, waLink } from "@/constant/site";

const EMAILJS = {
  service: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  template: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  key: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};
const emailReady = Boolean(EMAILJS.service && EMAILJS.template && EMAILJS.key);

const empty = { name: "", company: "", reach: "", projectType: "", message: "" };
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isPhone = (v) => v.replace(/\D/g, "").length >= 8 && /^[+\d\s().-]+$/.test(v);

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = "Please tell us your name.";
  if (!v.reach.trim()) e.reach = "We need an email or WhatsApp number to reply.";
  else if (!isEmail(v.reach.trim()) && !isPhone(v.reach.trim())) e.reach = "Enter a valid email or phone number.";
  if (!v.projectType) e.projectType = "Choose the closest project type.";
  if (v.message.trim().length < 10) e.message = "A sentence or two about the project helps us reply properly.";
  return e;
}

const compose = (v) =>
  [`Project type: ${v.projectType}`, `Business / organisation: ${v.company || "—"}`, `Reply via: ${v.reach}`, "", v.message].join("\n");

async function sendEmail(v) {
  const reply = isEmail(v.reach.trim()) ? v.reach.trim() : "";
  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: EMAILJS.service,
      template_id: EMAILJS.template,
      user_id: EMAILJS.key,
      // Field names match the existing EmailJS template: name, company, email, message
      template_params: { name: v.name, company: v.company, email: reply, reply_to: reply, message: compose(v) },
    }),
  });
  if (!res.ok) throw new Error(`EmailJS ${res.status}: ${await res.text()}`);
}

const field =
  "w-full rounded-none border-0 border-b border-current/40 bg-transparent py-2 text-medium text-inherit placeholder:text-current/45 focus:border-current focus:outline-none aria-[invalid=true]:border-primary";

function Field({ id, n, label, error, optional, children }) {
  return (
    <div className="grid gap-1">
      <label htmlFor={id} className="flex gap-3 text-main">
        <span className="opacity-60">({n})</span>
        {label}
        {optional && <span className="opacity-50">— optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="text-main text-primary">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Project inquiry. Sends through the studio's existing EmailJS template when it
 * is configured; otherwise hands the inquiry to WhatsApp — never fakes success.
 */
export function InquiryForm() {
  const uid = useId();
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | handoff | error
  const [sentTo, setSentTo] = useState("");

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };
  const fid = (k) => `${uid}-${k}`;
  const aria = (k) => ({ "aria-invalid": errors[k] ? "true" : undefined, "aria-describedby": errors[k] ? `${fid(k)}-err` : undefined });

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) return document.getElementById(fid(first))?.focus();

    if (!emailReady) {
      window.open(waLink(`Hi SCAFFLD, I'm ${values.name}.\n\n${compose(values)}`), "_blank", "noopener");
      setStatus("handoff");
      return;
    }
    setStatus("sending");
    try {
      await sendEmail(values);
      setSentTo(values.reach);
      setValues(empty);
      setStatus("sent");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  if (status === "sent" || status === "handoff") {
    return (
      <div role="status" className="grid gap-6">
        <p className="font-display text-h2">{status === "sent" ? "Inquiry received." : "Almost there."}</p>
        <p className="max-w-md text-medium">
          {status === "sent"
            ? `Thank you — your inquiry reached the studio. We'll reply through ${sentTo}.`
            : "Your inquiry is ready in WhatsApp. Press send there to deliver it — nothing reaches us until you do."}
        </p>
        <button type="button" className="link-u w-fit text-main" onClick={() => setStatus("idle")}>
          Write another inquiry
        </button>
      </div>
    );
  }

  const sending = status === "sending";
  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-7" aria-busy={sending}>
      <div className="grid gap-7 sm:grid-cols-2">
        <Field id={fid("name")} n={1} label="Name" error={errors.name}>
          <input id={fid("name")} className={field} value={values.name} onChange={set("name")} autoComplete="name" disabled={sending} {...aria("name")} />
        </Field>
        <Field id={fid("company")} n={2} label="Business" optional>
          <input id={fid("company")} className={field} value={values.company} onChange={set("company")} autoComplete="organization" disabled={sending} />
        </Field>
      </div>
      <div className="grid gap-7 sm:grid-cols-2">
        <Field id={fid("reach")} n={3} label="Email or WhatsApp" error={errors.reach}>
          <input id={fid("reach")} className={field} value={values.reach} onChange={set("reach")} placeholder="you@business.com / +62…" disabled={sending} {...aria("reach")} />
        </Field>
        <Field id={fid("projectType")} n={4} label="Project type" error={errors.projectType}>
          <select id={fid("projectType")} className={`${field} [&>option]:text-dark`} value={values.projectType} onChange={set("projectType")} disabled={sending} {...aria("projectType")}>
            <option value="" disabled>
              Select…
            </option>
            {contact.projectTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>
      </div>
      <Field id={fid("message")} n={5} label="Project description" error={errors.message}>
        <textarea
          id={fid("message")}
          rows={4}
          className={`${field} resize-none`}
          value={values.message}
          onChange={set("message")}
          placeholder="What does your business do, and what should the website help with?"
          disabled={sending}
          {...aria("message")}
        />
      </Field>

      {status === "error" && (
        <p role="alert" className="text-main">
          Something went wrong and your inquiry was not delivered.{" "}
          <a className="underline" href={waLink(`Hi SCAFFLD, I'm ${values.name}.\n\n${compose(values)}`)} target="_blank" rel="noreferrer">
            Send it on WhatsApp instead
          </a>
          .
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <button type="submit" disabled={sending} className="group inline-flex items-center gap-3 bg-cream px-6 py-4 text-medium text-ink transition-colors hover:bg-primary hover:text-ink disabled:opacity-60">
          {sending ? "Sending…" : emailReady ? "Send inquiry" : "Send via WhatsApp"}
          <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">
            →
          </span>
        </button>
        <p className="text-main opacity-70">{emailReady ? "Goes straight to the studio inbox." : "Opens WhatsApp with your inquiry filled in."}</p>
      </div>
    </form>
  );
}
