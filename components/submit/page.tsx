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
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${API_URL}/auth/login`, {
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
