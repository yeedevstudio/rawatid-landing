import { cn } from "@/lib/utils";

export const LoadingSpinner = ({
  className,
  fullscreen = true,
  backdrop = true,
}) => {
  const Wrapper = fullscreen ? "div" : "span";

  return (
    <Wrapper
      className={cn(
        fullscreen
          ? "fixed inset-0 z-[9999] flex items-center justify-center"
          : "inline-flex items-center justify-center",
        fullscreen && backdrop && "bg-white/70 backdrop-blur-[1px]"
      )}
      aria-busy="true"
      aria-live="polite"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="54"
        height="54"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("animate-spin text-green", className)}
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    </Wrapper>
  );
};
  
