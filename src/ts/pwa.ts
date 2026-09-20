import { registerSW } from "virtual:pwa-register";

interface InstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{
        outcome: "accepted" | "dismissed";
        platform: string;
    }>;
}

const statusElement = document.getElementById("pwa_status");
const installButton = document.getElementById("btn_install") as HTMLButtonElement;
const updateButton = document.getElementById("btn_update") as HTMLButtonElement;

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
const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true;

installButton.hidden = isStandalone;

window.addEventListener("beforeinstallprompt", function (event: Event) {
    event.preventDefault();
    installPrompt = event as InstallPromptEvent;
    installButton.hidden = false;
});

window.addEventListener("appinstalled", function () {
    installPrompt = undefined;
    installButton.hidden = true;
    setStatus("Commitlint has been installed.");
});

installButton.addEventListener("click", async function () {
    if (installPrompt === undefined) {
        setStatus(installInstructions());
        return;
    }

    const prompt = installPrompt;
    installPrompt = undefined;

    try {
        await prompt.prompt();
        const choice = await prompt.userChoice;
        if (choice.outcome === "accepted") {
            installButton.hidden = true;
            setStatus("Commitlint is installing.");
        } else {
            setStatus("Installation was cancelled.");
        }
    } catch (error) {
        console.error("Unable to show the install prompt.", error);
        setStatus(installInstructions());
    }
});

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
