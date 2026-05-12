import { StyleSheet } from "react-native";
import { heightPixel, widthPixel } from "../../../Utils/helper";
import colors from "../../../Utils/theme";

const cardShadow = {
    elevation: 4,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
};

const styles = StyleSheet.create({
    /* ── Screen scroll container ── */
    scrollContent: {
        gap: heightPixel(20),
        paddingBottom: heightPixel(30),
        paddingHorizontal: widthPixel(20),
    },


    /* ── Profile card ── */
    profileCard: {
        padding: heightPixel(30),
        width: "100%",
        backgroundColor: colors.white,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: heightPixel(12),
        ...cardShadow,
    },
    avatar: {
        borderRadius: heightPixel(50),
        backgroundColor: colors.lightBlue,
    },
    profileSubText: {
        marginVertical: heightPixel(10),
    },
    messageButton: {
        height: heightPixel(50),
    },

    /* ── Health summary card ── */
    detailsCard: {
        padding: heightPixel(20),
        width: "100%",
        backgroundColor: colors.white,
        justifyContent: "center",
        borderRadius: heightPixel(12),
        ...cardShadow,
    },
    healthList: {
        marginTop: heightPixel(16),
        marginBottom: heightPixel(8),
        gap: heightPixel(12),
    },
    healthColumn: {
        justifyContent: "space-between",
        gap: heightPixel(12),
    },
    healthItem: {
        width: "48%",
    },
    horizontalList: {
        paddingVertical: heightPixel(8),
        gap: heightPixel(8),
    },
    sectionTitle: {
        marginTop: heightPixel(10),
    },
    allergyChip: {
        paddingHorizontal: widthPixel(12),
        paddingVertical: heightPixel(4),
        backgroundColor: colors.lightRed,
        borderRadius: heightPixel(20),
        justifyContent: "center",
        alignItems: "center",
    },
    conditionChip: {
        paddingHorizontal: widthPixel(12),
        paddingVertical: heightPixel(4),
        backgroundColor: colors.lightBorder,
        borderRadius: heightPixel(20),
        justifyContent: "center",
        alignItems: "center",
    },

    /* ── Tabs ── */
    tabsWrapper: {
        flexDirection: "row",
        backgroundColor: colors.white,
        borderRadius: heightPixel(12),
        padding: heightPixel(6),
        gap: heightPixel(6),
        ...cardShadow,
    },
    tabBtn: {
        flex: 1,
        paddingVertical: heightPixel(10),
        borderRadius: heightPixel(10),
        alignItems: "center",
        justifyContent: "center",
    },
    activeTabBtn: {
        backgroundColor: colors.lightPrimary,
    },

    /* ── Appointment / Report list ── */
    appointmentList: {
        gap: 0,
    },
    separator: {
        height: heightPixel(10),
    },
    apptCard: {
        backgroundColor: colors.white,
        borderRadius: heightPixel(14),
        padding: heightPixel(20),
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        marginVertical: heightPixel(4),
        width: '99%',
        alignSelf: 'center',
    },
    cardContent: {
        width: "100%",
        alignItems: "center",
    },
    metaRow: {
        marginTop: heightPixel(4),
    },

    /* Date badge */
    visitBadge: {
        backgroundColor: colors.lightBorder,
        borderRadius: heightPixel(10),
        alignItems: "center",
        justifyContent: "center",
        paddingTop: heightPixel(5),
        paddingHorizontal: widthPixel(12),
        minWidth: widthPixel(48),
    },

    /* Middle info column */
    apptInfo: {
        flex: 1,
    },

    /* Right column (status + doctor) */
    apptRight: {
        alignItems: "flex-end",
        gap: heightPixel(4),
    },
    statusChip: {
        borderRadius: heightPixel(30),
        paddingHorizontal: widthPixel(10),
        paddingVertical: heightPixel(3),
        alignItems: "center",
        justifyContent: "center",
    },
    doctorText: {
        marginTop: heightPixel(2),
    },

    /* Report icon wrapper */
    reportIconWrapper: {
        width: widthPixel(48),
        height: widthPixel(48),
        borderRadius: heightPixel(12),
        backgroundColor: colors.lightPrimary,
        alignItems: "center",
        justifyContent: "center",
    },
    clinicMode: {
        paddingHorizontal: widthPixel(12),
        backgroundColor: colors.lightBorder,
        flexDirection: 'row',
        gap: 4,
        width: '70%',
        marginVertical: heightPixel(4),
        justifyContent: 'flex-start',
    },
});

export default styles;
