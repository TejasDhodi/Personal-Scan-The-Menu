const z = require('zod');


// Phone Validation
const isValidPhone = (phoneNumber) => {
    return /^\d+$/.test(phoneNumber);
}

// Creating Registration Validator schema
const registerValidatorSchema = z.object({
    fullName: z
        .string({ required_error: "User name is Required" })
        .trim(),

    email: z
        .string({ required_error: "Email is Required" })
        .trim()
        .email({ message: "Invalid Email Address" }),

    phone: z
        .string({ required_error: "Email is Required" })
        .trim()
        .min(10, { message: "Phone Number must be of 10 digits" })
        .max((10, { message: "Phone Number should not be more 10 digits" }))
        .refine(phoneNumber => isValidPhone(phoneNumber), {
            message: "Phone Number must contain digits only"
        }),

    password: z
        .string({ required_error: "Passwrd is required" })
        .trim()
        .min(8, { message: "Password must be of atleast 8 character" })
        .max(15, { message: "Passwrd should not be more than 15 character" })
        .refine((value) => /[A-Z]/.test(value), {
            message: "Password must contain at least one uppercase letter",
        })
        .refine((value) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value), {
            message: "Password must contain at least one special character",
        }),

    confirmPassword: z
        .string({ required_error: "Confirm Password is required" })
        .trim()
        .min(8, { message: "Confirm Password must be of atleast 8 character" })
        .max(15, { message: "Confirm Password should not be more than 15 character" })
        .refine((value) => /[A-Z]/.test(value), {
            message: "Password must contain at least one uppercase letter",
        })
        .refine((value) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value), {
            message: "Password must contain at least one special character",
        }),

});

module.exports = registerValidatorSchema;