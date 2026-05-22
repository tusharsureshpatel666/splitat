// delhiPinValidation.ts
export const isValidDelhiPin = (pin: string): boolean => {
  return /^[1-9][0-9]{5}$/.test(pin) && pin.startsWith("110");
};
