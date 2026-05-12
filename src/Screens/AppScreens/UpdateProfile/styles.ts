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
    scroll: {
        flex: 1,
        width: "100%",
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: heightPixel(80),
        alignItems: "center",
        paddingHorizontal: widthPixel(20),
    },
    avatarWrapper: {
        alignItems: "center",
        marginTop: heightPixel(10),
        marginBottom: heightPixel(20),
    },
    avatarOuter: {
        width: heightPixel(120),
        height: heightPixel(120),
        borderRadius: heightPixel(60),
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
        ...cardShadow,
    },
    cameraBadge: {
        position: "absolute",
        bottom: heightPixel(-6),
        right: widthPixel(0),
        left: widthPixel(18),
    },
    changePhotoText: {
        marginTop: heightPixel(8),
    },
    card: {
        width: "100%",
        borderRadius: heightPixel(18),
        backgroundColor: colors.white,
        paddingVertical: heightPixel(20),
        paddingHorizontal: widthPixel(18),
        marginBottom: heightPixel(18),
        borderWidth: 1,
        borderColor: colors.lightBorder,
        ...cardShadow,
    },
    cardHeaderRow: {
        marginBottom: heightPixel(16),
    },
    twoColumnRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: widthPixel(10),
    },
    halfInput: {
        width: "48%",
    },
    specializationChipsRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: widthPixel(8),
        marginTop: heightPixel(8),
    },
    chip: {
        borderRadius: heightPixel(14),
        paddingHorizontal: widthPixel(12),
        paddingVertical: heightPixel(6),
        backgroundColor: colors.lightPrimary,
    },
    saveButton: {
        width: "100%",
        // marginTop: heightPixel(30),
        // marginBottom: heightPixel(10),
    },
    modalButton: {
        width: "70%",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        marginTop: heightPixel(0),
        marginVertical: heightPixel(0),
    },
    successModalButton: {
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
    },
    profileImage: {
        width: heightPixel(110),
        height: heightPixel(110),
        borderRadius: heightPixel(100),
        resizeMode: "cover",
    },
    placeholderImage: {
        borderRadius: heightPixel(100),
        resizeMode: "cover",
    },
    twoColumnRowWithMargin: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: widthPixel(10),
        marginTop: heightPixel(14),
    },
    pickerModalButtons: {
        flexDirection: "column",
        gap: heightPixel(20),
    },
});

export default styles;

