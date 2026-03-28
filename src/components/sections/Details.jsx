import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaFilm,
  FaWallet,
  FaBrain,
  FaBullhorn,
  FaRocket,
  FaBolt,
  FaGlobe,
} from "react-icons/fa";

const Details = () => {
  const navigate = useNavigate();
  const [hasRegistered, setHasRegistered] = useState(
    () => localStorage.getItem("HackathonRegistered") === "true"
  );
  const [showPopup, setShowPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [openFAQ, setOpenFAQ] = useState(null);

  useEffect(() => {
    localStorage.setItem("HackathonRegistered", String(hasRegistered));
    setShowPopup(!hasRegistered);
  }, [hasRegistered]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft() {
    const difference = +new Date("2025-04-09T12:00:00+00:00") - +new Date();
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  const handleRegisterClick = () => {
    window.open(
      "https://forms.gle/Rd87q3cF2zyh7nMt5",
      "_blank"
    );
    setHasRegistered(true);
  };

  const handleClosePopup = () => {
    setHasRegistered(true);
  };

  const toggleFAQ = (faq) => {
    setOpenFAQ(openFAQ === faq ? null : faq);
  };

  return (
    <div className="min-h-screen mb-8 text-white pt-24 lg:pt-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section>
          <div className="text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent mb-4">
              Promo Ads — Event Highlights
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Everything that makes Promo Ads the #1 choice for events, brands, and celebrations across India.
            </p>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 motion-up-blur">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent mb-4">
                What We Bring to the Table
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Key highlights of our services and what sets us apart
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Cinematic Quality",
                  description: "Professional-grade photo & video production that makes every moment look like a movie scene.",
                  icon: FaFilm,
                },
                {
                  title: "Friendly Budget",
                  description: "Flexible pricing plans for every scale — from intimate gatherings to large-scale brand campaigns.",
                  icon: FaWallet,
                },
                {
                  title: "Intelligent Event Modes",
                  description: "Smart, adaptive formats designed for weddings, launches, corporate events, and more.",
                  icon: FaBrain,
                },
                {
                  title: "Grab Attention Instantly",
                  description: "Eye-catching setups, live coverage, and creative direction that keeps your audience engaged.",
                  icon: FaBullhorn,
                },
                {
                  title: "Brand Promotion",
                  description: "Strategic placements, banners, reels, and campaigns that amplify your brand across platforms.",
                  icon: FaRocket,
                },
                {
                  title: "Fast Response & Execution",
                  description: "Quick turnaround on inquiries and on-ground execution — even on tight timelines.",
                  icon: FaBolt,
                },
                {
                  title: "Pan-India Operations",
                  description: "We operate across metros, tier-2, and tier-3 cities — wherever your event is, we show up.",
                  icon: FaGlobe,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm motion-translate-y-in-[20%] h-48 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
                >
                  <div>
                    <div className="text-3xl mb-2 text-green-400">
                      <item.icon />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <button
                className="bg-green-600 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-lg motion-translate-y-in-[20%]"
                onClick={() => navigate('/events')}
              >
                Get a Quote
              </button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 motion-up-blur">
              <h2 className="text-3xl 
font-bold 
bg-gradient-to-r 
from-green-400 
to-green-600 
bg-clip-text 
text-transparent 
mb-4">
                Why Promo Ads?
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Here's why brands and individuals trust us to make their events unforgettable.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Cinematic Image ",
                  description:
                    "We deliver stunning, high-definition cinematic visuals that make your event look like a blockbuster production.",
                  icon: FaFilm,
                },
                {
                  title: "Friendly Budget",
                  description:
                    "Premium event experiences don't have to break the bank. We offer flexible, affordable packages for every budget.",
                  icon: FaWallet,
                },
                {
                  title: "Intelligent Event Modes",
                  description:
                    "Smart, adaptive event formats tailored to your audience — whether it's a launch, celebration, or campaign.",
                  icon: FaBrain,
                },
                {
                  title: "Grab People's Attention",
                  description:
                    "Our creative setups and engaging formats ensure your event stands out and keeps audiences hooked.",
                  icon: FaBullhorn,
                },
                {
                  title: "Promote Your Brand",
                  description:
                    "Amplify your brand identity with strategic event placements, banners, and promotional campaigns.",
                  icon: FaRocket,
                },
                {
                  title: "Fast Response",
                  description:
                    "We respond quickly to inquiries and execute events on tight timelines without compromising quality.",
                  icon: FaBolt,
                },
                {
                  title: "Pan-India Operations",
                  description:
                    "From metros to tier-2 cities, we operate across India to bring your event vision to life anywhere.",
                  icon: FaGlobe,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm motion-translate-y-in-[20%] h-48 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
                >
                  <div>
                    <div className="text-3xl mb-2">
                      <item.icon />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 motion-up-blur">
              <h2 className="text-3xl 
font-bold 
bg-gradient-to-r 
from-green-400 
to-green-600 
bg-clip-text 
text-transparent 
mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Got questions about our promo ad and event services? We've got answers.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8">
              <div className="faq-item">
                <button className="faq-question flex justify-between items-center w-full text-left" onClick={() => toggleFAQ("who")}>
                  <h3 className="text-xl font-semibold mb-2 text-white">Who can use Promo Ads services?</h3>
                  <span className="faq-icon">{openFAQ === "who" ? "▴" : "▾"}</span>
                </button>
                {openFAQ === "who" && (
                  <div className="faq-answer text-white mt-2">
                    Anyone! Whether you're an individual planning a wedding or birthday, a business launching a product, a political campaign, or a brand looking to grow — Promo Ads is built for you. We serve clients across all industries and scales.
                  </div>
                )}
              </div>

              <div className="faq-item">
                <button className="faq-question flex justify-between items-center w-full text-left" onClick={() => toggleFAQ("budget")}>
                  <h3 className="text-xl font-semibold mb-2 text-white">Are your packages affordable for small budgets?</h3>
                  <span className="faq-icon">{openFAQ === "budget" ? "▴" : "▾"}</span>
                </button>
                {openFAQ === "budget" && (
                  <div className="faq-answer text-white mt-2">
                    Absolutely. We offer flexible, budget-friendly packages tailored to your needs. From small personal events to large corporate campaigns, we ensure you get maximum value without overspending.
                  </div>
                )}
              </div>

              <div className="faq-item">
                <button className="faq-question flex justify-between items-center w-full text-left" onClick={() => toggleFAQ("quality")}>
                  <h3 className="text-xl font-semibold mb-2 text-white">What kind of video and image quality do you provide?</h3>
                  <span className="faq-icon">{openFAQ === "quality" ? "▴" : "▾"}</span>
                </button>
                {openFAQ === "quality" && (
                  <div className="faq-answer text-white mt-2">
                    We deliver cinematic-grade, high-definition visuals using professional-grade equipment and editing. Every photo and video is crafted to look stunning across all platforms — social media, TV, hoardings, and more.
                  </div>
                )}
              </div>

              <div className="faq-item">
                <button className="faq-question flex justify-between items-center w-full text-left" onClick={() => toggleFAQ("response")}>
                  <h3 className="text-xl font-semibold mb-2 text-white">How fast do you respond to inquiries?</h3>
                  <span className="faq-icon">{openFAQ === "response" ? "▴" : "▾"}</span>
                </button>
                {openFAQ === "response" && (
                  <div className="faq-answer text-white mt-2">
                    We pride ourselves on fast response times. Most inquiries are addressed within a few hours. For urgent events, we have dedicated support to ensure nothing is delayed.
                  </div>
                )}
              </div>

              <div className="faq-item">
                <button className="faq-question flex justify-between items-center w-full text-left" onClick={() => toggleFAQ("location")}>
                  <h3 className="text-xl font-semibold mb-2 text-white">Do you operate outside major cities?</h3>
                  <span className="faq-icon">{openFAQ === "location" ? "▴" : "▾"}</span>
                </button>
                {openFAQ === "location" && (
                  <div className="faq-answer text-white mt-2">
                    Yes! We operate Pan-India — from metros like Mumbai, Delhi, and Bangalore to tier-2 and tier-3 cities. Wherever your event is, we'll be there.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Details;
