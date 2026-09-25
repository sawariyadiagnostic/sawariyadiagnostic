import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const DIALOG_HISTORY_KEY = "sawariyaDialogId";
let nextDialogId = 0;
let bodyLockCount = 0;
let bodyLockStyles: { overflow: string; touchAction: string; paddingRight: string } | null = null;

type DialogProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>;

function lockBodyScroll() {
  if (bodyLockCount++ > 0) return;
  bodyLockStyles = {
    overflow: document.body.style.overflow,
    touchAction: document.body.style.touchAction,
    paddingRight: document.body.style.paddingRight,
  };
  document.body.style.overflow = "hidden";
  document.body.style.touchAction = "none";
}

function unlockBodyScroll() {
  if (bodyLockCount === 0 || --bodyLockCount > 0) return;
  if (!bodyLockStyles) return;
  document.body.style.overflow = bodyLockStyles.overflow;
  document.body.style.touchAction = bodyLockStyles.touchAction;
  document.body.style.paddingRight = bodyLockStyles.paddingRight;
  bodyLockStyles = null;
}

function Dialog({ open: controlledOpen, defaultOpen = false, onOpenChange, ...props }: DialogProps) {
  const id = React.useRef(`dialog-${++nextDialogId}`).current;
  const isControlled = controlledOpen !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const previousOpen = React.useRef(false);
  const suppressHistoryClose = React.useRef(false);

  const setOpen = React.useCallback((nextOpen: boolean) => {
    if (!isControlled) setUncontrolledOpen(nextOpen);
    onOpenChange?.(nextOpen);
  }, [isControlled, onOpenChange]);

  React.useEffect(() => {
    if (open) {
      lockBodyScroll();
      return () => unlockBodyScroll();
    }
  }, [open]);

  React.useEffect(() => {
    const wasOpen = previousOpen.current;
    previousOpen.current = Boolean(open);

    if (open && !wasOpen && window.history.state?.[DIALOG_HISTORY_KEY] !== id) {
      window.history.pushState({ ...window.history.state, [DIALOG_HISTORY_KEY]: id }, "", window.location.href);
      return;
    }

    if (!open && wasOpen && !suppressHistoryClose.current && window.history.state?.[DIALOG_HISTORY_KEY] === id) {
      window.history.back();
    }
    suppressHistoryClose.current = false;
  }, [id, open]);

  React.useEffect(() => {
    const handlePopState = () => {
      if (!open || window.history.state?.[DIALOG_HISTORY_KEY] === id) return;
      suppressHistoryClose.current = true;
      setOpen(false);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [id, open, setOpen]);

  return <DialogPrimitive.Root {...props} open={open} onOpenChange={setOpen} />;
}

const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-[110] bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, onOpenAutoFocus, onCloseAutoFocus, ...props }, ref) => {
  const triggerRef = React.useRef<HTMLElement | null>(null);

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "ui-dialog-panel fixed left-[50%] top-[50%] z-[110] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-1/2 sm:rounded-lg",
          className,
        )}
        onOpenAutoFocus={(event) => {
          triggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
          onOpenAutoFocus?.(event);
        }}
        onCloseAutoFocus={(event) => {
          if (triggerRef.current) {
            event.preventDefault();
            triggerRef.current.focus();
          }
          onCloseAutoFocus?.(event);
        }}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="ui-control-button h-11 w-11 absolute right-4 top-4 z-20 flex items-center justify-center rounded-[var(--radius-control)] opacity-70 ring-offset-background transition-opacity data-[state=open]:bg-accent data-[state=open]:text-muted-foreground hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
