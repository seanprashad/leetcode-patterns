import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup, act } from "@testing-library/react";

type AuthCallback = (event: string, session: { user: Record<string, unknown> } | null) => void;

const { mockGetSession, mockOnAuthStateChange, mockTrackEvent, mockDownloadAndMerge, mockChannel } = vi.hoisted(() => {
  const mockChannel = {
    on: vi.fn().mockReturnThis(),
    subscribe: vi.fn().mockReturnThis(),
  };
  return {
    mockGetSession: vi.fn(),
    mockOnAuthStateChange: vi.fn(),
    mockTrackEvent: vi.fn(),
    mockDownloadAndMerge: vi.fn(() => Promise.resolve()),
    mockChannel,
  };
});

vi.mock("@/lib/supabase", () => ({
  supabase: {
    auth: {
      getSession: mockGetSession,
      onAuthStateChange: mockOnAuthStateChange,
      setSession: vi.fn().mockResolvedValue({ error: null }),
    },
    channel: () => mockChannel,
    removeChannel: vi.fn(),
  },
}));

vi.mock("@/lib/sync", () => ({
  downloadAndMerge: mockDownloadAndMerge,
  scheduleUpload: vi.fn(),
  mergeFromRealtimePayload: vi.fn(),
}));

vi.mock("@/lib/analytics", () => ({
  trackEvent: mockTrackEvent,
}));

import { AuthProvider, useAuth } from "@/components/layout/AuthContext";

const fakeUser = {
  id: "user-1",
  user_metadata: { user_name: "testuser", avatar_url: "https://example.com/avatar.png" },
};

function TestConsumer() {
  const { user } = useAuth();
  return <div>{user ? `signed-in:${(user as unknown as typeof fakeUser).user_metadata.user_name}` : "signed-out"}</div>;
}

describe("AuthProvider sign-in toast suppression", () => {
  let authCallback: AuthCallback;
  const unsubscribe = vi.fn();

  beforeEach(() => {
    mockTrackEvent.mockClear();
    mockDownloadAndMerge.mockClear();
    mockOnAuthStateChange.mockImplementation((cb: AuthCallback) => {
      authCallback = cb;
      return { data: { subscription: { unsubscribe } } };
    });
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("shows toast on fresh sign-in when no existing session", async () => {
    mockGetSession.mockResolvedValue({ data: { session: null } });

    await act(async () => {
      render(
        <AuthProvider>
          <TestConsumer />
        </AuthProvider>
      );
    });

    expect(screen.getByText("signed-out")).toBeInTheDocument();

    await act(async () => {
      authCallback("SIGNED_IN", { user: fakeUser });
    });

    expect(screen.getByText(/Signed in as testuser/)).toBeInTheDocument();
    expect(mockTrackEvent).toHaveBeenCalledWith("sign_in", { provider: "github" });
  });

  it("does NOT show toast when session already exists and SIGNED_IN fires again", async () => {
    mockGetSession.mockResolvedValue({ data: { session: { user: fakeUser } } });

    await act(async () => {
      render(
        <AuthProvider>
          <TestConsumer />
        </AuthProvider>
      );
    });

    expect(screen.getByText("signed-in:testuser")).toBeInTheDocument();
    mockTrackEvent.mockClear();

    await act(async () => {
      authCallback("SIGNED_IN", { user: fakeUser });
    });

    expect(screen.queryByText(/Signed in as/)).not.toBeInTheDocument();
    expect(mockTrackEvent).not.toHaveBeenCalledWith("sign_in", expect.anything());
  });

  it("does NOT show toast when INITIAL_SESSION fires before getSession resolves", async () => {
    // Simulate getSession that never resolves before INITIAL_SESSION fires
    let resolveGetSession!: (v: { data: { session: { user: typeof fakeUser } } }) => void;
    mockGetSession.mockReturnValue(new Promise((r) => { resolveGetSession = r; }));

    await act(async () => {
      render(
        <AuthProvider>
          <TestConsumer />
        </AuthProvider>
      );
    });

    // Supabase fires INITIAL_SESSION before getSession resolves
    await act(async () => {
      authCallback("INITIAL_SESSION", { user: fakeUser });
    });

    // Then SIGNED_IN fires (common Supabase behaviour on page load)
    await act(async () => {
      authCallback("SIGNED_IN", { user: fakeUser });
    });

    expect(screen.queryByText(/Signed in as/)).not.toBeInTheDocument();
    expect(mockTrackEvent).not.toHaveBeenCalledWith("sign_in", expect.anything());

    // Let getSession resolve to avoid dangling promise
    await act(async () => {
      resolveGetSession({ data: { session: { user: fakeUser } } });
    });
  });

  it("shows error toast when getSession fails and does not fetch data", async () => {
    mockGetSession.mockResolvedValue({ data: { session: null }, error: { message: "Session expired" } });

    await act(async () => {
      render(
        <AuthProvider>
          <TestConsumer />
        </AuthProvider>
      );
    });

    expect(screen.getByText(/Sign in failed: Session expired/)).toBeInTheDocument();
    expect(screen.getByText("signed-out")).toBeInTheDocument();
    expect(mockDownloadAndMerge).not.toHaveBeenCalled();
  });

  it("shows toast again after sign-out then fresh sign-in", async () => {
    mockGetSession.mockResolvedValue({ data: { session: { user: fakeUser } } });

    await act(async () => {
      render(
        <AuthProvider>
          <TestConsumer />
        </AuthProvider>
      );
    });

    mockTrackEvent.mockClear();

    // Simulate sign-out
    await act(async () => {
      authCallback("SIGNED_OUT", null);
    });

    // Simulate fresh sign-in
    await act(async () => {
      authCallback("SIGNED_IN", { user: fakeUser });
    });

    expect(screen.getByText(/Signed in as testuser/)).toBeInTheDocument();
    expect(mockTrackEvent).toHaveBeenCalledWith("sign_in", { provider: "github" });
  });
});
