export const fullNameRegex = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~=-])[A-Za-z\d!@#$%^&*()_+{}[\]:;<>,.?~=-]{8,}$/;
export const phoneRegex = /^\d{11}$/;
export const dateOfBirthRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
