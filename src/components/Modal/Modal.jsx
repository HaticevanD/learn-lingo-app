import { useEffect } from "react";
import styles from "./Modal.module.css";

function Modal({
  isOpen,
  onClose,
  children,
  className = "",
  contentClassName = "",
}) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`${styles.backdrop} ${className}`.trim()}
      onMouseDown={handleBackdropClick}
      role="presentation"
    >
      <div
        className={`${styles.modal} ${contentClassName}`.trim()}
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>

        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
