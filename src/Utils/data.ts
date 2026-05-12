import { icons } from "../Assets/Icons";
import { colors } from "./theme";
import {
    AppointmentStatus,
    ChatItem,
    DoctorProfile,
    IMessage,
    NotificationCategory,
    NotificationItem,
    NotificationSection,
    Patient,
    PrivacySection,
    ScheduleItem,
    TermsSection,
    WeeklyScheduleItem,
} from "./interface";

export const medicalSpecialization = [
    { label: 'Cardiology', value: 1 },
    { label: 'Pediatrics', value: 2 },
    { label: 'Neurology', value: 3 },
    { label: 'Orthopedics', value: 4 },
    { label: 'Gynecology', value: 5 }
]

export const gender = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
    { label: "Prefer not to say", value: "prefer not to say" }
]


export const healthSummary = [{
    id: "1",
    title: "Height",
    value: "170 cm",
    icon: icons.height,
},
{
    id: "2",
    title: "Weight",
    value: "70 kg",
    icon: icons.weight,
},
{
    id: "3",
    title: "BMI",
    value: "24.5",
    icon: icons.bmi,
},
];

export const allergies = [
    { id: "1", value: "Penicillin" },
    { id: "2", value: "Pollen" },
    { id: "3", value: "Dust" },
];

export const existingConditions = [
    { id: "1", value: "Hypertension" },
    { id: "2", value: "Asthma" },
    { id: "3", value: "Migraine" },
];

export const appointments = [
    { id: "1", month: "OCT", day: "12", type: "Follow-up", time: "Today, 10:30 AM", status: "cancelled" as AppointmentStatus, doctor: "Dr. Emily Chen", locationType: "In-Person" },
    { id: "2", month: "SEP", day: "28", type: "Consultation", time: "Sep 28, 9:00 AM", status: "completed" as AppointmentStatus, doctor: "Dr. James Roy", locationType: "In-Person" },
    { id: "3", month: "NOV", day: "5", type: "Check-up", time: "Nov 5, 11:00 AM", status: "confirmed" as AppointmentStatus, doctor: "Dr. Sarah Lee", locationType: "Video Consult" },
    { id: "4", month: "DEC", day: "3", type: "Follow-up", time: "Dec 3, 2:00 PM", status: "confirmed" as AppointmentStatus, doctor: "Dr. Emily Chen", locationType: "Video-Consult" },
];

export const reports = [
    { id: "1", title: "Blood Test", date: "Oct 12, 2024", doctor: "Dr. Emily Chen" },
    { id: "2", title: "X-Ray Report", date: "Sep 28, 2024", doctor: "Dr. James Roy" },
    { id: "3", title: "MRI Scan", date: "Aug 15, 2024", doctor: "Dr. Sarah Lee" },
    { id: "4", title: "ECG Report", date: "Jul 10, 2024", doctor: "Dr. James Roy" },
];


export const dayOptions = [
    { label: "Monday", value: "Monday" },
    { label: "Tuesday", value: "Tuesday" },
    { label: "Wednesday", value: "Wednesday" },
    { label: "Thursday", value: "Thursday" },
    { label: "Friday", value: "Friday" },
    { label: "Saturday", value: "Saturday" },
    { label: "Sunday", value: "Sunday" },
];

export const makeSchedule = (): WeeklyScheduleItem => ({
    id: String(Date.now() + Math.random()),
    day: "Monday",
    startTime: "02:00 PM",
    endTime: "07:00 PM",
    enabled: true,
    timeSlot: "15 Minutes",
});

export const profile: DoctorProfile = {
    name: "Dr. Sarah Jenkins",
    designation: "MD, FACC - Senior Cardiologist",
    phone: "+1 234 567 890",
    email: "sarah.j@clinic.com",
    specializationChips: ["Cardiology", "Internal Medicine"],
};

export const patients: Patient[] = [
    { id: "1", name: "Eleanor Pena", phone: "+1 (555) 019-2837", appointmentTime: "Today, 10:30 AM", visits: 12 },
    { id: "2", name: "Devon Lane", phone: "+1 (555) 742-1983", appointmentTime: "Today, 11:15 AM", visits: 8 },
    { id: "3", name: "Jenny Wilson", phone: "+1 (555) 203-9981", appointmentTime: "Today, 02:00 PM", visits: 5 },
];

export const chats: ChatItem[] = [
    { id: "1", doctorName: "Dr. jack Piterson", preview: "Hello Dr. Smith, I hope this message finds you well....", time: "04:30 PM", unreadCount: 2, read: false, isVoiceMessage: true, avatarBg: "#cdbcf5" },
    { id: "2", doctorName: "Dr. Clark Thompson", preview: "We need to check your tests ...", time: "05:45 PM", unreadCount: 1, read: false, avatarBg: "#ebefb4" },
    { id: "3", doctorName: "Dr. Emily Carter", preview: "Hello Dr. Smith, I hope this message finds you well....", time: "08:30 AM", unreadCount: 0, read: true, avatarBg: "#b6d9dc" },
    { id: "4", doctorName: "Dr. Sarah Mitchell", preview: "Hello! This is Dr. Smith. I just wanted to remind you...", time: "11:30 AM", unreadCount: 0, read: true, avatarBg: "#f0c3c8" },
    { id: "5", doctorName: "Dr. Sarah Thompson", preview: "Hello Dr. Smith, I hope this message finds you well....", time: "12:25 PM", unreadCount: 0, read: true, isVoiceMessage: true, avatarBg: "#dddddd" },
    { id: "6", doctorName: "Dr. Samuel Carter", preview: "Hello Dr. Smith, I hope this message finds you well....", time: "06:15 AM", unreadCount: 0, read: true, isVoiceMessage: true, avatarBg: "#beeac2" },
];

export const scheduleData: ScheduleItem[] = [
    { id: "1", name: "Arjun Sharma", details: "28 Years • In-Clinic", time: "10:30 AM - 11:00 AM", day: "Today", dateLabel: "Monday, March 30", status: "upcoming", mode: "online" },
    { id: "2", name: "Neha Verma", details: "34 Years • Follow-up", time: "11:15 AM - 11:45 AM", day: "Today", dateLabel: "Monday, March 30", status: "completed", mode: "in-person" },
    { id: "3", name: "Ibrahim Khan", details: "46 Years • Online", time: "12:00 PM - 12:30 PM", day: "Today", dateLabel: "Monday, March 30", status: "cancelled", mode: "online" },
];

export const notifications: NotificationItem[] = [
    { id: "n1", title: "New Appointment Request", description: "Sarah Jenkins requested a video consultation for tomorrow at 10:00 AM.", timeLabel: "10:42 AM", category: "appointment", unread: true, section: "today" },
    { id: "n2", title: "Message from Michael", description: '"Doctor, the new medication is causing slight dizziness. Should I have a follow-up appointment? or should I continue with the current medication?"', timeLabel: "09:15 AM", category: "message", unread: true, section: "today" },
    { id: "n3", title: "Payment Received", description: "Invoice #INV-2023-089 for $150.00 has been paid successfully.", timeLabel: "08:30 AM", category: "payment", unread: false, section: "today" },
    { id: "n4", title: "Upcoming Appointment", description: "Reminder: Consultation with David Miller in 30 minutes.", timeLabel: "Yesterday", category: "appointment", unread: false, section: "yesterday" },
    { id: "n5", title: "System Update", description: "MediConnect will undergo scheduled maintenance at 2:00 AM tonight.", timeLabel: "Yesterday", category: "system", unread: false, section: "yesterday" },
    { id: "n6", title: "Lab Results Ready", description: "Blood test results for Emily Davis have been uploaded to her profile.", timeLabel: "Yesterday", category: "system", unread: true, section: "yesterday" },
    { id: "n7", title: "Payment Failed", description: "Attempted charge for Invoice #INV-2023-088 was declined.", timeLabel: "Oct 24", category: "payment", unread: false, section: "earlier" },
];

export const notificationSectionOrder: NotificationSection[] = ["today", "yesterday", "earlier"];

export const notificationSectionTitles: Partial<Record<NotificationSection, string>> = {
    yesterday: "YESTERDAY",
    earlier: "EARLIER",
};

export const notificationCategoryConfig: Record<NotificationCategory, { icon: any; tint: string; bg: string }> = {
    appointment: { icon: icons.calendar, tint: colors.primary, bg: colors.lightPrimary },
    message: { icon: icons.message, tint: "#2FC7E7", bg: "#2FC7E726" },
    payment: { icon: icons.fee, tint: colors.green, bg: colors.lightGreen },
    system: { icon: icons.notification, tint: "#9AA3B2", bg: "#9AA3B226" },
};

const DUMMY_CHAT_USER = { _id: 'u-1', first_name: 'Sarah' };

export const DUMMY_USER = DUMMY_CHAT_USER;

export const DUMMY_CHAT_ITEM = {
    id: 'room-1',
    name: 'Dr. Emily Carter',
    shop_name: 'PatientCare',
    image: undefined as string | undefined,
};

export const SEED_MESSAGES: IMessage[] = [
    { _id: 'm-1', text: 'Hello doctor, can we reschedule my appointment?', createdAt: new Date(Date.now() - 1000 * 60 * 40), user: { _id: 'u-2', name: 'Patient' } },
    { _id: 'm-2', text: 'Sure. Please share your preferred time.', createdAt: new Date(Date.now() - 1000 * 60 * 30), user: { _id: DUMMY_CHAT_USER._id, name: DUMMY_CHAT_USER.first_name } },
    { _id: 'm-3', text: 'Tomorrow after 2 PM works for me.', createdAt: new Date(Date.now() - 1000 * 60 * 20), user: { _id: 'u-2', name: 'Patient' }, image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600' },
    { _id: 'm-4', text: 'Got it, I will check the schedule.', createdAt: new Date(Date.now() - 1000 * 60 * 15), user: { _id: DUMMY_CHAT_USER._id, name: DUMMY_CHAT_USER.first_name } },
    { _id: 'm-5', text: 'You are confirmed for 2:30 PM tomorrow.', createdAt: new Date(Date.now() - 1000 * 60 * 5), user: { _id: DUMMY_CHAT_USER._id, name: DUMMY_CHAT_USER.first_name } },
];

export const privacyMeta = {
    title: "PatientCare Privacy",
    lastUpdated: "Last Updated: October 24, 2023",
    intro: "Welcome to PatientCare. Protecting your private information is our priority. This Statement of Privacy applies to the PatientCare app and governs data collection and usage.",
};

export const privacySections: PrivacySection[] = [
    {
        id: "1", title: "1. Information We Collect", icon: icons.notes,
        paragraphs: [
            "In order to better provide you with products and services offered, PatientCare may collect personally identifiable information such as your:",
            "We do not collect any personal information about you unless you voluntarily provide it to us.",
        ],
        bullets: [
            "First and Last Name, Date of Birth",
            "Mailing Address, Email Address, Phone Number",
            "Protected Health Information (PHI) including appointment history and records",
            "Payment details (processed securely via third-party providers)",
        ],
    },
    {
        id: "2", title: "2. How We Use Your Data", icon: icons.show,
        paragraphs: ["PatientCare collects and uses your personal information to operate and deliver the services you have requested."],
        bullets: [
            "Facilitate appointment scheduling and reminders",
            "Provide secure access to your health records and test results",
            "Enable direct, secure messaging between you and your healthcare providers",
            "Improve our application functionality and user experience",
        ],
    },
    {
        id: "3", title: "3. Data Sharing & Disclosure", icon: icons.privacy,
        paragraphs: [
            "PatientCare does not sell, rent or lease its customer lists to third parties.",
            "We may share data with trusted providers strictly for operational purposes and under confidentiality obligations.",
        ],
    },
    {
        id: "4", title: "4. Security of Your Information", icon: icons.privacy,
        paragraphs: ["PatientCare secures your personal information from unauthorized access, use, or disclosure."],
        bullets: [
            "End-to-end encryption for all in-app messages",
            "SSL/TLS protocols for all data transmission",
            "HIPAA-compliant secure cloud storage",
            "Strict access controls and multi-factor authentication",
        ],
    },
    {
        id: "5", title: "5. Contact Information", icon: icons.phone,
        paragraphs: ["PatientCare welcomes your questions or comments regarding this Statement of Privacy."],
        contactRows: [
            { label: "EMAIL SUPPORT", value: "privacy@patientcare.app" },
            { label: "TOLL-FREE PHONE", value: "1-800-555-CARE (2273)" },
        ],
    },
];

export const termsMeta = {
    title: "Legal Agreement",
    lastUpdated: "Last Updated: October 24, 2023",
    intro: "Please read these terms carefully before using the PatientCare platform. They contain important information about your rights and obligations.",
};

export const termsSections: TermsSection[] = [
    {
        id: "1", title: "1. Introduction & Acceptance", icon: icons.notes, expandedByDefault: true,
        content: [
            'Welcome to PatientCare. These Terms of Service ("Terms") govern your access to and use of the PatientCare mobile application, website, and related services (collectively, the "Services").',
            "By creating an account, accessing, or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not use our Services.",
        ],
    },
    {
        id: "2", title: "2. Medical Disclaimer", icon: icons.activity, expandedByDefault: true,
        content: [
            "PatientCare is not a substitute for professional medical advice, diagnosis, or treatment.",
            "Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.",
            "If you think you may have a medical emergency, call your doctor or emergency services immediately.",
        ],
    },
    { id: "3", title: "3. Privacy & Data Handling", icon: icons.privacy, content: [] },
    { id: "4", title: "4. User Account Responsibilities", icon: icons.profile, content: [] },
    { id: "5", title: "5. Limitation of Liability", icon: icons.modalDanger, content: [] },
];


export const slots = [{
    id: "1",
    time: "10:00 - 10:30",
    isAvailable: true,
},
{
    id: "2",
    time: "11:00 - 11:30",
    isAvailable: false,
},
{
    id: "3",
    time: "12:00 - 12:30",
    isAvailable: true,
},
{
    id: "4",
    time: "13:00 - 13:30",
    isAvailable: false,
},
{
    id: "5",
    time: "14:00 - 14:30",
    isAvailable: true,
},
{
    id: "6",
    time: "15:00 - 15:30",
    isAvailable: false,
},
{
    id: "7",
    time: "16:00 - 16:30",
    isAvailable: true,
},
]

export const prescription = [
    { id: "1", name: "Panadol 500mg", times: ["Morning", "Evening"], days: 7, dosage: "1 tab" },
    { id: "2", name: "Panadol 500mg", times: ["Morning", "Evening"], days: 7, dosage: "1 tab" },
    { id: "3", name: "Panadol 500mg", times: ["Morning", "Afternoon", "Evening"], days: 7, dosage: "1 tab" },
];

export const labTests = [
    { id: "1", name: "CBC" },
    { id: "2", name: "Liver Function Test" },
    { id: "3", name: "Thyroid Function Test" },
    { id: "4", name: "Blood Sugar Test" },
];

export const timeSlots = [
    { label: "15 Minutes", value: "15 Minutes" },
    { label: "30 Minutes", value: "30 Minutes" },
    { label: "45 Minutes", value: "45 Minutes" },
    { label: "60 Minutes", value: "60 Minutes" },
];