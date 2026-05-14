"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const suggestions = [
  {
    label: "Dinner",
    icon: "dinner"
  },
  {
    label: "Workday",
    icon: "workday"
  },
  {
    label: "Weekend",
    icon: "weekend"
  },
  {
    label: "Event",
    icon: "event"
  },
  {
    label: "Color match",
    icon: "color"
  }
];

const recommendationCards = [
  {
    title: "Dinner polish",
    detail: "Satin, soft knits, low shine jewelry",
    prompt: "Help me build a polished dinner outfit",
    image: "/assets/dinner-polish-bracelet.png",
    imageAlt: "Silver bracelet"
  },
  {
    title: "Workday ease",
    detail: "Tailored layers that still feel relaxed",
    prompt: "Recommend a comfortable work outfit",
    image: "/assets/workday-dress-shirt.png",
    imageAlt: "White dress shirt"
  },
  {
    title: "Weekend edit",
    detail: "Clean basics with one strong accent",
    prompt: "Style a casual weekend outfit",
    image: "/assets/weekend-casual-outfit.png",
    imageAlt: "Casual weekend outfit"
  }
];

function SubjectIcon({ type }) {
  if (type === "dinner") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 3v8" />
        <path d="M4.5 3v4.5a2.5 2.5 0 0 0 5 0V3" />
        <path d="M7 11v10" />
        <path d="M16 3v18" />
        <path d="M16 3c2.4 1.8 3.6 4.2 3.6 7.1H16" />
      </svg>
    );
  }

  if (type === "workday") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 7V5.8A2.8 2.8 0 0 1 10.8 3h2.4A2.8 2.8 0 0 1 16 5.8V7" />
        <path d="M5 7h14a2 2 0 0 1 2 2v9.5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" />
        <path d="M9 12h6" />
      </svg>
    );
  }

  if (type === "weekend") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8.5 5.5 4 9v9.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V9l-4.5-3.5" />
        <path d="M8.5 5.5c1.2 1 2.4 1.5 3.5 1.5s2.3-.5 3.5-1.5" />
        <path d="M9 13h6" />
      </svg>
    );
  }

  if (type === "event") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3.5 14.2 9l5.8.4-4.4 3.7 1.4 5.7-5-3-5 3 1.4-5.7L4 9.4 9.8 9 12 3.5Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4a8 8 0 1 0 8 8" />
      <path d="M12 4v8h8" />
      <path d="M12 12 6.4 17.6" />
    </svg>
  );
}

function createMessageId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function AgentStepIcon({ type }) {
  if (type === "texture") {
    return (
      <svg className="agentIcon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 6.5h14" />
        <path d="M5 11.5h14" />
        <path d="M5 16.5h14" />
        <path d="M8 4v15" />
        <path d="M16 4v15" />
      </svg>
    );
  }

  if (type === "shopping") {
    return (
      <svg className="agentIcon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.5 8.5h11l1 11h-13l1-11Z" />
        <path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" />
      </svg>
    );
  }

  if (type === "verify") {
    return (
      <svg className="agentIcon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M10.8 17.2a6.4 6.4 0 1 1 4.5-1.9" />
        <path d="M14.8 14.8 20 20" />
        <path d="m7.8 11.8 2.1 2.1 4.5-5" />
      </svg>
    );
  }

  return (
    <svg className="agentIcon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8.5 5.5 4 9v9.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V9l-4.5-3.5" />
      <path d="M8.5 5.5c1.2 1 2.4 1.5 3.5 1.5s2.3-.5 3.5-1.5" />
      <path d="M9 13h6" />
    </svg>
  );
}

function AgentProgressResponse({ step }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const stepDuration = 2;
  const productMatches = [
    {
      name: "Jacket match",
      image: "/assets/tyler-jacket.png",
      alt: "Matching jacket",
      url: "https://www.etsy.com/listing/1873419847/handmade-brad-pitt-fight-club-tyler"
    },
    {
      name: "Shirt match",
      image: "/assets/tyler-shirt.png",
      alt: "Matching shirt",
      url: "https://www.etsy.com/listing/1464140070/tyler-durden-motocross-shirt"
    },
    {
      name: "Pants match",
      image: "/assets/tyler-pants.jpg",
      alt: "Matching pants",
      url: "https://www.amazon.ae/Ben-Davis-Original-Cotton-Twill/dp/B00MAD9TFM?th=1&psc=1"
    }
  ];
  const progressSteps = [
    {
      activeLabel: "Analyzing clothing",
      completeLabel: "Analyzed clothing",
      icon: "clothing"
    },
    {
      activeLabel: "Analyzing textures",
      completeLabel: "Analyzed textures",
      icon: "texture"
    },
    {
      activeLabel: "Shopping for matches",
      completeLabel: "Shopped for matches",
      icon: "shopping"
    },
    {
      activeLabel: "Verifying identical clothing",
      completeLabel: "Verified identical clothing",
      icon: "verify"
    }
  ];

  if (step >= progressSteps.length) {
    const completedDetails = progressSteps.filter((_, index) => [1, 3].includes(index));

    return (
      <article className="agentResponse messageFadeIn" aria-live="polite">
        <button
          className="agentProgressFinal"
          type="button"
          aria-expanded={isExpanded}
          onClick={() => setIsExpanded((currentValue) => !currentValue)}
        >
          <span>Went shopping for you</span>
          <small>{progressSteps.length * stepDuration}s</small>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m7 10 5 5 5-5" />
          </svg>
        </button>
        {isExpanded ? (
          <div className="agentProgressDetails">
            {completedDetails.map((progressStep) => (
              <div className="agentProgressItem isComplete" key={progressStep.activeLabel}>
                <AgentStepIcon type={progressStep.icon} />
                <span>{progressStep.completeLabel}</span>
                <small>{stepDuration}s</small>
              </div>
            ))}
          </div>
        ) : null}
        <div className="productMatchList" aria-label="Matched clothing items">
          {productMatches.map((productMatch) => (
            <article className="productMatchCard" key={productMatch.name}>
              <img src={productMatch.image} alt={productMatch.alt} />
              <div>
                <h2>{productMatch.name}</h2>
                <a href={productMatch.url} target="_blank" rel="noreferrer">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6.5 8.5h11l1 11h-13l1-11Z" />
                    <path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" />
                  </svg>
                  <span>Go to product</span>
                </a>
              </div>
            </article>
          ))}
        </div>
        <article className="message messageBot agentResultMessage">
          <p>I found the same outfit for you. Let me know if you want more options.</p>
        </article>
      </article>
    );
  }

  const visibleSteps = progressSteps
    .slice(0, Math.min(step + 1, progressSteps.length))
    .filter((_, index) => index === step || (index < step && [1, 3].includes(index)));

  return (
    <article className="agentResponse messageFadeIn" aria-live="polite">
      {visibleSteps.map((progressStep) => {
        const index = progressSteps.indexOf(progressStep);
        const isComplete = index < step;
        const label = isComplete ? progressStep.completeLabel : progressStep.activeLabel;

        return (
          <div
            className={`agentProgressItem${isComplete ? " isComplete" : " isActive"}`}
            key={progressStep.activeLabel}
          >
            <AgentStepIcon type={progressStep.icon} />
            <span key={label}>{label}</span>
            {isComplete ? <small>{stepDuration}s</small> : null}
          </div>
        );
      })}
    </article>
  );
}

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [isStartingChat, setIsStartingChat] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [agentRunId, setAgentRunId] = useState(null);
  const [agentStep, setAgentStep] = useState(0);
  const photoInputRef = useRef(null);
  const isEmptyChat = messages.length === 0;

  useEffect(() => {
    if (!agentRunId) {
      return undefined;
    }

    setAgentStep(0);
    const timeouts = [1, 2, 3, 4].map((nextStep) =>
      window.setTimeout(() => {
        setAgentStep(nextStep);
      }, nextStep * 2000)
    );

    return () => {
      timeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, [agentRunId]);

  function handleSubmit(event) {
    event.preventDefault();
    const text = draft.trim();
    const photo = selectedPhoto;

    if ((!text && !selectedPhoto) || isStartingChat) {
      return;
    }

    setDraft("");
    setSelectedPhoto(null);

    const nextMessage = {
      id: createMessageId(),
      text,
      photo
    };

    if (isEmptyChat) {
      setIsStartingChat(true);
      window.setTimeout(() => {
        setMessages([nextMessage]);
        setAgentStep(0);
        setAgentRunId(createMessageId());
        setIsStartingChat(false);
      }, 280);
      return;
    }

    setMessages((currentMessages) => [...currentMessages, nextMessage]);
    setAgentStep(0);
    setAgentRunId(createMessageId());
  }

  function handlePhotoChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setSelectedPhoto((currentPhoto) => {
      if (currentPhoto?.url) {
        URL.revokeObjectURL(currentPhoto.url);
      }

      return {
        name: file.name,
        url: URL.createObjectURL(file)
      };
    });
  }

  function removeSelectedPhoto() {
    setSelectedPhoto((currentPhoto) => {
      if (currentPhoto?.url) {
        URL.revokeObjectURL(currentPhoto.url);
      }

      return null;
    });

    if (photoInputRef.current) {
      photoInputRef.current.value = "";
    }
  }

  return (
    <main className="chatbotScreen">
      <section className="chatShell" aria-label="Fashion chatbot">
        <header className="chatHeader">
          <Link className="menuLink" href="/" aria-label="Back to home">
            <span />
            <span />
            <span />
          </Link>
          <div>
            <p className="chatEyebrow">Dress Logic AI</p>
            <h1>Style chat</h1>
          </div>
          <div className="statusDot" aria-label="Available" />
        </header>

        <section className="messageList" aria-label="Chat messages">
          {isEmptyChat ? (
            <div
              className={`chatWelcome${isStartingChat ? " isExiting" : ""}`}
              aria-label="Empty chat prompt"
            >
              <div className="heroIcon" aria-hidden="true">
                <svg viewBox="0 0 48 48" role="img">
                  <path d="M24 15.5c0-4 5.5-3.6 5.5-7.9C29.5 4.6 27.1 2 24 2s-5.5 2.4-5.5 5.3" />
                  <path d="M24 15.5v4.8" />
                  <path d="M23.8 20.3 6.7 31.1c-2.4 1.5-1.3 5.2 1.5 5.2h31.6c2.8 0 3.9-3.7 1.5-5.2L24.2 20.3" />
                </svg>
              </div>
              <h2>What should your outfit say today?</h2>
              <p>Choose a starting point or ask for a complete look.</p>

              <section className="subjectRail" aria-label="Style subjects">
                {suggestions.map((suggestion) => (
                  <button
                    className="subjectChip"
                    type="button"
                    key={suggestion.label}
                    onClick={() => setDraft(suggestion.label)}
                  >
                    <SubjectIcon type={suggestion.icon} />
                    <span>{suggestion.label}</span>
                  </button>
                ))}
              </section>
            </div>
          ) : (
            <>
              {messages.map((message, index) => (
                <article
                  className={`message messageUser${index === 0 ? " messageFadeIn" : ""}`}
                  key={message.id}
                >
                  {message.photo ? (
                    <img
                      className="messagePhoto"
                      src={message.photo.url}
                      alt={message.photo.name}
                    />
                  ) : null}
                  {message.text ? <p>{message.text}</p> : null}
                </article>
              ))}
              {agentRunId ? <AgentProgressResponse key={agentRunId} step={agentStep} /> : null}
            </>
          )}
        </section>

        <div className="bottomDock">
          {isEmptyChat ? (
            <section
              className={`recommendationSection${isStartingChat ? " isExiting" : ""}`}
              aria-label="Outfit recommendation prompts"
            >
              <div className="recommendationHeader">
                <h2>Outfit starters</h2>
                <span />
              </div>
              <div className="promptRail">
              {recommendationCards.map((suggestion) => (
                <button
                  className="promptCard"
                  type="button"
                  key={suggestion.title}
                  onClick={() => setDraft(suggestion.prompt)}
                >
                  {suggestion.image ? (
                    <img
                      className="promptCardImage"
                      src={suggestion.image}
                      alt={suggestion.imageAlt}
                    />
                  ) : null}
                  <span>{suggestion.title}</span>
                  <small>{suggestion.detail}</small>
                </button>
              ))}
              </div>
            </section>
          ) : null}

          <form className="chatComposer" aria-label="Message composer" onSubmit={handleSubmit}>
            <input
              ref={photoInputRef}
              className="photoInput"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
            />
            <button
              className="photoButton"
              type="button"
              aria-label="Select a photo"
              onClick={() => photoInputRef.current?.click()}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5.5 6.5h2.8l1.4-2h4.6l1.4 2h2.8A2.5 2.5 0 0 1 21 9v8.5a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5V9a2.5 2.5 0 0 1 2.5-2.5Z" />
                <path d="M12 16.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
              </svg>
            </button>
            <label className="srOnly" htmlFor="chatMessage">
              Message
            </label>
            <div className={`composerField${selectedPhoto ? " hasPhoto" : ""}`}>
              {selectedPhoto ? (
                <div className="photoPreview">
                  <img src={selectedPhoto.url} alt="" />
                  <button
                    type="button"
                    aria-label="Remove selected photo"
                    onClick={removeSelectedPhoto}
                  >
                    <span />
                    <span />
                  </button>
                </div>
              ) : null}
              <input
                id="chatMessage"
                name="chatMessage"
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Ask about an outfit"
                type="text"
                value={draft}
              />
            </div>
            <button type="submit" disabled={isStartingChat}>
              Send
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
