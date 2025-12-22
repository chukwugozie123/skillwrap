/* ================= TYPES ================= */

export interface LoginFormState {
  success?: boolean;
  message?: string;
  error?: string;
}

/* ================= FORM ACTION ================= */

export async function FormSubmit(
  prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  try {
    const res = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    return data as LoginFormState;
  } catch {
    return {
      success: false,
      error: "Network error. Please try again.",
    };
  }
}
