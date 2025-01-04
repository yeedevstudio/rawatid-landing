export const scrollTo = (ref, amount) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: amount,
        behavior: "smooth",
      });
    }
  };
  