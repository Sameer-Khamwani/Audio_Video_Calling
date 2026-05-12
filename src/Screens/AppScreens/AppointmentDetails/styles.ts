import { StyleSheet } from "react-native";
import { heightPixel, widthPixel } from "../../../Utils/helper";
import colors from "../../../Utils/theme";

const styles = StyleSheet.create({
    /* ── Scroll container ── */
    scrollContent: {
        gap: heightPixel(16),
        paddingBottom: heightPixel(50),
        paddingHorizontal: widthPixel(20),
        flexGrow: 1,
    },

    /* ── Shared white card ── */
    card: {
        width: "100%",
        backgroundColor: colors.white,
        borderRadius: heightPixel(14),
        padding: heightPixel(20),
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
        marginTop: heightPixel(10),
    },

    /* ── Patient Card ── */
    patientRow: {
        width: "100%",
    },
    avatar: {
        borderRadius: heightPixel(30),
        backgroundColor: colors.lightBlue,
    },

    /* ── Schedule Info Card ── */
    statusChip: {
        paddingHorizontal: widthPixel(14),
        paddingVertical: heightPixel(4),
        backgroundColor: colors.lightBorder,
        borderRadius: heightPixel(20),
        justifyContent: "center",
        alignItems: "center",
    },
    divider: {
        height: heightPixel(1),
        backgroundColor: colors.lightBorder,
        marginVertical: heightPixel(14),
    },
    iconBadge: {
        width: widthPixel(44),
        height: widthPixel(44),
        borderRadius: widthPixel(22),
        backgroundColor: colors.lightPrimary,
        justifyContent: "center",
        alignItems: "center",
    },
    timeRow: {
        marginTop: heightPixel(4),
    },

    /* ── Patient Notes Card ── */
    notesHeader: {
        marginBottom: heightPixel(6),
        borderBottomWidth: 1,
        borderBottomColor: colors.lightBorder,
        paddingBottom: heightPixel(2),
    },
    sectionHeaderWithBorder: {
        borderBottomWidth: 1,
        borderBottomColor: colors.lightBorder,
        paddingBottom: heightPixel(14),
    },
    listItemRow: {
        borderBottomWidth: 1,
        borderBottomColor: colors.lightBorder,
        paddingBottom: heightPixel(20),
    },
    listItemTitle: {
        marginVertical: heightPixel(10),
    },
    timeChip: {
        borderRadius: widthPixel(20),
        paddingVertical: heightPixel(2),
        paddingHorizontal: widthPixel(10),
    },
    labTestsWrap: {
        marginTop: heightPixel(10),
        flexWrap: "wrap",
    },
    bulletDot: {
        height: heightPixel(7),
        width: widthPixel(7),
        backgroundColor: colors.primary,
        borderRadius: widthPixel(10),
    },
    addPrescriptionButton: {
        marginVertical: heightPixel(4),
        width: "100%",
    },
    noteBlock: {
        borderLeftWidth: 3,
        borderLeftColor: colors.lightPrimary,
        backgroundColor: colors.primaryBackground,
        borderRadius: heightPixel(6),
        paddingVertical: heightPixel(12),
        paddingHorizontal: widthPixel(14),
        marginTop: heightPixel(4),
    },

    /* ── Consultation Fee Card ── */
    feeRow: {
        marginTop: heightPixel(4),
    },
    unpaidChip: {
        paddingHorizontal: widthPixel(10),
        paddingVertical: heightPixel(2),
        backgroundColor: colors.lightBorder,
        borderRadius: heightPixel(20),
        justifyContent: "center",
        alignItems: "center",
    },

    /* ── Bottom action buttons ── */
    bottomActions: {
        gap: heightPixel(20),
        paddingTop: heightPixel(14),
        width: "100%",
        paddingHorizontal: widthPixel(20),
    },
    actionBtn: {
        height: heightPixel(52),
        justifyContent: "center",
        alignItems: "center",
    },
    cancelBtn: {
        borderColor: colors.red,
        borderWidth: 1,
        backgroundColor: colors.white,
        width: "48%",
    },
    rescheduleBtn: {
        borderColor: colors.primary,
        borderWidth: 1,
        backgroundColor: colors.white,
        width: "48%",
    },

    /* ── Cancel modal ── */
    modalBtn: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalInfoCard: {
        width: "100%",
        backgroundColor: colors.lightPrimary,
        borderRadius: heightPixel(12),
        padding: heightPixel(14),
        marginTop: heightPixel(16),
        marginBottom: heightPixel(8),
    },
    modalAvatar: {
        borderRadius: heightPixel(24),
        backgroundColor: colors.lightBlue,
    },
    modalInfoText: {
        flex: 1,
        gap: heightPixel(4),
    },
    modalMetaRow: {
        marginTop: heightPixel(2),
    },
    modalButtonWidth: {
        width: "45%",
    },
    modalDangerButton: {
        backgroundColor: colors.red,
    },
    successModalButton: {
        width: "45%",
        alignSelf: "center",
    },
    viewInvoiceButton: {
        width: widthPixel(100),
        paddingHorizontal: widthPixel(4),
        borderRadius: heightPixel(6),
        height: heightPixel(30),
        elevation: 0,
    },
    availableSlotsTitle: {
        marginVertical: heightPixel(8),
        marginTop: heightPixel(14),
    },
    timeSlotsWrap: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    timeSlotTouchableBase: {
        borderWidth: 1,
        padding: heightPixel(4),
        borderRadius: heightPixel(10),
        alignItems: "center",
        width: widthPixel(100),
        marginVertical: heightPixel(5),
        marginHorizontal: widthPixel(8),
    },
    listEmptyTextMuted: {
        marginVertical: heightPixel(8),
        marginTop: heightPixel(14),
    },
    appointmentTypeTitle: {
        marginVertical: heightPixel(6),
    },
    appointmentTypeRow: {
        gap: widthPixel(16),
        justifyContent: "space-between",
        width: "100%",
        alignSelf: "center",
    },
    appointmentTypeOptionBase: {
        padding: heightPixel(16),
        borderWidth: 1,
        width: "49%",
        borderRadius: heightPixel(14),
        marginVertical: heightPixel(4),
    },
    appointmentTypeIcon: {
        marginBottom: heightPixel(14),
    },
    confirmRescheduleButton: {
        marginVertical: heightPixel(16),
        width: "90%",
        alignSelf: "center",
    },
});

export default styles;
