import { Notyf, NotyfEvent } from "notyf";
import "notyf/notyf.min.css";
import { registerSW } from "virtual:pwa-register";

interface InstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{
        outcome: "accepted" | "dismissed";
        platform: string;
    }>;
}

const statusElement = document.getElementById("pwa_status");
const updateButton = document.getElementById("btn_update") as HTMLButtonElement;
const installToastDismissedKey = "commitlint-install-toast-dismissed";
const notyf = new Notyf({
    duration: 0,
    dismissible: true,
    position: { x: "right", y: "bottom" },
    ripple: false,
    types: [
        {
            type: "pwa",
            background: "#555b6e",
            icon: false,
            duration: 0,
            dismissible: true,
            ripple: false,
        },
    ],
});

function setStatus(message: string): void {
    if (statusElement !== null) {
        statusElement.textContent = message;
    }
}

function installInstructions(): string {
    const isIOS =
        /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
        (navigator.userAgent.indexOf("Macintosh") !== -1 &&
            navigator.maxTouchPoints > 1);

    if (isIOS) {
        return "On iPhone or iPad, open this page in Safari, tap Share, then Add to Home Screen.";
    }

    return "Use your browser menu and choose Install app or Add to Home screen if available.";
}

let installPrompt: InstallPromptEvent | undefined;
let installPromptEventReceived = false;
const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true;
let installToast: ReturnType<typeof notyf.open> | undefined;
let installToastDismissed = wasInstallToastDismissed();

function wasInstallToastDismissed(): boolean {
    try {
        return window.sessionStorage.getItem(installToastDismissedKey) === "true";
    } catch (error) {
        return false;
    }
}

function rememberInstallToastDismissal(): void {
    installToastDismissed = true;
    try {
        window.sessionStorage.setItem(installToastDismissedKey, "true");
    } catch (error) {
        // The toast remains dismissed for this page even if storage is unavailable.
    }
}

function dismissInstallToast(): void {
    if (installToast !== undefined) {
        notyf.dismiss(installToast);
        installToast = undefined;
    }
}

function startInstallFromToast(): void {
    if (installPrompt === undefined) {
        return;
    }

    const prompt = installPrompt;
    installPrompt = undefined;
    dismissInstallToast();
    void requestInstall(prompt);
}

function showInstallToast(message: string, actionable: boolean): void {
    if (isStandalone || installToastDismissed) {
        return;
    }

    dismissInstallToast();

    const notification = notyf.open({
        type: "pwa",
        message,
        duration: 0,
        dismissible: true,
        className: actionable
            ? "pwa-install-toast pwa-install-toast-actionable"
            : "pwa-install-toast",
        ripple: false,
    });
    installToast = notification;

    const toastElements = document.querySelectorAll<HTMLElement>(
        ".notyf__toast.pwa-install-toast:not(.notyf__toast--disappear)"
    );
    const toastElement = toastElements[toastElements.length - 1];
    const dismissButton =
        toastElement?.querySelector<HTMLButtonElement>(".notyf__dismiss-btn");
    if (dismissButton !== null && dismissButton !== undefined) {
        dismissButton.setAttribute("aria-label", "Dismiss install notification");
    }

    notification.on(NotyfEvent.Dismiss, function () {
        rememberInstallToastDismissal();
        if (installToast === notification) {
            installToast = undefined;
        }
    });

    if (actionable) {
        const messageElement =
            toastElement?.querySelector<HTMLElement>(".notyf__message");
        if (messageElement !== null && messageElement !== undefined) {
            const messageCopy = document.createElement("span");
            messageCopy.className = "pwa-install-toast-copy";
            messageCopy.textContent = message;

            const installButton = document.createElement("button");
            installButton.type = "button";
            installButton.className = "pwa-install-action";
            installButton.textContent = "Install";
            installButton.setAttribute("aria-label", "Install Commitlint");
            installButton.addEventListener("click", function (event: MouseEvent) {
                event.stopPropagation();
                startInstallFromToast();
            });

            messageElement.textContent = "";
            messageElement.appendChild(messageCopy);
            messageElement.appendChild(installButton);
        }
    }
}

async function requestInstall(prompt: InstallPromptEvent): Promise<void> {
    try {
        await prompt.prompt();
        const choice = await prompt.userChoice;
        setStatus(
            choice.outcome === "accepted"
                ? "Commitlint is installing."
                : "Installation was cancelled."
        );
    } catch (error) {
        console.error("Unable to show the install prompt.", error);
        setStatus(installInstructions());
    }
}

window.addEventListener("beforeinstallprompt", function (event: Event) {
    if (isStandalone || installToastDismissed) {
        return;
    }

    installPromptEventReceived = true;
    event.preventDefault();
    installPrompt = event as InstallPromptEvent;
    showInstallToast(
        "Install Commitlint for offline access.",
        true
    );
});

window.addEventListener("appinstalled", function () {
    installPrompt = undefined;
    dismissInstallToast();
    setStatus("Commitlint has been installed.");
});

if (!isStandalone && !installToastDismissed) {
    window.setTimeout(function () {
        if (!installPromptEventReceived) {
            showInstallToast(installInstructions(), false);
        }
    }, 1200);
}

window.addEventListener("offline", function () {
    setStatus(
        "You are offline. The editor and saved history still work; the Information tab needs a connection."
    );
});

window.addEventListener("online", function () {
    setStatus("You're back online.");
});

if (!navigator.onLine) {
    setStatus(
        "You are offline. The editor and saved history still work; the Information tab needs a connection."
    );
}

const updateSW = registerSW({
    immediate: true,
    onNeedRefresh() {
        updateButton.hidden = false;
        setStatus("An update is ready. Reload when you are ready to use it.");
    },
    onOfflineReady() {
        setStatus("Offline support is ready on this device.");
    },
    onRegisterError(error: Error) {
        console.error("Unable to register the service worker.", error);
        setStatus("Offline support could not be enabled in this browser.");
    },
});

updateButton.addEventListener("click", function () {
    updateButton.disabled = true;
    setStatus("Loading the latest version.");
    updateSW().catch(function (error) {
        console.error("Unable to apply the app update.", error);
        updateButton.disabled = false;
        setStatus(
            "The update could not be applied. Try again when you are online."
        );
    });
});
