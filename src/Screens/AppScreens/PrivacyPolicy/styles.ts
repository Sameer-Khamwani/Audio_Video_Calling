import { StyleSheet } from "react-native";
import { heightPixel, widthPixel } from "../../../Utils/helper";
import colors from "../../../Utils/theme";

const cardShadow = {
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
};

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        width: "100%",
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: heightPixel(24),
        paddingHorizontal: widthPixel(20),
    },
    headerWrap: {
        alignItems: "center",
        marginTop: heightPixel(6),
    },
    title: {
        marginTop: heightPixel(8),
    },
    updatedText: {
        marginTop: heightPixel(4),
    },
    introText: {
        marginTop: heightPixel(18),
        color: "#7D8796",
    },
    sectionWrap: {
        marginTop: heightPixel(22),
    },
    sectionTitleRow: {
        marginBottom: heightPixel(10),
    },
    paragraph: {
        marginBottom: heightPixel(10),
        color: "#606977",
    },
    bulletRow: {
        marginBottom: heightPixel(10),
        alignItems: "flex-start",
    },
    bulletsCard: {
        backgroundColor: colors.white,
        borderRadius: heightPixel(12),
        borderWidth: 1,
        borderColor: colors.lightBorder,
        padding: heightPixel(12),
        ...cardShadow,
    },
    contactCard: {
        marginTop: heightPixel(10),
        borderWidth: 1,
        borderColor: colors.lightBorder,
        borderRadius: heightPixel(12),
        backgroundColor: colors.white,
        padding: heightPixel(12),
        ...cardShadow,
    },
    bulletText: {
        flex: 1,
    },
    contactRowSpacing: {
        marginBottom: 10,
    },
});

export default styles;

