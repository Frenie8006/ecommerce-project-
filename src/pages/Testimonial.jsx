import { useEffect, useState } from "react";
import styles from "./Testimonial.module.scss";

import NavBar from "../components/NavBar";
import { StarRating, FinalRating } from "../components/StarRating";

function Testimonial() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(function () {
    fetch("../../data/testimonials.json")
      .then((res) => res.json())
      .then((data) => setTestimonials(data));
  }, []);

  return (
    <main className="main-container">
      <NavBar />

      <section>
        <div className={styles.testimonials}>
          {testimonials.map((testimonial) => {
            const { id, name, role, image, message, rating } = testimonial;

            return (
              <figure className={styles.testimonials__testimonial} key={id}>
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
                          dot.id === testimonials[0]?.id ? styles.active : ""
                        }`}
                      ></span>
                    );
                  })}
                </div>
              </figure>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default Testimonial;
