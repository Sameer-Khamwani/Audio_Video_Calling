import { StyleSheet } from "react-native";
import { heightPixel, widthPixel } from "../../../Utils/helper";
import colors from "../../../Utils/theme";

const cardShadow = {
    elevation: 4,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
};

export const styles = StyleSheet.create({
    listContent: {
        flexGrow: 1,
        paddingBottom: heightPixel(20),
        paddingHorizontal: widthPixel(20),
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
        width: heightPixel(10),
        height: heightPixel(10),
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
        width: "44%",
        marginTop: heightPixel(20),
        marginBottom: heightPixel(4),
        height: heightPixel(35),
        alignSelf: "center",
    },
    rescheduleConfirmButton: {
        marginVertical: heightPixel(16),
        width: "90%",
        alignSelf: "center",
    },
    itemSeparator: {
        height: heightPixel(12),
    },
    searchBarStyle: {
        marginBottom: heightPixel(30),
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
    pendingActionsRow: {
        gap: widthPixel(20),
        width: "100%",
    },
    modalDangerButton: {
        backgroundColor: colors.red,
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
});

export default styles;