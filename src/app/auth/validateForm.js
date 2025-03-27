export const validateForm = (formData, isSignup) => {
    const newErrors = {}

    if (!formData.email) {
        newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
        newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters"
    }

    if (isSignup) {
        if (!formData.name) {
            newErrors.name = "Name is required";
        } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
            newErrors.name = "Name must contain only letters and spaces";
        }
    }

    return newErrors;
    
}
