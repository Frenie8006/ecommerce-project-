import { createContext, useContext, useEffect, useReducer } from "react";

const TestimonialsContext = createContext(undefined);

const BASE_URL = "/data/testimonials.json";

const initialState = {
  testimonials: [],
  isLoading: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "testimonials/loaded":
      return { ...state, isLoading: false, testimonials: action.payload };

    case "testimonial/created":
      return {
        ...state,
        isLoading: false,
        testimonials: [...state.testimonials, action.payload],
      };
  }
}

function TestimonialsProvider({ children }) {
  const [{ testimonials, isLoading }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    dispatch({ type: "loading" });
    const stored = JSON.parse(localStorage.getItem("testimonials"));

    if (stored?.length) {
      dispatch({ type: "testimonials/loaded", payload: stored });
    } else {
      fetch(BASE_URL)
        .then((res) => res.json())
        .then((data) => {
          dispatch({ type: "testimonials/loaded", payload: data });
          localStorage.setItem("testimonials", JSON.stringify(data));
        });
    }
  }, []);

  async function createTestimonial(testimonial) {
    dispatch({ type: "loading" });

    const stored = JSON.parse(localStorage.getItem("testimonials")) || [];
    const updated = [...stored, testimonial];
    localStorage.setItem("testimonials", JSON.stringify(updated));
    dispatch({ type: "testimonial/created", payload: testimonial });
  }

  return (
    <TestimonialsContext.Provider
      value={{ testimonials, isLoading, createTestimonial }}
    >
      {children}
    </TestimonialsContext.Provider>
  );
}

function useTestimonials() {
  const context = useContext(TestimonialsContext);

  if (context === undefined)
    throw new Error(
      "useTestimonials must be used within a TestimonialsProvider"
    );

  return context;
}

export { TestimonialsProvider, useTestimonials };
