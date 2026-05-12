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

const styles = StyleSheet.create({
    segmentedContainer: {
        // width: "100%",
        borderRadius: heightPixel(18),
        backgroundColor: "#e7e7e7",
        flexDirection: "row",
        padding: heightPixel(4),
        marginTop: heightPixel(10),
        marginHorizontal: widthPixel(20),
    },
    segmentButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: heightPixel(52),
        borderRadius: heightPixel(16),
    },
    segmentButtonActive: {
        backgroundColor: colors.primary,
        ...cardShadow,
    },
    listContent: {
        paddingTop: heightPixel(24),
        paddingBottom: heightPixel(28),
        paddingHorizontal: widthPixel(20),
    },
    card: {
        width: widthPixel(390),
        borderRadius: heightPixel(20),
        borderWidth: 1,
        paddingVertical: heightPixel(10),
        paddingHorizontal: widthPixel(16),
    },
    unreadCard: {
        backgroundColor: colors.chatCardColor,
        borderColor: colors.primary,
        ...cardShadow,
        borderRadius: heightPixel(20),
    },
    readCard: {
        borderColor: colors.lightBorder,
        backgroundColor: colors.white,
        ...cardShadow,
    },
    cardRow: {
        justifyContent: "space-between",
    },
    avatarWrap: {
        width: widthPixel(64),
        height: widthPixel(64),
        borderRadius: widthPixel(32),
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
    messageSection: {
        // flex: 1,
    },
    previewText: {
        marginTop: heightPixel(4),
        width: widthPixel(200),
    },
    rightSection: {
        alignItems: "flex-end",
        justifyContent: "space-between",
        minHeight: heightPixel(68),
    },
    unreadBadge: {
        // marginTop: heightPixel(8),
        minWidth: heightPixel(24),
        height: heightPixel(24),
        borderRadius: heightPixel(18),
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primary,
    },
    chatAvatar: {
        borderRadius: heightPixel(24),
        backgroundColor: colors.lightRed,
    },
    itemSeparator: {
        height: heightPixel(18),
    },
});

export default styles;
