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
    wrapper: {
        flex: 1,
        width: "100%",
    },
    segmentedContainer: {
        // width: "100%",
        backgroundColor: "#ECEEF2",
        borderRadius: heightPixel(14),
        padding: heightPixel(5),
        flexDirection: "row",
        marginTop: heightPixel(8),
        marginHorizontal: widthPixel(18),
    },
    segmentButton: {
        flex: 1,
        height: heightPixel(46),
        borderRadius: heightPixel(12),
        alignItems: "center",
        justifyContent: "center",
    },
    segmentButtonActive: {
        backgroundColor: colors.white,
    },
    unreadTabBadge: {
        minWidth: widthPixel(22),
        height: heightPixel(22),
        borderRadius: heightPixel(11),
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: widthPixel(5),
    },
    list: {
        flex: 1,
        width: "100%",
        marginTop: heightPixel(10),
    },
    listContent: {
        paddingBottom: heightPixel(30),
        paddingHorizontal: widthPixel(18),
    },
    sectionHeader: {
        marginTop: heightPixel(24),
        marginBottom: heightPixel(12),
        letterSpacing: 0.8,
    },
    card: {
        width: "100%",
        borderRadius: heightPixel(18),
        borderWidth: 1,
        paddingHorizontal: widthPixel(18),
        paddingVertical: heightPixel(18),
        marginVertical: heightPixel(8),
        ...cardShadow,
    },
    unreadCard: {
        backgroundColor: colors.white,
        borderColor: "#c6dbff",
        ...cardShadow,
    },
    readCard: {
        backgroundColor: "#F5F7FA",
        borderColor: colors.white,
        ...cardShadow,
    },
    iconBubble: {
        width: widthPixel(52),
        height: widthPixel(52),
        borderRadius: widthPixel(26),
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    unreadDot: {
        position: "absolute",
        top: heightPixel(1),
        right: widthPixel(0),
        left: widthPixel(35),
        width: widthPixel(9),
        height: widthPixel(9),
        borderRadius: widthPixel(5),
        backgroundColor: colors.primary,
    },
    cardBody: {
        flex: 1,
    },
    titleRow: {
        width: "100%",
    },
    titleText: {
        width: '85%',
    },
    description: {
        marginTop: heightPixel(6),
        // lineHeight: heightPixel(31),
    },
    emptyState: {
        width: "100%",
        alignItems: "center",
        paddingVertical: heightPixel(28),
    },
    modalNotificationTitle: {
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        paddingBottom: heightPixel(10),
        width: "100%",
        textAlign: "center",
    },
    modalNotificationDescription: {
        textAlign: "center",
        marginVertical: heightPixel(20),
    },
    modalNotificationOkButton: {
        width: "80%",
        height: heightPixel(40),
        backgroundColor: colors.primary,
        marginTop: heightPixel(50),
    },
});

export default styles;
