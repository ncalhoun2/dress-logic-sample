import Link from "next/link";

const actions = [
  { label: "outfit scanner" },
  { label: "chatbot", href: "/chatbot" },
  { label: "qr code scanner" }
];

export default function Home() {
  return (
    <main className="home">
      <div className="actions" aria-label="Main actions">
        {actions.map((action) =>
          action.href ? (
            <Link className="actionButton" href={action.href} key={action.label}>
              {action.label}
            </Link>
          ) : (
            <button className="actionButton" type="button" key={action.label}>
              {action.label}
            </button>
          )
        )}
      </div>
    </main>
  );
}
