import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../contexts/FakeAuthContext";
import { useTestimonials } from "../../contexts/TestimonialsContext";
import styles from "./Testimonial.module.scss";

import NavBar from "../components/NavBar";
import { StarRating, FinalRating } from "../components/StarRating";
import Footer from "../components/Footer";

function Testimonial() {
  const { testimonials, createTestimonial } = useTestimonials();
  const [curSlide, setCurSlide] = useState(0);
  const maxSlide = testimonials.length;
  const messages = [
    "Terrible product, would not recommend.",
    "Average quality, nothing special.",
    "Good product, met my expectations.",
    "Great value for money, very satisfied.",
    "Excellent quality, highly recommend!",
  ];

  const { user, isAuthenticated } = useAuth();
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [role, setRole] = useState("");

  // Fetching the useAuth if it's true and store its values to local useStates
  useEffect(() => {
    if (isAuthenticated) {
      setName(user?.name);
      setRole(user?.role);
      setAvatar(user?.avatar);
    }
  }, [isAuthenticated, user?.name, user?.role, user?.avatar]);

  const goToNextSlide = useCallback(() => {
    setCurSlide((prev) => (prev >= maxSlide - 1 ? 0 : prev + 1));
  }, [maxSlide]);

  const goToPrevSlide = useCallback(() => {
    setCurSlide((prev) => (prev <= 0 ? maxSlide - 1 : prev - 1));
  }, [maxSlide]);

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === "ArrowRight") {
        goToNextSlide();
      } else if (e.key === "ArrowLeft") {
        goToPrevSlide();
      }
      if (e.key === "Escape") setCurSlide(0);
    };

    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [goToNextSlide, goToPrevSlide]);

  function handleSubmit(e) {
    e.preventDefault();
    if (
      rating === 0 ||
      message.trim() === "" ||
      message.length > 300 ||
      !isAuthenticated
    )
      return;

    const testimonial = {
      name,
      role,
      message,
      image: avatar,
      id: testimonials.length + 1,
      rating,
    };

    createTestimonial(testimonial);

    setRating(0);
    setMessage("");
    setCurSlide(testimonials.length);
  }

  return (
    <>
      <main className="main-container">
        <NavBar />

        <section>
          <div className={styles.testimonials}>
            {testimonials.map((testimonial, i) => {
              const { id, name, role, image, message, rating } = testimonial;

              return (
                <figure
                  className={styles.testimonials__testimonial}
                  key={id}
                  style={{ transform: `translateX(${100 * (i - curSlide)}%)` }}
                >
                  <div className={styles.testimonials__user}>
                    <img src={image} alt={name} />

                    <div className={styles.testimonials__user__info}>
                      <h3>{name}</h3>
                      <p>{role}</p>
                      <FinalRating size={25} defaultRating={rating} />
                    </div>
                  </div>

                  <blockquote>
                    <span role="img" aria-label="left quote">
                      “
                    </span>{" "}
                    {message}{" "}
                    <span role="img" aria-label="right quote">
                      ”
                    </span>
                  </blockquote>
                  <div className={styles.testimonials__dots}>
                    {testimonials.map((dot) => {
                      return (
                        <span
                          key={dot.id}
                          className={`${styles.testimonials__dot} ${
                            dot.id - 1 === curSlide ? styles.active : ""
                          }`}
                          onClick={() => setCurSlide(dot.id - 1)}
                        ></span>
                      );
                    })}
                  </div>
                </figure>
              );
            })}

            <button onClick={goToNextSlide}>&rarr;</button>
            <button onClick={goToPrevSlide}>&larr;</button>
          </div>

          <form
            className={styles.testimonials__addTestimonial}
            onSubmit={handleSubmit}
          >
            <StarRating
              messages={messages}
              size={30}
              color="var(--color-brand--2)"
              onSetRating={setRating}
              rating={rating}
            />
            <div className={styles.testimonials__addTestimonial__texts}>
              <div>
                <p>Write Your Review</p>
                <small
                  className={message.length > 300 ? styles.letterExceeds : ""}
                >
                  ({message.length}/300) Letters
                </small>
              </div>
              {!isAuthenticated ? (
                <p>Please log in to share your experience with this product.</p>
              ) : null}
            </div>
            <div className={styles.testimonials__addTestimonial__form}>
              <textarea
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                placeholder="Please share your opinion about the product..."
              ></textarea>
              <button>Add Testimonial</button>
            </div>
          </form>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Testimonial;
