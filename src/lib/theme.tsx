import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  PLATFORMS,
  isPlatformId,
  type Platform,
  type PlatformId,
} from "../data/platforms";

const STORAGE_KEY = "dubu-platform";

function initialPlatform(): PlatformId {
  if (typeof window === "undefined") return "whatsapp";
  const param = new URLSearchParams(window.location.search).get("platform");
  if (isPlatformId(param)) return param;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isPlatformId(stored)) return stored;
  } catch {
    /* storage unavailable */
  }
  return "whatsapp";
}

type PlatformContextValue = {
  platformId: PlatformId;
  platform: Platform;
  setPlatform: (id: PlatformId) => void;
};

const PlatformContext = createContext<PlatformContextValue | null>(null);

export function PlatformProvider({ children }: { children: ReactNode }) {
  const [platformId, setPlatformId] = useState<PlatformId>(() => {
    const id = initialPlatform();
    document.documentElement.dataset.theme = id;
    return id;
  });

  const setPlatform = useCallback((id: PlatformId) => {
    setPlatformId(id);
    document.documentElement.dataset.theme = id;
    try {
      window.localStorage.setItem(STORAGE_KEY, id);
    } catch {
      /* storage unavailable */
    }
    // Raw replaceState (not setSearchParams) so react-router doesn't
    // re-render the route tree and disturb Lenis/ScrollTrigger.
    const url = new URL(window.location.href);
    url.searchParams.set("platform", id);
    window.history.replaceState(window.history.state, "", url);
  }, []);

  const value = useMemo(
    () => ({ platformId, platform: PLATFORMS[platformId], setPlatform }),
    [platformId, setPlatform]
  );

  return (
    <PlatformContext.Provider value={value}>
      {children}
    </PlatformContext.Provider>
  );
}

export function usePlatform(): PlatformContextValue {
  const ctx = useContext(PlatformContext);
  if (!ctx) throw new Error("usePlatform must be used within PlatformProvider");
  return ctx;
}
