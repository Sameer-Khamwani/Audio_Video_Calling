import { StyleSheet } from "react-native";
import { heightPixel, widthPixel } from "../../../Utils/helper";
import { colors } from "../../../Utils/theme";

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: heightPixel(20),
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: widthPixel(14),
    },
    heading: {
        marginBottom: heightPixel(10),
    },
    divider: {
        height: heightPixel(1.5),
        width: "100%",
        backgroundColor: colors.lightBorder,
        // marginBottom: heightPixel(10),
        marginTop: heightPixel(40),
    },
    primaryButton: {
        width: "100%",
        marginVertical: heightPixel(20),
    },
    secondaryButton: {
        width: "100%",
    },
    backToLogin: {
        marginTop: heightPixel(10),
        textAlign: "center",
    },
    successModalButton: {
        width: "55%",
        justifyContent: "center",
        alignItems: "center",
    },
    descriptionText: {
        textAlign: "center",
    },
    formCard: {
        backgroundColor: colors.white,
        padding: heightPixel(20),
        borderRadius: heightPixel(14),
        paddingVertical: heightPixel(50),
        marginTop: heightPixel(20),
        elevation: 4,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
    },
});

export default styles;
