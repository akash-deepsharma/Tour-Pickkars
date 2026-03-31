"use client";
import "./Footer.css";
import { api } from "@/services/config";
import { getPagewithSection } from "@/services/pageSection";
import {
  faFacebookF,
  faInstagram,
  faLinkedin,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faAngleRight, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const footer = await getPagewithSection(6, "footer");

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await api.post("/booking/send-newsletter", { email });

      if (res.data.status) {
        setMessage(res.data.message || "Subscribed successfully!");
        setEmail(""); // clear input
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong, try again!"
      );
    } finally {
      setLoading(false);
    }
  };

  const [richText, setRichText] = useState("");

  useEffect(() => {
    setRichText(footer.section[8].data.rich_text);
  }, [footer]);

  return (
    <footer className="custom-footer">
      <div className="container">
        
        {/* Newsletter Section */}
        <div className="footer-newsletter">
          <div className="newsletter-content">
            <h2>Get Updated Weekly</h2>
            <p>Subscribe to our newsletter and never miss our latest travel packages and tips.</p>
          </div>
          <div className="newsletter-form-wrapper">
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="newsletter-btn"
                disabled={loading}
              >
                {loading ? "Subscribing..." : "Subscribe"}
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </form>
            {message && (
              <div style={{color: '#00ba9d', marginTop: '12px', fontSize: '0.9rem', paddingLeft: '20px'}}>
                {message}
              </div>
            )}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="footer-main">
          
          {/* About Column */}
          <div className="footer-about">
            <Link href="/" className="about-logo">
              <Image
                src={process.env.NEXT_PUBLIC_MEDIA_PATH + footer.section[0].data.image}
                alt="Tour Pickkars"
                width={160}
                height={55}
                style={{objectFit: 'contain'}}
              />
            </Link>
            <p>{footer.section[1].data.content}</p>
            <div className="footer-socials">
              <Link href={footer.section[9].data.url} target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faFacebookF} />
              </Link>
              <Link href={footer.section[10].data.url} target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faTwitter} />
              </Link>
              <Link href={footer.section[11].data.url} target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faLinkedin} />
              </Link>
              <Link href={footer.section[12].data.url} target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faWhatsapp} />
              </Link>
              <Link href={footer.section[13].data.url} target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faInstagram} />
              </Link>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer-links">
            <h3 className="footer-col-title">Quick Links</h3>
            <ul>
              <li>
                <Link href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  Travel Blogs
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="footer-contact">
            <h3 className="footer-col-title">Contact Information</h3>
            
            <div className="contact-item">
              <div className="contact-item-icon">
                <Image src="/img/icon/phone.svg" alt="phone" width={20} height={20} />
              </div>
              <div className="contact-item-details">
                <p>
                  <Link href={footer.section[2].data.button_link}>
                    {footer.section[2].data.button_label}
                  </Link>
                </p>
                <p>
                  <Link href={footer.section[3].data.button_link}>
                    {footer.section[3].data.button_label}
                  </Link>
                </p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-item-icon">
                <Image src="/img/icon/envelope.svg" alt="email" width={20} height={20} />
              </div>
              <div className="contact-item-details">
                <p>
                  <Link href={footer.section[4].data.button_link}>
                    {footer.section[4].data.button_label}
                  </Link>
                </p>
                <p>
                  <Link href={footer.section[5].data.button_link}>
                    {footer.section[5].data.button_label}
                  </Link>
                </p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-item-icon">
                <Image src="/img/icon/location-dot.svg" alt="location" width={20} height={20} />
              </div>
              <div className="contact-item-details">
                <p>
                  <Link href={footer.section[6].data.button_link}>
                    {footer.section[6].data.button_label}
                  </Link>
                </p>
              </div>
            </div>

          </div>

          {/* Gallery Column */}
          <div className="footer-gallery-col">
            <h3 className="footer-col-title">Instagram Feed</h3>
            <div className="footer-gallery">
              {footer.section[7].data.gallery.slice(0, 6).map((gallery, index) => (
                <Link href={footer.section[13].data.url} className="gallery-thumb" key={index} target="_blank" rel="noreferrer">
                  <Image
                    src={process.env.NEXT_PUBLIC_MEDIA_PATH + gallery}
                    alt="Gallery"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Bottom / Copyright */}
        <div className="footer-bottom">
            <div
              className="copyright-text"
              dangerouslySetInnerHTML={{ __html: richText }}
            />
            <div className="footer-payments">
                <span>Secure Payments</span>
                <Image
                  src="/img/shape/cards.png"
                  alt="cards"
                  width={150}
                  height={30}
                  style={{objectFit: 'contain'}}
                />
            </div>
        </div>
      </div>
    </footer>
  );
}
