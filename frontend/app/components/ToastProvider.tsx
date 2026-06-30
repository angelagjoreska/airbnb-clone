"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

type ToastType = "info" | "success" | "error";

interface Toast {
    id: number;
    type: ToastType;
    message: string;
}

interface ToastContextValue {
    info: (message: string) => void;
    success: (message: string) => void;
    error: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((type: ToastType, message: string) => {
        const id = Date.now() + Math.random();
        setToasts((current) => [...current, { id, type, message }]);

        window.setTimeout(() => {
            setToasts((current) => current.filter((toast) => toast.id !== id));
        }, 4000);
    }, []);

    const value = useMemo(
        () => ({
            info: (message: string) => addToast("info", message),
            success: (message: string) => addToast("success", message),
            error: (message: string) => addToast("error", message)
        }),
        [addToast]
    );

    return (
        <ToastContext.Provider value={value}>
            {children}
            <div style={toastRegion} aria-live="polite" aria-atomic="true">
                {toasts.map((toast) => (
                    <div key={toast.id} style={{ ...toastBox, ...toastStyles[toast.type] }}>
                        <div style={toastTitle}>{toast.type}</div>
                        <div style={toastMessage}>{toast.message}</div>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error("useToast must be used inside ToastProvider");
    }

    return context;
}

const toastRegion: React.CSSProperties = {
    position: "fixed",
    right: 20,
    bottom: 20,
    zIndex: 5000,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    width: "min(360px, calc(100vw - 40px))"
};

const toastBox: React.CSSProperties = {
    borderRadius: 8,
    border: "1px solid #333",
    background: "#111",
    color: "white",
    padding: "12px 14px",
    boxShadow: "0 14px 36px rgba(0,0,0,0.45)"
};

const toastStyles: Record<ToastType, React.CSSProperties> = {
    info: { borderColor: "#3b82f6" },
    success: { borderColor: "#22c55e" },
    error: { borderColor: "#ef4444" }
};

const toastTitle: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 700,
    textTransform: "uppercase",
    color: "#aaa",
    marginBottom: 4
};

const toastMessage: React.CSSProperties = {
    fontSize: 14,
    lineHeight: 1.35
};
