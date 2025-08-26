// Test script to verify login API
const testLogin = async () => {
  try {
    // First clear any existing tokens
    await fetch("/api/auth/logout", { method: "POST" });

    // Then try to login
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "admin@ulco.com",
        password: "admin123",
      }),
    });

    const data = await response.json();
    console.log("Login response:", data);

    if (response.ok) {
      // Test profile endpoint
      const profileResponse = await fetch("/api/auth/profile");
      const profileData = await profileResponse.json();
      console.log("Profile response:", profileData);
    }
  } catch (error) {
    console.error("Test error:", error);
  }
};

// Run test
testLogin();
