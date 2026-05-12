import { StyleSheet } from "react-native";
import { heightPixel, widthPixel } from "../../../Utils/helper";
import { colors } from "../../../Utils/theme";

const cardShadow = {
    elevation: 4,
    // shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
};

const styles = StyleSheet.create({
    listContent: {
        flexGrow: 1,
        paddingBottom: heightPixel(20), paddingHorizontal: widthPixel(20),
    },
    statsSection: {
        marginTop: heightPixel(40),
    },
    rescheduleConfirmButton: {
        marginVertical: heightPixel(16),
        width: "90%",
        alignSelf: "center",
    },
    statsCard: {
        width: widthPixel(170),
        height: heightPixel(170),
        paddingHorizontal: widthPixel(20),
        paddingVertical: heightPixel(20),
        borderWidth: 1,
        marginHorizontal: widthPixel(10),
        marginVertical: heightPixel(10),
        borderColor: colors.white,
        padding: widthPixel(20),
        backgroundColor: colors.white,
        borderRadius: 8,
        ...cardShadow,
    },
    statsCardHeader: {
        width: "100%",
    },
    statsValue: {
        marginTop: heightPixel(20),
    },
    quickActionsTitle: {
        marginTop: heightPixel(40),
    },
    scheduleHeaderRow: {
        marginTop: heightPixel(18),
        // width: "100%",
        paddingHorizontal: widthPixel(20),
    },
    bannerContainer: {
        width: "100%",
        marginTop: heightPixel(18),
        alignItems: "center",
    },
    bannerSlide: {
        height: '100%',
        borderRadius: 14,
        overflow: "hidden",
        backgroundColor: colors.lightBorder,
        ...cardShadow,
    },
    bannerImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    dotsRow: {
        flexDirection: "row",
        gap: widthPixel(6),
        marginTop: heightPixel(10),
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: heightPixel(8),
        left: 0,
        right: 0,
    },
    dot: {
        height: heightPixel(7),
        borderRadius: heightPixel(9),
    },
    dotActive: {
        width: widthPixel(20),
        backgroundColor: colors.white,
    },
    dotInactive: {
        width: widthPixel(7),
        backgroundColor: colors.lightBorder,
    },
    scheduleCard: {
        // width: "100%",
        padding: heightPixel(14),
        marginTop: heightPixel(20),
        borderRadius: 8,
        borderColor: colors.white,
        backgroundColor: colors.white,
        ...cardShadow,
    },
    scheduleTopRow: {
        width: "100%",
    },
    scheduleAvatar: {
        borderRadius: 100,
        backgroundColor: colors.lightGray,
    },
    scheduleMetaRow: {
        marginTop: heightPixel(6),
    },
    scheduleDivider: {
        width: "100%",
        height: 1,
        backgroundColor: colors.lightBorder,
        marginVertical: heightPixel(14),
    },
    scheduleActionsRow: {
        width: "100%",
        alignItems: "stretch",
        marginVertical: heightPixel(4),
    },
    confirmModalButton: {
        width: "90%",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: heightPixel(20),
    },
    /** Base layout for schedule card actions; pair with `flex` per button */
    scheduleActionButton: {
        minWidth: 0,
        alignSelf: "stretch",
        height: heightPixel(35),
        paddingHorizontal: widthPixel(8),
    },
    declineButton: {
        backgroundColor: colors.red,
    },
    acceptButton: {
        width: "48%",
        height: heightPixel(40),
        marginTop: heightPixel(20),
    },
    itemSeparator: {
        height: heightPixel(8),
    },
    greetingText: {
        width: '100%',
        paddingHorizontal: widthPixel(20),
    },
    dateRow: {
        gap: widthPixel(5),
        paddingHorizontal: widthPixel(20),
        // width: widthPixel(400),
    },
    scheduleNameTimeRow: {
        // width: "100%",
        // backgroundColor: colors.red,
    },
    scheduleBottomRow: {
        width: widthPixel(280),
        marginTop: heightPixel(4),
    },
    statusBadge: {
        paddingVertical: heightPixel(1),
        paddingHorizontal: widthPixel(10),
        borderRadius: heightPixel(20),
        gap: widthPixel(8),
    },
    modalKeepButton: {
        width: "47%",
        height: heightPixel(40),
    },
    modalCancelButton: {
        backgroundColor: colors.red,
        width: "47%",
        height: heightPixel(40),
    },
    successModalButton: {
        width: "45%",
        alignSelf: "center",
    },

    calendarCard: {
        width: "100%",
        borderWidth: 1,
        borderColor: colors.lightBorder,
        borderRadius: heightPixel(12),
        padding: heightPixel(14),
        marginTop: heightPixel(10),
        backgroundColor: colors.white,
        ...cardShadow,
    },
    weekHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: heightPixel(10),
        marginBottom: heightPixel(6),
    },
    weekDay: { width: widthPixel(40), textAlign: "center" },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    cell: {
        width: widthPixel(38),
        height: heightPixel(46),
        borderRadius: heightPixel(10),
        justifyContent: "center",
        alignItems: "center",
        marginVertical: heightPixel(4),
        marginHorizontal: widthPixel(4),
        borderWidth: 1,
        borderColor: colors.white,
        backgroundColor: colors.white,
        ...cardShadow,
    },
    cellSelected: {
        borderWidth: 1,
        borderColor: colors.primary,
        backgroundColor: colors.white,
        ...cardShadow,
    },
    countBadge: {
        position: "absolute",
        top: heightPixel(2),
        right: widthPixel(2),
        minWidth: widthPixel(16),
        height: heightPixel(16),
        borderRadius: heightPixel(8),
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: widthPixel(3),
    },
    statusRow: {
        width: "100%",
        marginVertical: heightPixel(16),
    },
    legendDot: {
        borderRadius: heightPixel(20),
        height: heightPixel(10),
        width: widthPixel(10),
    },
    headerRow: {
        width: "100%",
        marginBottom: heightPixel(16),
    },
    card: {
        width: "100%",
        borderRadius: heightPixel(10),
        borderWidth: 1,
        padding: heightPixel(14),
        borderColor: colors.lightBorder,
        backgroundColor: colors.white,
        ...cardShadow,
    },
    timeCol: { justifyContent: "center", alignItems: "center" },
    vertDivider: { width: 1, height: heightPixel(50), backgroundColor: colors.lightBorder },
    statusDot: {
        width: widthPixel(8),
        height: heightPixel(8),
        borderRadius: heightPixel(8),
    },
    calendarToggleButton: {
        alignSelf: "center",
        marginTop: heightPixel(30),
        paddingVertical: heightPixel(6),
        paddingHorizontal: widthPixel(14),
        borderRadius: heightPixel(16),
        borderWidth: 1,
        borderColor: colors.lightBorder,
        backgroundColor: colors.lightBlue,
    },
    monthArrowBtn: {
        height: heightPixel(34),
        width: widthPixel(34),
        borderRadius: heightPixel(10),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.lightBlue,
        borderWidth: 1,
        borderColor: colors.lightBorder,
    },
    cancelButton: {
        width: "70%",
        marginTop: heightPixel(20),
        marginBottom: heightPixel(4),
        height: heightPixel(37),
        alignSelf: "center",
    },

    searchBarStyle: {
        marginBottom: heightPixel(40),
        borderRadius: heightPixel(20),
        borderWidth: 1,
        borderColor: colors.white,
        elevation: 4,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        backgroundColor: colors.white,
    },
    emptyState: {
        paddingVertical: heightPixel(20),
        width: "100%",
        alignItems: "center",
    },
    modalButtonStyle: {
        width: '45%',
    },
    calendarToggleIcon: {
        transform: [{ rotate: "90deg" }],
    },
    homeScrollContent: {
        paddingBottom: heightPixel(20),
    },
    filterAppointmentsRow: {
        gap: widthPixel(16),
        alignSelf: "center",
        marginVertical: heightPixel(10),
    },
    filterStatLabel: {
        width: widthPixel(95),
        textAlign: "center",
    },
    filterAppointmentCardBase: {
        marginVertical: heightPixel(10),
        paddingVertical: heightPixel(14),
        paddingHorizontal: widthPixel(10),
        borderRadius: heightPixel(12),
        borderWidth: 1,
        justifyContent: "space-between",
        alignItems: "center",
    },
    financialReportsRow: {
        backgroundColor: colors.primary,
        paddingVertical: heightPixel(18),
        paddingHorizontal: widthPixel(14),
        borderRadius: heightPixel(10),
        justifyContent: "space-between",
        width: "90%",
        alignSelf: "center",
        marginVertical: heightPixel(10),
    },
    listEmptyTextMuted: {
        marginVertical: heightPixel(8),
        marginTop: heightPixel(14),
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
});

export default styles;
