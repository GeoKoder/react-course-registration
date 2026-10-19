import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    course: "",
    experience: "",
    reason: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function validateForm() {
    const newErrors = {};

    // Full name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Optional Kenyan phone number
    const phone = formData.phone.replace(/[\s()-]/g, "");

    if (phone && !/^(?:\+254|254|0)(?:1\d{8}|7\d{8})$/.test(phone)) {
      newErrors.phone =
        "Enter a valid Kenyan phone number, e.g. 0712345678 or +254712345678.";
    }

    // Course
    if (!formData.course) {
      newErrors.course = "Please select a course.";
    }
    // Experience level
    if (!formData.experience) {
      newErrors.experience = "Please select your experience level.";
    }

    // Reason
    if (!formData.reason.trim()) {
      newErrors.reason = "Please tell us why you want to join.";
    } else if (formData.reason.trim().length < 30) {
      newErrors.reason = "Please write at least 30 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate processing while we have no backend yet.
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubmitted(true);
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-10">
        <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-lg">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">
            ✓
          </div>

          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            Registration Successful!
          </h1>

          <p className="mt-3 text-gray-600">Thank you, {formData.fullName}!</p>

          <p className="mt-2 text-gray-600">
            You have successfully registered your interest in:
          </p>

          <p className="mt-2 font-semibold text-purple-700">
            {formData.course}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-lg rounded-2xl bg-white p-6 shadow-lg sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Course Registration
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          Fill in the details below to register for a course.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
          {/* Form fields here */}
          <div>
            <label
              htmlFor="fullName"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Full name *
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email address *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Phone number (optional)
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="0712345678 or +254712345678"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="course"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Choose a course *
            </label>
            <select
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            >
              <option value="">Select a course</option>
              <option value="Web Development">Web Development</option>
              <option value="Data Science">Data Science</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Digital Marketing">Digital Marketing</option>
            </select>
            {errors.course && (
              <p className="mt-1 text-sm text-red-600">{errors.course}</p>
            )}
          </div>

          <fieldset>
            <legend className="mb-2 text-sm font-medium text-gray-700">
              Experience level *
            </legend>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
              {["Beginner", "Intermediate", "Advanced"].map((level) => (
                <label
                  key={level}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <input
                    type="radio"
                    name="experience"
                    value={level}
                    checked={formData.experience === level}
                    onChange={handleChange}
                    className="h-4 w-4 accent-purple-600 focus:ring-2 focus:ring-purple-300"
                  />
                  {level}
                </label>
              ))}
            </div>
            {errors.experience && (
              <p className="mt-1 text-sm text-red-600">{errors.experience}</p>
            )}
          </fieldset>

          <div>
            <label
              htmlFor="reason"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Why do you want to join? *
            </label>
            <textarea
              id="reason"
              name="reason"
              rows={4}
              value={formData.reason}
              onChange={handleChange}
              placeholder="Tell us about your goals and what you hope to learn..."
              className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2.5 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            />
            <p className="mt-1 text-right text-xs text-gray-500">
              {formData.reason.length} / 30 characters minimum
            </p>
            {errors.reason && (
              <p className="mt-1 text-sm text-red-600">{errors.reason}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-purple-600 px-4 py-3 font-semibold text-white transition hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Processing..." : "Submit Registration"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
