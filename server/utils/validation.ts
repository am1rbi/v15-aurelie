export const validatePhoneNumber = (phoneNumber: string): boolean => {
  // Israeli phone number format: 05X-XXXXXXX or 05XXXXXXXX
  const phoneRegex = /^(0[5][0-9](-?\d{7}|\d{7}))$/;
  return phoneRegex.test(phoneNumber);
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};