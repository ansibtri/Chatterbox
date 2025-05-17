import { useToasts } from "../../lib/Provider/ToastsContext";
import { AnimatePresence, motion } from "motion/react";
const Toasts = () => {
  const { toasts, setToasts } = useToasts();

  const toastsTypeColor = (toastsType: string) => {
    switch (toastsType) {
      case "error":
        return {
          color: "text-red-700",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="red"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
          ),
        };

      case "warning":
        return {
          color: "text-amber-400",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="yellow"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>
          ),
        };

      case "success":
        return {
          color: "text-green-600",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="green"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
              />
            </svg>
          ),
        };

      case "info":
        return {
          color: "text-blue-400",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="blue"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>
          ),
        };
      default:
        return { color: "text-black" };
    }
  };

  if (toasts?.open) {
    const { type, message } = toasts.data;
    const toastsStyle = toastsTypeColor(type);
    return (
      <AnimatePresence>
        {toasts?.open && (
          <motion.div
            key="toasts"
            initial={{ translateX: -500 }}
            animate={{ translateX: 0 }}
            transition={{ duration: 0.8, ease: [0, 0.71, 0.2, 1.01] }}
            exit={{
              opacity: 0,
              transition: { duration: 0.5, ease: "easeInOut" },
              translateX: -500,
            }}
          >
            <div className="absolute overflow-hidden z-20  px-4 py-3 left-10 bottom-10 shadow-gray-400 shadow-2xl w-[400px] bg-white rounded-xl">
              <div className="flex justify-between">
                <div className="flex gap-2">
                  {toastsStyle.icon}
                  <p className={toastsStyle.color}>
                    <strong>{type.toUpperCase()}</strong>
                  </p>
                  <p className={toastsStyle.color}>{message}</p>
                </div>
                <button
                  className="hover:scale-105 self-end"
                  onClick={() => {
                    setToasts({ open: false, data: { type: "", message: "" } });
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
};

export { Toasts };
