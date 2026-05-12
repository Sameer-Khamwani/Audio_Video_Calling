import * as Yup from 'yup';
import {
    LoginFormValues,
    ForgotPasswordFormValues,
    VerifyCodeFormValues,
    ResetPasswordFormValues,
    PersonalInfoFormValues,
    ProfessionalDetailsFormValues,
    UpdateProfileFormValues,
    ChangePasswordFormValues,
    LocationFee,
} from './interface';
import { makeSchedule } from './data';

// ─── Login ───────────────────────────────────────────────────────────────────

export const loginValidationSchema = Yup.object().shape({
    email: Yup.string().trim().email('Enter a valid email address').required('Email is required'),
    password: Yup.string()
        .trim()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
});

export const loginInitialValues: LoginFormValues = {
    email: '',
    password: '',
};

// ─── Forgot Password ─────────────────────────────────────────────────────────

export const forgotPasswordValidationSchema = Yup.object().shape({
    email: Yup.string()
        .trim()
        .email('Enter a valid email address')
        .required('Email is required'),
});

export const forgotPasswordInitialValues: ForgotPasswordFormValues = {
    email: '',
};

// ─── Verify Code ─────────────────────────────────────────────────────────────

export const verifyCodeValidationSchema = Yup.object().shape({
    code: Yup.string()
        .required('OTP code is required')
        .matches(/^\d{6}$/, 'Enter the 6-digit code'),
});

export const verifyCodeInitialValues: VerifyCodeFormValues = { code: '' };

// ─── Reset Password ───────────────────────────────────────────────────────────

export const resetPasswordValidationSchema = Yup.object().shape({
    newPassword: Yup.string()
        .required('New password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Include at least one uppercase letter')
        .matches(/[a-z]/, 'Include at least one lowercase letter')
        .matches(/\d/, 'Include at least one number'),
    confirmPassword: Yup.string()
        .required('Please confirm your new password')
        .oneOf([Yup.ref('newPassword')], 'Passwords do not match'),
});

export const resetPasswordInitialValues: ResetPasswordFormValues = {
    newPassword: '',
    confirmPassword: '',
};

// ─── Profile Setup (Personal Info) ───────────────────────────────────────────

export const personalInfoValidationSchema = Yup.object().shape({
    fullName: Yup.string()
        .trim()
        .required('Full name is required')
        .min(2, 'Full name must be at least 2 characters'),
    gender: Yup.string().trim().required('Gender is required'),
    dateOfBirth: Yup.string()
        .trim()
        .required('Date of birth is required')
        .test('dob-not-in-future', 'Date of birth cannot be in the future', (value) => {
            if (!value) return false;
            const parsed = new Date(value);
            if (Number.isNaN(parsed.getTime())) return false;
            return parsed.getTime() <= Date.now();
        }),
    specialization: Yup.array().of(Yup.string().trim()),
    qualification: Yup.string().trim().required('Qualification is required'),
    experience: Yup.string()
        .trim()
        .required('Experience is required')
        .matches(/^\d+$/, 'Enter a valid number')
        .test('range', 'Experience must be between 0 and 80', (value) => {
            if (!value) return false;
            const num = Number(value);
            return !Number.isNaN(num) && num >= 0 && num <= 80;
        }),
});

export const personalInfoInitialValues: PersonalInfoFormValues = {
    fullName: '',
    gender: '',
    dateOfBirth: '',
    specialization: [],
    qualification: '',
    experience: '',
};

// ─── Professional Details ─────────────────────────────────────────────────────

export const professionalDetailsValidationSchema = Yup.object().shape({
    specialization: Yup.string().trim().required('Medical specialization is required'),
    yearsExperience: Yup.string()
        .trim()
        .required('Years of experience is required')
        .matches(/^\d+$/, 'Enter a valid number')
        .test('range', 'Years of experience must be between 0 and 80', (value) => {
            if (!value) return false;
            const num = Number(value);
            return !Number.isNaN(num) && num >= 0 && num <= 80;
        }),
    licenseNumber: Yup.string().trim().required('Medical license number is required'),
    clinicName: Yup.string().trim().required('Clinic/Hospital name is required'),
});

export const professionalDetailsInitialValues: ProfessionalDetailsFormValues = {
    specialization: '',
    yearsExperience: '',
    licenseNumber: '',
    clinicName: '',
};

// ─── Update Profile ───────────────────────────────────────────────────────────

export const updateProfileValidationSchema = Yup.object().shape({
    fullName: Yup.string().trim().required('Full name is required'),
    dob: Yup.string().trim().required('Date of birth is required'),
    gender: Yup.string().trim().required('Gender is required'),
    phoneNumber: Yup.string().trim().required('Phone number is required'),
    address: Yup.string().trim().required('Residential address is required'),
    qualification: Yup.string().trim().required('Qualification is required'),
    experience: Yup.string().trim().required('Experience is required'),
    specializations: Yup.array().of(Yup.string().trim()).min(1, 'Select at least one specialization'),
});

export const updateProfileInitialValues: UpdateProfileFormValues = {
    fullName: 'Sarah Jenkins',
    dob: '1988-05-14',
    gender: 'female',
    phoneNumber: '+1 (555) 123-4567',
    address: '123 Wellness Ave, Apt 4B\nSan Francisco, CA 94105',
    qualification: 'MBBS',
    experience: '5+ Years',
    specializations: ['1', '2'],
};

// ─── Change Password ──────────────────────────────────────────────────────────

export const changePasswordValidationSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Current password is required'),
    newPassword: Yup.string()
        .required('New password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Include at least one uppercase letter')
        .matches(/[a-z]/, 'Include at least one lowercase letter')
        .matches(/\d/, 'Include at least one number')
        .matches(/[!@#$%^&*(),.?:{}|<>]/, 'Include at least one special character'),
    confirmPassword: Yup.string()
        .required('Please confirm your new password')
        .oneOf([Yup.ref('newPassword')], 'Passwords do not match'),
});

export const changePasswordInitialValues: ChangePasswordFormValues = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
};

// ─── My Profile — Location / Schedule ────────────────────────────────────────

export const scheduleSchema = Yup.object({
    id: Yup.string().required(),
    day: Yup.string().required('Day is required'),
    startTime: Yup.string().required('Start time is required'),
    endTime: Yup.string().required('End time is required'),
});

export const locationSchema = Yup.object({
    address: Yup.string()
        .trim()
        .min(10, 'Address must be at least 10 characters')
        .required('Address is required'),
    consultationFee: Yup.string()
        .trim()
        .matches(/^[\d,]+$/, 'Fee must be a valid number')
        .required('Consultation fee is required'),
    weeklySchedule: Yup.array()
        .of(scheduleSchema)
        .min(1, 'At least one schedule is required'),
});

export const emptyLocationForm = (): Omit<LocationFee, 'id'> => ({
    title: 'Doctor Registration form',
    address: '',
    consultationFee: '',
    specialization: 'Cardiology',
    weeklySchedule: [makeSchedule()],
});
