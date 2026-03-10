import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const { mockUseAuth } = vi.hoisted(() => ({
  mockUseAuth: { current: { user: null, loading: false, signIn: vi.fn(), signOut: vi.fn(), syncNow: vi.fn(), syncVersion: 0 } },
}));

vi.mock("@/components/layout/AuthContext", () => ({
  useAuth: () => mockUseAuth.current,
}));

vi.mock("@/lib/supabase", () => ({
  supabase: {},
}));

import UserMenu from "@/components/layout/UserMenu";

describe("UserMenu", () => {
  beforeEach(() => {
    mockUseAuth.current = {
      user: null,
      loading: false,
      signIn: vi.fn(),
      signOut: vi.fn(),
      syncNow: vi.fn(),
      syncVersion: 0,
    };
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("renders nothing when loading", () => {
    mockUseAuth.current = { ...mockUseAuth.current, loading: true };
    const { container } = render(<UserMenu />);
    expect(container.innerHTML).toBe("");
  });

  it("renders Sign in with GitHub button when no user", () => {
    render(<UserMenu />);
    expect(screen.getByRole("button", { name: "Sign in with GitHub" })).toBeInTheDocument();
  });

  it("renders user avatar when signed in", () => {
    mockUseAuth.current = {
      ...mockUseAuth.current,
      user: { user_metadata: { avatar_url: "https://example.com/avatar.png", user_name: "testuser" } } as never,
    };
    render(<UserMenu />);
    const avatar = screen.getByAltText("testuser");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute("src", "https://example.com/avatar.png");
  });

  it("shows dropdown with Signed in as and username when avatar clicked", async () => {
    mockUseAuth.current = {
      ...mockUseAuth.current,
      user: { user_metadata: { avatar_url: "https://example.com/avatar.png", user_name: "testuser" } } as never,
    };
    const user = userEvent.setup();
    render(<UserMenu />);
    await user.click(screen.getByAltText("testuser"));
    expect(screen.getByText("Signed in as")).toBeInTheDocument();
    expect(screen.getByText("testuser")).toBeInTheDocument();
  });

  it("calls signOut when Sign out is clicked", async () => {
    const mockSignOut = vi.fn();
    mockUseAuth.current = {
      ...mockUseAuth.current,
      user: { user_metadata: { avatar_url: "https://example.com/avatar.png", user_name: "testuser" } } as never,
      signOut: mockSignOut,
    };
    const user = userEvent.setup();
    render(<UserMenu />);
    await user.click(screen.getByAltText("testuser"));
    await user.click(screen.getByText("Sign out"));
    expect(mockSignOut).toHaveBeenCalled();
  });

  it("closes dropdown when clicking outside", async () => {
    mockUseAuth.current = {
      ...mockUseAuth.current,
      user: { user_metadata: { avatar_url: "https://example.com/avatar.png", user_name: "testuser" } } as never,
    };
    const user = userEvent.setup();
    render(<UserMenu />);
    await user.click(screen.getByAltText("testuser"));
    expect(screen.getByText("Signed in as")).toBeInTheDocument();
    await user.click(document.body);
    expect(screen.queryByText("Signed in as")).not.toBeInTheDocument();
  });
});
